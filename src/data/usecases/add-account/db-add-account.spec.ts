import type { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

const makeSut = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve("hashed_password");
    }
  }
  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

describe("DbAddAccount UseCase", () => {
  it("should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("any_password");
  });
});
