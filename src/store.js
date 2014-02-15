/* NoteShelf store: ES5, no dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NoteStore = factory();
}(this, function () {
  'use strict';
  function normalize(note) {
    return {
      id: String(note.id), title: String(note.title || '').replace(/^\s+|\s+$/g, ''),
      body: String(note.body || ''), tags: note.tags || [], updated: note.updated || ''
    };
  }
  function search(notes, query) {
    var q = String(query || '').toLowerCase(), out = [], i, hay;
    for (i = 0; i < notes.length; i++) {
      hay = (notes[i].title + ' ' + notes[i].body + ' ' + notes[i].tags.join(' ')).toLowerCase();
      if (hay.indexOf(q) !== -1) out.push(notes[i]);
    }
    return out;
  }
  function parse(text) {
    var value = JSON.parse(text);
    if (!value || Object.prototype.toString.call(value) !== '[object Array]') throw new Error('Expected a list of notes');
    return value.map(normalize);
  }
  return { normalize: normalize, search: search, parse: parse };
}));
