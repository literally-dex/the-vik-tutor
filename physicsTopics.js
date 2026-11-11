const englishTerms = {
  "pillanatnyi-sebesseg": "Instantaneous velocity",
  "tangencialis-centripetalis-gyorsulas": "Tangential and centripetal acceleration",
  "ferde-hajitas": "Projectile motion",
  "kor-es-gordules-kinematika": "Circular motion and rolling kinematics",
  "newton-harom-torveny": "Newton's laws of motion",
  "surlodasi-erok": "Static and kinetic friction",
  "fuggoleges-kor-dinamika": "Vertical circular motion dynamics",
  "impulzus-erolokes": "Momentum and impulse",
  "tomegkozepponti-tetel": "Center-of-mass theorem",
  "utkozes": "Elastic and inelastic collision",
  "rocket-egyenlet": "Tsiolkovsky rocket equation",
  "konzervativ-eroter": "Conservative force field and potential",
  "mechanikai-energia": "Conservation of mechanical energy",
  "munkateljesitmeny": "Work and power",
  "tehetetlensegi-nyomatek": "Moment of inertia",
  "steiner-tetel": "Parallel-axis theorem",
  "forgasi-alapegyenlet": "Rotational equation of motion",
  "tiszta-gordules-energia": "Rolling kinetic energy",
  "transzlacios-tehetetlensegi-ero": "Translational fictitious force",
  "centrifugalis-ero": "Centrifugal force",
  "coriolis-ero": "Coriolis force",
  "euler-ero": "Euler force",
};

const term = (id, title, category, summary, definition, analogy, formula, example, related, examTip, commonError) => ({
  id,
  subject: "fizika",
  title,
  english: englishTerms[id],
  category,
  summary,
  definition,
  analogy,
  formula,
  example,
  related,
  examTip,
  commonError,
});

