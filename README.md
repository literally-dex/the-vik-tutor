# BME VIK Tanulási Kisokos

Egy helyen a BME VIK-es jegyzetek, a fontos fogalmak és a gyakorlófeladatok — hogy zh előtt ne kelljen öt külön mappában keresgélni.

## Mit találsz itt?

- **Törzsanyag:** tantárgyak szerint rendezett előadási jegyzetek, keresővel és címkékkel.
- **ZH-k és vizsgák:** feladatsorok, ahol a megoldásokat külön nyithatod le, ha már próbálkoztál.
- **Képletgyűjtemény és fogalomtár:** tantárgyak szerint rendszerezett fontos képletek és rövid, érthető fogalommagyarázatok.

Az oldal folyamatosan bővül. A tananyagok a `src/data/coursesData.json`, a feladatsorok pedig a `src/data/examsData.json` fájlból töltődnek be.

## Kiemelt részek és képletek

A jegyzetben a kritikus megjegyzéseket Obsidian-calloutként jelöld:

```md
> [!critical] Erre külön figyelj a feladatmegoldásnál.
```

A képletgyűjteménybe a `<!-- key-formula -->` megjegyzéssel jelölt képletek kerülnek. A jelölést írd közvetlenül egy önálló képletblokk elé, vagy egy felsoroláselem elé, amely inline képleteket tartalmaz. A gyűjtemény a tantárgyat és a képletet megelőző legközelebbi `##` vagy `###` címet használja szűréshez:

```md
## Határértékek

<!-- key-formula -->
$$
\lim_{x \to 0}\frac{\sin x}{x}=1
$$
```

## Nézd meg az oldalt

[BME VIK Tanulási Kisokos megnyitása](https://literally-dex.github.io/the-vik-tutor/)

## Futtatás a gépeden

Klónozd le ezt a repót, majd indíts egy egyszerű helyi webszervert a projekt mappájában:

```sh
python3 -m http.server 8000
```

Ezután nyisd meg a [http://localhost:8000](http://localhost:8000) címet. Csomagtelepítésre nincs szükség.

## Jegyzetek és feladatsorok frissítése

A jegyzetek Markdown-tartalma a JSON `fullContent` mezőjében van; az előadás száma és címe külön sorokként is megadható a `title` mezőben. A ZH- és vizsgafeladatok a `examsData.json` fájlban szerepelnek. Új tartalom hozzáadásakor tartsd meg a fájlok meglévő adatszerkezetét, hogy az oldal megfelelően tudja megjeleníteni.
