// Intent: the `isPascalCase(string)` helper is documented in the README and type tested, and its edge cases stay fixed.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const readText = async path => readFile(new URL(path, import.meta.url), 'utf8');

const loadModule = async () => import('../../index.js');

test('test_D1_readme_has_is_pascal_case_heading_in_place', async () => {
	const readme = await readText('../../README.md');
	const camel = readme.indexOf('### isCamelCase(string)');
	const pascal = readme.indexOf('### isPascalCase(string)');
	const related = readme.indexOf('## Related');
	assert.notEqual(camel, -1, 'README must keep the isCamelCase heading');
	assert.notEqual(pascal, -1, 'README must have the isPascalCase heading');
	assert.notEqual(related, -1, 'README must keep the Related heading');
	assert.ok(pascal > camel, 'isPascalCase heading must come after isCamelCase');
	assert.ok(pascal < related, 'isPascalCase heading must come before Related');
});

test('test_D2_readme_section_has_example_and_rules', async () => {
	const readme = await readText('../../README.md');
	const start = readme.indexOf('### isPascalCase(string)');
	assert.notEqual(start, -1, 'README must have the isPascalCase heading');
	const rest = readme.slice(start + 1);
	const next = rest.search(/^#{2,} /mv);
	const section = next === -1 ? rest : rest.slice(0, next);

	assert.match(section, /```js\n[\s\S]*```/v, 'section needs a js example');
	assert.match(section, /isPascalCase\('FooBar'\);?\s*\/\/[^\n]*true/v);
	assert.match(section, /isPascalCase\('fooBar'\);?\s*\/\/[^\n]*false/v);
	assert.match(section, /no word/iv);
	assert.match(section, /false/v);
	assert.match(section, /TypeError/v);
});

test('test_D3_type_test_covers_is_pascal_case', async () => {
	const types = await readText('../../index.test-d.ts');
	assert.match(types, /import [^;]*isPascalCase[^;]*from '\.\/index\.js'/v);
	assert.match(types, /expectTypeOf\(isPascalCase\('FooBar'\)\)\.toBe<boolean>\(\)/v);
	assert.match(types, /expectError\(isPascalCase\(1\)\)/v);
	assert.match(types, /expectError\(isPascalCase\(null\)\)/v);
	assert.match(types, /expectError\(isPascalCase\(\['FooBar'\]\)\)/v);
});

test('test_D4_stays_true_edge_cases', async () => {
	const {isPascalCase} = await loadModule();
	const values = ['_FooBar', '$FooBar', 'Foo2Bar', 'Éclair', 'F'];
	assert.deepEqual(values.map(value => isPascalCase(value)), values.map(() => true));
});

test('test_D5_stays_false_edge_cases', async () => {
	const {isPascalCase} = await loadModule();
	const values = ['Foo2bar', 'FooBAR', 'FOO', 'f', 'Foo Bar', 'Foo_Bar'];
	assert.deepEqual(values.map(value => isPascalCase(value)), values.map(() => false));
});

test('test_D6_stays_matches_camel_case_pascal_option', async () => {
	const {default: camelCase, isPascalCase, isCamelCase} = await loadModule();
	const values = ['FooBar', 'fooBar', 'Foo2Bar', 'FOO', 'Foo_Bar', '_FooBar', 'f'];
	assert.deepEqual(
		values.map(value => isPascalCase(value)),
		values.map(value => camelCase(value, {pascalCase: true}) === value),
	);

	assert.equal(isCamelCase('FooBar'), false);
});
