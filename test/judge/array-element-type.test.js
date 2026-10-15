// Intent: `camelCase` throws the clear input TypeError when an array holds a non-string element.
import {test} from 'node:test';
import assert from 'node:assert/strict';

const MESSAGE = 'Expected the input to be `string | string[]`';

const loadCamelCase = async () => {
	const module = await import('../../index.js');
	assert.equal(typeof module.default, 'function', 'camelCase must be the default export');
	return module.default;
};

test('test_D1_non_string_array_element_throws_clear_type_error', async () => {
	const camelCase = await loadCamelCase();
	const expected = {name: 'TypeError', message: MESSAGE};
	assert.throws(() => camelCase([1]), expected);
	assert.throws(() => camelCase([null]), expected);
	assert.throws(() => camelCase(['foo', undefined]), expected);
	assert.throws(() => camelCase([['foo']]), expected);
});

test('test_D2_valid_string_arrays_stay', async () => {
	const camelCase = await loadCamelCase();
	assert.equal(camelCase(['foo', 'bar']), 'fooBar');
	assert.equal(camelCase([' foo ', '', 'bar']), 'fooBar');
	assert.equal(camelCase([]), '');
});

test('test_D3_string_and_non_string_input_stay', async () => {
	const camelCase = await loadCamelCase();
	assert.equal(camelCase('foo-bar'), 'fooBar');
	assert.throws(() => camelCase(1), {name: 'TypeError', message: MESSAGE});
});
