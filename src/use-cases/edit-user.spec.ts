import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { EditUserUseCase } from "./edit-user";
import { hash } from "bcryptjs";

let userRepository: InMemoryUsersRepository;
let sut: EditUserUseCase;

describe("Edit User Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new EditUserUseCase(userRepository);
    });

    it("should be able to edit an user by id", async () => {
        const password_hash = await hash("12345678", 6);

        await userRepository.create({
            name: "Marcos",
            password_hash,
            email: "marcos@email.com"
        });
    
        const createUserResponse = await userRepository.create({
            name: "Ludi",
            password_hash,
            email: "ludi@email.com"
        });

        const { user } = await sut.execute({
            id: createUserResponse.id,
            data: {
                name: "Ludi Testes" 
            }
        }); 

        expect(user).toEqual(
            expect.objectContaining({
                name: "Ludi Testes",
                email: "ludi@email.com",
                password_hash
            })
        );
    });

});
