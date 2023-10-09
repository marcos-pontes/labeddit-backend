import { PostsBusiness } from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/error/BadRequestError";
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import {
  GetCommentsInputDTO,
  GetCommentsOutputDTO,
} from "../../src/dtos/Posts/getComments.dto";

describe("Testes no getComments", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock()
  );

  it("Deve retornar os comentários de um post existente", async () => {
    const input: GetCommentsInputDTO = {
      token: "token-mock-fulano",
      postId: "id-mock-post-1",
    };

    const output: GetCommentsOutputDTO = await postsBusiness.getComments(input);

    expect(output).toBeDefined();
    expect(output.length).toBeGreaterThan(0);
  });

  it("Deve lançar um erro ao usar um token inválido", async () => {
    const input: GetCommentsInputDTO = {
      token: "token-invalido",
      postId: "id-mock-post-1",
    };

    await expect(async () => {
      await postsBusiness.getComments(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro ao tentar obter comentários de um post inexistente", async () => {
    const input: GetCommentsInputDTO = {
      token: "token-mock-fulano",
      postId: "post-inexistente",
    };

    await expect(async () => {
      await postsBusiness.getComments(input);
    }).rejects.toThrow(BadRequestError);
  });
});
