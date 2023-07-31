import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { hash } from "bcryptjs";
import { DeleteUserUseCase } from "./delete-user";

let userRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe("Delete User Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new DeleteUserUseCase(userRepository);
    });

    it("should be able to delete an user by id", async () => {
        const password_hash = await hash("12345678", 6);
        const users = userRepository.users;

        await userRepository.create({
            name: "Ludi",
            password_hash,
            email: "ludi@email.com"
        });

    
        const createUserResponse = await userRepository.create({
            name: "Marcos",
            password_hash,
            email: "marcos@email.com"
        });

        const { user: userDeletedResponse } = await sut.execute({
            id: createUserResponse.id
        }); 

        expect(userDeletedResponse).toEqual(
            expect.objectContaining({
                name: "Marcos",
                password_hash,
                email: "marcos@email.com"
            })
        );

        expect(users).toHaveLength(1);
        expect(users).toEqual([
            expect.objectContaining({
                name: "Ludi",
                email: "ludi@email.com",
                password_hash
            })
        ]);
    });

});
