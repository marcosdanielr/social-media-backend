import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe("Authenticate User Use Case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUserUseCase(userRepository);
    });

    it("should be able to authenticate", async () => {
        const userCredentials = {
            email: "marcos@gambiarras.com",
            password: "12345678"
        };

        await userRepository.create({
            name: "Marcos",
            email: userCredentials.email,
            password_hash: await hash(userCredentials.password, 6)
        });

        const { user } = await sut.execute(userCredentials);

        expect(user.id).toEqual(expect.any(String));
    });
  
    it("should be not able to authenticate with wrong email", async () => {
        const userCredentials = {
            email: "marcos@gambiarras.com",
            password: "12345678"
        };

        await userRepository.create({
            name: "Marcos",
            email: "marcos2@gambiarras.com",
            password_hash: await hash(userCredentials.password, 6)
        });
        await expect(() => 
            sut.execute(userCredentials))
            .rejects
            .toBeInstanceOf(InvalidCredentialsError);
    });

    it("should be not able to authenticate with wrong password", async () => {
        const userCredentials = {
            email: "marcos@gambiarras.com",
            password: "12345678"
        };

        await userRepository.create({
            name: "Marcos",
            email: userCredentials.email,
            password_hash: await hash("12345678910", 6)
        });
        await expect(() => 
            sut.execute(userCredentials))
            .rejects
            .toBeInstanceOf(InvalidCredentialsError);
    });
});
