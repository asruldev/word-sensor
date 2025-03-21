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
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0, obj);
}
async function loadForbiddenWordsFromAPI(url, path, sensor) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    let words = [];
    if (Array.isArray(data)) {
      words = data;
    } else if (path) {
      words = getNestedValue(data, path) ?? [];
    }
    if (!Array.isArray(words)) {
      throw new Error("Invalid words format from API");
    }
    sensor.addWords(words);
    console.log("Forbidden words added from API:", words);
  } catch (error) {
    console.error("Error loading forbidden words:", error);
  }
}
export {
  WordSensor,
  getNestedValue,
  loadForbiddenWordsFromAPI
};
//# sourceMappingURL=index.mjs.map