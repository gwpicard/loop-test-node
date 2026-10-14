import {test} from 'node:test';
import assert from 'node:assert/strict';

const loadModule = async () => import('../../index.js');

test('test_D1_true_for_camel_case', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	for (const string of ['fooBar', 'foo', 'a', 'foo2Bar', '_fooBar', '$fooBar']) {
		assert.equal(isCamelCase(string), true, string);
	}
});

test('test_D2_false_for_other_forms', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	for (const string of ['FooBar', 'foo-bar', 'foo bar', 'foo_bar', 'fooBAR', 'foo2bar', 'fooBar ']) {
		assert.equal(isCamelCase(string), false, string);
	}
});

test('test_D3_false_for_no_word', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	for (const string of ['', '_', '$']) {
		assert.equal(isCamelCase(string), false, JSON.stringify(string));
	}
});

test('test_D4_throws_for_non_string', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	for (const value of [123, null, undefined, ['fooBar']]) {
		assert.throws(() => isCamelCase(value), TypeError);
	}
});

test('test_D5_default_export_stays', async () => {
	const {default: camelCase} = await loadModule();
	assert.equal(camelCase('foo-bar'), 'fooBar');
});
