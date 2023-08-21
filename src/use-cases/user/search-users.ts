import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface SearchUsersUseCaseRequest {
  name: string;
}

interface SearchUsersUseCaseResponse {
  users: User[];
}

export class SearchUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name }: SearchUsersUseCaseRequest): Promise<SearchUsersUseCaseResponse> {
        const users = await this.usersRepository.searchByName(name);

        return {
            users
        };
    }
}
