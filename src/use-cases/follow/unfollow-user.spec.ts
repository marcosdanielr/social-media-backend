import { it, describe, beforeEach, expect } from "vitest";
import { UnfollowUserUseCase } from "./unfollow-user";
import { InMemoryFollowsRepository } from "@/repositories/in-memory/in-memory-follows-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

let followsRepository: InMemoryFollowsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: UnfollowUserUseCase;

describe("Unfollow User Use Case", () => {
    beforeEach(() => {
        followsRepository = new InMemoryFollowsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new UnfollowUserUseCase(followsRepository, usersRepository);
    });

    it("should be able to unfollow an user", async () => {
        const follows = followsRepository.follows;

        const userCreateResponse = await usersRepository.create({
            name: "Ludi",
            email: "woofwoof@woof.woof",
            password_hash: await hash("auauau", 6)
        });

        let following_id: string = ""; 

        for (let i = 0; i <= 3; i++) {
            const userToFollow = await usersRepository.create({
                name: `Amigo do Ludi - ${i}`,
                email: `woof${i}@woof.woof`,
                password_hash: await hash("auauauwoof", 6)
            });

            await followsRepository.followById(userCreateResponse.id, userToFollow.id);

            if(i === 2) {
                following_id = userToFollow.id;
            }
        }

        await sut.execute({
            follower_id: userCreateResponse.id,
            following_id
        });

        expect(follows.length).toEqual(3);
    });
});
