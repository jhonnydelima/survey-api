import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidatorAdapter", () => {
  it("should return false when email is invalid", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  it("should return true when email is valid", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid@email.com");
    expect(isValid).toBe(true);
  });
});
