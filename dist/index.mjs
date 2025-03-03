// src/index.ts
var WordSensor = class {
  forbiddenWords;
  maskChar;
  caseInsensitive;
  logDetections;
  detectionLogs;
  constructor(words = [], maskChar = "*", caseInsensitive = true, logDetections = false) {
    this.forbiddenWords = /* @__PURE__ */ new Map();
    this.maskChar = maskChar;
    this.caseInsensitive = caseInsensitive;
    this.logDetections = logDetections;
    this.detectionLogs = [];
    words.forEach((word) => this.addWord(word));
  }
  addWord(word, mask) {
    const key = this.caseInsensitive ? word.toLowerCase() : word;
    this.forbiddenWords.set(key, mask ?? null);
  }
  addWords(words) {
    words.forEach((word) => this.addWord(word));
  }
  removeWord(word) {
    const key = this.caseInsensitive ? word.toLowerCase() : word;
    this.forbiddenWords.delete(key);
  }
  removeWords(words) {
    words.forEach((word) => this.removeWord(word));
  }
  applyMask(word, maskType) {
    if (maskType === "partial" && word.length > 2) {
      return word[0] + this.maskChar.repeat(word.length - 2) + word[word.length - 1];
    }
    return this.maskChar.repeat(word.length);
  }
  filter(text, mode = "replace", maskType = "full") {
    if (this.forbiddenWords.size === 0)
      return text;
    const regex = new RegExp(
      `\\b(${[...this.forbiddenWords.keys()].map((w) => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})\\b`,
      this.caseInsensitive ? "gi" : "g"
    );
    return text.replace(regex, (match) => {
      const key = this.caseInsensitive ? match.toLowerCase() : match;
      if (this.logDetections) {
        this.detectionLogs.push(match);
      }
      if (mode === "remove")
        return "";
      return this.forbiddenWords.get(key) ?? this.applyMask(match, maskType);
    });
  }
  detect(text) {
    if (this.forbiddenWords.size === 0)
      return [];
    const regex = new RegExp(
      `\\b(${[...this.forbiddenWords.keys()].map((w) => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})\\b`,
      this.caseInsensitive ? "gi" : "g"
    );
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[0]);
    }
    return matches;
  }
  getDetectionLogs() {
    return this.detectionLogs;
  }
};
export {
  WordSensor
};
//# sourceMappingURL=index.mjs.map