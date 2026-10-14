export type Options = {
	/**
	Uppercase the first character: `foo-bar` → `FooBar`

	@default false

	@example
	```
	import camelCase from 'camelcase';

	camelCase('foo-bar', {pascalCase: true});
	//=> 'FooBar'

	camelCase('foo-bar', {pascalCase: false});
	//=> 'fooBar'
	```
	*/
	readonly pascalCase?: boolean;

	/**
	Preserve consecutive uppercase characters: `foo-BAR` → `fooBAR`

	@default false

	@example
	```
	import camelCase from 'camelcase';

	camelCase('foo-BAR', {preserveConsecutiveUppercase: true});
	//=> 'fooBAR'

	camelCase('foo-BAR', {preserveConsecutiveUppercase: false});
	//=> 'fooBar'
	```
	*/
	readonly preserveConsecutiveUppercase?: boolean;

	/**
	Controls whether letters immediately following digits are treated as word boundaries.

	When `true` (default):
	Capitalize the first letter immediately following a numeric sequence, unless that letter is itself immediately followed by a separator. This is similar to Lodash, which also capitalizes after a number, but without the separator condition.

	The extra condition keeps a token like `b2b` intact, so `b2b_registration` becomes `b2bRegistration` rather than `b2BRegistration`. It also means a trailing separator can stop the capitalization, as in `1a` → `1A` but `1a.` → `1a`.

	When `false`:
	Do not treat digits as word boundaries. Preserve the original case of letters immediately following digits. Separators still create word boundaries. This follows the Google Java Style Guide which treats numbers as non-boundary characters.

	@default true

	@example
	```
	import camelCase from 'camelcase';

	camelCase('foo2bar', {capitalizeAfterNumber: true});
	//=> 'foo2Bar'  (capitalizes 'b' after digit)

	camelCase('foo2bar', {capitalizeAfterNumber: false});
	//=> 'foo2bar'  (preserves lowercase 'b')

	// Preserves original case after numbers when false
	camelCase('Textures_3d', {capitalizeAfterNumber: false});
	//=> 'textures3d'  (preserves lowercase 'd')

	camelCase('Textures_3D', {capitalizeAfterNumber: false});
	//=> 'textures3D'  (preserves uppercase 'D')

	// Separators still create boundaries
	camelCase('foo_2_bar', {capitalizeAfterNumber: false});
	//=> 'foo2Bar'  ('bar' follows separator, not digit)
	```
	*/
	readonly capitalizeAfterNumber?: boolean;

	/**
	Join the words with this string, in lowercase, instead of making camel case. This option wins over `pascalCase`, `preserveConsecutiveUppercase` and `capitalizeAfterNumber`. A leading `_` or `$` prefix stays. A value that is not a string throws a `TypeError`.

	@default undefined

	@example
	```
	import camelCase from 'camelcase';

	camelCase('foo bar', {separator: '_'});
	//=> 'foo_bar'

	camelCase('fooBar baz', {separator: '-'});
	//=> 'foo-bar-baz'
	```
	*/
	readonly separator?: string;

	/**
	Cut the result to at most this many code points. A leading `_` or `$` prefix counts. A value that is not a non-negative integer throws a `TypeError`.

	@default undefined

	@example
	```
	import camelCase from 'camelcase';

	camelCase('foo-bar-baz', {maxLength: 5});
	//=> 'fooBa'
	```
	*/
	readonly maxLength?: number;

	/**
	Add this string to the end of the result, as is. The suffix is not added when the input has no word. A value that is not a string throws a `TypeError`. With `maxLength`, the cut comes first and the suffix is never cut.

	@default undefined

	@example
	```
	import camelCase from 'camelcase';

	camelCase('foo-bar', {suffix: 'Id'});
	//=> 'fooBarId'

	camelCase('foo-bar', {pascalCase: true, suffix: 'Id'});
	//=> 'FooBarId'
	```
	*/
	readonly suffix?: string;

	/**
	The locale parameter indicates the locale to be used to convert to upper/lower case according to any locale-specific case mappings. If multiple locales are given in an array, the best available locale is used.

	Default: The host environment’s current locale.

	@example
	```
	import camelCase from 'camelcase';

	camelCase('lorem-ipsum', {locale: 'en-US'});
	//=> 'loremIpsum'

	camelCase('lorem-ipsum', {locale: 'tr-TR'});
	//=> 'loremİpsum'

	camelCase('lorem-ipsum', {locale: ['en-US', 'en-GB']});
	//=> 'loremIpsum'

	camelCase('lorem-ipsum', {locale: ['tr', 'TR', 'tr-TR']});
	//=> 'loremİpsum'
	```

	Setting `locale: false` ignores the platform locale and uses the [Unicode Default Case Conversion](https://unicode-org.github.io/icu/userguide/transforms/casemappings.html#simple-single-character-case-mapping) algorithm:

	@example
	```
	import camelCase from 'camelcase';

	// On a platform with `tr-TR`.

	camelCase('lorem-ipsum');
	//=> 'loremİpsum'

	camelCase('lorem-ipsum', {locale: false});
	//=> 'loremIpsum'
	```
	*/
	readonly locale?: false | string | readonly string[];
};

/**
Convert a dash/dot/underscore/space separated string to camelCase or PascalCase: `foo-bar` → `fooBar`.

Correctly handles Unicode strings.

@param input - The string to convert to camel case.

@example
```
import camelCase from 'camelcase';

camelCase('foo-bar');
//=> 'fooBar'

camelCase('foo_bar');
//=> 'fooBar'

camelCase('Foo-Bar');
//=> 'fooBar'

camelCase('розовый_пушистый_единорог');
//=> 'розовыйПушистыйЕдинорог'

camelCase('foo bar');
//=> 'fooBar'

console.log(process.argv[3]);
//=> '--foo-bar'
camelCase(process.argv[3]);
//=> 'fooBar'

camelCase(['foo', 'bar']);
//=> 'fooBar'

camelCase(['__foo__', '--bar']);
//=> '__fooBar'
```
*/
export default function camelcase(
	input: string | readonly string[],
	options?: Options,
): string;

/**
Check if a string is already in camelCase form. A string with no word, such as `''`, `'_'` or `'$'`, gives `false`.

It checks the default `camelCase` behavior only. It throws a `TypeError` for a non-string input.

@example
```
import {isCamelCase} from 'camelcase';

isCamelCase('fooBar');
//=> true

isCamelCase('foo-bar');
//=> false
```
*/
export function isCamelCase(string: string): boolean;
