import { UsersRepository } from "@/repositories/users-repository";
import {  User } from "@prisma/client";
import { ResourceNotFound } from "../errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
  id: string;
}

interface DeleteUserUseCaseResponse {
  user: User | null;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {

        const userExists = await this.usersRepository.findById(id);

        if (!userExists) {
            throw new ResourceNotFound();
        }

        const user = await this.usersRepository.deleteById(id);

        return {
            user
        };
    }
}
