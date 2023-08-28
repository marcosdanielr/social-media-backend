import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const userExists = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (userExists) {
            throw new UserAlreadyExistsError();
        }

        const user = await prisma.user.create({
            data
        });

        return user;
    }

    async findByEmail(email: string) {
        return;
    }

    async editById(id: string, data: Prisma.UserUpdateInput) {
        const user = await prisma.user.update({
            where: {
                id
            },
            data
        });

        return user;
    }

    async deleteById(id: string){
        return;      
    }

    async searchByName(name: string) {
        return;      
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }
}
