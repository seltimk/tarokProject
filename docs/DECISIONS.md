# Project decisions

- The app is an offline-first, front-end-only Bible and dictionary platform targeted at Nigerian languages.
- Local JSON data is the default source for the first release and can be switched to a REST backend by setting `VITE_DATA_SOURCE=api` and `VITE_API_BASE_URL`.
- Theme preference defaults to system and is persisted in localStorage to avoid flash-of-incorrect-theme on first paint.
- Language preference follows the browser default when no saved preference exists.
