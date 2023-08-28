import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { EditUserUseCase } from "@/use-cases/user/edit-user";

export function makeEditUserUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new EditUserUseCase(usersRepository);

    return useCase;
} 
