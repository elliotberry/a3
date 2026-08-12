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

## License

[Unlicense](https://unlicense.org) (public domain)
