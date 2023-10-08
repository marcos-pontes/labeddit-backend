import { UserBusiness } from "../../src/business/UserBusiness";
import { GetUserByTokenSchema } from "../../src/dtos/user/getUserByToken.dto";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { USER_ROLES } from "../../src/models/User";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando getUserByToken", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  it("Deve retornar os dados do usuário com base no token válido", async () => {
    // Suponha que você tenha um token válido gerado pelo seu mock TokenManager
    const validToken = "token-valido";

    const input = GetUserByTokenSchema.parse({
      token: validToken,
    });

    const output = await userBusiness.getUserByToken(input);

    expect(output).toBeDefined();
    expect(output.id).toBe("id-do-usuario");
    expect(output.role).toBe(USER_ROLES.NORMAL);
  });

  it("Deve lançar um erro BadRequestError se o token for inválido", async () => {
    const invalidToken = "token-invalido";

    const input = GetUserByTokenSchema.parse({
      token: invalidToken,
    });

    await expect(async () => {
      await userBusiness.getUserByToken(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro NotFoundError se o usuário não existir", async () => {
    const validToken = "token-mock-fulano";

    const input = GetUserByTokenSchema.parse({
      token: validToken,
    });

    await expect(async () => {
      await userBusiness.getUserByToken(input);
    }).rejects.toThrow(NotFoundError);
  });
});
