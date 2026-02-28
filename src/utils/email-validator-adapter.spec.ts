import { EmailValidatorAdapter } from "./email-validator-adapter";

describe("EmailValidatorAdapter", () => {
  it("should return false when email is invalid", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email");
    expect(isValid).toBe(false);
  });
});
