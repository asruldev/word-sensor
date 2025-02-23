"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordSensor = void 0;
class WordSensor {
    constructor(words = [], maskChar = "*") {
        this.forbiddenWords = new Set(words);
        this.maskChar = maskChar;
    }
    addWords(words) {
        words.forEach((word) => this.forbiddenWords.add(word.toLowerCase()));
    }
    removeWords(words) {
        words.forEach((word) => this.forbiddenWords.delete(word.toLowerCase()));
    }
    filter(text, mode = "replace") {
        return text.replace(/\w+/g, (word) => {
            if (this.forbiddenWords.has(word.toLowerCase())) {
                return mode === "replace" ? this.maskChar.repeat(word.length) : "";
            }
            return word;
        });
    }
}
exports.WordSensor = WordSensor;
