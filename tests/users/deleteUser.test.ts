import { UserBusiness } from "../../src/business/UserBusiness";
import { DeleteUserInputDTO } from "../../src/dtos/user/deleteUser.dto";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testes no endpoint deleteUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  it("Deve deletar um usuário com sucesso", async () => {
    const input: DeleteUserInputDTO = {
      email: "email-existente@email.com",
      token: "token-mock-fulano",
    };

    const output = await userBusiness.deleteUser(input);

    expect(output.message).toBe("Usuário deletado com sucesso!");
  });

  it("Deve lançar um erro BadRequestError se o email não existir", async () => {
    const input: DeleteUserInputDTO = {
      email: "email-inexistente@email.com",
      token: "token-mock-fulano",
    };

    await expect(async () => {
      await userBusiness.deleteUser(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro BadRequestError se o token for inválido", async () => {
    const input: DeleteUserInputDTO = {
      email: "email-existente@email.com",
      token: "token-invalido",
    };

    await expect(async () => {
      await userBusiness.deleteUser(input);
    }).rejects.toThrow(BadRequestError);
  });
});
