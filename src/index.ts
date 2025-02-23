export class WordSensor {
  private forbiddenWords: Set<string>;
  private maskChar: string;

  constructor(words: string[] = [], maskChar = "*") {
    this.forbiddenWords = new Set(words);
    this.maskChar = maskChar;
  }

  addWords(words: string[]) {
    words.forEach((word) => this.forbiddenWords.add(word.toLowerCase()));
  }

  removeWords(words: string[]) {
    words.forEach((word) => this.forbiddenWords.delete(word.toLowerCase()));
  }

  filter(text: string, mode: "replace" | "remove" = "replace"): string {
    return text.replace(/\w+/g, (word) => {
      if (this.forbiddenWords.has(word.toLowerCase())) {
        return mode === "replace" ? this.maskChar.repeat(word.length) : "";
      }
      return word;
    });
  }
}
