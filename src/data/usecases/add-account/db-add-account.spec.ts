import { DbAddAccount } from "./db-add-account";
import type {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-add-account-protocols";

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve("hashed_password");
    }
  }
  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve({
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@email.com",
        password: "hashed_password",
      });
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
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

  it("should throw an error if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const accountData = {
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    };
    await expect(sut.add(accountData)).rejects.toThrow();
  });

  it("should call AddAccountRepository with correct data", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    const accountData = {
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@email.com",
      password: "hashed_password",
    });
  });
});
