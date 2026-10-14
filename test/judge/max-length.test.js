import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const load = async () => {
	const module = await import('../../index.js');
	return module.default;
};

test('test_D1_max_length_cuts_result', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo-bar-baz', {maxLength: 5}), 'fooBa');
	assert.equal(camelCase('foo-bar', {maxLength: 20}), 'fooBar');
	assert.equal(camelCase('foo-bar-baz', {pascalCase: true, maxLength: 5}), 'FooBa');
	assert.equal(camelCase('foo bar baz', {separator: '_', maxLength: 5}), 'foo_b');
});

test('test_D2_max_length_counts_code_points', async () => {
	const camelCase = await load();
	assert.equal(camelCase('𐐨𐐨𐐨', {maxLength: 2}), '𐐨𐐨');
	assert.equal(camelCase('foo-bar', {maxLength: 0}), '');
});

test('test_D3_max_length_counts_prefix', async () => {
	const camelCase = await load();
	assert.equal(camelCase('__foo-bar', {maxLength: 4}), '__fo');
	assert.equal(camelCase('$foo-bar', {maxLength: 3}), '$fo');
});

test('test_D4_max_length_rejects_bad_values', async () => {
	const camelCase = await load();
	assert.throws(() => camelCase('foo-bar', {maxLength: -1}), TypeError);
	assert.throws(() => camelCase('foo-bar', {maxLength: 1.5}), TypeError);
	assert.throws(() => camelCase('foo-bar', {maxLength: '5'}), TypeError);
	assert.throws(() => camelCase('foo-bar', {maxLength: NaN}), TypeError);
});

test('test_D5_stays_without_max_length', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo-bar-baz'), 'fooBarBaz');
	assert.equal(camelCase('foo-bar-baz', {maxLength: undefined}), 'fooBarBaz');
	assert.equal(camelCase('foo-bar-baz', {}), 'fooBarBaz');
});

test('test_D6_types_and_readme_name_max_length', () => {
	const types = fs.readFileSync(new URL('../../index.d.ts', import.meta.url), 'utf8');
	const readme = fs.readFileSync(new URL('../../README.md', import.meta.url), 'utf8');
	assert.match(types, /maxLength\?: number/v);
	assert.match(readme, /`maxLength`/v);
});
