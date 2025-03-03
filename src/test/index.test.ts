import { WordSensor } from "../index";

describe("WordSensor", () => {
  let sensor: WordSensor;

  beforeEach(() => {
    sensor = new WordSensor(["badword", "offensive"], "*", true, true);
  });

  test("should replace forbidden words with default mask", () => {
    const result = sensor.filter("This is a badword test.");
    expect(result).toBe("This is a ******* test.");
  });

  test("should replace forbidden words with custom mask", () => {
    sensor.addWord("rude", "###");
    const result = sensor.filter("You are rude!");
    expect(result).toBe("You are ###!");
  });

  test("should remove forbidden words when mode is 'remove'", () => {
    const result = sensor.filter("This is an offensive statement.", "remove");
    expect(result).toBe("This is an  statement.");
  });

  test("should detect forbidden words in text", () => {
    const detectedWords = sensor.detect("This contains badword and offensive content.");
    expect(detectedWords).toEqual(["badword", "offensive"]);
  });

  test("should log detections if enabled", () => {
    sensor.filter("badword here.");
    expect(sensor.getDetectionLogs()).toEqual(["badword"]);
  });

  test("should add multiple words", () => {
    sensor.addWords(["newword", "another"]);
    const result = sensor.filter("This is a newword and another example.");
    expect(result).toBe("This is a ******* and ******* example.");
  });

  test("should remove words from forbidden list", () => {
    sensor.removeWord("badword");
    const result = sensor.filter("This is a badword test.");
    expect(result).toBe("This is a badword test."); // Not filtered anymore
  });

  test("should remove multiple words", () => {
    sensor.removeWords(["badword", "offensive"]);
    const result = sensor.filter("This is a badword and offensive statement.");
    expect(result).toBe("This is a badword and offensive statement."); // No filtering
  });
});
