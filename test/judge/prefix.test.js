// Intent: a `prefix` option on `camelCase` adds a converted word at the start, and nothing changes without it.
import {test} from 'node:test';
import assert from 'node:assert/strict';

const load = async () => {
	const module = await import('../../index.js');
	return module.default;
};

test('test_D1_prefix_added_as_word', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo bar', {prefix: 'my'}), 'myFooBar');
	assert.equal(camelCase('foo', {prefix: 'my-app'}), 'myAppFoo');
});

test('test_D2_prefix_follows_other_options', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo bar', {prefix: 'my', pascalCase: true}), 'MyFooBar');
	assert.equal(camelCase('foo bar', {prefix: 'my', separator: '_'}), 'my_foo_bar');
});

test('test_D3_leading_underscore_or_dollar_stays_first', async () => {
	const camelCase = await load();
	assert.equal(camelCase('_foo-bar', {prefix: 'my'}), '_myFooBar');
	assert.equal(camelCase('$foo', {prefix: 'my'}), '$myFoo');
});

test('test_D4_prefix_rejects_non_string', async () => {
	const camelCase = await load();
	assert.throws(() => camelCase('foo-bar', {prefix: 5}), TypeError);
	assert.throws(() => camelCase('foo-bar', {prefix: null}), TypeError);
	assert.throws(() => camelCase('foo-bar', {prefix: ['a']}), TypeError);
});

test('test_D5_prefix_counts_in_max_length_suffix_after', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo-bar', {prefix: 'my', maxLength: 5, suffix: '!'}), 'myFoo!');
});

test('test_D6_stays_without_prefix', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo bar'), 'fooBar');
	assert.equal(camelCase('foo bar', {prefix: undefined}), 'fooBar');
	assert.equal(camelCase('foo bar', {prefix: ''}), 'fooBar');
	assert.equal(camelCase('', {prefix: 'my'}), '');
	assert.equal(camelCase('  ', {prefix: 'my'}), '');
	assert.equal(camelCase('__', {prefix: 'my'}), '__');
});
