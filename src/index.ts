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

export function getNestedValue(obj: any, path: string): any {
  return path
    .split(".")
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export async function loadForbiddenWordsFromAPI(
  url: string,
  path: string | null,
  sensor: WordSensor
) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    let words: string[] = [];

    if (Array.isArray(data)) {
      words = data; // Jika API langsung berupa array
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