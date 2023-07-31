import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { it, describe, beforeEach, expect } from "vitest";

let userRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new CreateUserUseCase(userRepository);
    });

    it("should be able to create an user", async () => {
        const { user } = await sut.execute({
            name: "Marcos",
            email: "marcos@gambiarras.com",
            password: "12345678"
        });

        expect(user.id).toEqual(expect.any(String));
    });
});
