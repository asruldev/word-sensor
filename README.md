# WordSensor

## Description
`WordSensor` is a TypeScript utility that allows you to censor specific words in a text with options to replace them with a chosen character or remove them entirely.

## Features
- ✅ **Supports censoring based on a forbidden words list**.
- ✅ **Can replace words with specific symbols (e.g., `*`, `#`, etc.)**.
- ✅ **Can remove forbidden words from text**.
- ✅ **Supports case-insensitive word matching**.
- ✅ **Allows custom replacement characters per word**.
- ✅ **Uses regular expressions for more accurate word matching**.

## Installation
Since this is a TypeScript utility, you can use it directly in your TypeScript project.

```sh
npm install word-sensor
```

Or, simply copy the `WordSensor` class code into your project.

## Usage

```typescript
import { WordSensor } from "./WordSensor";

const sensor = new WordSensor(["badword", "rude"], "*");

console.log(sensor.filter("This is a badword and it's rude!")); 
// Output: This is a ******* and it's ****!

sensor.addWord("test", "####");
console.log(sensor.filter("This is a test.")); 
// Output: This is a ####.
```

## API

### `new WordSensor(words: string[], maskChar: string = "*", caseInsensitive: boolean = true)`
Creates an instance of `WordSensor` with a list of words to be censored.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `words` | `string[]` | `[]` | List of forbidden words. |
| `maskChar` | `string` | `*` | Character used for censoring. |
| `caseInsensitive` | `boolean` | `true` | Whether word matching is case-insensitive. |

### `addWord(word: string, mask?: string): void`
Adds a new word to the censor list. If `mask` is provided, the word will be censored with that character.

### `addWords(words: string[]): void`
Adds multiple words to the censor list.

### `removeWord(word: string): void`
Removes a word from the censor list.

### `removeWords(words: string[]): void`
Removes multiple words from the censor list.

### `filter(text: string, mode: "replace" | "remove" = "replace"): string`
Filters text based on the forbidden words list.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | `string` | - | The text to be filtered. |
| `mode` | `"replace" | "remove"` | `"replace"` | Filtering mode: `replace` substitutes words with censor symbols, `remove` deletes words from the text. |

## Advanced Examples
```typescript
const sensor = new WordSensor(["example", "test"], "*");

console.log(sensor.filter("This is an example of a test.")); 
// Output: This is an ******* of a ****.

sensor.addWord("extra", "@#$");
console.log(sensor.filter("This is an extra example.")); 
// Output: This is an @#$ *******.

sensor.removeWord("test");
console.log(sensor.filter("This is a test.")); 
// Output: This is a test.
```

## License
This project is released under the MIT license.

## Author
[Asrul Harahap](https://github.com/asruldev)
