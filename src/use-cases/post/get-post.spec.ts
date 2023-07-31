import { it, describe, beforeEach, expect } from "vitest";
import { GetPostUseCase } from "./get-post";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: GetPostUseCase;

describe("Get Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        sut = new GetPostUseCase(postsRepository);
    });

    it("should be able to get post by id", async () => {

        const createPostResponse = await postsRepository.create({
            user_id: "12",
            description: "Testing"
        });
    
        await postsRepository.create({
            user_id: "87w",
            description: "hi"
        });

        const { post } = await sut.execute({
            id: createPostResponse.id 
        });

        expect(post).toEqual(
            expect.objectContaining({
                id: createPostResponse.id,
                description: "Testing"
            })
        );
    });
});
