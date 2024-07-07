# strtr-from-php

[![npm version](https://badgen.net/npm/v/strtr-from-php)](https://npm.im/strtr-from-php) [![npm downloads](https://badgen.net/npm/dm/strtr-from-php)](https://npm.im/strtr-from-php)

This package is a TypeScript implementation of the `strtr` function from [PHP](https://www.php.net/manual/en/function.strtr.php), replicates both `from, to` and `replace_pairs` modes exactly.

## Install

```bash
npm i strtr-from-php
```

## Usage

```typescript
import { strtr } from 'strtr-from-php';

// Character-to-character replacement
strtr('abcdef', 'abc', 'xyz'); // 'xyzdef'

// Substring replacement
strtr('Hello World', {
	Hello: 'X',
	World: 'Planet',
}); // 'X Planet'

// Complex replacements
strtr('start middle end', {
	start: 'begin',
	middle: 'center',
	end: 'stop',
	'begin center stop': 'complete',
}); // 'begin center stop'
```

## License

MIT License
