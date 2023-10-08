import { PostsBusiness } from "../../src/business/PostBusiness";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/error/BadRequestError";
import { EditPostsInputDTO } from "../../src/dtos/Posts/editPosts.dto";
import { NotFoundError } from "../../src/error/NotFoundError";

describe("testes no editPosts", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock()
  );

  it("Deve editar o post", async () => {
    const input: EditPostsInputDTO = {
      token: "token-mock-fulano",
      idToEdit: "id-mock-post-1",
      content: "Este é o post 1 editado",
    };

    const output = await postsBusiness.editPost(input);

    expect(output).toBeDefined();
    expect(output.content).toBe(input.content);
  });

  it("Deve lançar um erro NotFoundError se o post não existir", async () => {
    const input: EditPostsInputDTO = {
      token: "token-mock-fulano",
      idToEdit: "id-post-inexistente",
      content: "Este é o post",
    };

    await expect(async () => {
      await postsBusiness.editPost(input);
    }).rejects.toThrow(NotFoundError);
  });

  it("Deve testar o token inválido", async () => {
    const input: EditPostsInputDTO = {
      token: "token-invalido",
      idToEdit: "id-mock-post-1",
      content: "Este é o post 1",
    };

    await expect(async () => {
      await postsBusiness.editPost(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve lançar um erro BadRequestError se o usuário não tiver permissão para editar o post", async () => {
    const input: EditPostsInputDTO = {
      token: "token-mock-astrodev",
      idToEdit: "id-mock-post-1",
      content: "Este é o post 1",
    };

    await expect(async () => {
      await postsBusiness.editPost(input);
    }).rejects.toThrow(BadRequestError);
  });
});
