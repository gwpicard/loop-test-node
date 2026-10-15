# camelcase

> Convert a dash/dot/underscore/space separated string to camelCase or PascalCase: `foo-bar` → `fooBar`

Correctly handles Unicode strings.

If you use this on untrusted user input, don't forget to limit the length to something reasonable.

## Install

```sh
npm install camelcase
```

## Usage

```js
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

> [!NOTE]
> Not idempotent in general. `camelCase('{ A')` → `'{A'`, but `camelCase('{A')` → `'{a'`.
>
> Mixed case input is not idempotent either, because the word boundaries have to be guessed: `camelCase('Ac_c A')` → `'acCA'`, but `camelCase('acCA')` → `'acCa'`.

## API

### camelCase(input, options?)

#### input

Type: `string | readonly string[]`

The string to convert to camel case.

#### options

Type: `object`

##### pascalCase

Type: `boolean`\
Default: `false`

Uppercase the first character: `foo-bar` → `FooBar`

```js
import camelCase from 'camelcase';

camelCase('foo-bar', {pascalCase: true});
//=> 'FooBar'

camelCase('foo-bar', {pascalCase: false});
//=> 'fooBar'
```

##### preserveConsecutiveUppercase

Type: `boolean`\
Default: `false`

Preserve consecutive uppercase characters: `foo-BAR` → `fooBAR`

```js
import camelCase from 'camelcase';

camelCase('foo-BAR', {preserveConsecutiveUppercase: true});
//=> 'fooBAR'

camelCase('foo-BAR', {preserveConsecutiveUppercase: false});
//=> 'fooBar'
```

##### capitalizeAfterNumber

Type: `boolean`\
Default: `true`

Controls whether letters immediately following digits are treated as word boundaries.

When `true` (default):
Capitalize the first letter immediately following a numeric sequence, unless that letter is itself immediately followed by a separator. This is similar to Lodash, which also capitalizes after a number, but without the separator condition.

The extra condition keeps a token like `b2b` intact, so `b2b_registration` becomes `b2bRegistration` rather than `b2BRegistration`. It also means a trailing separator can stop the capitalization, as in `1a` → `1A` but `1a.` → `1a`.

When `false`:
Do not treat digits as word boundaries. Preserve the original case of letters immediately following digits. Separators still create word boundaries. This follows the Google Java Style Guide which treats numbers as non-boundary characters.

```js
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

##### separator

Type: `string`\
Default: `undefined`

Join the words with this string, in lowercase, instead of making camel case. This option wins over `pascalCase`, `preserveConsecutiveUppercase` and `capitalizeAfterNumber`. A leading `_` or `$` prefix stays. A value that is not a string throws a `TypeError`.

```js
import camelCase from 'camelcase';

camelCase('foo bar', {separator: '_'});
//=> 'foo_bar'

camelCase('fooBar baz', {separator: '-'});
//=> 'foo-bar-baz'

camelCase('foo bar', {separator: ''});
//=> 'foobar'
```

##### maxLength

Type: `number`\
Default: `undefined`

The `maxLength` option cuts the result to at most this many code points. A leading `_` or `$` prefix counts. A value that is not a non-negative integer throws a `TypeError`.

```js
import camelCase from 'camelcase';

camelCase('foo-bar-baz', {maxLength: 5});
//=> 'fooBa'

camelCase('__foo-bar', {maxLength: 4});
//=> '__fo'
```

##### suffix

Type: `string`\
Default: `undefined`

The `suffix` option adds this string to the end of the result, as is. The suffix is not added when the input has no word. A value that is not a string throws a `TypeError`.

With `maxLength`, the cut comes first and the suffix comes after. The suffix is never cut. The result can be longer than `maxLength`.

```js
import camelCase from 'camelcase';

camelCase('foo-bar', {suffix: 'Id'});
//=> 'fooBarId'

camelCase('foo-bar', {pascalCase: true, suffix: 'Id'});
//=> 'FooBarId'

camelCase('foo bar', {separator: '_', suffix: '!'});
//=> 'foo_bar!'
```

##### prefix

Type: `string`\
Default: `undefined`

The `prefix` option adds this string as a word at the start of the input. The prefix is converted like the input, so `pascalCase`, `separator` and `locale` act on it. It comes after a leading `_` or `$`. The prefix is not added when the input has no word. A value that is not a string throws a `TypeError`.

With `maxLength`, the prefix counts in the cut. The suffix comes after the cut.

```js
import camelCase from 'camelcase';

camelCase('foo bar', {prefix: 'my'});
//=> 'myFooBar'

camelCase('foo bar', {prefix: 'my', pascalCase: true});
//=> 'MyFooBar'

camelCase('_foo-bar', {prefix: 'my'});
//=> '_myFooBar'
```

##### locale

Type: `false | string | readonly string[]`\
Default: The host environment’s current locale.

The locale parameter indicates the locale to be used to convert to upper/lower case according to any locale-specific case mappings. If multiple locales are given in an array, the best available locale is used.

```js
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

```js
import camelCase from 'camelcase';

// On a platform with `tr-TR`.

camelCase('lorem-ipsum');
//=> 'loremİpsum'

camelCase('lorem-ipsum', {locale: false});
//=> 'loremIpsum'
```

### isCamelCase(string)

Check if a string is already in camelCase form. It returns `true` or `false`.

A string with no word, such as `''`, `'_'` or `'$'`, gives `false`. A non-string input throws a `TypeError`. The check uses the default `camelCase` behavior and takes no options.

```js
import {isCamelCase} from 'camelcase';

isCamelCase('fooBar');
//=> true

isCamelCase('foo-bar');
//=> false
```

### isPascalCase(string)

Check if a string is already in PascalCase form. It returns `true` or `false`.

A string with no word, such as `''`, `'_'` or `'$'`, gives `false`. A non-string input throws a `TypeError`. The check uses the default `camelCase` behavior with `pascalCase: true` and takes no options.

```js
import {isPascalCase} from 'camelcase';

isPascalCase('FooBar');
//=> true

isPascalCase('fooBar');
//=> false
```

## Related

- [decamelize](https://github.com/sindresorhus/decamelize) - The inverse of this module
- [titleize](https://github.com/sindresorhus/titleize) - Capitalize every word in string
- [humanize-string](https://github.com/sindresorhus/humanize-string) - Convert a camelized/dasherized/underscored string into a humanized one
- [camelcase-keys](https://github.com/sindresorhus/camelcase-keys) - Convert object keys to camel case
