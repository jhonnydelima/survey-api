import crypto from "node:crypto";
import type { Encrypter } from "../../data/protocols/encrypter";

export class CryptoAdapter implements Encrypter {
  constructor(private readonly algorithm: string) {}

  async encrypt(value: string): Promise<string> {
    return crypto.hash(this.algorithm, value);
  }
}
