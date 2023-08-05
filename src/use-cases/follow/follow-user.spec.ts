import { it, describe, beforeEach, expect } from "vitest";
import { FollowUserUseCase } from "./follow-user";
import { InMemoryFollowsRepository } from "@/repositories/in-memory/in-memory-follows-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

let followsRepository: InMemoryFollowsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: FollowUserUseCase;

describe("Follow User Use Case", () => {
    beforeEach(() => {
        followsRepository = new InMemoryFollowsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new FollowUserUseCase(followsRepository, usersRepository);
    });

    it("should be able to follow an user", async () => {
        const follows = followsRepository.follows;

        const userCreateResponse = await usersRepository.create({
            name: "Ludi",
            email: "woofwoof@woof.woof",
            password_hash: await hash("auauau", 6)
        });

        await sut.execute({
            follower_id: "user-1",
            following_id: userCreateResponse.id
        });
    
        await sut.execute({
            follower_id: "user-2",
            following_id: userCreateResponse.id
        });

        expect(follows.length).toEqual(2);
        expect(follows).toEqual([
            expect.objectContaining({
                follower_id: "user-1",
                following_id: userCreateResponse.id
            }),
            expect.objectContaining({
                follower_id: "user-2",
                following_id: userCreateResponse.id
            })
        ]);
    });
});
