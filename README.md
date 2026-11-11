# BME VIK: Túlélési Kisokos Villamosmérnököknek

Magyar nyelvű, reszponzív tanulóportál az első féléves hallgatóknak. A tananyagok tantárgyi szűrőkkel és kártyarácsban jelennek meg a `src/data/coursesData.json` fájlból. A fejléc keresője a jegyzet címében, címkéiben és teljes szövegében keres, gépelés közben legfeljebb hét jegyzettalálatot ajánl fel rövid szövegrészlettel; a találat kiválasztása megnyitja a részletes olvasót. A `Cmd+K` / `Ctrl+K` billentyűparancs közvetlenül a keresőre fókuszál.

A részletes jegyzetolvasó a YAML frontmatter eltávolítása után Markdownként jeleníti meg a `fullContent` mezőt, KaTeX-szel rendereli a képleteket, és a `##` címsorokból tartalomjegyzéket készít. A kódblokkok tartalma másolható. A kijelölt függvények mellett célzott grafikonok jelennek meg. A fogalomtár a jegyzetek definíciós alcímeiből készített rövid kivonatokkal egészül ki; további fogalmak a `dictionaryData.js` fájlban találhatók.

A ZH- és vizsgafeladatsorok adatait a `src/data/examsData.json` tárolja. Minden feladathoz külön `prompt` és `solution` Markdown-mező tartozik, így az olvasó a megoldásokat összecsukható spoilerben jelenítheti meg. Új tantárgyak, ZH-típusok és vizsgák ugyanebbe az adatstruktúrába vehetők fel.

A jegyzetek Markdown-rendereléséhez Marked és DOMPurify, a képletekhez KaTeX, a fogalomtár egyes képleteihez MathJax, a C példakódhoz pedig Prism.js töltődik be CDN-ről. Ha a tananyagok megjelenítéséhez szükséges könyvtárak nem érhetők el, az oldal erre egyértelmű hibajelzést ad.

## Indítás

Ezen a linken keresztül eléred a weboldalt, sok sikert és jó tanulást!

[Túlélési Kisokos](literally-dex.github.io/the-vik-tutor/)

