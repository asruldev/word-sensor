# Word Sensor

A simple word filtering library for JavaScript/TypeScript. It helps to censor or remove unwanted words from a text.

## Features
- Replace or remove forbidden words.
- Customizable mask character.
- Supports dynamic addition and removal of words.

## Installation
```sh
npm install word-sensor
```

## Usage

### Import and Initialize
```typescript
import { WordSensor } from "word-sensor";

const sensor = new WordSensor(["badword", "curse"]);
```

### Filter Text
```typescript
console.log(sensor.filter("This is a badword!", "replace")); // Output: This is a *******!
console.log(sensor.filter("This is a curse!", "remove"));  // Output: This is a !
```

### Add or Remove Words
```typescript
sensor.addWords(["anotherbadword"]);
sensor.removeWords(["curse"]);
```

## API

### `new WordSensor(words?: string[], maskChar?: string)`
- `words`: Array of words to be censored (default: `[]`).
- `maskChar`: Character used for replacing censored words (default: `*`).

### `filter(text: string, mode: 'replace' | 'remove' = 'replace'): string`
- `text`: The input text to be filtered.
- `mode`:
  - `'replace'` (default): Replaces forbidden words with the mask character.
  - `'remove'`: Removes forbidden words from the text.

### `addWords(words: string[])`
- Adds new words to the forbidden list.

### `removeWords(words: string[])`
- Removes words from the forbidden list.

## License
MIT License

## Author
[Asrul Harahap](https://github.com/asruldev)
