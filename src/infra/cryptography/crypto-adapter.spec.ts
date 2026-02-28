import crypto from "node:crypto";
import { CryptoAdapter } from "./crypto-adapter";

jest.mock("node:crypto", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hashed_value");
  },
}));

describe("CryptoAdapter", () => {
  it("should call encrypt with correct value", async () => {
    const algorithm = "sha256";
    const sut = new CryptoAdapter(algorithm);
    const hashSpy = jest.spyOn(crypto, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith(algorithm, "any_value");
  });

  it("should return a hash on success", async () => {
    const algorithm = "sha256";
    const sut = new CryptoAdapter(algorithm);
    const result = await sut.encrypt("any_value");
    expect(result).toBe("hashed_value");
  });
});
