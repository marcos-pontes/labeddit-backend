import { PostsBusiness } from "../../src/business/PostBusiness";
import { createPostSchema } from "../../src/dtos/Posts/createPosts.dto"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/error/BadRequestError"

describe("testes no createPost", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock()
  );

  it("Deve criar um novo post", async () => {
    const input = createPostSchema.parse({
      token: "token-mock-fulano",
      content: "Este é o post 1",
    });

    const output = await postsBusiness.createPost(input);

    expect(output).toBeDefined();
    expect(output.getId()).toBeDefined();
    expect(output.getContent()).toBe(input.content);
    expect(output.getLikes()).toBe(0);
    expect(output.getDislikes()).toBe(0);
  });

  it("Deve testar o token", async () => {
    const input = createPostSchema.parse({
      token: "token",
      content: "Este é o post 1",
    });

    await expect(async () => {
      await postsBusiness.createPost(input);
    }).rejects.toThrow(BadRequestError);
  });

  it("Deve testar se o id existe", async () => {
    const postsDatabaseMock = new PostsDatabaseMock();
    postsDatabaseMock.findPostById = jest
      .fn()
      .mockReturnValue({ id: "id-existente" });

    const input = createPostSchema.parse({
      token: "token-mock-fulano",
      content: "Este é o post 1",
    });

    await expect(async () => {
      await postsBusiness.createPost(input);
    }).rejects.toThrow(BadRequestError);
  });
});
