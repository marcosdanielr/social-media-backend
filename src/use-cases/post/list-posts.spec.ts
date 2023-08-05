import { it, describe, beforeEach, expect } from "vitest";
import { ListPostsUseCase } from "./list-posts";
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: ListPostsUseCase;

describe("List Post Use Case", () => {
    beforeEach(() => {
        postsRepository = new InMemoryPostsRepository();
        sut = new ListPostsUseCase(postsRepository);
    });

    it("should be able list posts by items per page", async () => {
        for (let i = 0; i <= 8; i++) {
            await postsRepository.create({
                user_id: "12",
                description: `Testing ${i}`
            });
        }

        const { posts } = await sut.execute({
            user_id: "12",
            page: 1,
            items_per_list: 4
        });

        expect(posts.length).toEqual(4);
        expect(posts[1].description).toEqual("Testing 1");
    });

    it("should be able list posts by page", async () => {
        for (let i = 1; i <= 10; i++) {
            await postsRepository.create({
                user_id: "12",
                description: `Testing ${i}`
            });
        }

        const { posts } = await sut.execute({
            user_id: "12",
            page: 2,
            items_per_list: 5
        });

        expect(posts[0].description).toEqual("Testing 6");
    });
});
