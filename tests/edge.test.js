var assert = require('assert');
var store = require('../src/store');
assert.deepStrictEqual(store.normalize({id: '1', tags: 'wrong'}).tags, []);
assert.strictEqual(store.search([store.normalize({id: '1', tags: 'wrong'})], 'x').length, 0);
console.log('edge tests passed');
