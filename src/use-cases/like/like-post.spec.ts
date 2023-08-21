import { it, describe, beforeEach, expect } from "vitest";
import { LikePostUseCase } from "./like-post";
import { InMemoryLikesRepository } from "@/repositories/in-memory/in-memory-likes-repository";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let likesRepository: InMemoryLikesRepository;
let sut: LikePostUseCase;

describe("Like Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        likesRepository = new InMemoryLikesRepository();
        sut = new LikePostUseCase(likesRepository);
    });

    it("should be able to like a post", async () => {
        const createPostResponse = await postsRepository.create({
            user_id: "user-1",
            description: "Oi"
        });

        await postsRepository.findById(createPostResponse.id);

        await sut.execute({
            by_id: "user-1",
            post_id: createPostResponse.id
        });

        const likes = likesRepository.likes;

        expect(likes.length).toEqual(1);
        expect(likes).toEqual(
            expect.objectContaining([{
                by_id: "user-1",
                post_id: createPostResponse.id
            }])
        );
    });
});
