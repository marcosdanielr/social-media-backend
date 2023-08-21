import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { SearchUsersUseCase } from "./search-users";

let userRepository: InMemoryUsersRepository;
let sut: SearchUsersUseCase;

describe("Search Users Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new SearchUsersUseCase(userRepository);
    });

    it("should be able to search users by name", async () => {
        await userRepository.create({
            name: "Marcos",
            email: "marcos2@gambiarras.com",
            password_hash: "123456"
        });
    
        await userRepository.create({
            name: "Ludi Woof Woof",
            email: "ludi@cachorro.com",
            password_hash: "123456"
        });

        await userRepository.create({
            name: "LuDi2",
            email: "ludi2@email.com",
            password_hash: "123456"
        });


        const { users } = await sut.execute({
            name: "Lu"
        });

        expect(users.length).toEqual(2);
        expect(users[0].name).toEqual("Ludi Woof Woof");
        expect(users[1].name).toEqual("LuDi2");
    });
});
