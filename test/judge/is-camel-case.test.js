import {test} from 'node:test';
import assert from 'node:assert/strict';

const loadModule = async () => import('../../index.js');

test('test_D1_true_for_camel_case', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	assert.equal(isCamelCase('fooBar'), true);
	assert.equal(isCamelCase('foo'), true);
	assert.equal(isCamelCase('a'), true);
	assert.equal(isCamelCase('foo2Bar'), true);
	assert.equal(isCamelCase('_fooBar'), true);
	assert.equal(isCamelCase('$fooBar'), true);
});

test('test_D2_false_for_other_forms', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	assert.equal(isCamelCase('FooBar'), false);
	assert.equal(isCamelCase('foo-bar'), false);
	assert.equal(isCamelCase('foo bar'), false);
	assert.equal(isCamelCase('foo_bar'), false);
	assert.equal(isCamelCase('fooBAR'), false);
	assert.equal(isCamelCase('foo2bar'), false);
	assert.equal(isCamelCase('fooBar '), false);
});

test('test_D3_false_for_no_word', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	assert.equal(isCamelCase(''), false);
	assert.equal(isCamelCase('_'), false);
	assert.equal(isCamelCase('$'), false);
});

test('test_D4_throws_for_non_string', async () => {
	const {isCamelCase} = await loadModule();
	assert.equal(typeof isCamelCase, 'function');
	assert.throws(() => isCamelCase(123), TypeError);
	assert.throws(() => isCamelCase(null), TypeError);
	assert.throws(() => isCamelCase(undefined), TypeError);
	assert.throws(() => isCamelCase(['fooBar']), TypeError);
});

test('test_D5_default_export_stays', async () => {
	const {default: camelCase} = await loadModule();
	assert.equal(camelCase('foo-bar'), 'fooBar');
});
