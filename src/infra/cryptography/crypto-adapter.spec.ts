import crypto from "node:crypto";
import { CryptoAdapter } from "./crypto-adapter";

describe("CryptoAdapter", () => {
  it("should call encrypt with correct value", async () => {
    const algorithm = "sha256";
    const sut = new CryptoAdapter(algorithm);
    const hashSpy = jest.spyOn(crypto, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith(algorithm, "any_value");
  });
});
