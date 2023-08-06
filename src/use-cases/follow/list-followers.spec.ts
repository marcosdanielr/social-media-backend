import { it, describe, beforeEach, expect } from "vitest";
import { InMemoryFollowsRepository } from "@/repositories/in-memory/in-memory-follows-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ListFollowersUseCase } from "./list-followers";
import { Follow } from "@prisma/client";

let followsRepository: InMemoryFollowsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: ListFollowersUseCase;

describe("List Followers Use Case", () => {
    beforeEach(() => {
        followsRepository = new InMemoryFollowsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new ListFollowersUseCase(followsRepository);
    });

    it("should be able to list followers", async () => {
        const userCreateResponse = await usersRepository.create({
            name: "Ludi",
            email: "woofwoof@woof.woof",
            password_hash: await hash("auauau", 6)
        });

        for (let i = 1; i <= 12; i++) {
            const userToFollow = await usersRepository.create({
                name: `Amigo do Ludi - ${i}`,
                email: `woof${i}@woof.woof`,
                password_hash: await hash("auauauwoof", 6)
            });

            await followsRepository.followById(userCreateResponse.id, userToFollow.id);
        }

        const { followers } = await sut.execute({
            user_id: userCreateResponse.id,
        });

        expect(followers.length).toEqual(10);
    });


    it("should be able to list followers by page", async () => {
        const userCreateResponse = await usersRepository.create({
            name: "Ludi",
            email: "woofwoof@woof.woof",
            password_hash: await hash("auauau", 6)
        });

        const followersInSecondPage: Follow[] = [];

        for (let i = 1; i <= 20; i++) {
            const userToFollow = await usersRepository.create({
                name: `Amigo do Ludi - ${i}`,
                email: `woof${i}@woof.woof`,
                password_hash: await hash("auauauwoof", 6)
            });

            await followsRepository.followById(userCreateResponse.id, userToFollow.id);

            if (i >= 11) {
                followersInSecondPage.push({
                    follower_id: userCreateResponse.id,
                    following_id: userToFollow.id,
                });
            }
        }

        const { followers } = await sut.execute({
            user_id: userCreateResponse.id,
            page: 2,
        });

        expect(followers).toEqual(followersInSecondPage);
        expect(followers.length).toEqual(10);
    });

    it("should be able to list followers by items per page", async () => {
        const userCreateResponse = await usersRepository.create({
            name: "Ludi",
            email: "woofwoof@woof.woof",
            password_hash: await hash("auauau", 6)
        });

        const followersWithFourItems: Follow[] = [];

        for (let i = 1; i <= 11; i++) {
            const userToFollow = await usersRepository.create({
                name: `Amigo do Ludi - ${i}`,
                email: `woof${i}@woof.woof`,
                password_hash: await hash("auauauwoof", 6)
            });

            await followsRepository.followById(userCreateResponse.id, userToFollow.id);

            if (i <= 4) {
                followersWithFourItems.push({
                    follower_id: userCreateResponse.id,
                    following_id: userToFollow.id,
                });
            }
        }

        const { followers } = await sut.execute({
            user_id: userCreateResponse.id,
            items_per_page: 4
        });

        expect(followers).toEqual(followersWithFourItems);
        expect(followers.length).toEqual(4);
    });

});
