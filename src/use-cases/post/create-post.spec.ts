import { it, describe, beforeEach, expect } from "vitest";
import { CreatePostUseCase } from "./create-post";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let postsRepository: InMemoryPostsRepository;
let sut: CreatePostUseCase;

describe("Create Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new CreatePostUseCase(postsRepository);
    });

    it("should be able create an post", async () => {
        const userCreatedResponse = await usersRepository.create({
            name: "Ludi",
            email: "ludi@auau.com",
            password_hash: await hash("auauauauau", 6)
        });


        const { post } = await sut.execute({
            user_id: userCreatedResponse.id,
            description: "Au. Auauauauau!"
        });

        expect(post).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        );

        expect(post.user_id).toEqual(userCreatedResponse.id);
    });
});
