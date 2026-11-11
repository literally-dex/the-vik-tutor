import { subjects, terms, lessons, quizzes } from "./dictionaryData.js";
import { vectorTerms } from "./vectorTopic.js";
import { physicsTerms } from "./physicsTopics.js";

const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));
let allTerms = [...terms, ...vectorTerms, ...physicsTerms];
const termById = new Map(allTerms.map((term) => [term.id, term]));
const termByTitle = new Map(allTerms.map((term) => [term.title, term]));
const grid = document.querySelector("#dictionary-grid");
const searchInput = document.querySelector("#search-input");
const filters = document.querySelector("#subject-filters");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const dialog = document.createElement("dialog");
dialog.className = "term-dialog";
dialog.setAttribute("aria-label", "Fogalom részletei");
document.body.append(dialog);

let activeSubject = "all";
let courseNotes = [];
let activeCourseSubject = "";
let activeCourseTag = "";
let courseSearchIndex = new Map();
let courseNotesByOrder = [];
let activeSuggestionIndex = -1;
let activeLessonIndex = 0;
let activeStepIndex = 0;
let quizSubject = "digitalis";
let quizItems = [];
let quizIndex = 0;
let quizScore = 0;
let hasAnswered = false;
let toastTimeout;
let dialogReturnFocus = null;
let readerReturnFocus = null;
let mathTypesetQueue = Promise.resolve();

async function loadCourseNotes() {
  const response = await fetch("./src/data/coursesData.json");
  if (!response.ok) throw new Error(`A jegyzetadatok betöltése nem sikerült (${response.status}).`);
  const notes = await response.json();
  if (!Array.isArray(notes) || notes.some((note) =>
    typeof note.title !== "string" ||
    typeof note.subject !== "string" ||
    !Array.isArray(note.tags) ||
    typeof note.summary !== "string" ||
    typeof note.fullContent !== "string"
  )) {
    throw new TypeError("A coursesData.json adatszerkezete nem megfelelő.");
  }
  return notes;
}

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

function renderFilters() {
  const options = [{ id: "all", name: "Összes tárgy" }, ...subjects];
  filters.innerHTML = options.map((subject) => `
    <button class="filter-chip" type="button" data-subject="${subject.id}" aria-pressed="${activeSubject === subject.id}">
      ${escapeHTML(subject.name)}
    </button>`).join("");
}

function filteredTerms() {
  const query = searchInput.value.trim().toLocaleLowerCase("hu");
  return allTerms.filter((term) => {
    const matchesSubject = activeSubject === "all" || term.subject === activeSubject;
    const subjectName = subjectById.get(term.subject)?.name ?? "";
    const haystack = [term.title, term.english, term.category, term.summary, term.definition, term.analogy, term.example, subjectName]
      .join(" ").toLocaleLowerCase("hu");
    return matchesSubject && (!query || haystack.includes(query));
  });
}

function renderTerms() {
  const shown = filteredTerms();
  grid.innerHTML = shown.map((term) => {
    const subject = subjectById.get(term.subject);
    return `<article class="term-card" tabindex="0" role="button" data-term="${term.id}" aria-label="${escapeHTML(term.title)} fogalom részletei">
      <div class="card-top">
        <span class="subject-mark"><i style="--subject-color:${subject.color}"></i>${escapeHTML(subject.short)}</span>
        <span class="category-tag">${escapeHTML(term.category)}</span>
      </div>
      <h3>${escapeHTML(term.title)}</h3>
      <div class="card-english">${escapeHTML(term.english)}</div>
      <p>${escapeHTML(term.summary)}</p>
      <div class="card-bottom"><span class="card-subject">${escapeHTML(subject.name)}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
    </article>`;
  }).join("");
  resultCount.textContent = `${String(shown.length).padStart(2, "0")} / ${allTerms.length} FOGALOM`;
  emptyState.hidden = shown.length > 0;
  grid.hidden = shown.length === 0;
}

function typesetCourseMath(root) {
  if (!root || !window.MathJax?.typesetPromise) return;
  mathTypesetQueue = mathTypesetQueue.then(() => {
    if (!root.isConnected) return;
    window.MathJax.typesetClear?.([root]);
    return window.MathJax.typesetPromise([root]);
  }).catch((error) => console.warn("A képletek formázása nem sikerült:", error));
}

function formatTermFormula(term, display = false) {
  if (!term.formula) return "";
  if (!["digitalis", "analizis", "fizika", "szamitastudomany"].includes(term.subject)) {
    return escapeHTML(term.formula);
  }
  const lines = term.formula.split("\n").filter(Boolean);
  return lines.map((line) => display
    ? `<div class="formula-line">\\[${escapeHTML(line)}\\]</div>`
    : `\\(${escapeHTML(line)}\\)`).join(display ? "" : "<br>");
}

function cleanMarkdownText(markdown) {
  if (!markdown) return "";
  const plainMarkdown = markdown
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$(?:\\.|[^$])+\$/g, " ")
    .replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, " ")
    .replace(/\[cite:\s*[\d,\s]+\]/g, "");
  const html = window.DOMPurify.sanitize(window.marked.parse(plainMarkdown));
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent;
  return text.replace(/\[cite:\s*[\d,\s]+\]/g, "").replace(/\s+/g, " ").trim();
}

