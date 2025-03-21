# WordSensor

🚀 **WordSensor** is a simple and lightweight word filtering library for JavaScript/TypeScript. It helps you detect, replace, or remove forbidden words from text effortlessly.

## ✨ Features

- 🔍 **Detect** prohibited words in text.
- 🚫 **Replace** forbidden words with a mask (full or partial masking).
- 🗑️ **Remove** forbidden words from text.
- 📜 **Customizable** word list and mask characters.
- 📝 **Logging** feature to track detected words.
- 📥 **Async Word Loading** from external APIs.
- 🔡 **Case-Insensitive Matching** for better detection.
- ✅ Fully tested with Jest.

## 📦 Installation

```sh
npm install word-sensor
```

or

```sh
yarn add word-sensor
```

## 🚀 Usage

### Import and Initialize

```ts
import { WordSensor } from "word-sensor";

const sensor = new WordSensor(["badword", "offensive"], "*", true, true);
```

### 🔹 Replacing Forbidden Words

```ts
const result = sensor.filter("This is a badword test.");
console.log(result); // "This is a ******* test."
```

### 🔹 Custom Masking

```ts
sensor.addWord("rude", "###");
const result = sensor.filter("You are rude!");
console.log(result); // "You are ###!"
```

### 🔹 Removing Forbidden Words

```ts
const result = sensor.filter("This is an offensive statement.", "remove");
console.log(result); // "This is an  statement."
```

### 🔹 Detecting Forbidden Words

```ts
const detectedWords = sensor.detect("This contains badword and offensive content.");
console.log(detectedWords); // ["badword", "offensive"]
```

### 🔹 Partial Masking

```ts
const result = sensor.filter("This is a badword test.", "replace", "partial");
console.log(result); // "This is a b*****d test."
```

### 🔹 Adding Multiple Words

```ts
sensor.addWords(["newword", "another"]);
const result = sensor.filter("This is a newword and another example.");
console.log(result); // "This is a ******* and ******* example."
```

### 🔹 Removing Words

```ts
sensor.removeWord("badword");
const result = sensor.filter("This is a badword test.");
console.log(result); // "This is a badword test." (No longer filtered)
```

### 🔹 Logging Detected Words

```ts
sensor.filter("badword here.");
console.log(sensor.getDetectionLogs()); // ["badword"]
```

### 🔹 Async Word Loading

Load forbidden words from an external API.

```ts
await sensor.loadWordsFromAPI("https://api.example.com/forbidden-words");
const result = sensor.filter("This contains a forbidden word.");
console.log(result); // "This contains a ******** word."
```

### 🔹 Case-Insensitive Matching

Enable case-insensitive word matching.

```ts
sensor.setCaseInsensitive(true);
const result = sensor.filter("This contains BADWORD and badword.");
console.log(result); // "This contains ******* and *******.
```

## 📜 License

This project is licensed under the **MIT License**.

## 👨‍💻 Author

Developed by [Asrul Harahap](https://github.com/asruldev). Contributions and feedback are welcome! 😊
