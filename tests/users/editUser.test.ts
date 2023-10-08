import { UserBusiness } from "../../src/business/UserBusiness";
import { EditUserInputDTO } from "../../src/dtos/user/editUser.dto";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testes no endpoint editUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  it("Deve editar o usuário com sucesso", async () => {
    const input: EditUserInputDTO = {
      token: "token-mock-fulano",
      emailToEdit: "fulano@email.com",
      name: "Fulano Editado",
      email: "novo-email@email.com",
      password: "novasenha123",
    };

    const output = await userBusiness.editUser(input);

    expect(output).toEqual({
      message: "Usuário alterado com sucesso!",
    });
  });

  it("Deve lançar um erro BadRequestError se o token for inválido", async () => {
    const input: EditUserInputDTO = {
      token: "token-invalido",
      emailToEdit: "fulano@email.com",
      name: "Fulano Editado",
      email: "novo-email@email.com",
      password: "novasenha123",
    };

    await expect(async () => {
      await userBusiness.editUser(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro NotFoundError se o usuário não existir", async () => {
    const input: EditUserInputDTO = {
      token: "token-mock-fulano",
      emailToEdit: "email-inexistente@email.com",
      name: "Fulano Editado",
      email: "novo-email@email.com",
      password: "novasenha123",
    };

    await expect(async () => {
      await userBusiness.editUser(input);
    }).rejects.toThrow(NotFoundError);
  });
});
