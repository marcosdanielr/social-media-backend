import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { DeletePostUseCase } from "./delete-post";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let postsRepository: InMemoryPostsRepository;
let sut: DeletePostUseCase;

describe("Delete Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new DeletePostUseCase(postsRepository);
    });

    it("should be able create a post", async () => {
        const posts = postsRepository.posts;

        const createUserResponse = await usersRepository.create({
            name: "Ludi",
            email: "ludi@auau.com",
            password_hash: await hash("auauauauau", 6)
        });

        await postsRepository.create({
            user_id: createUserResponse.id,
            description: "Woof woof!"
        });

        const createPostReponse = await postsRepository.create({
            user_id: createUserResponse.id,
            description: "Au. Au!"
        });

        const { post } = await sut.execute({
            id: createPostReponse.id
        });

        expect(posts.length).toEqual(1);

        expect(post).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        );

    });
});
