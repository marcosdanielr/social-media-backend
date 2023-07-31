import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "../errors/resource-not-found-error";

interface GetUserUseCaseRequest {
  id: string;
}

interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new ResourceNotFound();
        }

        return {
            user
        };
    }
}
