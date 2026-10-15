// Intent: an `isPascalCase(string)` helper is true for a PascalCase string with a word, and throws a TypeError for a non-string.
import {test} from 'node:test';
import assert from 'node:assert/strict';

const loadPascal = async () => {
	const module = await import('../../index.js');
	assert.equal(typeof module.isPascalCase, 'function', 'isPascalCase must be a named export');
	return module.isPascalCase;
};

test('test_D1_pascal_case_strings_are_true', async () => {
	const isPascalCase = await loadPascal();
	assert.equal(isPascalCase('FooBar'), true);
	assert.equal(isPascalCase('Foo'), true);
});

test('test_D2_other_cases_are_false', async () => {
	const isPascalCase = await loadPascal();
	assert.equal(isPascalCase('fooBar'), false);
	assert.equal(isPascalCase('foo-bar'), false);
	assert.equal(isPascalCase('Foo-Bar'), false);
});

test('test_D3_string_without_word_is_false', async () => {
	const isPascalCase = await loadPascal();
	assert.equal(isPascalCase(''), false);
	assert.equal(isPascalCase('_'), false);
	assert.equal(isPascalCase('$'), false);
	assert.equal(isPascalCase('__'), false);
});

test('test_D4_non_string_throws_type_error', async () => {
	const isPascalCase = await loadPascal();
	assert.throws(() => isPascalCase(1), TypeError);
	assert.throws(() => isPascalCase(null), TypeError);
	assert.throws(() => isPascalCase(undefined), TypeError);
	assert.throws(() => isPascalCase(['FooBar']), TypeError);
});

test('test_D5_is_camel_case_stays', async () => {
	const {isCamelCase} = await import('../../index.js');
	assert.equal(isCamelCase('fooBar'), true);
	assert.equal(isCamelCase('FooBar'), false);
});
