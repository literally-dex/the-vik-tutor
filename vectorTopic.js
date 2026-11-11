export const vectorTerms = [
  {
    id: "skalaris-szorzat",
    subject: "fizika",
    title: "Skaláris szorzat",
    english: "Dot product / scalar product",
    category: "Vektorműveletek",
    summary: "Két vektor irány szerinti együttállását méri; eredménye skalár.",
    definition: "Az a és b vektor skaláris szorzata a hosszuk és a közbezárt szög koszinuszának szorzata. Ortonormált Descartes-bázisban egyenlő a megfelelő koordináták szorzatainak összegével. Két nem nulla vektor pontosan akkor merőleges, ha a skaláris szorzatuk nulla.",
    analogy: "Szánkóhúzáskor csak az elmozdulás irányába eső erőkomponens végez munkát; a skaláris szorzat ezt az irány szerinti hatást méri.",
    formula: "\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\varphi=a_xb_x+a_yb_y+a_zb_z",
    example: "Az elemi munka dW = F · dr, a pillanatnyi teljesítmény pedig P = F · v.",
    related: ["Vektor", "Ortonormált bázis", "Munka és munkatétel"],
    examTip: "A skaláris szorzat eredménye mindig skalár. Két nem nulla vektor pontosan akkor merőleges, ha a skaláris szorzatuk 0.",
    commonError: "Ne tegyél vektorjelet a végeredményre: a skaláris szorzat nem vektor."
  },
  {
    id: "vektorialis-szorzat",
    subject: "fizika",
    title: "Vektoriális szorzat",
    english: "Cross product / vector product",
    category: "Vektorműveletek",
    summary: "A vektorok által kifeszített síkra merőleges vektort ad, jobbkéz-szabály szerinti iránnyal.",
    definition: "Három dimenzióban az a × b vektoriális szorzat merőleges a és b síkjára, nagysága |a||b|sinφ, ami a kifeszített paralelogramma területe. A sorrend számít: a × b = −(b × a). Ortonormált bázisban komponensenként determinánssal fejthető ki.",
    analogy: "Villáskulccsal csavart húzva a forgáshatás tengelye merőleges a kulcs szárára és a kifejtett erőre; irányát a jobbkéz-szabály adja.",
    formula: "\\mathbf{a}\\times\\mathbf{b}=(a_yb_z-a_zb_y)\\mathbf{i}+(a_zb_x-a_xb_z)\\mathbf{j}+(a_xb_y-a_yb_x)\\mathbf{k}",
    example: "A forgatónyomaték M = r × F; a nagysága az erőkar és az erő merőleges komponensének szorzata.",
    related: ["Vektor", "Ortonormált bázis", "Forgatónyomaték és perdület"],
    examTip: "A j komponens kifejtésekor a determináns előjelmintája miatt mínuszjel szerepel.",
    commonError: "A vektoriális szorzat antikommutatív: a × b = −(b × a). A tényezők felcserélése az irányt is megfordítja."
  },
  {
    id: "vegyes-szorzat",
    subject: "fizika",
    title: "Vegyes szorzat",
    english: "Triple scalar product",
    category: "Vektorműveletek",
    summary: "Három vektor előjeles térfogatát adja meg; a végeredmény skalár.",
    definition: "Az (a × b) · c vegyes szorzat a három vektor koordinátáiból képzett 3×3-as determináns. Abszolút értéke a vektorok által kifeszített paralelepipedon térfogata; előjele a térbeli orientációt jelzi. Értéke nulla pontosan akkor, ha a három vektor egy síkba esik.",
    analogy: "Az a × b az alaplap területét és normálisát adja; a c-vel vett skaláris szorzat a normális irányú magassággal egészíti ki a térfogatot.",
    formula: "(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}=\\det\\begin{pmatrix}a_x&a_y&a_z\\\\b_x&b_y&b_z\\\\c_x&c_y&c_z\\end{pmatrix}",
    example: "Három rúd irányvektorából eldönthető, hogy valóban térbeli hasábot feszítenek-e ki: a nulla vegyes szorzat síkbeli elrendezést jelent.",
    related: ["Vektor", "Skaláris szorzat", "Vektoriális szorzat"],
    examTip: "Ha a vegyes szorzat nulla, a három vektor koplanáris. Ciklikus permutáció nem változtatja meg az értéket.",
    commonError: "Két szomszédos tényező felcserélése előjelet vált; ne keverd össze a ciklikus és a tetszőleges permutációt."
  },
  {
    id: "forgatonyomatek-perdulet",
    subject: "fizika",
    title: "Forgatónyomaték és perdület",
    english: "Torque and angular momentum",
    category: "Forgómozgás",
    summary: "A forgatónyomaték az erő forgatóhatását, a perdület a forgási mozgásállapotot jellemzi.",
    definition: "A választott vonatkoztatási pontból a támadáspontba mutató r helyvektor és az F erő vektoriális szorzata az M forgatónyomaték. A perdület L = r × p, időderiváltja pedig a forgatónyomaték: M = dL/dt. Mindkét vektor iránya a jobbkéz-szabályból adódik.",
    analogy: "Egy ajtót a forgástengelytől távolabb, merőlegesen nyomva könnyebb elfordítani: a forgatóhatás egyszerre függ az erőkartól és az erő irányától.",
    formula: "\\mathbf{M}=\\mathbf{r}\\times\\mathbf{F},\\quad\\mathbf{L}=\\mathbf{r}\\times\\mathbf{p},\\quad\\mathbf{M}=\\frac{d\\mathbf{L}}{dt}",
    example: "A r = (4,5,0) m helyvektoron ható F = (2,3,0) N erő forgatónyomatéka M = (0,0,2) N·m.",
    related: ["Vektor", "Vektoriális szorzat", "Newton II. törvénye"],
    examTip: "Az r helyvektort mindig a vonatkoztatási pontból — például az origóból vagy forgástengelyből — a támadáspont felé vedd.",
    commonError: "Az r × F sorrend felcserélése F × r-re hibás, ellentétes irányú forgatónyomatékot ad."
  }
];

