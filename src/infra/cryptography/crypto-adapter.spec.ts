import crypto from "node:crypto";
import { CryptoAdapter } from "./crypto-adapter";

jest.mock("node:crypto", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hashed_value");
  },
}));

const algorithm = "sha256";
const makeSut = (): CryptoAdapter => {
  return new CryptoAdapter(algorithm);
};

describe("CryptoAdapter", () => {
  it("should call encrypt with correct value", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(crypto, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith(algorithm, "any_value");
  });

  it("should return a hash on success", async () => {
    const sut = makeSut();
    const result = await sut.encrypt("any_value");
    expect(result).toBe("hashed_value");
  });
});
