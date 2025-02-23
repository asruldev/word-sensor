export class WordSensor {
  private forbiddenWords: Map<string, string>; // Word to Mask
  private maskChar: string;
  private caseInsensitive: boolean;

  constructor(words: string[] = [], maskChar = "*", caseInsensitive = true) {
    this.forbiddenWords = new Map();
    this.maskChar = maskChar;
    this.caseInsensitive = caseInsensitive;

    words.forEach((word) => this.addWord(word));
  }

  addWord(word: string, mask?: string) {
    const key = this.caseInsensitive ? word.toLowerCase() : word;
    this.forbiddenWords.set(key, mask || this.maskChar.repeat(word.length));
  }

  addWords(words: string[]) {
    words.forEach((word) => this.addWord(word));
  }

  removeWord(word: string) {
    const key = this.caseInsensitive ? word.toLowerCase() : word;
    this.forbiddenWords.delete(key);
  }

  removeWords(words: string[]) {
    words.forEach((word) => this.removeWord(word));
  }

  filter(text: string, mode: "replace" | "remove" = "replace"): string {
    const regex = new RegExp(
      `\\b(${[...this.forbiddenWords.keys()].join("|")})\\b`,
      this.caseInsensitive ? "gi" : "g"
    );

    return text.replace(regex, (match) => {
      if (mode === "replace") {
        return (
          this.forbiddenWords.get(
            this.caseInsensitive ? match.toLowerCase() : match
          ) || this.maskChar.repeat(match.length)
        );
      }
      return "";
    });
  }
}
