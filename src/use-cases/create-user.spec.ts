import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { it, describe, beforeEach, expect } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

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

    it.only("should not be able to create an user with duplicate email", async () => {
        const email = "marcos@gambiarras.com";

        await sut.execute({
            name: "Marcos",
            email,
            password: "12345678"
        });

        await expect(() => 
            sut.execute({
                name: "Marcos",
                email,
                password: "12345678"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