function addNoteGlossaryTerms(notes) {
  const existingTitles = new Set(allTerms.map((term) => term.title.toLocaleLowerCase("hu")));
  const noteTerms = [];
  notes.forEach((note, noteIndex) => {
    const subject = subjects.find((item) => item.name === note.subject);
    if (!subject) return;
    const content = note.fullContent.replace(/^---\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, "");
    const sections = content.split(/(?=^#{3,4}\s+)/m);
    sections.forEach((section) => {
      const heading = section.match(/^#{3,4}\s+3\.\d+\.?\s+(.+)$/m);
      if (!heading) return;
      const title = cleanMarkdownText(heading[1]);
      if (!title || existingTitles.has(title.toLocaleLowerCase("hu"))) return;
      const text = section.slice(heading[0].length).split(/\n\s*\n/).find((part) => part.trim() && !part.trim().startsWith("$$")) ?? "";
      const cleanSummary = cleanMarkdownText(text);
      const containsMath = /\$\$[\s\S]*?\$\$|\$(?:\\.|[^$])+\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/.test(text);
      const summary = containsMath
        ? `A jegyzet a(z) ${title.toLocaleLowerCase("hu")} jelentését és fontos összefüggéseit foglalja össze.`
        : cleanSummary.length > 180 ? `${cleanSummary.slice(0, 180).replace(/\s+\S*$/, "")}…` : cleanSummary;
      if (!summary) return;
      existingTitles.add(title.toLocaleLowerCase("hu"));
      noteTerms.push({
        id: `note-term-${noteIndex}-${noteTerms.length}`,
        subject: subject.id,
        title,
        english: "",
        category: "Jegyzetkivonat",
        summary,
        definition: summary,
        analogy: "",
        formula: "",
        example: "",
        related: [],
      });
    });
  });
  allTerms.push(...noteTerms);
  noteTerms.forEach((term) => {
    termById.set(term.id, term);
    termByTitle.set(term.title, term);
  });
}

function courseTagKey(tag) {
  return String(tag).replace(/^#/, "").toLocaleLowerCase("hu");
}

function stripMindMapSections(markdown) {
  const lines = markdown.split(/\r?\n/);
  const kept = [];
  let removedSectionLevel = 0;
  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+/);
    if (removedSectionLevel) {
      if (!heading || heading[1].length > removedSectionLevel) continue;
      removedSectionLevel = 0;
    }
    if (heading && /mind\s*[-–]?\s*map/i.test(line)) {
      removedSectionLevel = heading[1].length;
      continue;
    }
    kept.push(line);
  }
  return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function renderCourseFilters() {
  const subjectFilters = document.querySelector("#course-subject-filters");
  subjectFilters.innerHTML = subjects.map(({ name }) => {
    const count = courseNotes.filter((note) => note.subject === name).length;
    return `<button class="course-filter-chip" type="button" data-course-subject="${escapeHTML(name)}" aria-pressed="${activeCourseSubject === name}" ${count ? "" : "disabled"}>
      ${escapeHTML(name)} <span>${count}</span>
    </button>`;
  }).join("");

  const examFilters = document.querySelector("#course-exam-filters");
  examFilters.innerHTML = ["zh1", "zh2"].map((tag) => {
    const count = courseNotes.filter((note) => noteTags(note).some((item) => courseTagKey(item) === tag)).length;
    return `<button class="course-filter-chip exam-chip" type="button" data-course-tag="${tag}" aria-pressed="${activeCourseTag === tag}" title="${count ? `${count} jegyzet` : "A jelenlegi adatbázisban nincs ilyen címkéjű jegyzet."}">
      #${tag} <span>${count}</span>
    </button>`;
  }).join("");
}

const courseFilenameOrder = new Map([
  ["analizis", [
    "Matematikai logika és halmazalgebra alapjai",
    "Vektoralgebra, koordinátareprezentáció, egyenesek és síkok a térben",
    "Komplex számok, polinomok algebrája és az algebra alaptétele",
    "Valós számtest, korlátosság, függvényműveletek és a függvényhatárérték elmélete",
    "Számsorozatok elmélete, határozatlan alakok és határértékszámítási technikák",
    "Folytonosság topológiai és sorozatos jellemzése, cáfoló sorozatok, Bolzano–Weierstrass-tétel és kompakt halmazok",
    "Folytonos függvények globális tételei, topológiai alapok, differenciálszámítás és L'Hospital-szabály",
    "A deriválás alkalmazásai, differenciális függvényvizsgálat és lokális szélsőértékek",
  ]],
  ["programozas", [
    "Bevezetés az algoritmizálásba és a strukturált programozásba (C nyelvi alapok)",
    "Összetett vezérlési szerkezetek, adatvektorok és soros feldolgozási algoritmusok",
    "Statikus tömbök, vektoralgoritmusok és a helyben szétválogatás",
    "A C nyelv aritmetikai típusai, fixpontos és lebegőpontos gépi számábrázolás",
    "Függvények, a hívásszervezés mechanizmusa, struktúrák, típusdefiniálás és a felsorolt típus",
    "Indirekció, mutatók, mutatóaritmetika, tömbök kapcsolata és sztringkezelés",
    "Sztringkezelés, operátorok alaktana, kifejezésfák, mellékhatások, szinkronizációs pontok és típuskonverziók",
    "Dinamikus memóriakezelés, állománykezelés (fájl I/O) és keresési algoritmusok",
  ]],
]);
const noteOrder = new Map([...courseFilenameOrder].flatMap(([subject, titles]) =>
  titles.map((title, index) => [`${subject}:${title}`, index + 1])
));

function subjectOrderKey(subject) {
  if (subject === "Analízis 1") return "analizis";
  if (subject === "Programozás 1") return "programozas";
  return subject;
}

function orderedNoteNumber(note) {
  return noteOrder.get(`${subjectOrderKey(note.subject)}:${note.title}`) ?? Number.MAX_SAFE_INTEGER;
}

function noteTags(note) {
  const frontmatter = note.fullContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const tagsBlock = frontmatter?.[1].match(/^tags:\s*\r?\n((?:[ \t]+-[^\r\n]*\r?\n?)*)/m);
  if (!tagsBlock) return note.tags.map((tag) => String(tag).replace(/^#/, ""));
  return [...tagsBlock[1].matchAll(/^[ \t]+-[ \t]*(.+?)\s*$/gm)]
    .map(([, tag]) => tag.replace(/^['"]|['"]$/g, "").replace(/^#/, ""));
}

function plainCourseContent(note) {
  const markdown = stripMindMapSections(note.fullContent
    .replace(/^---\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, "")
  )
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label || target)
    .replace(/!?\[\[([^\]]+)\]\]/g, "$1");
  const html = window.marked?.parse ? window.marked.parse(markdown) : markdown;
  return new DOMParser().parseFromString(html, "text/html").body.textContent.replace(/\s+/g, " ").trim();
}

function prepareCourseSearchIndex(notes) {
  courseSearchIndex = new Map(notes.map((note) => {
    const content = plainCourseContent(note);
    return [note, {
      content,
      searchable: [note.title, noteTags(note).join(" "), note.summary, content].join(" ").toLocaleLowerCase("hu"),
    }];
  }));
}

function courseSearchSnippet(note, query) {
  const index = courseSearchIndex.get(note);
  const candidates = [note.title, ...noteTags(note).map((tag) => `#${tag}`), index?.content ?? ""];
  for (const candidate of candidates) {
    const matchIndex = candidate.toLocaleLowerCase("hu").indexOf(query);
    if (matchIndex < 0) continue;
    const start = Math.max(0, matchIndex - 55);
    const end = Math.min(candidate.length, matchIndex + query.length + 75);
    return `${start ? "…" : ""}${candidate.slice(start, end).trim()}${end < candidate.length ? "…" : ""}`;
  }
  return note.summary;
}

function highlightSearchMatch(text, query) {
  const index = text.toLocaleLowerCase("hu").indexOf(query);
  if (index < 0) return escapeHTML(text);
  return `${escapeHTML(text.slice(0, index))}<mark>${escapeHTML(text.slice(index, index + query.length))}</mark>${escapeHTML(text.slice(index + query.length))}`;
}

function renderCourseSuggestions() {
  const input = document.querySelector("#course-search-input");
  const suggestions = document.querySelector("#course-search-suggestions");
  const query = input.value.trim().toLocaleLowerCase("hu");
  activeSuggestionIndex = -1;
  input.removeAttribute("aria-activedescendant");
  if (!query) {
    suggestions.hidden = true;
    suggestions.innerHTML = "";
    input.setAttribute("aria-expanded", "false");
    return;
  }
  const matches = courseNotes.filter((note) => courseSearchIndex.get(note)?.searchable.includes(query));
  const shown = matches.slice(0, 7);
  suggestions.innerHTML = shown.length
    ? `${shown.map((note, index) => {
      const subject = subjects.find((item) => item.name === note.subject);
      return `<button class="course-search-suggestion" type="button" role="option" id="course-search-option-${index}" aria-selected="false" data-search-note="${escapeHTML(note.title)}">
        <span class="suggestion-subject" style="--course-color:${subject?.color ?? "var(--blue)"}">${escapeHTML(note.subject)}</span>
        <strong>${escapeHTML(note.title)}</strong>
        <span class="suggestion-snippet">${highlightSearchMatch(courseSearchSnippet(note, query), query)}</span>
      </button>`;
    }).join("")}
    <div class="course-search-footer">${matches.length > shown.length ? `Mutasd mind a ${matches.length} találatot a kártyarácsban` : `${matches.length} találat`}</div>`
    : `<div class="course-search-no-results">Nincs egyező jegyzet.</div>`;
  suggestions.hidden = false;
  input.setAttribute("aria-expanded", "true");
}

function filteredCourseNotes() {
  const query = document.querySelector("#course-search-input").value.trim().toLocaleLowerCase("hu");
  return courseNotesByOrder.filter((note) => {
    const matchesSubject = note.subject === activeCourseSubject;
    const matchesTag = !activeCourseTag || noteTags(note).some((tag) => courseTagKey(tag) === activeCourseTag);
    const matchesQuery = !query || courseSearchIndex.get(note)?.searchable.includes(query);
    return matchesSubject && matchesTag && matchesQuery;
  });
}

function renderCourse() {
  const grid = document.querySelector("#course-grid");
  const shown = filteredCourseNotes();
  renderCourseFilters();
  renderCourseSuggestions();
  grid.innerHTML = shown.map((note) => {
    const subject = subjects.find((item) => item.name === note.subject);
    const color = subject?.color ?? "#1756c2";
    const order = orderedNoteNumber(note);
    return `<article class="course-card" style="--course-color:${color}">
      <div class="course-card-meta"><span class="course-subject-badge"><i></i>${escapeHTML(note.subject)}</span><span class="course-card-number">${order !== Number.MAX_SAFE_INTEGER ? String(order).padStart(2, "0") : "—"}</span></div>
      <h3><button class="course-card-title" type="button" data-open-course="${escapeHTML(note.title)}">${escapeHTML(note.title)}</button></h3>
      <p class="course-card-summary">${escapeHTML(note.summary)}</p>
      <div class="course-card-tags" aria-label="Címkék">${noteTags(note).map((tag) => `<button class="course-note-tag" type="button" data-note-tag="${escapeHTML(tag)}" aria-pressed="${activeCourseTag === courseTagKey(tag)}">#${escapeHTML(tag)}</button>`).join("") || "<span class=\"course-no-tags\">Nincs címke</span>"}</div>
      <button class="course-card-open" type="button" data-open-course="${escapeHTML(note.title)}">📖 Részletes levezetés <span aria-hidden="true">↗</span></button>
    </article>`;
  }).join("");
  document.querySelector("#course-result-count").textContent = `${shown.length} / ${courseNotes.length} JEGYZET${activeCourseTag ? ` · #${activeCourseTag}` : ""}`;
  document.querySelector("#course-empty-state").hidden = shown.length > 0;
  grid.hidden = shown.length === 0;
}

function addCodeCopyButtons(root) {
  root.querySelectorAll("pre").forEach((block) => {
    const button = document.createElement("button");
    button.className = "reader-copy-button code-copy-button";
    button.type = "button";
    button.textContent = "Kód másolása";
    button.setAttribute("aria-label", "Kód másolása");
    block.append(button);
  });
}

function renderCourseMarkdown(markdown) {
  const mathExpressions = [];
  const protectedMarkdown = markdown.replace(
    /(\$\$[\s\S]+?\$\$|\$(?:\\.|[^$\n])+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g,
    (expression) => {
      const token = `COURSEMATHPLACEHOLDER${mathExpressions.length}END`;
      mathExpressions.push(expression);
      return token;
    }
  );
  const html = window.DOMPurify.sanitize(window.marked.parse(protectedMarkdown), { USE_PROFILES: { html: true } });
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const walker = document.createTreeWalker(parsed.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((textNode) => {
    if (!textNode.nodeValue.includes("COURSEMATHPLACEHOLDER")) return;
    const fragment = document.createDocumentFragment();
    const pieces = textNode.nodeValue.split(/(COURSEMATHPLACEHOLDER\d+END)/g);
    pieces.forEach((piece) => {
      const match = piece.match(/^COURSEMATHPLACEHOLDER(\d+)END$/);
      fragment.append(document.createTextNode(match ? mathExpressions[Number(match[1])] : piece));
    });
    textNode.replaceWith(fragment);
  });
  return parsed.body.innerHTML;
}

function prepareCourseReader(note) {
  const markdown = window.marked;
  const purifier = window.DOMPurify;
  if (!markdown?.parse || !purifier?.sanitize || !window.renderMathInElement) {
    throw new Error("A jegyzet megjelenítéséhez szükséges Markdown- vagy KaTeX-könyvtár nem érhető el.");
  }
  const content = stripMindMapSections(note.fullContent
    .replace(/^---\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, "")
  )
    .replace(/\[cite:\s*[\d,\s]+\]/g, "")
    .replace(/!?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label || target);
  const safeHtml = renderCourseMarkdown(content);
  const subject = subjects.find((item) => item.name === note.subject);
  const reader = document.querySelector("#course-reader");
  reader.innerHTML = `<div class="course-reader-shell">
    <header class="course-reader-header" style="--subject-color:${subject?.color ?? "var(--blue)"}">
      <div class="course-reader-heading"><span class="course-reader-subject">${escapeHTML(note.subject)}</span><h2 id="course-reader-title">${escapeHTML(note.title)}</h2><p>${escapeHTML(note.summary)}</p>
        <div class="course-card-tags">${noteTags(note).map((tag) => `<span class="course-note-tag">#${escapeHTML(tag)}</span>`).join("")}</div>
      </div>
      <button class="course-reader-close" type="button" aria-label="Jegyzet bezárása">×</button>
    </header>
    <div class="course-reader-content">
      <aside class="course-reader-toc" aria-label="Tartalomjegyzék"><strong>TARTALOM</strong><nav id="course-reader-toc-links"></nav></aside>
      <article class="course-reader-article">
        <div class="markdown-content reader-markdown">${safeHtml}</div>
      </article>
    </div>
  </div>`;
  reader.setAttribute("aria-labelledby", "course-reader-title");
  const article = reader.querySelector(".reader-markdown");
  const headings = [...article.querySelectorAll("h2")];
  const ids = new Set();
  headings.forEach((heading, index) => {
    const slug = heading.textContent.toLocaleLowerCase("hu").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "fejezet";
    let id = `reader-${slug}`;
    let suffix = 2;
    while (ids.has(id)) id = `reader-${slug}-${suffix++}`;
    ids.add(id);
    heading.id = id;
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>${escapeHTML(heading.textContent)}`;
    document.querySelector("#course-reader-toc-links").append(link);
  });
  window.renderMathInElement(article, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
    ],
    throwOnError: false,
  });
  decorateNoteHighlights(article);
  article.querySelectorAll("pre code").forEach((code) => window.Prism?.highlightElement(code));
  addCodeCopyButtons(article);
  renderFunctionGraphs(article);
}

function decorateNoteHighlights(article) {
  const highlightRules = [
    { pattern: /^(?:érdekesség|érdekességképpen|hétköznapi|mérnöki analógia|mérnöki motiváció|szemléletes|intuíció|gyakorlati példa)/i, className: "reader-highlight-interest" },
    { pattern: /^(?:fontos|figyelem|vigyázat|hiba|tipikus hiba|csapda|zh|vizsga|ellenpélda)/i, className: "reader-highlight-warning" },
    { pattern: /^(?:definíció|tétel|állítás|következmény|alaptétel|ekvivalencia-tétel)/i, className: "reader-highlight-concept" },
  ];
  article.querySelectorAll("p, li, blockquote").forEach((block) => {
    const label = block.querySelector(":scope > strong")?.textContent.trim()
      ?? block.querySelector(":scope > p > strong")?.textContent.trim()
      ?? "";
    const rule = highlightRules.find(({ pattern }) => pattern.test(label));
    if (rule) block.classList.add("reader-highlight", rule.className);
  });
  [...article.querySelectorAll("h2, h3")].forEach((heading) => {
    if (!/(?:zh|vizsga).*(?:csapd|hib)|(?:csapd|hib).*(?:zh|vizsga)/i.test(heading.textContent)) return;
    heading.classList.add("reader-highlight-heading", "reader-highlight-warning");
    const level = Number(heading.tagName.slice(1));
    for (let element = heading.nextElementSibling; element; element = element.nextElementSibling) {
      if (/^H[1-6]$/.test(element.tagName) && Number(element.tagName.slice(1)) <= level) break;
      element.querySelectorAll("li").forEach((item) => item.classList.add("reader-highlight", "reader-highlight-warning"));
    }
  });
}

function renderFunctionGraphs(article) {
  const definitions = [
    {
      pattern: /x\^2\s*e\^\{-x\}/,
      label: "f(x) = x²e⁻ˣ",
      evaluate: (x) => x * x * Math.exp(-x),
      xMin: -2,
      xMax: 5,
      yMin: -1,
      yMax: 8,
    },
    {
      pattern: /3x\^5\s*-\s*5x\^4/,
      label: "f(x) = 3x⁵ − 5x⁴",
      evaluate: (x) => 3 * x ** 5 - 5 * x ** 4,
      xMin: -1.2,
      xMax: 2,
      yMin: -10,
      yMax: 3,
    },
    {
      pattern: /\\sin\\left\s*\(?\s*\\frac\{1\}\{x\}/,
      label: "f(x) = sin(1/x)",
      evaluate: (x) => Math.sin(1 / x),
      xMin: -2,
      xMax: 2,
      yMin: -1.2,
      yMax: 1.2,
    },
  ];
  const formulas = [...article.querySelectorAll(".katex-display, .katex")]
    .filter((element) => !element.closest(".katex-display .katex"));
  const renderedDefinitions = new Set();
  formulas.forEach((formula) => {
    const tex = formula.querySelector('annotation[encoding="application/x-tex"]')?.textContent ?? "";
    const definition = definitions.find(({ pattern }) => pattern.test(tex));
    if (!definition || renderedDefinitions.has(definition)) return;
    const block = formula.closest("p, li") ?? formula.parentElement;
    if (!block || block.nextElementSibling?.classList.contains("reader-function-graph")) return;
    const width = 560;
    const height = 220;
    const padding = 22;
    const xPixel = (x) => padding + (x - definition.xMin) / (definition.xMax - definition.xMin) * (width - 2 * padding);
    const yPixel = (y) => height - padding - (y - definition.yMin) / (definition.yMax - definition.yMin) * (height - 2 * padding);
    let path = "";
    let drawing = false;
    const sampleCount = 1000;
    for (let index = 0; index <= sampleCount; index++) {
      const x = definition.xMin + (definition.xMax - definition.xMin) * index / sampleCount;
      const y = definition.evaluate(x);
      if (!Number.isFinite(y) || y < definition.yMin || y > definition.yMax) {
        drawing = false;
        continue;
      }
      path += `${drawing ? "L" : "M"}${xPixel(x).toFixed(1)},${yPixel(y).toFixed(1)} `;
      drawing = true;
    }
    const xAxis = definition.yMin <= 0 && definition.yMax >= 0 ? yPixel(0) : height - padding;
    const yAxis = definition.xMin <= 0 && definition.xMax >= 0 ? xPixel(0) : padding;
    const figure = document.createElement("figure");
    figure.className = "reader-function-graph";
    figure.innerHTML = `<figcaption>${escapeHTML(definition.label)} grafikonja</figcaption>
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHTML(definition.label)} függvénygrafikonja">
        <path class="reader-graph-grid" d="M${padding} ${padding}H${width - padding} M${padding} ${height / 2}H${width - padding} M${padding} ${height - padding}H${width - padding} M${width / 4} ${padding}V${height - padding} M${width / 2} ${padding}V${height - padding} M${width * 3 / 4} ${padding}V${height - padding}" />
        <path class="reader-graph-axis" d="M${padding} ${xAxis}H${width - padding} M${yAxis} ${padding}V${height - padding}" />
        <path class="reader-graph-curve" d="${path}" />
      </svg>`;
    block.after(figure);
    renderedDefinitions.add(definition);
  });
}

function openCourseReader(note, trigger) {
  if (!note) return;
  readerReturnFocus = trigger ?? document.activeElement;
  try {
    prepareCourseReader(note);
  } catch (error) {
    console.error("A részletes jegyzetnézet előkészítése nem sikerült:", error);
    showToast(error.message);
    return;
  }
  document.querySelector("#course-reader").showModal();
  document.querySelector(".course-reader-close").focus();
}

function detailBlock(title, content, className = "") {
  return `<section class="detail-block"><h3>${title}</h3><div class="${className}">${content}</div></section>`;
}

function openTerm(term) {
  if (!term) return;
  dialogReturnFocus = document.activeElement;
  const subject = subjectById.get(term.subject);
  const related = term.related.map((title) => termByTitle.get(title)).filter(Boolean);
  dialog.innerHTML = `<div class="dialog-inner">
    <button class="dialog-close" type="button" aria-label="Bezárás">×</button>
    <header class="dialog-header">
      <span class="subject-mark"><i style="--subject-color:${subject.color}"></i>${escapeHTML(subject.name)} · ${escapeHTML(term.category)}</span>
      <h2>${escapeHTML(term.title)}</h2><div class="dialog-english">${escapeHTML(term.english)}</div>
    </header>
    ${detailBlock("Érthetően", `<p>${escapeHTML(term.definition)}</p>`)}
    ${term.analogy ? detailBlock("Gondolj rá így", `<p>${escapeHTML(term.analogy)}</p>`, "detail-example") : ""}
    ${term.formula ? detailBlock("Képlet / kódrészlet", formatTermFormula(term, true), "detail-formula") : ""}
    ${term.example ? detailBlock("BME-s példa", `<p>${escapeHTML(term.example)}</p>`, "detail-example") : ""}
    ${term.examTip ? `<div class="callout callout-yellow"><span>💡 BME ZH TIPP</span><p>${escapeHTML(term.examTip)}</p></div>` : ""}
    ${term.commonError ? `<div class="callout callout-red"><span>⚠ TIPIKUS HIBA</span><p>${escapeHTML(term.commonError)}</p></div>` : ""}
    ${related.length ? `<section class="detail-block"><h3>Kapcsolódó fogalmak</h3><div class="related-terms">
      ${related.map((item) => `<button class="related-chip" type="button" data-related="${item.id}">${escapeHTML(item.title)} ↗</button>`).join("")}
    </div></section>` : ""}
  </div>`;
  dialog.showModal();
  typesetCourseMath(dialog);
  dialog.querySelector(".dialog-close").focus();
}

function renderLesson() {
  const selected = lessons[activeLessonIndex];
  const subject = subjectById.get(selected.subject);
  document.querySelector("#lesson-list").innerHTML = lessons.map((lesson, index) => {
    return `<button class="lesson-tab" id="lesson-tab-${index}" type="button" role="tab" aria-selected="${index === activeLessonIndex}" aria-controls="lesson-panel" tabindex="${index === activeLessonIndex ? 0 : -1}" data-lesson="${index}">
      <span class="tab-number">0${index + 1}</span><span>${escapeHTML(lesson.term)}</span>
    </button>`;
  }).join("");
  const step = selected.steps[activeStepIndex];
  const lessonEquation = ["analizis", "digitalis", "fizika"].includes(selected.subject)
    ? `\\[${escapeHTML(selected.equation)}\\]`
    : escapeHTML(selected.equation);
  document.querySelector("#lesson-panel").setAttribute("aria-labelledby", `lesson-tab-${activeLessonIndex}`);
  document.querySelector("#lesson-panel").innerHTML = `
    <div class="lesson-meta"><span class="subject-dot" style="--subject-color:${subject.color}"></span>${escapeHTML(subject.name)} <span>·</span> PÉLDA ${String(activeStepIndex + 1).padStart(2, "0")} / ${String(selected.steps.length).padStart(2, "0")}</div>
    <h3>${escapeHTML(selected.title)}</h3>
    <p class="lesson-intro">${escapeHTML(selected.intro)}</p>
    <div class="lesson-step">
      <div class="step-top"><span>${activeStepIndex + 1}</span> LÉPÉS</div>
      <strong>${escapeHTML(step.title)}</strong><p>${escapeHTML(step.text)}</p>
    </div>
    <div class="lesson-equation">${lessonEquation}</div>
    <div class="lesson-controls">
      <div class="lesson-dots" aria-label="${activeStepIndex + 1}. lépés a ${selected.steps.length}-ből">
        ${selected.steps.map((_, index) => `<span class="${index === activeStepIndex ? "active" : ""}"></span>`).join("")}
      </div>
      <div>
        ${activeStepIndex > 0 ? `<button class="lesson-next lesson-prev" type="button">← Előző</button>` : ""}
        <button class="lesson-next" type="button" data-next>${activeStepIndex === selected.steps.length - 1 ? "Következő modul →" : "Következő lépés →"}</button>
      </div>
    </div>`;
  typesetCourseMath(document.querySelector("#lesson-panel"));
}

function startQuiz(subjectId = quizSubject) {
  quizSubject = subjectId;
  quizItems = quizzes.filter((question) => question.subject === quizSubject);
  quizIndex = 0;
  quizScore = 0;
  hasAnswered = false;
  renderQuiz();
}

function renderQuiz() {
  const question = quizItems[quizIndex];
  const progress = quizItems.length ? Math.round((quizIndex / quizItems.length) * 100) : 0;
  document.querySelector("#quiz-progress-bar").style.width = `${progress}%`;
  document.querySelector("#quiz-progress-text").textContent = `${String(Math.min(quizIndex + 1, quizItems.length)).padStart(2, "0")} / ${String(quizItems.length).padStart(2, "0")}`;
  const content = document.querySelector("#quiz-content");
  if (!question) {
    document.querySelector("#quiz-progress-bar").style.width = "100%";
    content.innerHTML = `<div class="quiz-finish"><div class="finish-score">${quizScore} / ${quizItems.length}</div>
      <h3>${quizScore === quizItems.length ? "Hibátlan kör!" : quizScore >= quizItems.length / 2 ? "Jó munka, haladsz!" : "Már tudod, mit érdemes átismételni."}</h3>
      <p>${escapeHTML(subjectById.get(quizSubject).name)} · ${quizItems.length} kérdés megválaszolva</p>
      <button class="quiz-restart" type="button">Új kör indítása ↗</button></div>`;
    return;
  }
  const subject = subjectById.get(question.subject);
  content.innerHTML = `
    <div class="question-label">${escapeHTML(subject.name.toLocaleUpperCase("hu"))} · ${String(quizIndex + 1).padStart(2, "0")}. KÉRDÉS</div>
    <h3>${escapeHTML(question.question)}</h3>
    <div class="answer-list">${question.options.map((option, index) => {
      let state = "";
      if (hasAnswered && index === question.answer) state = " correct";
      else if (hasAnswered && index === selectedAnswer) state = " incorrect";
      return `<button class="answer-option${state}" type="button" data-answer="${index}" ${hasAnswered ? "disabled" : ""}>
        <span class="option-letter">${String.fromCharCode(65 + index)}</span>${escapeHTML(option)}
      </button>`;
    }).join("")}</div>
    ${hasAnswered ? `<div class="answer-feedback ${selectedAnswer === question.answer ? "good" : "bad"}" role="status" tabindex="-1"><strong>${selectedAnswer === question.answer ? "Helyes!" : "Nem egészen."}</strong> ${escapeHTML(question.explanation)}</div>` : ""}
    <div class="quiz-actions"><span class="score-label">Eddigi pontszám: <strong>${quizScore}</strong></span>
      <button class="quiz-next" type="button" data-quiz-next ${hasAnswered ? "" : "disabled"}>${quizIndex === quizItems.length - 1 ? "Eredmény" : "Következő kérdés"} →</button>
    </div>`;
}

let selectedAnswer = -1;

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 1800);
}

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  document.querySelector("#theme-icon").textContent = dark ? "☀" : "☾";
  document.querySelector("#theme-toggle").setAttribute("aria-label", dark ? "Világos téma bekapcsolása" : "Sötét téma bekapcsolása");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#111a29" : "#f5f7fb";
  try { localStorage.setItem("vik-theme", dark ? "dark" : "light"); } catch { /* Storage may be disabled; theme still works for this visit. */ }
}

function init() {
  loadCourseNotes().then((notes) => {
    courseNotes = notes;
    courseNotesByOrder = [...notes].sort((a, b) => orderedNoteNumber(a) - orderedNoteNumber(b));
    activeCourseSubject = notes[0]?.subject ?? "";
    prepareCourseSearchIndex(notes);
    addNoteGlossaryTerms(notes);
    document.querySelector("#term-count").textContent = String(notes.length).padStart(2, "0");
    document.querySelector("#study-subject-count").textContent = String(new Set(notes.map((note) => note.subject)).size).padStart(2, "0");
    renderCourse();
    renderTerms();
  }).catch((error) => {
    console.error("A tananyagok betöltése nem sikerült:", error);
    const courseGrid = document.querySelector("#course-grid");
    courseGrid.innerHTML = "<p class=\"notes-error\">A tananyagok nem érhetők el. Ellenőrizd a coursesData.json fájlt és annak formátumát.</p>";
    courseGrid.hidden = false;
    document.querySelector("#course-empty-state").hidden = true;
  });
  document.querySelector("#term-count").textContent = "—";
  renderFilters();
  renderTerms();
  renderLesson();
  const quizSelect = document.querySelector("#quiz-subject");
  quizSelect.innerHTML = subjects.map((subject) => `<option value="${subject.id}">${escapeHTML(subject.name)}</option>`).join("");
  quizSelect.value = quizSubject;
  startQuiz();
  renderCourse();
  window.addEventListener("load", () => {
    typesetCourseMath(document.querySelector("#lesson-panel"));
    if (dialog.open) typesetCourseMath(dialog);
  }, { once: true });
  try { setTheme(localStorage.getItem("vik-theme") === "dark"); } catch { setTheme(false); }

  searchInput.addEventListener("input", renderTerms);
  const courseSearchInput = document.querySelector("#course-search-input");
  const courseSearchSuggestions = document.querySelector("#course-search-suggestions");
  courseSearchInput.addEventListener("input", renderCourse);
  courseSearchInput.addEventListener("keydown", (event) => {
    const options = [...courseSearchSuggestions.querySelectorAll("[data-search-note]")];
    if (!options.length && event.key !== "Escape") return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      activeSuggestionIndex = activeSuggestionIndex < 0
        ? event.key === "ArrowDown" ? 0 : options.length - 1
        : (activeSuggestionIndex + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
      options.forEach((option, index) => option.setAttribute("aria-selected", String(index === activeSuggestionIndex)));
      courseSearchInput.setAttribute("aria-activedescendant", options[activeSuggestionIndex].id);
    } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      event.preventDefault();
      options[activeSuggestionIndex].click();
    } else if (event.key === "Escape" && !courseSearchSuggestions.hidden) {
      event.preventDefault();
      courseSearchSuggestions.hidden = true;
      courseSearchInput.setAttribute("aria-expanded", "false");
    }
  });
  courseSearchSuggestions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-search-note]");
    if (!option) return;
    const note = courseNotes.find((item) => item.title === option.dataset.searchNote);
    courseSearchSuggestions.hidden = true;
    courseSearchInput.setAttribute("aria-expanded", "false");
    openCourseReader(note, courseSearchInput);
  });
  courseSearchInput.addEventListener("focus", () => {
    if (courseSearchInput.value.trim()) renderCourseSuggestions();
  });
  courseSearchInput.addEventListener("blur", () => {
    window.setTimeout(() => {
      if (!courseSearchSuggestions.contains(document.activeElement)) {
        courseSearchSuggestions.hidden = true;
        courseSearchInput.setAttribute("aria-expanded", "false");
      }
    }, 120);
  });
  document.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".header-search-wrap")) return;
    courseSearchSuggestions.hidden = true;
    courseSearchInput.setAttribute("aria-expanded", "false");
  });
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-subject]");
    if (!button) return;
    activeSubject = button.dataset.subject;
    renderFilters();
    renderTerms();
  });
  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-term]");
    if (card) openTerm(termById.get(card.dataset.term));
  });
  grid.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-term]")) {
      event.preventDefault();
      openTerm(termById.get(event.target.dataset.term));
    }
  });
  document.querySelector("#clear-search").addEventListener("click", () => {
    searchInput.value = "";
    activeSubject = "all";
    renderFilters();
    renderTerms();
    searchInput.focus();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest(".dialog-close")) dialog.close();
    const related = event.target.closest("[data-related]");
    if (related) {
      const relatedTerm = termById.get(related.dataset.related);
      dialog.close();
      setTimeout(() => openTerm(relatedTerm), 0);
    }
  });
  dialog.addEventListener("close", () => {
    if (dialogReturnFocus?.isConnected) dialogReturnFocus.focus();
  });
  document.querySelector("#course-subject-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-course-subject]");
    if (!button) return;
    activeCourseSubject = button.dataset.courseSubject;
    renderCourse();
  });
  document.querySelector("#course-exam-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-course-tag]");
    if (!button) return;
    activeCourseTag = activeCourseTag === button.dataset.courseTag ? "" : button.dataset.courseTag;
    renderCourse();
  });
  document.querySelector("#course-grid").addEventListener("click", (event) => {
    const tag = event.target.closest("[data-note-tag]");
    if (tag) {
      activeCourseTag = courseTagKey(tag.dataset.noteTag);
      renderCourse();
      return;
    }
    const card = event.target.closest(".course-card");
    const opener = event.target.closest("[data-open-course]") ?? card?.querySelector("[data-open-course]");
    if (opener) openCourseReader(courseNotes.find((note) => note.title === opener.dataset.openCourse), opener);
  });
  document.querySelector("#clear-course-filters").addEventListener("click", () => {
    document.querySelector("#course-search-input").value = "";
    activeCourseSubject = courseNotes[0]?.subject ?? "";
    activeCourseTag = "";
    renderCourse();
    document.querySelector("#course-search-input").focus();
  });
  const courseReader = document.querySelector("#course-reader");
  courseReader.addEventListener("click", async (event) => {
    if (event.target === courseReader || event.target.closest(".course-reader-close")) {
      courseReader.close();
      return;
    }
    const copyButton = event.target.closest(".reader-copy-button");
    if (!copyButton) return;
    const code = copyButton.closest("pre")?.querySelector("code");
    const source = code?.textContent;
    if (!source) {
      showToast("A másolandó tartalom nem érhető el.");
      return;
    }
    try {
      await navigator.clipboard.writeText(source);
      showToast("Kód másolva.");
    } catch (error) {
      console.error("A vágólapra másolás nem sikerült:", error);
      showToast("A másolás nem sikerült. Ellenőrizd a böngésző vágólapengedélyét.");
    }
  });
  courseReader.addEventListener("close", () => {
    if (readerReturnFocus?.isConnected) readerReturnFocus.focus();
  });
  document.querySelector("#lesson-list").addEventListener("click", (event) => {
    const tab = event.target.closest("[data-lesson]");
    if (!tab) return;
    activeLessonIndex = Number(tab.dataset.lesson);
    activeStepIndex = 0;
    renderLesson();
    document.querySelector(`#lesson-tab-${activeLessonIndex}`).focus();
  });
  document.querySelector("#lesson-panel").addEventListener("click", (event) => {
    if (event.target.closest(".lesson-prev")) activeStepIndex = Math.max(0, activeStepIndex - 1);
    else if (event.target.closest("[data-next]")) {
      if (activeStepIndex < lessons[activeLessonIndex].steps.length - 1) activeStepIndex++;
      else { activeLessonIndex = (activeLessonIndex + 1) % lessons.length; activeStepIndex = 0; }
    } else return;
    renderLesson();
  });
  document.querySelector("#quiz-subject").addEventListener("change", (event) => {
    selectedAnswer = -1;
    startQuiz(event.target.value);
  });
  document.querySelector("#quiz-content").addEventListener("click", (event) => {
    const answer = event.target.closest("[data-answer]");
    if (answer && !hasAnswered) {
      selectedAnswer = Number(answer.dataset.answer);
      hasAnswered = true;
      if (selectedAnswer === quizItems[quizIndex].answer) quizScore++;
      renderQuiz();
      document.querySelector(".answer-feedback")?.focus();
      return;
    }
    if (event.target.closest("[data-quiz-next]") && hasAnswered) {
      quizIndex++;
      selectedAnswer = -1;
      hasAnswered = false;
      renderQuiz();
    } else if (event.target.closest(".quiz-restart")) {
      selectedAnswer = -1;
      startQuiz();
    }
  });
  document.querySelector("#theme-toggle").addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      document.querySelector("#course-search-input").focus();
      document.querySelector("#tanulasi-utvonalak").scrollIntoView({ behavior: "smooth" });
    }
    if (event.key === "Escape" && dialog.open) dialog.close();
  });
  document.querySelectorAll(".top-nav .nav-link").forEach((link) => link.addEventListener("click", () => {
    document.querySelectorAll(".top-nav .nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  }));
}

init();
