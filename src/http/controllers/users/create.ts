import { Status } from "@/http/status";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateUserUseCase } from "@/use-cases/factories/users/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(), 
        password: z.string().min(6)
    });

    const { name, email, password } = bodySchema.parse(request.body);

    try {
        const createUserUseCase = makeCreateUserUseCase();

        const user = await createUserUseCase.execute({
            name,
            email,
            password
        });

        return reply.status(Status.CREATED).send({
            user: {
                ...user,
                password_hash: undefined
            }
        });

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(Status.CONFLICT).send({ message: error.message });
        }

        throw error;
    }
}