export const vectorDerivations = [
  {
    title: "A skaláris szorzat koordinátás alakja",
    level: "Ortonormált bázis és disztributivitás",
    steps: [
      { equation: "\\mathbf{a}=a_x\\mathbf{i}+a_y\\mathbf{j}+a_z\\mathbf{k},\\quad \\mathbf{b}=b_x\\mathbf{i}+b_y\\mathbf{j}+b_z\\mathbf{k}", reason: "Bontsuk fel mindkét vektort a derékszögű, egységnyi hosszúságú Descartes-bázis szerint." },
      { equation: "\\mathbf{a}\\cdot\\mathbf{b}=\\sum_{p\\in\\{x,y,z\\}}\\sum_{q\\in\\{x,y,z\\}}a_p b_q(\\mathbf{e}_p\\cdot\\mathbf{e}_q)", reason: "A skalárszorzat bilineáris, ezért a felbontásból kilenc tag keletkezik; a skalárkomponensek kiemelhetők." },
      { equation: "\\mathbf{e}_p\\cdot\\mathbf{e}_q=\\delta_{pq}", reason: "Ortonormáltság miatt az azonos bázisvektorok szorzata 1, a különbözőké 0. Minden vegyes tag kiesik." },
      { equation: "\\boxed{\\mathbf{a}\\cdot\\mathbf{b}=a_xb_x+a_yb_y+a_zb_z}", reason: "A három megmaradó tag azonos koordináták szorzata. Az eredmény skalár, nem vektor." }
    ]
  },
  {
    title: "A forgatónyomaték komponensei",
    level: "Kifejtés az egységvektorok szorzási szabályaival",
    steps: [
      { equation: "\\mathbf{r}=x\\mathbf{i}+y\\mathbf{j}+z\\mathbf{k},\\quad \\mathbf{F}=F_x\\mathbf{i}+F_y\\mathbf{j}+F_z\\mathbf{k}", reason: "A helyvektort a vonatkoztatási pontból a támadáspontba, az erőt pedig a komponenseivel írjuk fel." },
      { equation: "\\mathbf{M}=\\mathbf{r}\\times\\mathbf{F}", reason: "A forgatónyomaték definíciója a helyvektor és az erő vektoriális szorzata." },
      { equation: "\\mathbf{M}=(yF_z-zF_y)\\mathbf{i}+(zF_x-xF_z)\\mathbf{j}+(xF_y-yF_x)\\mathbf{k}", reason: "Disztributivitással kifejtünk; az azonos bázisvektorok keresztszorzata nulla, az irányváltás pedig előjelet vált." },
      { equation: "\\mathbf{M}=\\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\x&y&z\\\\F_x&F_y&F_z\\end{vmatrix}", reason: "A komponensképlet a determináns első sora szerinti kifejtés: a középső, j komponensnél kötelező a mínusz előjel." }
    ]
  },
  {
    title: "A vegyes szorzat mint előjeles térfogat",
    level: "Geometriai értelmezés",
    steps: [
      { equation: "\\mathbf{n}=\\mathbf{a}\\times\\mathbf{b}", reason: "A n vektor merőleges az a,b alapsíkra, nagysága pedig a kifeszített paralelogramma alapterülete." },
      { equation: "(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}=|\\mathbf{n}|\\,|\\mathbf{c}|\\cos\\theta", reason: "A skalárszorzat a c vektor n irányú vetületét szorozza az alapterülettel." },
      { equation: "V_{\\mathrm{előjeles}}=T_{\\mathrm{alap}}\\,h=(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}", reason: "A normális irányú vetület a hasáb előjeles magassága; az abszolút érték adja a geometriai térfogatot." },
      { equation: "V=0\\iff \\mathbf{a},\\mathbf{b},\\mathbf{c}\\text{ koplanáris}", reason: "Ha a vegyes szorzat nulla, a c-nek nincs az a,b síkra merőleges komponense, tehát a három vektor egy síkba esik." }
    ]
  },
  {
    title: "A BAC–CAB azonosság",
    level: "Kétszeres vektoriális szorzat komponensenként",
    steps: [
      { equation: "\\mathbf{u}=\\mathbf{a}\\times\\mathbf{b}", reason: "Vezessünk be segédvektort, hogy a külső szorzat komponenseit közvetlenül felírhassuk." },
      { equation: "[\\mathbf{u}\\times\\mathbf{c}]_x=(a_zb_x-a_xb_z)c_z-(a_xb_y-a_yb_x)c_y", reason: "A keresztszorzat első komponense u_y c_z−u_z c_y; behelyettesítjük u komponenseit." },
      { equation: "[\\mathbf{u}\\times\\mathbf{c}]_x=b_x(\\mathbf{a}\\cdot\\mathbf{c})-a_x(\\mathbf{b}\\cdot\\mathbf{c})", reason: "Átrendezve a c_x-szel kiegészített tagok kölcsönösen kiesnek; a megmaradó tagok skalárszorzatokká csoportosíthatók. Ugyanez ciklikusan igaz y és z komponensre." },
      { equation: "\\boxed{(\\mathbf{a}\\times\\mathbf{b})\\times\\mathbf{c}=(\\mathbf{a}\\cdot\\mathbf{c})\\mathbf{b}-(\\mathbf{b}\\cdot\\mathbf{c})\\mathbf{a}}", reason: "A komponensek megegyeznek a jobb oldallal, így az azonosság vektoregyenletként teljesül. Az eredmény az a,b síkjában fekszik." }
    ]
  }
];

