export class WordSensor {
  private forbiddenWords: Map<string, string | null>;
  private maskChar: string;
  private caseInsensitive: boolean;
  private logDetections: boolean;
  private detectionLogs: string[];

  constructor(
    words: string[] = [],
    maskChar = "*",
    caseInsensitive = true,
    logDetections = false
  ) {
    this.forbiddenWords = new Map();
    this.maskChar = maskChar;
    this.caseInsensitive = caseInsensitive;
    this.logDetections = logDetections;
    this.detectionLogs = [];

    words.forEach((word) => this.addWord(word));
  }

  addWord(word: string, mask?: string) {
    const key = this.caseInsensitive ? word.toLowerCase() : word;
    this.forbiddenWords.set(key, mask ?? null);
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

  private applyMask(word: string, maskType: "full" | "partial"): string {
    if (maskType === "partial" && word.length > 2) {
      return (
        word[0] + this.maskChar.repeat(word.length - 2) + word[word.length - 1]
      );
    }
    return this.maskChar.repeat(word.length);
  }

  filter(
    text: string,
    mode: "replace" | "remove" = "replace",
    maskType: "full" | "partial" = "full"
  ): string {
    if (this.forbiddenWords.size === 0) return text;

    const regex = new RegExp(
      `\\b(${[...this.forbiddenWords.keys()]
        .map((w) => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
        .join("|")})\\b`,
      this.caseInsensitive ? "gi" : "g"
    );

    return text.replace(regex, (match) => {
      const key = this.caseInsensitive ? match.toLowerCase() : match;

      if (this.logDetections) {
        this.detectionLogs.push(match);
      }

      if (mode === "remove") return "";

      // Jika ada custom mask, gunakan itu, jika tidak, gunakan `applyMask()`
      return this.forbiddenWords.get(key) ?? this.applyMask(match, maskType);
    });
  }

  detect(text: string): string[] {
    if (this.forbiddenWords.size === 0) return [];

    const regex = new RegExp(
      `\\b(${[...this.forbiddenWords.keys()]
        .map((w) => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
        .join("|")})\\b`,
      this.caseInsensitive ? "gi" : "g"
    );

    const matches: string[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[0]);
    }

    return matches;
  }

  getDetectionLogs(): string[] {
    return this.detectionLogs;
  }
}
