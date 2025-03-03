declare class WordSensor {
    private forbiddenWords;
    private maskChar;
    private caseInsensitive;
    private logDetections;
    private detectionLogs;
    constructor(words?: string[], maskChar?: string, caseInsensitive?: boolean, logDetections?: boolean);
    addWord(word: string, mask?: string): void;
    addWords(words: string[]): void;
    removeWord(word: string): void;
    removeWords(words: string[]): void;
    private applyMask;
    filter(text: string, mode?: "replace" | "remove", maskType?: "full" | "partial"): string;
    detect(text: string): string[];
    getDetectionLogs(): string[];
}

export { WordSensor };
