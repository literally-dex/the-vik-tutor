# BME VIK: Túlélési Kisokos Villamosmérnököknek

Magyar nyelvű, reszponzív tanulóportál az első féléves hallgatóknak. A tananyagok tantárgyi szűrőkkel és kártyarácsban jelennek meg a `src/data/coursesData.json` fájlból. A fejléc keresője a jegyzet címében, címkéiben és teljes szövegében keres, gépelés közben legfeljebb hét jegyzettalálatot ajánl fel rövid szövegrészlettel; a találat kiválasztása megnyitja a részletes olvasót. A `Cmd+K` / `Ctrl+K` billentyűparancs közvetlenül a keresőre fókuszál. A ZH1/ZH2 gyorsszűrők az adatbázisban található címkék alapján működnek.

A részletes jegyzetolvasó a YAML frontmatter eltávolítása után Markdownként jeleníti meg a `fullContent` mezőt, KaTeX-szel rendereli a képleteket, és a `##` címsorokból tartalomjegyzéket készít. A kódblokkok tartalma másolható. A kijelölt függvények mellett célzott grafikonok jelennek meg. A fogalomtár a jegyzetek definíciós alcímeiből készített rövid kivonatokkal egészül ki; további fogalmak a `dictionaryData.js` fájlban találhatók.

A jegyzetek Markdown-rendereléséhez Marked és DOMPurify, a képletekhez KaTeX, a fogalomtár egyes képleteihez MathJax, a C példakódhoz pedig Prism.js töltődik be CDN-ről. Ha a tananyagok megjelenítéséhez szükséges könyvtárak nem érhetők el, az oldal erre egyértelmű hibajelzést ad.

## Indítás

A JavaScript-modulok miatt helyi HTTP-szerverről nyisd meg az alkalmazást (ne közvetlenül `file://` címről):

```sh
python3 -m http.server 8000
```

Ezután nyisd meg a `http://localhost:8000` címet. A felület statikus, nincs szükség csomagtelepítésre vagy backend szolgáltatásra.

## GitHub Pages

A `main` ágra történő push automatikusan telepíti a weboldalt GitHub Pages-re a `.github/workflows/pages.yml` munkafolyamat segítségével. A repó `Settings → Pages` oldalán a build source legyen **GitHub Actions**. Az első sikeres telepítés után az oldal a `https://<felhasználónév>.github.io/<repository>/` címen érhető el.