export const physicsTerms = [
  term(
    "pillanatnyi-sebesseg",
    "Pillanatnyi sebességvektor",
    "Kinematika",
    "A helyvektor idő szerinti deriváltja; iránya a pálya érintőjébe mutat.",
    "A v(t)=d r/dt sebességvektor egyszerre adja meg a mozgás pillanatnyi irányát és gyorsaságát. Nagysága v=ds/dt, iránya a pályagörbe érintője.",
    "A megcsúszó autó a kanyar érintője mentén halad tovább: a pillanatnyi sebesség iránya nem a kanyar közepe, hanem a pálya érintője.",
    "\\mathbf{v}=\\frac{d\\mathbf{r}}{dt}=\\dot{x}\\mathbf{i}+\\dot{y}\\mathbf{j}+\\dot{z}\\mathbf{k}=v\\mathbf{e}_t",
    "A helyvektor komponenseinek deriválásával a laborban mért három sebességkomponens külön-külön meghatározható.",
    ["Kinematika", "Tangenciális és centripetális gyorsulás"],
    "Válaszd külön az átlagsebességet, az átlagos sebességvektort és a pillanatnyi sebességvektort.",
    "Az út és az elmozdulás felcserélése: egy zárt séta útja pozitív lehet akkor is, ha az elmozdulás nulla."
  ),
  term(
    "tangencialis-centripetalis-gyorsulas",
    "Tangenciális és centripetális gyorsulás",
    "Kinematika",
    "A tangenciális komponens a sebesség nagyságát, a normális komponens az irányát változtatja.",
    "Görbe pályán az eredő gyorsulás felbontható az érintő irányú a_t=dv/dt és a görbületi középpont felé mutató a_n=v²/R komponensre. A két komponens merőleges.",
    "Kanyarban gázt adva a gyorsulás növeli a sebesség nagyságát, miközben a kanyarodás külön, a középpont felé mutató gyorsulást igényel.",
    "\\mathbf{a}=\\dot{v}\\mathbf{e}_t+\\frac{v^2}{R}\\mathbf{e}_n,\\qquad a=\\sqrt{a_t^2+a_n^2}",
    "R=300 m sugarú kanyarban, v=15 m/s sebességnél a normális gyorsulás 0,75 m/s².",
    ["Kinematika", "Newton II. törvénye"],
    "Körmozgásnál a gyorsulás irányváltozás miatt akkor sem nulla, ha a sebesség nagysága állandó.",
    "Az a_t=Rβ tangenciális gyorsulást összetéveszteni az eredő gyorsulással, és kihagyni a v²/R tagot."
  ),
  term(
    "ferde-hajitas",
    "Ferde hajítás",
    "Kinematika",
    "A gravitációs térben végzett hajítás vízszintes és függőleges mozgás szuperpozíciója.",
    "Közegellenállás nélkül a vízszintes sebesség állandó, míg a függőleges gyorsulás −g. Az idő kiküszöbölésével parabolapálya adódik.",
    "A szökőkút vízsugara azért rajzol parabolát, mert vízszintesen egyenletesen halad, függőlegesen pedig a gravitáció gyorsítja.",
    "x=v_0\\cos\\alpha\\,t,\\quad y=v_0\\sin\\alpha\\,t-\\frac12gt^2,\\quad y(x)=x\\tan\\alpha-\\frac{gx^2}{2v_0^2\\cos^2\\alpha}",
    "Toronyból indított labda becsapódási idejét a függőleges másodfokú egyenlet pozitív gyökéből, a vízszintes távolságot x=v₀cos(α)t-ből számítjuk.",
    ["Pillanatnyi sebességvektor", "Kinematika"],
    "A sebességet bontsd komponensekre; a becsapódáskor a függőleges sebesség általában nem nulla.",
    "Ferde hajításnál a vízszintes sebességkomponenst is g-vel változtatni, noha a közegellenállás elhanyagolt."
  ),
  term(
    "kor-es-gordules-kinematika",
    "Körmozgás és tiszta gördülés",
    "Kinematika",
    "A szög- és kerületi mennyiségeket a sugár kapcsolja össze.",
    "Körmozgásban s=Rφ, v=Rω és a_t=Rβ. Csúszásmentes gördüléskor a test tömegközéppontjának sebessége v_TKP=Rω, az érintkezési pont pillanatnyi sebessége pedig nulla a talajhoz képest.",
    "A gördülő kerék teteje gyorsabban, a talajjal érintkező pontja pedig pillanatnyilag lassabban mozog a középpontnál.",
    "s=R\\varphi,\\quad v=R\\omega,\\quad a_t=R\\beta,\\quad a_n=\\omega^2R",
    "Autókeréknél a tiszta gördülés kényszere alapján a kerék szögsebessége ω=v/R.",
    ["Kinematika", "Tisztán gördülő mozgás energiája"],
    "A tiszta gördülés feltételét csak csúszásmentes érintkezésnél használd.",
    "A gördülő test teljes gyorsulását az a_t=Rβ képletre szűkíteni, a centripetális tag figyelmen kívül hagyásával."
  ),
  term(
    "newton-harom-torveny",
    "Newton axiómái",
    "Dinamika",
    "A tehetetlenség, az erő és a kölcsönhatás alapvető törvényei.",
    "Inerciarendszerben az eredő erő az impulzus időderiváltja; állandó tömegnél ΣF=ma. A hatás-ellenhatás erőpár egyenlő nagyságú, ellentétes irányú, és két különböző testre hat.",
    "Üres bevásárlókocsit könnyebb gyorsítani, mint egy telepakoltat; a különbséget a tömeg fejezi ki.",
    "\\sum\\mathbf{F}=\\frac{d\\mathbf{p}}{dt},\\qquad m=\\mathrm{állandó}:\\quad\\sum\\mathbf{F}=m\\mathbf{a}",
    "Lejtőn a mozgásegyenletet lejtőirányú és arra merőleges komponensekre bontjuk.",
    ["Kinematika", "Impulzus és erőlökés", "Tangenciális és centripetális gyorsulás"],
    "Rajzolj szabadtest-ábrát, majd minden tengelyre külön írd fel az erőegyenletet.",
    "A hatás-ellenhatás erőket ugyanarra a testre rajzolni vagy egymással kioltani."
  ),
  term(
    "surlodasi-erok",
    "Tapadási és csúszási súrlódás",
    "Dinamika",
    "A tapadási súrlódás alkalmazkodik, a csúszási súrlódás a csúszást fékezi.",
    "Tapadáskor a súrlódás nagysága a szükséges érték, legfeljebb μ₀N. Csúszáskor egyszerű modellben F_cs=μN, a relatív csúszással ellentétes irányban. N a támaszerő.",
    "Szekrény meglökésekor a padló először a lökéshez igazodó tapadási súrlódással tartja helyben; megindulás után csúszási súrlódás lép fel.",
    "F_{\\mathrm{tap}}\\leq\\mu_0N,\\qquad F_{\\mathrm{cs}}=\\mu N",
    "Vízszintes talajon ferdén felfelé húzott testnél N=mg−Fsinα, ezért a súrlódás sem μmg.",
    ["Newton II. törvénye", "Munka és munkatétel"],
    "A normálerőt a merőleges mozgásegyenletből határozd meg, mielőtt a súrlódást kiszámítod.",
    "A tapadási súrlódást minden esetben μ₀N-nek venni: ez csak a megcsúszás határán igaz."
  ),
  term(
    "fuggoleges-kor-dinamika",
    "Függőleges körmozgás dinamikája",
    "Dinamika",
    "A radiális erők eredője adja a centripetális gyorsuláshoz szükséges erőt.",
    "A centripetális erő nem külön kölcsönhatás, hanem az adott sugárirányban ható valódi erők eredője. A pálya tetején az elválás határa N=0.",
    "Hullámvasúton a sín által kifejtett nyomóerő a körpálya különböző pontjain a sebességtől függ.",
    "\\sum F_r=m\\frac{v^2}{R},\\quad N_{\\mathrm{felül}}=m\\left(\\frac{v^2}{R}-g\\right),\\quad v_{\\mathrm{krit}}=\\sqrt{gR}",
    "A körpálya tetején a minimális érintkezési sebességhez a súlyerő önmagában biztosítja a szükséges centripetális gyorsulást.",
    ["Newton II. törvénye", "Körmozgás és tiszta gördülés"],
    "A radiális tengelyt mindig a kör középpontja felé pozitívnak választva írd fel az erőegyenletet.",
    "A „centripetális erőt” újabb erőként berajzolni a súlyerő és a támaszerő mellé."
  ),
  term(
    "impulzus-erolokes",
    "Impulzus és erőlökés",
    "Impulzus és ütközések",
    "Az impulzus a mozgásmennyiséget, az erőlökés az impulzusváltozást jellemzi.",
    "A p=m v impulzus vektormennyiség. Az erő idő szerinti integrálja, I=∫Fdt, megegyezik az impulzus megváltozásával.",
    "A rövid, nagy erejű ütés és a hosszabb, kisebb erő ugyanakkora impulzusváltozást is okozhat.",
    "\\mathbf{p}=m\\mathbf{v},\\qquad\\mathbf{I}=\\int_{t_1}^{t_2}\\mathbf{F}\\,dt=\\Delta\\mathbf{p}",
    "Állandó erő esetén az erőlökés nagysága FΔt; változó erőnél az erő-idő grafikon alatti előjeles terület.",
    ["Newton II. törvénye", "Tömegközépponti tétel", "Rugalmas és rugalmatlan ütközés"],
    "Ütközésnél zárt rendszerre vektorosan írd fel az impulzusmegmaradást.",
    "Az impulzust skalárként kezelni, különösen kétdimenziós ütközésben."
  ),
  term(
    "tomegkozepponti-tetel",
    "Tömegközépponti tétel",
    "Impulzus és ütközések",
    "A rendszer tömegközéppontjának mozgását a külső erők eredője határozza meg.",
    "A rendszer teljes impulzusa Mv_TKP, és M a_TKP=ΣF_külső. A belső erők az összegzésben páronként kiesnek, ha a kölcsönhatási erők Newton III. törvényének megfelelő párt alkotnak.",
    "Eldobott, forgó kalapács részei bonyolult pályát járnak be, tömegközéppontja mégis a külső erők szerint mozog.",
    "\\mathbf{r}_{\\mathrm{TKP}}=\\frac{\\sum_i m_i\\mathbf{r}_i}{M},\\qquad M\\mathbf{a}_{\\mathrm{TKP}}=\\sum\\mathbf{F}_{\\mathrm{külső}}",
    "Két test ütközésekor a rendszer tömegközéppontjának sebessége külső impulzus hiányában változatlan.",
    ["Impulzus és erőlökés", "Rugalmas és rugalmatlan ütközés"],
    "A rendszerhatárt és a külső erőket mindig nevezd meg, mielőtt megmaradási tételt használsz.",
    "Belső erők hiányát úgy értelmezni, hogy a rendszer egyes tagjainak mozgási energiája sem változhat."
  ),
  term(
    "utkozes",
    "Rugalmas és rugalmatlan ütközés",
    "Impulzus és ütközések",
    "Zárt rendszerben az impulzus megmarad; a mozgási energia csak rugalmas ütközésnél marad meg.",
    "Tökéletesen rugalmatlan ütközésnél a testek együtt mozognak a közös végsebességgel. Rugalmas ütközésnél az impulzus mellett a teljes mozgási energia is megmarad.",
    "Üveggolyók ütközése közel rugalmas, gyurmagolyók összetapadása közel tökéletesen rugalmatlan.",
    "v'=\\frac{m_1v_1+m_2v_2}{m_1+m_2}\\quad\\text{(összetapadás)}",
    "Egy 1 kg-os, 4 m/s sebességű test és egy nyugvó 3 kg-os test összetapadva 1 m/s sebességgel mozog.",
    ["Impulzus és erőlökés", "Tömegközépponti tétel"],
    "Előjel-konvenciót válassz a tengelyre; az ellentétes irányú kezdősebesség negatív.",
    "Rugalmatlan ütközésre is felírni a mozgási energia megmaradását."
  ),
  term(
    "rocket-egyenlet",
    "Ciolkovszkij-rakétaegyenlet",
    "Impulzus és ütközések",
    "A változó tömegű rakéta sebességváltozását a tömegarány logaritmusa adja.",
    "Külső erőktől mentes, egyenes vonalú rakétamozgás ideális modelljében a kiáramló hajtóanyag rakétához viszonyított u sebessége mellett v−v₀=u ln(m₀/m).",
    "A hátrafelé eldobott tárgy előre gyorsítja a görkorcsolyázót; a rakéta is a hátrafelé kiáramló gázzal cserél impulzust.",
    "v=v_0+u_{\\mathrm{rel}}\\ln\\left(\\frac{m_0}{m}\\right)",
    "A rakéta sebességnövekménye az elhasznált üzemanyag tömegarányától és a relatív kiáramlási sebességtől függ.",
    ["Impulzus és erőlökés", "Tömegközépponti tétel"],
    "Különböztesd meg a gáz rakétához viszonyított sebességét a talajhoz viszonyított sebességétől.",
    "A változó tömegű testre egyszerűen F=ma-t alkalmazni a kiáramló tömeg impulzusáramának figyelembevétele nélkül."
  ),
  term(
    "konzervativ-eroter",
    "Konzervatív erőtér és potenciál",
    "Munka és energia",
    "Konzervatív erő munkája csak a kezdő- és végponttól függ.",
    "Egyszeresen összefüggő tartományban differenciálható erőtér konzervatív, ha rot F=0; ekkor F=−∇U és zárt görbe mentén a munka nulla. A potenciális energia nullaszintje szabadon választható.",
    "A gravitáció olyan energiabankként szemléltethető, amelyből a helyzeti energiát mozgási energiává alakíthatjuk.",
    "\\oint\\mathbf{F}\\cdot d\\mathbf{r}=0,\\qquad\\mathbf{F}=-\\nabla U",
    "Ha F=(2xy+z³, x², 3xz²), akkor U=−x²y−xz³+C, mert −∇U=F.",
    ["Munka és munkatétel", "Mechanikai energia megmaradása"],
    "A potenciál visszaellenőrzéséhez deriváld a kapott U-t, és képezd a −∇U-t.",
    "A mínuszjel elhagyása az erő és a potenciál kapcsolatából."
  ),
  term(
    "mechanikai-energia",
    "Mechanikai energia megmaradása",
    "Munka és energia",
    "Konzervatív erők mellett a mozgási és potenciális energia összege állandó.",
    "Ha nem konzervatív erő nem végez munkát, E_mech=E_k+U állandó. Nem konzervatív erők munkája a mechanikai energia változása: W_nemkonz=ΔE_mech.",
    "Lejtőn a helyzeti energia mozgási energiává alakul; súrlódás esetén a mechanikai energia egy része hővé alakul.",
    "E_{\\mathrm{mech}}=E_k+U=\\mathrm{állandó},\\qquad W_{\\mathrm{nemkonz}}=\\Delta E_{\\mathrm{mech}}",
    "Súrlódásmentes esésben mgh=½mv²; súrlódás mellett a súrlódási munka negatív.",
    ["Munka és munkatétel", "Konzervatív erőtér és potenciál", "Tisztán gördülő mozgás energiája"],
    "Válassz konzisztens potenciál-nullaszintet, és írd fel a kezdeti és végső energiát.",
    "A teljes energia megmaradását összetéveszteni a mechanikai energia megmaradásával."
  ),
  term(
    "munkateljesitmeny",
    "Munka és teljesítmény",
    "Munka és energia",
    "Az erő elmozdulásirányú komponense végez munkát; a teljesítmény ennek időbeli üteme.",
    "Elemi munka dW=F·dr; véges pályán W=∫F·dr. A pillanatnyi teljesítmény P=dW/dt=F·v, így a sebességre merőleges erő nem végez munkát.",
    "Vízszintesen tolt ládánál a függőlegesen lefelé nyomó erőkomponens nem végez munkát, bár a súrlódást módosíthatja.",
    "dW=\\mathbf{F}\\cdot d\\mathbf{r},\\qquad P=\\mathbf{F}\\cdot\\mathbf{v},\\qquad W_{\\mathrm{eredő}}=\\Delta E_k",
    "Motor tengelyteljesítményét a hajtóerő és a sebesség skalárszorzata adja.",
    ["Vektor", "Mechanikai energia megmaradása", "Newton II. törvénye"],
    "A munkatételbe az eredő erő munkája kerül, nem egy tetszőleges erőé.",
    "A merőleges támaszerőnek munkát tulajdonítani elmozdulás irányú mozgásnál."
  ),
  term(
    "tehetetlensegi-nyomatek",
    "Tehetetlenségi nyomaték",
    "Merev testek",
    "A forgástengelyhez viszonyított tömegeloszlás forgási tehetetlenségét méri.",
    "Diszkrét tömegpontokra I=Σmᵢrᵢ,⊥², folytonos testre I=∫r_⊥²dm. Az érték a test tömegétől és a választott tengelytől is függ.",
    "A műkorcsolyázó behúzott karokkal kisebb tehetetlenségi nyomatékú, ezért perdületének megtartásához gyorsabban forog.",
    "I=\\sum_i m_i r_{i,\\perp}^2=\\int r_\\perp^2\\,dm",
    "Tömör henger tengelyére I=½mR²; a forgási energia ½Iω².",
    ["Forgási alapegyenlet", "Steiner-tétel", "Tisztán gördülő mozgás energiája"],
    "Mindig nevezd meg, melyik tengelyre vonatkozó tehetetlenségi nyomatékot használod.",
    "A forgási energiát kihagyni gördülő test energiájának számításakor."
  ),
  term(
    "steiner-tetel",
    "Steiner-tétel",
    "Merev testek",
    "A tömegközépponton átmenő tengelyhez képest ismert nyomatékból párhuzamos tengelyre számol.",
    "A tömegközépponti tengellyel párhuzamos, attól s távolságú tengelyre I=I_TKP+ms². A bizonyításban a tömegközépponti koordináták első momentuma nulla.",
    "Egy pálca végénél nehezebb forgatni, mint közepénél: a tömeg távolabb van a tengelytől.",
    "I=I_{\\mathrm{TKP}}+ms^2",
    "A tömegközépponti tengelyű vékony pálca végpontján átmenő tengelyre I=1/12mL²+m(L/2)²=1/3mL².",
    ["Tehetetlenségi nyomaték"],
    "Az eltolás távolsága a tömegközéppont és az új, párhuzamos tengely között mérendő.",
    "Steiner-tételt nem párhuzamos tengelyek között alkalmazni."
  ),
  term(
    "forgasi-alapegyenlet",
    "Forgási alapegyenlet",
    "Merev testek",
    "Az eredő forgatónyomaték az impulzusmomentum időbeli változása.",
    "Általánosan M_eredő=dL/dt. Rögzített tengelyű forgásnál, állandó I esetén a tengelyirányú skalár alak M=Iβ. Perdületmegmaradás akkor következik, ha a külső forgatónyomaték nulla.",
    "A forgatónyomaték úgy változtatja a perdületet, ahogy az erő a lineáris impulzust.",
    "\\mathbf{M}_{\\mathrm{eredő}}=\\frac{d\\mathbf{L}}{dt},\\qquad M=I\\beta",
    "A műkorcsolyázó külső forgatónyomaték nélkül növeli szögsebességét az I csökkentésével.",
    ["Tehetetlenségi nyomaték", "Vektoriális szorzat", "Tisztán gördülő mozgás energiája"],
    "Az M=Iβ alak feltétele a rögzített tengely és az állandó tehetetlenségi nyomaték.",
    "Az általános vektoregyenletet feltételek nélkül M=Iβ alakra egyszerűsíteni."
  ),
  term(
    "tiszta-gordules-energia",
    "Tisztán gördülő mozgás energiája",
    "Merev testek",
    "A gördülő testnek egyszerre van haladó és forgási mozgási energiája.",
    "Tiszta gördülésnél v_TKP=Rω, és a teljes mozgási energia E=½mv_TKP²+½I_TKPω². Tapadási súrlódás ideális gördüléskor nem végez munkát, mert az érintkezési pont pillanatnyi sebessége nulla.",
    "A guruló kerék energiája a középpont haladásában és a tengely körüli forgásban is tárolódik.",
    "E_k=\\frac12mv_{\\mathrm{TKP}}^2+\\frac12I_{\\mathrm{TKP}}\\omega^2,\\qquad v_{\\mathrm{TKP}}=R\\omega",
    "Nyugalomból induló tömör henger h magasságú lejtőn: mgh=¾mv², ezért v=√(4gh/3).",
    ["Tehetetlenségi nyomaték", "Mechanikai energia megmaradása", "Körmozgás és tiszta gördülés"],
    "Az energiamegmaradásban a haladó és forgási tagot is szerepeltesd.",
    "A gördülő hengert pontszerű testként kezelni, és elhagyni az ½Iω² tagot."
  ),
  term(
    "transzlacios-tehetetlensegi-ero",
    "Transzlációs tehetetlenségi erő",
    "Gyorsuló vonatkoztatási rendszerek",
    "Gyorsuló rendszerben a relatív mozgásegyenlethez −ma₀ tehetetlenségi erő tartozik.",
    "Ha a megfigyelő rendszerének origója az inerciarendszerhez képest a₀ gyorsulással mozog, akkor a rendszerhez viszonyított mozgásegyenletben F_teh=−ma₀ tag jelenik meg.",
    "Fékező autóban előrebillenünk; a járműhöz rögzített rendszerben ezt a rendszer gyorsulásával ellentétes tehetetlenségi erővel írjuk le.",
    "\\mathbf{F}_{\\mathrm{teh}}=-m\\mathbf{a}_0",
    "Felfelé gyorsuló liftben a test látszólagos súlya nő; a rendszer gyorsulását ellentétes tehetetlenségi erővel vesszük figyelembe.",
    ["Newton II. törvénye", "Centrifugális erő", "Coriolis-erő"],
    "A gyorsulás előjelét a mozgó rendszer origójának gyorsulásához viszonyítsd.",
    "Tehetetlenségi erőt valós kölcsönhatásként kezelni inerciarendszerben."
  ),
  term(
    "centrifugalis-ero",
    "Centrifugális erő",
    "Gyorsuló vonatkoztatási rendszerek",
    "Forgó vonatkoztatási rendszerben kifelé mutató tehetetlenségi erő.",
    "A forgó rendszerben az egyenletben szereplő erő −mω×(ω×r′). Tengelyre merőleges távolság r_⊥ esetén nagysága mω²r_⊥, iránya a tengelytől kifelé.",
    "Körhintán ülve úgy érezzük, mintha kifelé húzna valami; ez a forgó rendszerbeli leírásban jelenik meg.",
    "\\mathbf{F}_{\\mathrm{cf}}=-m\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}'),\\qquad F_{\\mathrm{cf}}=m\\omega^2r_\\perp",
    "ω=2 rad/s és r=0,5 m esetén a centrifugális gyorsulás 2 m/s² kifelé.",
    ["Transzlációs tehetetlenségi erő", "Coriolis-erő", "Euler-erő"],
    "A sugárvektornak csak a forgástengelyre merőleges komponense számít a nagyságban.",
    "A centrifugális erőt összekeverni a tehetetlenségi rendszerben fellépő centripetális gyorsulással."
  ),
  term(
    "coriolis-ero",
    "Coriolis-erő",
    "Gyorsuló vonatkoztatási rendszerek",
    "Forgó rendszerben a relatív sebességgel mozgó testre ható tehetetlenségi erő.",
    "A Coriolis-erő F_Co=−2m(ω×v′). Eltűnik, ha a test nyugalomban van a forgó rendszerhez képest; iránya merőleges ω-ra és v′-re.",
    "Forgó körhintán sugárirányban sétálva oldalirányú eltérülést tapasztalunk.",
    "\\mathbf{F}_{\\mathrm{Co}}=-2m(\\boldsymbol{\\omega}\\times\\mathbf{v}')",
    "Függőleges tengelyű forgó csőben sugárirányban csúszó testre a Coriolis-erő a cső falának irányában hat.",
    ["Transzlációs tehetetlenségi erő", "Centrifugális erő", "Euler-erő"],
    "Használd a jobbkéz-szabályt az ω×v′ irányára, majd vedd figyelembe az előtte álló mínuszt.",
    "Coriolis-erőt nyugvó testre is felírni a forgó rendszerben."
  ),
  term(
    "euler-ero",
    "Euler-erő",
    "Gyorsuló vonatkoztatási rendszerek",
    "A forgó rendszer szögsebességének változásából származó tehetetlenségi erő.",
    "Ha a rendszer szöggyorsulása β=dω/dt, a relatív mozgásegyenletben F_Eu=−m(β×r′) szerepel. Állandó szögsebességnél ez a tag nulla.",
    "Felgyorsuló körhintán a távolabbi pontok nagyobb tangenciális gyorsulást igényelnek.",
    "\\mathbf{F}_{\\mathrm{Eu}}=-m(\\boldsymbol{\\beta}\\times\\mathbf{r}')",
    "A szögsebesség változásakor a forgástengelytől távoli testre nagyobb Euler-erő jut.",
    ["Centrifugális erő", "Coriolis-erő", "Transzlációs tehetetlenségi erő"],
    "Az Euler-erőt ne keverd a Coriolis-erővel: előbbi β-t, utóbbi v′-t tartalmaz.",
    "Euler-erőt állandó szögsebességű rendszerben is számolni."
  ),
];

