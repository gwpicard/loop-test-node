// Intent: the README documents the `isKebabCase(string)` helper in an entry after `isCamelCase` and before `## Related`, with a `js` example and its rules.
import fs from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const readReadme = () => fs.readFileSync(new URL('../../README.md', import.meta.url), 'utf8');

const kebabHeading = '### isKebabCase(string)';
const camelHeading = '### isCamelCase(string)';
const relatedHeading = '## Related';

// Return the text after the whole heading line, up to the next `##`, `###` or `####` heading line.
const sliceSection = (text, heading) => {
	const start = text.indexOf(heading);
	if (start === -1) {
		return undefined;
	}

	const body = text.slice(start + heading.length);
	const next = body.search(/\n#{2,4} /v);
	return next === -1 ? body : body.slice(0, next);
};

// Return the body of the first `js` code block in a section.
const jsExample = section => /```js\n(?<code>[\s\S]*?)```/v.exec(section)?.groups.code;

// Match a call and its `//=>` result on the same line or on the next line.
const resultPattern = (name, argument, result) =>
	new RegExp(String.raw`${name}\('${argument}'\);?[\t ]*(?:\n[\t ]*)?//=> ${result}\b`, 'v');

test('test_D1_readme_has_kebab_heading_between_camel_and_related', () => {
	const readme = readReadme();
	const kebab = readme.indexOf(kebabHeading);
	const camel = readme.indexOf(camelHeading);
	const related = readme.indexOf(relatedHeading);
	assert.notEqual(kebab, -1, 'README must have the isKebabCase heading');
	assert.notEqual(camel, -1, 'README must have the isCamelCase heading');
	assert.ok(kebab > camel, 'isKebabCase heading must come after isCamelCase heading');
	assert.notEqual(related, -1, 'README must have the ## Related heading');
	assert.ok(kebab < related, 'isKebabCase heading must come before ## Related');
});

test('test_D2_kebab_section_has_example_and_rules', () => {
	const section = sliceSection(readReadme(), kebabHeading);
	assert.notEqual(section, undefined, 'README must have the isKebabCase section');

	const example = jsExample(section);
	assert.notEqual(example, undefined, 'section must hold a js example');
	assert.match(example, resultPattern('isKebabCase', 'foo-bar', 'true'));
	assert.match(example, resultPattern('isKebabCase', 'fooBar', 'false'));

	assert.match(section, /lowercase letters and digits/v);
	assert.match(section, /single hyphens?/v);
	assert.match(section, /TypeError/v);
});

test('test_D2_section_slice_starts_after_heading_and_stops_at_next_heading', () => {
	const fixture = [
		'## Usage',
		'',
		'### one(string)',
		'',
		'Alpha text.',
		'',
		'#### detail',
		'',
		'Hidden text.',
		'',
		'### two(string)',
		'',
		'Beta text.',
		'',
		'## End',
		'',
		'Tail text.',
		'',
	].join('\n');

	const one = sliceSection(fixture, '### one(string)');
	assert.ok(one.includes('Alpha text.'));
	assert.ok(!one.includes('### one(string)'));
	assert.ok(!one.includes('Hidden text.'));
	assert.ok(!one.includes('Beta text.'));

	const two = sliceSection(fixture, '### two(string)');
	assert.ok(two.includes('Beta text.'));
	assert.ok(!two.includes('Tail text.'));

	assert.equal(sliceSection(fixture, '### missing(string)'), undefined);
});

test('test_D3_is_kebab_case_behavior_stays', async () => {
	const {isKebabCase} = await import('../../index.js');
	assert.deepEqual(['foo-bar', 'foo', 'foo2-bar'].map(value => isKebabCase(value)), [true, true, true]);
	assert.deepEqual(
		['fooBar', 'Foo', '', 'foo--bar', '-foo', 'foo-'].map(value => isKebabCase(value)),
		[false, false, false, false, false, false],
	);

	assert.throws(() => isKebabCase(1), TypeError);
});

test('test_D4_camel_case_readme_section_stays', () => {
	const section = sliceSection(readReadme(), camelHeading);
	assert.notEqual(section, undefined, 'README must keep the isCamelCase section');
	const example = jsExample(section);
	assert.notEqual(example, undefined, 'isCamelCase section must hold a js example');
	assert.match(example, resultPattern('isCamelCase', 'fooBar', 'true'));
});
