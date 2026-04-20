# DominDev Portfolio WebDev

Statyczny frontend w `HTML + CSS (BEM) + Vanilla JS`, z przygotowanym miejscem na przyszły backend.

## Struktura

```text
.
|- frontend/
|  |- index.html
|  |- vite.config.js
|  |- assets/
|     |- css/main.css
|     |- js/main.js
|     |- icons/favicon.svg
|- backend/
|  |- README.md
|  |- config/
|  |- src/
|  |- tests/
|- _docs/
|- _scripts/
|- package.json
```

## Założenia

- frontend działa jako czysta warstwa prezentacji,
- brak frameworka UI i brak Tailwinda,
- CSS jest zorganizowany w BEM i zmiennych w `:root`,
- JavaScript odpowiada tylko za progresywne ulepszenia,
- `backend/` jest wydzielony już teraz, żeby później bez refaktoru dołożyć API, formularze, auth albo panel administracyjny.

## Uruchomienie

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Wynik buildu trafia do `dist/`.
