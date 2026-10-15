// Intent: an `isKebabCase(string)` helper is true for lowercase words joined by single hyphens, and throws a TypeError for a non-string.
import {test} from 'node:test';
import assert from 'node:assert/strict';

const loadKebab = async () => {
	const module = await import('../../index.js');
	assert.equal(typeof module.isKebabCase, 'function', 'isKebabCase must be a named export');
	return module.isKebabCase;
};

test('test_D1_kebab_case_strings_are_true', async () => {
	const isKebabCase = await loadKebab();
	assert.equal(isKebabCase('foo-bar'), true);
	assert.equal(isKebabCase('foo'), true);
	assert.equal(isKebabCase('foo-bar-baz'), true);
});

test('test_D2_other_strings_are_false', async () => {
	const isKebabCase = await loadKebab();
	assert.equal(isKebabCase(''), false);
	assert.equal(isKebabCase('Foo-bar'), false);
	assert.equal(isKebabCase('foo--bar'), false);
	assert.equal(isKebabCase('-foo'), false);
	assert.equal(isKebabCase('foo-'), false);
	assert.equal(isKebabCase('foo_bar'), false);
});

test('test_D3_non_string_throws_type_error', async () => {
	const isKebabCase = await loadKebab();
	assert.throws(() => isKebabCase(1), TypeError);
	assert.throws(() => isKebabCase(null), TypeError);
	assert.throws(() => isKebabCase(undefined), TypeError);
	assert.throws(() => isKebabCase(['foo-bar']), TypeError);
});

test('test_D4_is_camel_case_stays', async () => {
	const {isCamelCase} = await import('../../index.js');
	assert.equal(isCamelCase('fooBar'), true);
	assert.equal(isCamelCase('foo-bar'), false);
});
