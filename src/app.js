(function () {
  'use strict';
  var KEY = 'noteshelf.v1', all = [], current = null;
  function el(id) { return document.getElementById(id); }
  function announce(text) { el('message').textContent = text; }
  function load() { try { all = NoteStore.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { all = []; announce('Stored notes could not be read.'); } }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(all)); return true; } catch (e) { announce('Storage unavailable: ' + e.message); return false; } }
  function select(id) {
    var i, note = null;
    for (i = 0; i < all.length; i++) if (all[i].id === id) note = all[i];
    current = note ? note.id : null;
    el('title').value = note ? note.title : '';
    el('body').value = note ? note.body : '';
    el('tags').value = note ? note.tags.join(', ') : '';
  }
  function render() {
    var notes = NoteStore.search(all, el('query').value), list = el('notes'), i, li, button;
    list.innerHTML = '';
    for (i = 0; i < notes.length; i++) {
      li = document.createElement('li'); button = document.createElement('button');
      button.textContent = notes[i].title || 'Untitled'; button.setAttribute('data-id', notes[i].id);
      li.appendChild(button); list.appendChild(li);
    }
  }
  function save() {
    var note, i, tags = el('tags').value.split(','), clean = [];
    for (i = 0; i < tags.length; i++) if (tags[i].replace(/^\s+|\s+$/g, '')) clean.push(tags[i].replace(/^\s+|\s+$/g, ''));
    note = NoteStore.normalize({id: current || String(new Date().getTime()) + '-' + Math.floor(Math.random() * 100000), title: el('title').value, body: el('body').value, tags: clean, updated: new Date().toISOString()});
    for (i = 0; i < all.length; i++) if (all[i].id === note.id) { all.splice(i, 1); break; }
    all.unshift(note); current = note.id;
    if (persist()) { render(); announce('Saved locally.'); }
  }
  el('save').onclick = save;
  el('new').onclick = function () { select(null); announce('New note.'); };
  el('remove').onclick = function () { if (!current) return; all = all.filter(function (n) { return n.id !== current; }); select(null); if (persist()) { render(); announce('Note deleted.'); } };
  el('notes').onclick = function (e) { if (e.target.getAttribute('data-id')) select(e.target.getAttribute('data-id')); };
  el('query').onkeyup = render;
  load(); render();
}());
