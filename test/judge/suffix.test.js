import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const load = async () => {
	const module = await import('../../index.js');
	return module.default;
};

test('test_D1_suffix_added_as_is', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo-bar', {suffix: 'Id'}), 'fooBarId');
	assert.equal(camelCase('foo-bar', {pascalCase: true, suffix: 'Id'}), 'FooBarId');
	assert.equal(camelCase('foo-bar', {suffix: '_x'}), 'fooBar_x');
});

test('test_D2_suffix_rejects_non_string', async () => {
	const camelCase = await load();
	for (const suffix of [5, null, ['a']]) {
		assert.throws(() => camelCase('foo-bar', {suffix}), TypeError);
	}
});

test('test_D3_no_suffix_without_word', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo', {suffix: 'Id'}), 'fooId');
	assert.equal(camelCase('', {suffix: 'Id'}), '');
	assert.equal(camelCase('  ', {suffix: 'Id'}), '');
	assert.equal(camelCase('__', {suffix: 'Id'}), '__');
});

test('test_D4_suffix_with_separator', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo bar', {separator: '_', suffix: '!'}), 'foo_bar!');
});

test('test_D5_stays_without_suffix', async () => {
	const camelCase = await load();
	assert.equal(camelCase('foo-bar'), 'fooBar');
	assert.equal(camelCase('foo-bar', {suffix: ''}), 'fooBar');
	assert.equal(camelCase('foo-bar', {suffix: undefined}), 'fooBar');
});

test('test_D6_types_and_readme_name_suffix', () => {
	const types = fs.readFileSync(new URL('../../index.d.ts', import.meta.url), 'utf8');
	const readme = fs.readFileSync(new URL('../../README.md', import.meta.url), 'utf8');
	assert.match(types, /suffix\?: string/);
	assert.match(readme, /`suffix`/);
});
