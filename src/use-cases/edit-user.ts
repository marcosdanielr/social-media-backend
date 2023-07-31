import { UsersRepository } from "@/repositories/users-repository";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface UserUpdateData {
  name?: string;
  email?: string;
  password?: string;
}

interface EditUserUseCaseRequest {
  id: string;
  data: UserUpdateData;
}

interface EditUserUseCaseResponse {
  user: Prisma.UserUpdateInput | null;
}

export class EditUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id, data }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
        const { name, email, password } = data;
        const password_hash = password ? await hash(password, 6) : undefined;

        const userExists = await this.usersRepository.findById(id);

        if (!userExists) {
            throw new ResourceNotFound();
        }

        const user = await this.usersRepository.editById(
            id,
            {
                name,
                email,
                password_hash
            });

        return {
            user
        };
    }
}
