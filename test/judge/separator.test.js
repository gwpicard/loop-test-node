import {test} from 'node:test';
import assert from 'node:assert/strict';

const load = async () => {
	const module = await import('../../index.js');
	return module.default;
};

test('D1_separator_joins_words', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo bar', {separator: '_'}), 'foo_bar');
	assert.equal(camelCase('foo--bar.baz', {separator: '_'}), 'foo_bar_baz');
	assert.equal(camelCase('-foo bar-', {separator: '_'}), 'foo_bar');
	assert.equal(camelCase(['foo', 'bar baz'], {separator: '+'}), 'foo+bar+baz');
});

test('D2_separator_lowercases_and_splits_humps', async () => {
	const camelCase = await load();
	assert.equal(camelCase('Foo BAR baz', {separator: '_'}), 'foo_bar_baz');
	assert.equal(camelCase('fooBar baz', {separator: '-'}), 'foo-bar-baz');
});

test('D3_separator_wins_over_other_options', async () => {
	const camelCase = await load();
	assert.equal(camelCase('Foo bar', {separator: '_', pascalCase: true}), 'foo_bar');
	assert.equal(camelCase('foo BAR', {separator: '_', preserveConsecutiveUppercase: true}), 'foo_bar');
	assert.equal(camelCase('foo 2bar', {separator: '_', capitalizeAfterNumber: false}), 'foo_2bar');
});

test('D4_separator_keeps_prefix_and_allows_empty', async () => {
	const camelCase = await load();
	assert.equal(camelCase('__foo bar', {separator: '-'}), '__foo-bar');
	assert.equal(camelCase('$foo bar', {separator: '-'}), '$foo-bar');
	assert.equal(camelCase('foo bar', {separator: ''}), 'foobar');
});

test('D5_separator_must_be_a_string', async () => {
	const camelCase = await load();
	assert.throws(() => camelCase('foo bar', {separator: 1}), TypeError);
	assert.throws(() => camelCase('foo bar', {separator: null}), TypeError);
});

test('D6_without_separator_output_is_unchanged', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo bar'), 'fooBar');
	assert.equal(camelCase('foo bar', {separator: undefined}), 'fooBar');
	assert.equal(camelCase('foo-bar', {pascalCase: true}), 'FooBar');
});
