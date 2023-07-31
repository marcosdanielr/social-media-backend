import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { GetUserUseCase } from "./get-user";

let userRepository: InMemoryUsersRepository;
let sut: GetUserUseCase;

describe("Get User Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new GetUserUseCase(userRepository);
    });

    it("should be able to get user by id", async () => {
        const createUserResponse = await userRepository.create({
            name: "Marcos",
            email: "marcos@gambiarras.com",
            password_hash: "123456"
        });

        const { user } = await sut.execute({
            id: createUserResponse.id
        });

        expect(user).toEqual(
            expect.objectContaining({
                id: createUserResponse.id,
                name: "Marcos",
                email: "marcos@gambiarras.com",
            })
        );
    });
});
