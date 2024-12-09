//task 10: Add Validation for Input Types (File Size, Format, Character Count)

import { isPDF, inputCharLength } from "./PdfTextValidation.jsx";

// Mocking window.alert to avoid jsdom errors during tests
global.alert = jest.fn();


//Test suite
describe("Valid file extension(PDF) and file size", () => {
  //test case 1: is pdf ?
  it("should return true for valid PDF file", () => {
    const validPdfFile = new File(["sample content"], "test.pdf", { type: "application/pdf" });
    expect(isPDF(validPdfFile)).toBe(true);
  });

  //test case 2: is not pdf ?
  it("should return false for invalid file extension", () => {
    const invalidPdfFile = new File(["sample content"], "test.pdf", { type: "text/plain" });
    expect(isPDF(invalidPdfFile)).toBe(false);
  });


  //test case 3: is pdf file less or equal to 2MB
  it("should return true for file size <= 2MB", () => {
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const smallPdfFile = new File(["a".repeat(maxFileSize)], "smallFile.pdf", { type: "application/pdf" });
    expect(isPDF(smallPdfFile)).toBe(true);
  });

  //test case 4: is pdf file greater than 2MB
  it("should return false for file size > 2MB", () => {
    const largeFileSize = 2 * 1024 * 1024 + 1; // 2MB + 1 byte
    const largePdfFile = new File(["a".repeat(largeFileSize)], "largeFile.pdf", { type: "application/pdf" });
    expect(isPDF(largePdfFile)).toBe(false);
  });

});


//Test suite 2
describe("valid input length", () => {

  //test case 1: input is <= 5000 characters
  it("should return true for text input with <= 5000 characters", () => {
    const validText = "a".repeat(5000); // exactly 5000 characters of 'a'
    expect(inputCharLength(validText)).toBe(true);
  });

  //test case 2: input is <= 5000 characters
  it("should return false for text input with > 5000 characters", () => {
    const longText = "a".repeat(5001); // 5001+ characters of 'a'
    expect(inputCharLength(longText)).toBe(false);
  });

});