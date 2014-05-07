# NoteShelf

A small offline note library. Keep meeting snippets, commands and ideas locally in the browser.

No login, server or installation. Open `index.html` in a browser.
The data lives in that browser's localStorage; export backups occasionally.

## Development

The data helpers use ES5 JavaScript so the browser app needs no build step.
Run `node tests/store.test.js && node tests/edge.test.js` to exercise parsing.
