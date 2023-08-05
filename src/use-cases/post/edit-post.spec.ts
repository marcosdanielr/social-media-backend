import { it, describe, beforeEach, expect } from "vitest";
import { EditPostUseCase } from "./edit-post";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let postsRepository: InMemoryPostsRepository;
let sut: EditPostUseCase;

describe("Edit Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new EditPostUseCase(postsRepository);
    });

    it("should be able edit a post", async () => {
        const userCreateResponse = await usersRepository.create({
            name: "Ludi",
            email: "ludi@auau.com",
            password_hash: await hash("auauauauau", 6)
        });

        const postCreateResponse = await postsRepository.create({
            user_id: userCreateResponse.id,
            description: "Au"
        });

        const { post: editPostResponse } = await sut.execute({
            id: postCreateResponse.id,
            user_id: userCreateResponse.id,
            data: {
                description: "Auauauau!"
            }
        });

        expect(editPostResponse).toEqual(
            expect.objectContaining({
                description: "Auauauau!",
                updated_at: new Date()
            })
        );
    });
});
