# a-three

> adjective + adjective + animal

Cute, human-readable ID strings — useful for slugs, temp names, and anything that shouldn't look like `a7f3c9`.

Inspired by [adjective-adjective-animal](https://github.com/a-type/adjective-adjective-animal) by Grant Forrest.

## Install

```sh
npm install -g a-three
# or use without installing:
npx a-three
```

## CLI

```sh
a3
# => turquoise mossy otter

a3 -a 1 -f param
# => brisk-otter

a3 --format camel
# => turquoiseMossyOtter
```

| Flag | Alias | Default | Description |
|------|-------|---------|-------------|
| `--adjectives` | `-a` | `2` | Number of adjectives before the animal |
| `--format` | `-f` | `string` | Output format (`string`, `camel`, `pascal`, `snake`, `param`, `capital`, `constant`, `smooshed`, `random`) |
| `--seed` | `-s` | _(none)_ | Deterministic output: the same seed always gives the same name |

```sh
a3 -s user-42
# => same name every time for "user-42"
```

Invalid input prints `Error [CODE]: message` to stderr and exits with code `1`.

The `aaa` binary is an alias for `a3`.

## Programmatic usage

```js
import a3, {generate, format} from 'a-three';

// array of words (default)
const words = a3();           // ['turquoise', 'mossy', 'otter']
const words2 = a3(1);         // ['brisk', 'otter']

// formatted string
const slug = a3(2, 'param');  // 'turquoise-mossy-otter'

// lower-level helpers
generate(2);                  // ['turquoise', 'mossy', 'otter']
format('turquoise mossy otter', 'pascal'); // 'TurquoiseMossyOtter'
```

### Deterministic names

Pass a `seed` (string, finite number, or bigint) to get the same words every time:

```js
a3(2, 'param', {seed: 'user-42'});   // always the same 'adjective-adjective-animal'
generate(2, {seed: 'user-42'});      // always the same array
```

Without a seed, words come from `crypto.randomInt`. With one, they come from a stream derived from
HMAC-SHA256 of the seed (unbiased, platform-independent). `1` and `'1'` are the same seed.
Seeded output is only stable while the word lists stay the same, so don't treat it as a permanent
identifier across package versions.

### Errors

Invalid input throws an `A3Error` (never a "sorry" string). Match on `error.code`; `error.details`
holds a JSON-serializable `{expected, received}`.

| Code | Thrown when |
|------|-------------|
| `INVALID_ADJECTIVE_COUNT` | adjective count is not an integer from 0 to 100 |
| `INVALID_SEED` | seed is not a non-empty string, finite number, or bigint |
| `UNSUPPORTED_FORMAT` | format name isn't one of the supported formats |

```js
import a3, {A3Error, ErrorCodes} from 'a-three';

try {
  a3(2, 'nope');
} catch (error) {
  if (error instanceof A3Error && error.code === ErrorCodes.UNSUPPORTED_FORMAT) {
    console.log(error.details.expected); // list of supported formats
  }
}
```

## License

[Unlicense](https://unlicense.org) (public domain)
