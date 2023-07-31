import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const password_hash = await hash(password, 6);
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        });

        return {
            user
        };
    }
}
