import { vectorDerivations, vectorExamples, vectorExamNotes } from "./vectorTopic.js";
import { physicsChapters } from "./physicsTopics.js";

export const courseModules = [
  {
    subject: "analizis",
    eyebrow: "01 · ANALÍZIS 1",
    title: "A változás nyelvén.",
    intro: "Határértékektől a deriváláson át a függvények közelítéséig — az analízis megmutatja, hogyan írjuk le a folyamatos változást.",
    overview: {
      why: "Az analízis a mérnöki modellezés egyik alapeszköze: a derivált pillanatnyi változást, az integrál felhalmozódást ír le. Ezek nélkül nehéz jeleket, mozgást, áramot vagy szabályozórendszereket elemezni.",
      analogy: "A derivált olyan, mint az autó sebességmérője: nem az egész út átlagát, hanem azt mutatja, milyen gyorsan változik a helyzet éppen most.",
      goal: "A fejezet végére határértékeket értelmezel, definícióból deriválsz, és indokolt közelítést készítesz."
    },
    glossary: ["sorozat-hatarerteke", "folytonossag", "differencialszamitas", "taylor-polinom", "komplex-szam"],
    derivations: [{
      title: "Az x² deriváltja a definícióból",
      level: "Alapoktól a precíz levezetésig",
      steps: [
        { equation: "\\displaystyle f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}", reason: "A derivált definíciója a differenciahányados határértéke. Előbb rögzítjük x-et, majd a h növekményt nullához közelítjük." },
        { equation: "\\displaystyle =\\lim_{h\\to 0}\\frac{(x+h)^2-x^2}{h}", reason: "Behelyettesítjük f(t)=t²-et. A zárójelben az új függvényérték f(x+h), majd kivonjuk a régi f(x)-et." },
        { equation: "\\displaystyle =\\lim_{h\\to 0}\\frac{x^2+2xh+h^2-x^2}{h}", reason: "Alkalmazzuk a négyzetösszeg azonosságot (x+h)²=x²+2xh+h²." },
        { equation: "\\displaystyle =\\lim_{h\\to 0}(2x+h)=2x", reason: "Az x² tagok kiesnek, a számlálót h-val egyszerűsítjük. A hányados h≠0 mellett értelmezett; a határértékben h→0, ezért 2x marad." }
      ]
    }],
    examples: [{
      title: "Érintő egy adott pontban",
      problem: "Határozd meg az f(x)=x² függvény érintőjének egyenletét az x₀=2 pontban.",
      solution: [
        { equation: "f'(x)=2x", reason: "A deriválási szabályból a függvény meredekségfüggvénye 2x." },
        { equation: "m=f'(2)=4,  f(2)=4", reason: "Az érintő meredeksége a derivált x₀-beli értéke; a görbe pontja (2,4)." },
        { equation: "y-4=4(x-2)  →  y=4x-4", reason: "A pont-meredekség alakba behelyettesítjük a pontot és meredekséget." }
      ],
      tip: "ZH-n külön írd fel az érintési pontot és a meredekséget. A derivált értéke nem az érintő tengelymetszete.",
      pitfall: "A f'(x₀) helyett f(x₀)-t használni meredekségként — ezek más mennyiségek."
    }],
    widget: { type: "derivative", title: "Érintő és pillanatnyi meredekség", intro: "Állítsd az x helyét, és figyeld meg az f(x)=x² grafikon érintőjének meredekségét." }
  },
  {
    subject: "digitalis",
    eyebrow: "02 · DIGITÁLIS TECHNIKA 1",
    title: "Logikából áramkör.",
    intro: "Boole-algebra, egyszerűsítés, majd a memóriával rendelkező hálózatok — a digitális rendszerek viselkedése logikai állapotokra épül.",
    overview: {
      why: "A digitális technika a processzorok, vezérlők és kommunikációs eszközök logikai alapja. A függvény egyszerűsítése kevesebb kaput, alacsonyabb késleltetést és kisebb fogyasztást eredményezhet.",
      analogy: "A Karnaugh-tábla olyan, mint egy kapcsolási térkép: a szomszédos azonos kimenetek összevonásával megtalálható a legegyszerűbb megvalósítás.",
      goal: "Megkülönbözteted a kombinációs és sorrendi hálózatokat, egyszerűsítesz logikai függvényt és értelmezed a tárolt állapotot."
    },
    glossary: ["boole-algebra", "karnaugh-tabla", "kombinacios-halozat", "sorrendi-halozat", "flip-flop"],
    derivations: [{
      title: "Karnaugh-táblából az egyszerűsített függvény",
      level: "Kétváltozós példa",
      steps: [
        { equation: "F(A,B)=\\Sigma m(1,2,3)", reason: "A minterm indexek binárisan A B sorrendben: m₁=01, m₂=10, m₃=11. Ezekbe a cellákba 1 kerül." },
        { equation: "m_1,m_3 \\Rightarrow B", reason: "A 01 és 11 szomszédos; csak A változik, B végig 1, így az A változó kiesik." },
        { equation: "m_2,m_3 \\Rightarrow A", reason: "A 10 és 11 szintén szomszédos; B változik, A végig 1." },
        { equation: "F=A+B", reason: "A két csoport lefedi az összes 1-est. Az összevonásban megmaradt literálok VAGY kapcsolatba kerülnek." }
      ]
    }],
    examples: [{
      title: "Engedélyező logika",
      problem: "Egy eszköz akkor aktív, ha A vagy B engedélyezés igaz. Add meg a függvényt, és becsüld meg a kimenetet A=0, B=1 esetén.",
      solution: [
        { equation: "F(A,B)=A+B", reason: "A „vagy” logikai művelet a Boole-algebrában összeadásként jelölhető." },
        { equation: "F(0,1)=0+1=1", reason: "A VAGY művelet kimenete 1, ha legalább az egyik bemenet 1." }
      ],
      tip: "A Karnaugh-táblán a szélső cellák is szomszédosak; a csoport mérete mindig 2 hatványa.",
      pitfall: "Ne csoportosíts átlósan! Csak egy változóban különböző, él mentén szomszédos cellák vonhatók össze."
    }],
    widget: { type: "kmap", title: "Kétváltozós Karnaugh-tábla", intro: "Kattints egy cellára az 1-es be- vagy kikapcsolásához. Az egyszerűsített függvény automatikusan frissül." }
  },
  {
    subject: "fizika",
    eyebrow: "03 · FIZIKA 1",
    title: "Vektorműveletek a fizikában.",
    intro: "Skaláris, vektoriális és vegyes szorzat — a matematikai műveletek a munkától a forgatónyomatékig és a térfogatig adnak fizikai jelentést.",
    overview: {
      why: "A vektorműveletek a fizikában egyszerre őrzik meg a mennyiségek nagyságát és irányát. A skaláris szorzat munkát és vetületet, a vektoriális szorzat forgatóhatást, a vegyes szorzat térfogatot és koplanaritást ír le.",
      analogy: "Szánkóhúzásnál csak az erő haladásirányú része végez munkát; villáskulcsnál a merőleges erő forgat hatékonyan. A két helyzetet a skaláris és vektoriális szorzat különíti el.",
      goal: "Ortonormált bázisban levezeted a komponensképleteket, kiszámítod a munkát, a forgatónyomatékot és az előjeles térfogatot, majd ellenőrzöd a mértékegységet és az irányt."
    },
    glossary: ["vektor", "ortonormalis-bazis", "skalaris-szorzat", "vektorialis-szorzat", "vegyes-szorzat", "forgatonyomatek-perdulet", "kinematika", "munka"],
    derivations: vectorDerivations,
    examples: vectorExamples,
    examNotes: vectorExamNotes,
    widget: { type: "vector", title: "Vektoriális szorzat iránya", intro: "Változtasd a két síkbeli vektor komponenseit. A keresztszorzat előjeles z-komponense mutatja az irányt." }
  },
  {
    subject: "szamitastudomany",
    eyebrow: "04 · A SZÁMÍTÁSTUDOMÁNY ALAPJAI",
    title: "Kapcsolatokból szerkezet.",
    intro: "Gráfok, fák, relációk és kongruenciák — véges, diszkrét rendszerek modelljei és az azokon futó algoritmusok.",
    overview: {
      why: "A diszkrét matematika az algoritmusok és hálózati rendszerek nyelve. Útvonaltervezés, függőségek, adatbázisok és kommunikációs hálózatok mind gráfokkal és relációkkal modellezhetők.",
      analogy: "A gráf olyan, mint egy várostérkép: helyek a csúcsok, utak az élek. A feszítőfa pedig az a legkisebb úthálózat, amellyel minden hely elérhető.",
      goal: "Felismered a gráf- és relációs modelleket, megérted a feszítőfát, és lépésenként végrehajtod a Kruskal-algoritmust."
    },
    glossary: ["grafelmelet", "fa", "kruskal-algoritmus", "kongruencia", "relacio"],
    derivations: [{
      title: "Miért n−1 élű egy fa?",
      level: "Indukciós gondolatmenet",
      steps: [
        { equation: "n=1:\\quad |E|=0=n-1", reason: "Egyetlen csúcsú fa összefüggő és körmentes, élre nincs szüksége. Ez az indukciós alap." },
        { equation: "\\text{Minden véges fában van levél}", reason: "Induljunk el egy leghosszabb egyszerű úton. A végpontnak nem lehet új szomszédja, mert az út meghosszabbodna vagy kör keletkezne." },
        { equation: "T' = T - \\text{levél},\\quad n'=n-1", reason: "A levél és egyetlen éle eltávolításával továbbra is fa marad: a többi csúcs összefüggő, körmentes." },
        { equation: "|E(T')|=n'-1=n-2\\Rightarrow |E(T)|=n-1", reason: "Az indukciós feltevés szerint a kisebb fában n−2 él van; a levél élét visszatéve n−1-et kapunk." }
      ]
    }],
    examples: [{
      title: "Minimális kábelhálózat Kruskallal",
      problem: "A súlyozott élek: AB=1, BC=2, AC=3, CD=4, BD=5. Válaszd ki a minimális feszítőfát.",
      solution: [
        { equation: "AB(1),\\;BC(2)", reason: "Növekvő súly szerint haladunk; mindkét él két külön komponenst köt össze, ezért felvesszük." },
        { equation: "AC(3)\\;\\text{kimarad}", reason: "A és C ekkor már az A–B–C úton összekapcsolt; AC felvétele kört zárna." },
        { equation: "CD(4)\\;\\text{felvesszük}", reason: "D új komponens, ezért az él összekapcsolja a hálózatot. 4 csúcshoz 3 él kell, így kész a fa." },
        { equation: "w(T)=1+2+4=7", reason: "A kiválasztott élek összsúlya 7; a feszítőfa összefüggő és körmentes." }
      ],
      tip: "Állj meg n−1 kiválasztott él után. Az éleket rendezni kell, nem a csúcsokat.",
      pitfall: "Az algoritmus nem mindig egyszerűen a legkisebb n−1 élt veszi: előbb ellenőrizd, hogy az új él nem zár-e kört."
    }],
    widget: { type: "kruskal", title: "Kruskal-algoritmus futtató", intro: "Futtasd végig az élek növekvő súly szerinti kiválasztását. Figyeld meg, melyik él zárna kört." }
  },
  {
    subject: "programozas",
    eyebrow: "05 · PROGRAMOZÁS 1",
    title: "Gondolkodás a memória szintjén.",
    intro: "A C nyelv alapjai, tömbök és pointerek — megtanulod, hogyan jelenik meg a program adatmodellje a memóriában.",
    overview: {
      why: "A C segít megérteni, hogyan tárolódnak az adatok, hogyan működnek a pointerek és mi történik futás közben. Ez az alap alacsony szintű rendszerekhez, beágyazott fejlesztéshez és hatékony algoritmusokhoz.",
      analogy: "A pointer olyan, mint egy szekrényhez vezető címke: maga a címke nem a tárgy, hanem megmutatja, hol találod. Ha a címkét elveszíted, a tárgyhoz sem jutsz el.",
      goal: "Olvasol egyszerű C-kódot, megkülönbözteted az értéket a címtől, és dinamikusan foglalt memóriát biztonságosan kezeled."
    },
    glossary: ["c-alapok", "pointer", "dinamikus-memoria", "tomb-adatszerkezet"],
    derivations: [{
      title: "Változó címének átadása pointerrel",
      level: "C-kód és memóriamodell",
      steps: [
        { equation: "\\texttt{int n = 7;}", reason: "Létrehozunk egy egész típusú változót. Tegyük fel, hogy a példában az értéke a 0x1000 című memóriacellába kerül." },
        { equation: "\\texttt{int *p = \\&n;}", reason: "Az & operátor n címét adja. A p pointer ezt a címet tárolja; p értéke cím, nem 7." },
        { equation: "\\texttt{*p = 9;}", reason: "A * operátor dereferál: a p által megjelölt cellát érjük el, ezért n értéke 9-re változik." },
        { equation: "\\texttt{printf(\\\"%d\\\", n);\\; // 9}", reason: "A változót közvetlenül olvasva is az új értéket kapjuk, mert a pointeren át az eredeti objektumot módosítottuk." }
      ]
    }],
    examples: [{
      title: "Két érték cseréje függvénnyel",
      problem: "Miért nem cseréli fel az értékeket a void swap(int a, int b) függvény, és hogyan javítsuk?",
      solution: [
        { equation: "\\texttt{swap(a,b)} \\text{ másolatokat kap}", reason: "C-ben az argumentumátadás érték szerint történik; a függvény lokális paraméterei az eredeti változók másolatai." },
        { equation: "\\texttt{void swap(int *a, int *b)}", reason: "A függvény deklarációja pointereket vár, így címeket adhatunk át." },
        { equation: "\\texttt{int tmp=*a; *a=*b; *b=tmp;}", reason: "Dereferálással a hívó változóit módosítjuk. A tmp ideiglenes változó megőrzi az első értéket." }
      ],
      tip: "Ellenőrizd a pointert dereferálás előtt; dinamikus foglalásnál a malloc visszatérési értéke lehet NULL.",
      pitfall: "Ne dereferálj inicializálatlan vagy NULL pointert, és ne használd a pointert free után."
    }],
    codeSample: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 3, y = 8;
    swap(&x, &y);
    printf("%d %d\\\\n", x, y);
    return 0;
}`,
    widget: { type: "pointer", title: "Pointer és memóriacella", intro: "Írd át az értéket, majd állítsd be pointeren keresztül. Figyeld meg: a cím változatlan, a mutatott érték módosul." }
  }
];

const physicsCourse = courseModules.find((course) => course.subject === "fizika");
const vectorChapter = {
  id: "vektormuveletek",
  title: "Vektorműveletek",
  eyebrow: physicsCourse.eyebrow,
  intro: physicsCourse.intro,
  overview: physicsCourse.overview,
  glossary: physicsCourse.glossary,
  derivations: physicsCourse.derivations,
  examples: physicsCourse.examples,
  examNotes: physicsCourse.examNotes,
  widget: physicsCourse.widget,
};
physicsCourse.chapters = [vectorChapter, ...physicsChapters];