export const vectorExamples = [
  {
    title: "Vektorműveletek és térfogatszámítás",
    problem: "Legyen a=(2,5,−1), b=(0,2,1), c=(−3,1,4). Számítsd ki a·b-t, az a×b vektort és a paralelogramma területét, végül a vegyes szorzatot és a hasáb térfogatát.",
    solution: [
      { equation: "\\mathbf{a}\\cdot\\mathbf{b}=2\\cdot0+5\\cdot2+(-1)\\cdot1=9", reason: "A koordinátás skalárszorzatban összeszorozzuk az azonos koordinátákat, majd összeadjuk." },
      { equation: "\\mathbf{a}\\times\\mathbf{b}=(5\\cdot1-(-1)\\cdot2,\\;(-1)\\cdot0-2\\cdot1,\\;2\\cdot2-5\\cdot0)=(7,-2,4)", reason: "Kiszámoljuk a három determinánskomponenst. A j komponens képlete a_zb_x−a_xb_z." },
      { equation: "T=|\\mathbf{a}\\times\\mathbf{b}|=\\sqrt{7^2+(-2)^2+4^2}=\\sqrt{69}\\approx8{,}307", reason: "A keresztszorzat normája a kifeszített paralelogramma területe." },
      { equation: "(\\mathbf{a}\\times\\mathbf{b})\\cdot\\mathbf{c}=7(-3)+(-2)1+4(4)=-7,\\quad V=|-7|=7", reason: "A vegyes szorzat előjeles térfogat; a geometriai térfogat nemnegatív, ezért abszolút értéket veszünk." }
    ],
    tip: "A komponenseket ellenőrizd vissza a determináns kifejtésével, a térfogatnál pedig a végén vedd az abszolút értéket.",
    pitfall: "Az előjeles vegyes szorzat −7, nem +7; csak a fizikai térfogat lesz 7. A keresztszorzat középső komponensének előjelét se hagyd el."
  },
  {
    title: "Forgatónyomaték síkbeli erővel",
    problem: "Az origóból a támadáspontba mutató helyvektor r=(4,5,0) m, az erő F=(2,3,0) N. Határozd meg az origóra vett forgatónyomatékot, nagyságát és irányát.",
    solution: [
      { equation: "\\mathbf{M}=\\mathbf{r}\\times\\mathbf{F}=\\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\4&5&0\\\\2&3&0\\end{vmatrix}", reason: "A forgatónyomaték az origóból a támadáspontba mutató helyvektor és az erő keresztszorzata." },
      { equation: "\\mathbf{M}=(0,0,4\\cdot3-5\\cdot2)=(0,0,2)\\;\\mathrm{N\\cdot m}", reason: "x és y komponensek nullák, mert mindkét vektor az xy-síkban van; a z komponens 12−10=2." },
      { equation: "|\\mathbf{M}|=2\\;\\mathrm{N\\cdot m},\\quad \\mathbf{M}\\parallel +\\mathbf{k}", reason: "A nagyság a z komponens abszolút értéke; a pozitív z irány a jobbkéz-szabály szerinti, a síkból kifelé mutató irány." }
    ],
    tip: "A forgatónyomatékot mindig megadott pontra számítsd, és az erőkart a pontból a támadáspont felé vedd.",
    pitfall: "Ne cseréld fel a sorrendet: F×r = −(r×F), tehát a forgásirány megfordul."
  }
];

export const vectorExamNotes = {
  tips: [
    "Determináns kifejtésekor az i,j,k előjelminta +,−,+; a j komponens mindig külön figyelmet kér.",
    "A vegyes szorzat nulla pontosan koplanáris vektoroknál. Ciklikus permutáció változatlan, két tényező felcserélése előjelet vált.",
    "Forgatónyomatéknál r a választott vonatkoztatási pontból induljon, és az erő támadáspontjába mutasson."
  ],
  pitfalls: [
    "Skaláris szorzat eredményét ne jelöld vektorként, és ne adj össze skalárt vektorral.",
    "A vektoriális szorzat nem kommutatív: a tényezők sorrendjének felcserélése előjelet vált."
  ]
};
