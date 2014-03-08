var assert = require('assert');
var store = require('../src/store');
var notes = [store.normalize({id: 1, title: '  deploy  ', body: 'run rsync', tags: ['ops']}), store.normalize({id: 2, title: 'shopping', tags: ['home']})];
assert.strictEqual(notes[0].title, 'deploy');
assert.strictEqual(store.search(notes, 'OPS').length, 1);
assert.strictEqual(store.search(notes, 'missing').length, 0);
assert.strictEqual(store.parse(JSON.stringify(notes)).length, 2);
assert.throws(function () { store.parse('{}'); });
console.log('store tests passed');
