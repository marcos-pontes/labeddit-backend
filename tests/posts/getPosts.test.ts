import { PostsBusiness } from "../../src/business/PostBusiness";
import { GetPostsInputDTO } from "../../src/dtos/Posts/getPosts.dto";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/error/BadRequestError";

describe("testes no getPosts", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock()
  );

  it("Deve retornar a lista de posts", async () => {
    const input: GetPostsInputDTO = {
      token: "token-mock-fulano",
    };

    const output = await postsBusiness.getPost(input);

    expect(output).toBeDefined();
    expect(Array.isArray(output)).toBe(true);
  });

  it("Deve testar o token inválido", async () => {
    const input: GetPostsInputDTO = {
      token: "token-invalido",
    };

    await expect(async () => {
      await postsBusiness.getPost(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve retornar os posts com os dados corretos", async () => {
    const input: GetPostsInputDTO = {
      token: "token-mock-fulano",
    };

    const output = await postsBusiness.getPost(input);

    expect(Array.isArray(output)).toBe(true);

    for (const post of output) {
      expect(post.id).toBeDefined();
      expect(post.content).toBeDefined();
      expect(post.likes).toBeDefined();
      expect(post.dislikes).toBeDefined();
      expect(post.createdAt).toBeDefined();
      expect(post.updatedAt).toBeDefined();
      expect(post.creator).toBeDefined();

      expect(post.creator.id).toBeDefined();
      expect(post.creator.name).toBeDefined();
    }
  });
});