export const physicsChapters = [
  {
    id: "kinematika",
    title: "Kinematika",
    eyebrow: "02 · A MOZGÁS LEÍRÁSA",
    intro: "Hely, sebesség és gyorsulás: a mozgás matematikai leírása az erők vizsgálata nélkül.",
    overview: {
      why: "A mérnöki mozgáselemzés a hely-idő függvényből indul: ebből sebesség és gyorsulás számítható, majd ezek később a dinamikai egyenletekkel kapcsolhatók össze.",
      analogy: "A kinematika olyan, mint egy sportközvetítés: megmutatja, hol van a test és hogyan változik a mozgása, de még nem keresi az okot.",
      goal: "Vektorosan leírod a mozgást, felbontod a gyorsulást, és önállóan elemzel hajítást és körmozgást."
    },
    glossary: ["kinematika", "pillanatnyi-sebesseg", "tangencialis-centripetalis-gyorsulas", "ferde-hajitas", "kor-es-gordules-kinematika"],
    derivations: [
      {
        title: "A görbevonalú gyorsulás felbontása",
        level: "A sebességvektor deriválása",
        steps: [
          { equation: "\\mathbf{v}=v\\mathbf{e}_t", reason: "A sebességet nagyságának és érintő irányú egységvektorának szorzataként írjuk fel." },
          { equation: "\\mathbf{a}=\\frac{d\\mathbf{v}}{dt}=\\frac{dv}{dt}\\mathbf{e}_t+v\\frac{d\\mathbf{e}_t}{dt}", reason: "Alkalmazzuk a vektorszorzatra a szorzatderiválás szabályát." },
          { equation: "\\frac{d\\mathbf{e}_t}{dt}=\\frac{v}{R}\\mathbf{e}_n", reason: "Az érintő iránya a görbület miatt változik; a változás a normális irányú." },
          { equation: "\\boxed{\\mathbf{a}=\\dot{v}\\mathbf{e}_t+\\frac{v^2}{R}\\mathbf{e}_n}", reason: "Behelyettesítve külön kapjuk a sebesség nagyságának változását és a pálya görbületéből adódó tagot." }
        ]
      },
      {
        title: "A ferde hajítás pályaegyenlete",
        level: "Az idő kiküszöbölése",
        steps: [
          { equation: "x(t)=v_0\\cos\\alpha\\,t,\\quad y(t)=v_0\\sin\\alpha\\,t-\\frac12gt^2", reason: "A vízszintes gyorsulás nulla, a függőleges gyorsulás −g." },
          { equation: "t=\\frac{x}{v_0\\cos\\alpha}", reason: "A vízszintes egyenletből kifejezzük az időt; ehhez v₀cosα≠0 kell." },
          { equation: "y(x)=x\\tan\\alpha-\\frac{g}{2v_0^2\\cos^2\\alpha}x^2", reason: "Az időt behelyettesítjük a függőleges helyzetfüggvénybe; az x² tag parabolát ad." }
        ]
      }
    ],
    examples: [
      {
        title: "Ferde hajítás toronyból",
        problem: "Egy 35 m magas torony tetejéről 25°-os szögben, 80 m/s kezdősebességgel dobunk el egy labdát. g=9,81 m/s². Becsüld meg a repülési időt, a vízszintes távolságot és a becsapódási sebesség nagyságát.",
        solution: [
          { equation: "0=35+80\\sin25^\\circ\\,t-\\frac12(9{,}81)t^2", reason: "A függőleges helyzetet a torony aljához képest írjuk fel, a talajszint y=0." },
          { equation: "t\\approx7{,}81\\,\\mathrm{s}", reason: "A másodfokú egyenlet pozitív gyökét választjuk; a negatív idő fizikailag nem megfelelő." },
          { equation: "d=80\\cos25^\\circ\\cdot7{,}81\\approx566\\,\\mathrm{m}", reason: "A vízszintes sebesség állandó, ezért x=v₀cosα·t." },
          { equation: "|\\mathbf{v}|=\\sqrt{(80\\cos25^\\circ)^2+(80\\sin25^\\circ-9{,}81t)^2}\\approx84{,}2\\,\\mathrm{m/s}", reason: "A becsapódási sebesség két komponensének négyzetösszegéből számítjuk a nagyságot." }
        ],
        tip: "Először rögzíts koordinátarendszert, és az időt a függőleges mozgásból határozd meg.",
        pitfall: "A becsapódási sebességet nem szabad a kezdősebességgel azonosítani, ha a kezdő- és végmagasság eltér."
      },
      {
        title: "Kanyarodó autó gyorsuláskomponensei",
        problem: "Egy autó R=300 m sugarú kanyarban v=15 m/s sebességgel halad, és tangenciális gyorsulása −1,2 m/s². Határozd meg a normális és az eredő gyorsulást.",
        solution: [
          { equation: "a_n=\\frac{v^2}{R}=\\frac{15^2}{300}=0{,}75\\,\\mathrm{m/s^2}", reason: "A normális gyorsulás a görbületi középpont felé mutat." },
          { equation: "a=\\sqrt{(-1{,}2)^2+0{,}75^2}\\approx1{,}42\\,\\mathrm{m/s^2}", reason: "A merőleges érintő- és normálkomponenseket Pitagorasz-tétellel egyesítjük." }
        ],
        tip: "A tangenciális előjelet tartsd meg a komponensekben; az eredő nagyságában négyzetre emelés történik.",
        pitfall: "Csak a fékezésből származó tangenciális gyorsulást figyelembe venni."
      }
    ],
    widget: { type: "projectile", title: "Ferde hajítás – pálya és hatótávolság", intro: "Változtasd a kezdősebességet és a hajítási szöget; a demonstráció az azonos magasságra visszaérkező ideális pályát számolja." }
  },
  {
    id: "dinamika",
    title: "Dinamika",
    eyebrow: "03 · ERŐK ÉS MOZGÁSEGYENLETEK",
    intro: "Newton törvényei megmutatják, hogyan változtatják meg az erők a mozgásállapotot.",
    overview: {
      why: "A dinamika a mozgás okait vizsgálja. A szabadtest-ábra, az erők komponensekre bontása és Newton II. törvénye együtt teszi lehetővé a gyorsulás és a kényszererők meghatározását.",
      analogy: "Az üres bevásárlókocsi könnyebben gyorsul, mint a telepakolt: ugyanahhoz a gyorsuláshoz a nagyobb tömegű testre nagyobb erő kell.",
      goal: "Kiválasztasz rendszert és tengelyeket, azonosítod a valós erőket, majd komponensenként felírod a mozgásegyenletet."
    },
    glossary: ["dinamika", "newton-harom-torveny", "surlodasi-erok", "fuggoleges-kor-dinamika"],
    derivations: [
      {
        title: "Lejtőn csúszó test gyorsulása",
        level: "Erők felbontása és Newton II.",
        steps: [
          { equation: "N-mg\\cos\\alpha=0\\quad\\Rightarrow\\quad N=mg\\cos\\alpha", reason: "A lejtőre merőleges irányban nincs gyorsulás; a súlyerő normális komponensét a támaszerő egyensúlyozza." },
          { equation: "F_{\\mathrm{cs}}=\\mu N=\\mu mg\\cos\\alpha", reason: "Csúszás esetén a súrlódás nagysága a normálerővel arányos." },
          { equation: "ma=F-mg\\sin\\alpha-\\mu mg\\cos\\alpha", reason: "A lejtő irányában összegezzük az előjeles erőkomponenseket." },
          { equation: "\\boxed{a=\\frac{F}{m}-g(\\sin\\alpha+\\mu\\cos\\alpha)}", reason: "Az egyenletet m-mel osztva megkapjuk a gyorsulást a választott pozitív irányban." }
        ]
      },
      {
        title: "Függőleges körpálya felső pontja",
        level: "Radiális erőegyenlet",
        steps: [
          { equation: "mg+N=m\\frac{v^2}{R}", reason: "A felső pontban a súlyerő és a sín normálerője egyaránt a kör középpontja felé mutat." },
          { equation: "N=m\\left(\\frac{v^2}{R}-g\\right)", reason: "Átrendezzük az egyenletet a támaszerőre." },
          { equation: "N=0\\Rightarrow v_{\\mathrm{krit}}=\\sqrt{gR}", reason: "Az elválás határán nincs nyomóerő; a kötés nélküli érintkezés nem húzhatja a testet a pályához." }
        ]
      }
    ],
    examples: [
      {
        title: "Ferde erővel húzott test súrlódással",
        problem: "m=4 kg testet vízszintes talajon F=20 N erővel, a vízszinteshez képest 30°-ban felfelé húzunk. μ=0,2. Határozd meg a gyorsulást, g=9,81 m/s².",
        solution: [
          { equation: "N=mg-F\\sin30^\\circ=39{,}24-10=29{,}24\\,\\mathrm{N}", reason: "A függőleges gyorsulás nulla, ezért az erők függőleges komponenseinek összege is nulla." },
          { equation: "F_{\\mathrm{cs}}=\\mu N=5{,}848\\,\\mathrm{N}", reason: "A csúszási súrlódást a tényleges normálerőből számítjuk." },
          { equation: "a=\\frac{F\\cos30^\\circ-F_{\\mathrm{cs}}}{m}\\approx2{,}87\\,\\mathrm{m/s^2}", reason: "A vízszintes mozgásegyenletet megoldjuk a gyorsulásra." }
        ],
        tip: "A ferde húzóerő csökkenti a normálerőt, így a súrlódást is.",
        pitfall: "N=mg-t írni akkor is, ha függőleges erőkomponens hat a testre."
      }
    ],
    widget: { type: "dynamics", title: "Newton II. törvénye", intro: "Állítsd az eredő erőt és a tömeget, majd figyeld meg a=F/m gyorsulást." }
  },
  {
    id: "munka-energia",
    title: "Munka és energia",
    eyebrow: "04 · MUNKATÉTEL ÉS ENERGIA",
    intro: "A munka az erők hatását, az energia pedig a mozgás és kölcsönhatások állapotát teszi áttekinthetővé.",
    overview: {
      why: "Energiamódszerrel sok mozgásfeladat megoldható az időfüggvények részletes meghatározása nélkül. A munkatétel és a potenciál különösen hasznos a gravitáció, a rugó és a gördülés elemzésénél.",
      analogy: "A lejtőn leereszkedő test helyzeti energiája mozgási energiává alakul; súrlódáskor a mechanikai energia egy része hővé alakul.",
      goal: "Kiszámítod az erő munkáját, levezeted a munkatételt, felismered a konzervatív erőteret és felírod az energiaegyenletet."
    },
    glossary: ["munka", "munkateljesitmeny", "konzervativ-eroter", "mechanikai-energia"],
    derivations: [
      {
        title: "A munkatétel Newton II. törvényéből",
        level: "Vonalintegrál és vektorderiválás",
        steps: [
          { equation: "W_{\\mathrm{eredő}}=\\int_A^B\\mathbf{F}\\cdot d\\mathbf{r}", reason: "Az eredő erő munkája a pálya menti skalárszorzat integrálja." },
          { equation: "W=\\int_{t_1}^{t_2}m\\frac{d\\mathbf{v}}{dt}\\cdot\\mathbf{v}\\,dt", reason: "Állandó tömegű testre Newton II.-t alkalmazzuk, és d r=vdt alakban paraméterezzük a pályát." },
          { equation: "\\mathbf{v}\\cdot\\frac{d\\mathbf{v}}{dt}=\\frac12\\frac{d(v^2)}{dt}", reason: "A v·v skalárszorzat deriválásakor a két azonos tag miatt 2-es tényező jelenik meg." },
          { equation: "\\boxed{W_{\\mathrm{eredő}}=\\frac12mv_2^2-\\frac12mv_1^2=\\Delta E_k}", reason: "Az időintegrál a kezdeti és végső mozgási energia különbségét adja." }
        ]
      },
      {
        title: "A rugó potenciális energiája",
        level: "Hooke-törvény integrálása",
        steps: [
          { equation: "F_x=-kx", reason: "A rugó visszatérítő ereje ellentétes a kitéréssel." },
          { equation: "U(x)-U(0)=-\\int_0^xF_x\\,dx'=\\int_0^xkx'\\,dx'", reason: "A potenciális energia változása a konzervatív erő munkájának ellentettje." },
          { equation: "\\boxed{U(x)=\\frac12kx^2}\\quad(U(0)=0)", reason: "Az integrálás és a választott nullaszint megadja a rugó energiáját." }
        ]
      }
    ],
    examples: [
      {
        title: "Erőtér konzervativitása és potenciálja",
        problem: "Adott F=(2xy+z³, x², 3xz²). Ellenőrizd a konzervativitást, és add meg U-t úgy, hogy U(0,0,0)=0.",
        solution: [
          { equation: "\\nabla\\times\\mathbf{F}=\\mathbf{0}", reason: "A három rotáció-komponens rendre ∂F_z/∂y−∂F_y/∂z=0, ∂F_x/∂z−∂F_z/∂x=0 és ∂F_y/∂x−∂F_x/∂y=0." },
          { equation: "\\frac{\\partial U}{\\partial x}=-(2xy+z^3)\\Rightarrow U=-x^2y-xz^3+g(y,z)", reason: "F=−∇U-ból az x szerinti parciális deriváltat integráljuk." },
          { equation: "\\frac{\\partial U}{\\partial y}=-x^2,\\quad\\frac{\\partial U}{\\partial z}=-3xz^2\\Rightarrow g=C", reason: "A másik két komponens feltétele megmutatja, hogy g csak konstans lehet." },
          { equation: "\\boxed{U=-x^2y-xz^3}", reason: "A kezdeti feltétel szerint U(0,0,0)=0, tehát C=0." }
        ],
        tip: "Potenciál meghatározásakor minden komponenssel ellenőrizd vissza a −∇U=F azonosságot.",
        pitfall: "A curl=0 feltétel globálisan csak megfelelő (például egyszeresen összefüggő) tartományban garantál potenciált."
      }
    ],
    examNotes: {
      tips: ["A sebességre merőleges erő munkája nulla.", "Súrlódásnál W_súrlódás<0, és a mechanikai energia változását okozza."],
      pitfalls: ["A munkatételben az eredő erő munkája szerepel.", "Ne keverd össze a teljes energia megmaradását a mechanikai energia megmaradásával."]
    },
    widget: { type: "energy", title: "Esés és mozgási energia", intro: "Változtasd meg az esési magasságot; a súrlódásmentes modellből számolt sebesség v=√(2gh)." }
  },
  {
    id: "impulzus-tomegkozepont",
    title: "Impulzus és tömegközéppont",
    eyebrow: "05 · RENDSZEREK ÉS ÜTKÖZÉSEK",
    intro: "Az impulzusmegmaradás és a tömegközépponti tétel összetett rendszerek mozgását egyszerűsíti.",
    overview: {
      why: "Ütközéseknél, robbanásoknál és változó tömegű rendszereknél az impulzusmérleg gyakran közvetlenebb, mint a gyorsulások részletes követése.",
      analogy: "Egy elhajított, forgó tárgy részei különböző pályát járnak be, de a tömegközéppont a külső erők szerint mozog.",
      goal: "Felírod az impulzustételt, kiválasztod a megfelelő rendszerhatárt, és külön kezeled a rugalmas, illetve rugalmatlan ütközést."
    },
    glossary: ["impulzus-erolokes", "tomegkozepponti-tetel", "utkozes", "rocket-egyenlet"],
    derivations: [
      {
        title: "A tömegközépponti tétel",
        level: "Részecskerendszer egyenleteinek összeadása",
        steps: [
          { equation: "m_i\\mathbf{a}_i=\\mathbf{F}_{i,\\mathrm{külső}}+\\sum_{j\\ne i}\\mathbf{F}_{ji}", reason: "Minden részecskére felírjuk Newton II. törvényét, a külső és belső erőket elkülönítve." },
          { equation: "\\sum_i m_i\\mathbf{a}_i=\\sum_i\\mathbf{F}_{i,\\mathrm{külső}}+\\sum_{i,j}\\mathbf{F}_{ji}", reason: "A részecskeegyenleteket összeadjuk." },
          { equation: "\\sum_{i,j}\\mathbf{F}_{ji}=\\mathbf{0}", reason: "Newton III. szerint a páronkénti belső erők ellentétesek, ezért a rendszerösszegben kiesnek." },
          { equation: "\\boxed{M\\mathbf{a}_{\\mathrm{TKP}}=\\sum\\mathbf{F}_{\\mathrm{külső}}}", reason: "A bal oldali tömeggel súlyozott gyorsulásösszeg M a_TKP." }
        ]
      },
      {
        title: "Tökéletesen rugalmatlan ütközés",
        level: "Impulzusmegmaradás",
        steps: [
          { equation: "m_1v_1+m_2v_2=(m_1+m_2)v'", reason: "A két test ütközés után együtt mozog; a külső impulzus elhanyagolható." },
          { equation: "\\boxed{v'=\\frac{m_1v_1+m_2v_2}{m_1+m_2}}", reason: "Az impulzusegyenletet megoldjuk a közös sebességre; a sebességek előjelesek." }
        ]
      }
    ],
    examples: [
      {
        title: "Két test összetapadása",
        problem: "m₁=1 kg test 4 m/s sebességgel halad, m₂=3 kg test nyugalomban van. Az ütközés után összetapadnak. Határozd meg a közös sebességet és a mozgási energia változását.",
        solution: [
          { equation: "v'=\\frac{1\\cdot4+3\\cdot0}{1+3}=1\\,\\mathrm{m/s}", reason: "A külső impulzus hiányában a teljes impulzus megmarad." },
          { equation: "E_{k,1}=\\frac12\\cdot1\\cdot4^2=8\\,\\mathrm{J}", reason: "A kezdeti mozgási energia csak az első testből származik." },
          { equation: "E_{k,2}=\\frac12(1+3)\\cdot1^2=2\\,\\mathrm{J},\\quad\\Delta E_k=-6\\,\\mathrm{J}", reason: "Az energia csökkenése összhangban van az összetapadó, rugalmatlan ütközéssel." }
        ],
        tip: "A lendületet tengelyenként, előjelesen számold; az energia skalár és nem tartalmaz irányelőjelet.",
        pitfall: "Az impulzusmegmaradásból nem következik a mozgási energia megmaradása."
      }
    ],
    widget: { type: "momentum", title: "Közös sebesség ütközés után", intro: "Állítsd a tömegeket és a kezdősebességeket; a modell tökéletesen rugalmatlan, egydimenziós ütközést mutat." }
  },
  {
    id: "merev-testek",
    title: "Merev testek",
    eyebrow: "06 · FORGÓ MOZGÁS",
    intro: "A merev test haladó és forgó mozgását a tehetetlenségi nyomaték, a forgatónyomaték és a perdület kapcsolja össze.",
    overview: {
      why: "Forgó gépelemek, lendkerekek és gördülő testek elemzésekor a tömeg önmagában nem elegendő: a tengely körüli tömegeloszlás is számít.",
      analogy: "A súlyzó két végére tett tömegek nehezebben pörgethetők fel, mint ugyanaz a tömeg a tengely közelében.",
      goal: "Kiszámítod a tehetetlenségi nyomatékot, alkalmazod a Steiner-tételt és együtt kezeled a gördülés haladó és forgási energiáját."
    },
    glossary: ["tehetetlensegi-nyomatek", "steiner-tetel", "forgasi-alapegyenlet", "tiszta-gordules-energia"],
    derivations: [
      {
        title: "Steiner-tétel",
        level: "Párhuzamos tengelyek tétele",
        steps: [
          { equation: "I_{\\mathrm{TKP}}=\\int(x^2+y^2)\\,dm", reason: "A tömegközépponti z tengelyre felírt definíció." },
          { equation: "r_\\perp'^2=(x-s)^2+y^2=x^2+y^2-2sx+s^2", reason: "Az új tengely párhuzamos és s távolságra van; a tömegelem új távolságát kifejtjük." },
          { equation: "I=I_{\\mathrm{TKP}}-2s\\int x\\,dm+s^2\\int dm", reason: "A kifejezést a test teljes tömegére integráljuk." },
          { equation: "\\int x\\,dm=0,\\quad\\int dm=m\\Rightarrow\\boxed{I=I_{\\mathrm{TKP}}+ms^2}", reason: "A tömegközéppontban az első nyomaték nulla, a teljes tömeg m." }
        ]
      },
      {
        title: "Lejtőn tisztán gördülő tömör henger",
        level: "Energiamegmaradás és gördülési kényszer",
        steps: [
          { equation: "mgh=\\frac12mv^2+\\frac12I\\omega^2", reason: "A helyzeti energia a haladó és forgó mozgási energiába alakul." },
          { equation: "I=\\frac12mR^2,\\quad\\omega=\\frac{v}{R}", reason: "Tömör hengerre behelyettesítjük a tengely körüli nyomatékot és a tiszta gördülés feltételét." },
          { equation: "mgh=\\frac34mv^2\\Rightarrow\\boxed{v=\\sqrt{\\frac43gh}}", reason: "A tömeg kiesik, és az egyenletet megoldjuk a lejtő alji sebességre." }
        ]
      }
    ],
    examples: [
      {
        title: "Tömör henger sebessége a lejtő alján",
        problem: "A h=1,5 m magas lejtő tetejéről nyugalomból induló tömör henger tisztán gördül le. Határozd meg a sebességét a lejtő alján! g=9,81 m/s².",
        solution: [
          { equation: "mgh=\\frac12mv^2+\\frac12\\left(\\frac12mR^2\\right)\\frac{v^2}{R^2}", reason: "Az energiamegmaradásba behelyettesítjük I=½mR²-et és ω=v/R-et." },
          { equation: "v=\\sqrt{\\frac43gh}=\\sqrt{\\frac43\\cdot9{,}81\\cdot1{,}5}\\approx4{,}43\\,\\mathrm{m/s}", reason: "A tömeg és a sugár kiesik; az eredmény a haladó és forgási energia arányától függ." }
        ],
        tip: "A gördülési feladatnál ellenőrizd, hogy a megadott testhez tartozó I-tengely valóban a tömegközépponton megy-e át.",
        pitfall: "Csak a haladó mozgás energiájával számolni, mintha a henger csúszna."
      }
    ],
    widget: { type: "rigid", title: "Gördülő test lejtőn", intro: "Válassz testtípust és esési magasságot; az ideális energiaegyenlet megmutatja a lejtő alji sebességet." }
  },
  {
    id: "gyorsulo-rendszerek",
    title: "Gyorsuló rendszerek",
    eyebrow: "07 · VONATKOZTATÁSI RENDSZEREK",
    intro: "Gyorsuló és forgó megfigyelői rendszerekben tehetetlenségi erők teszik felírhatóvá a relatív mozgásegyenletet.",
    overview: {
      why: "Járművek, forgó gépek és a Föld felszínén mozgó testek vizsgálatakor gyakran a megfigyelővel együtt mozgó koordinátarendszer a kényelmes. Ebben a Newton-egyenlethez további tehetetlenségi tagokat kell adni.",
      analogy: "Fékező autóban előrebillenünk; forgó körhintán oldalra térülünk el. A nem inerciális rendszerben ezeket látszólagos erőkkel modellezzük.",
      goal: "Megkülönbözteted a valódi és tehetetlenségi erőket, felírod a forgó rendszer gyorsulási tagjait, és azonosítod a Coriolis- és centrifugális erőt."
    },
    glossary: ["transzlacios-tehetetlensegi-ero", "centrifugalis-ero", "coriolis-ero", "euler-ero"],
    derivations: [
      {
        title: "Gyorsulás transzformációja forgó rendszerben",
        level: "A vektor időderiváltjának szabálya",
        steps: [
          { equation: "\\left(\\frac{d\\mathbf{A}}{dt}\\right)_{\\mathrm{in}}=\\left(\\frac{d\\mathbf{A}}{dt}\\right)_{\\mathrm{forgó}}+\\boldsymbol{\\omega}\\times\\mathbf{A}", reason: "A forgó bázisvektorok is változnak az inerciarendszerhez képest." },
          { equation: "\\mathbf{v}=\\mathbf{v}_0+\\mathbf{v}'+\\boldsymbol{\\omega}\\times\\mathbf{r}'", reason: "A helyvektor deriválásakor a rendszer origójának, a relatív mozgásnak és a bázis forgásának tagja jelenik meg." },
          { equation: "\\mathbf{a}=\\mathbf{a}_0+\\mathbf{a}'+\\boldsymbol{\\beta}\\times\\mathbf{r}'+\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}')+2\\boldsymbol{\\omega}\\times\\mathbf{v}'", reason: "A sebesség kifejezését még egyszer deriváljuk; ω változása Euler-tagot, keresztderiválások Coriolis-tagot adnak." }
        ]
      },
      {
        title: "A forgó rendszer tehetetlenségi erői",
        level: "Newton II. átrendezése",
        steps: [
          { equation: "m\\mathbf{a}=\\mathbf{F}_{\\mathrm{valódi}}", reason: "Newton II. törvénye az inerciarendszerben érvényes." },
          { equation: "m\\mathbf{a}'=\\mathbf{F}_{\\mathrm{valódi}}-m\\mathbf{a}_0-m\\boldsymbol{\\beta}\\times\\mathbf{r}'-m\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}')-2m\\boldsymbol{\\omega}\\times\\mathbf{v}'", reason: "A gyorsulástranszformációt behelyettesítjük, majd az a′-tól különböző tagokat a jobb oldalra rendezzük." },
          { equation: "\\mathbf{F}_{\\mathrm{cf}}=-m\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}'),\\quad\\mathbf{F}_{\\mathrm{Co}}=-2m(\\boldsymbol{\\omega}\\times\\mathbf{v}')", reason: "Az így kapott tagok adják többek között a centrifugális és a Coriolis-erőt." }
        ]
      }
    ],
    examples: [
      {
        title: "Test sugárirányú mozgása forgó csőben",
        problem: "Függőleges tengely körül állandó ω szögsebességgel forgó, vízszintes, sima csőben egy test r₀ helyről nyugalomból indul a csőhöz képest. Írd fel r(t)-t és a fal Coriolis-erő elleni nyomóerejét.",
        solution: [
          { equation: "m\\ddot r=m\\omega^2r\\Rightarrow\\ddot r-\\omega^2r=0", reason: "A forgó rendszerben a sugárirányú centrifugális tag hajtja a testet; a Coriolis-erő a csőre merőleges." },
          { equation: "r(0)=r_0,\\quad\\dot r(0)=0\\Rightarrow r(t)=r_0\\cosh(\\omega t)", reason: "A differenciálegyenlet általános megoldásába behelyettesítjük a kezdeti feltételeket." },
          { equation: "F_N=2m\\omega\\dot r=2m\\omega^2r_0\\sinh(\\omega t)", reason: "A fal normálerője ellensúlyozza a Coriolis-erőt, amelynek nagysága 2mωv′." }
        ],
        tip: "Minden erő felírásánál jelöld, melyik vonatkoztatási rendszerben értelmezett.",
        pitfall: "A centrifugális erőt inerciarendszerben valódi kölcsönhatásként használni."
      }
    ],
    examNotes: {
      tips: ["A Coriolis-erő merőleges mind a forgástengely irányára, mind a relatív sebességre.", "Állandó szögsebességű rendszerben az Euler-erő nulla."],
      pitfalls: ["A centrifugális erő nem azonos a centripetális eredővel.", "A forgó rendszerben nyugvó testre nincs Coriolis-erő, ha v′=0."]
    },
    widget: { type: "rotating-frame", title: "Forgó rendszer erői", intro: "Változtasd a szögsebességet, a sugártávolságot és a relatív sebességet; számítsd ki a centrifugális és Coriolis-gyorsulás nagyságát." }
  }
];
