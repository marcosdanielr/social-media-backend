import { UsersRepository } from "@/repositories/users-repository";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface EditUserUseCaseRequest {
  id: string;
  data: Prisma.UserUpdateInput;
}

interface EditUserUseCaseResponse {
  user: Prisma.UserUpdateInput;
}

export class EditUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id, data }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
        const { name, email, password_hash: password } = data;
        const password_hash = await hash(password as string, 6);

        const userExists = await this.usersRepository.findById(id);

        if (userExists) {
            throw new UserAlreadyExistsError();
        }

        await this.usersRepository.editById(
            id,
            {
                name,
                email,
                password_hash
            });

        return {
            user: data
        };
    }
}
