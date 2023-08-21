import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryLikesRepository } from "@/repositories/in-memory/in-memory-likes-repository";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";
import { UnlikePostUseCase } from "./unlike-post";

let postsRepository: InMemoryPostsRepository;
let likesRepository: InMemoryLikesRepository;
let sut: UnlikePostUseCase;

describe("Unlike Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        likesRepository = new InMemoryLikesRepository();
        sut = new UnlikePostUseCase(likesRepository);
    });

    it("should be able to unlike a post", async () => {
        const [createFirstPostResponse, createSecondPostResponse] = await Promise.all([
            postsRepository.create({
                user_id: "user-1",
                description: "Oi"
            }),
            postsRepository.create({
                user_id: "user-1",
                description: "Opa"
            })
        ]);

        await likesRepository.likePost("user-1", createFirstPostResponse.id);
        await likesRepository.likePost("user-1", createSecondPostResponse.id);

        await sut.execute({
            by_id: "user-1",
            post_id: createFirstPostResponse.id
        });

        const likes = likesRepository.likes;

        expect(likes.length).toEqual(1);
        expect(likes).toEqual(
            expect.objectContaining([{
                by_id: "user-1",
                post_id: createSecondPostResponse.id
            }])
        );
    });
});
