import { Status } from "@/http/status";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUserUseCase } from "@/use-cases/factories/users/make-get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
  
    const paramsSchema = z.object({
        userId: z.string().uuid()
    }); 

    const { userId } = paramsSchema.parse(request.params);

    const getUserUseCase = makeGetUserUseCase();

    try {
        const user = await getUserUseCase.execute({
            id: userId
        });

        reply.status(Status.OK).send({
            ...user,
            password: undefined
        });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            reply.status(Status.NO_CONTENT);
        }
        throw error;
    }

} 
