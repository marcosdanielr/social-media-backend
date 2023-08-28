
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserUseCase } from "@/use-cases/user/get-user";

export function makeGetUserUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetUserUseCase(usersRepository);

    return useCase;
} 
