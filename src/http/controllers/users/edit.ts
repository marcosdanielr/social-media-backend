import { Status } from "@/http/status";
import { makeEditUserUseCase } from "@/use-cases/factories/users/make-edit-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function edit(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(), 
        password: z.string().min(6).optional()
    }); 
  
    const paramsSchema = z.object({
        userId: z.string().uuid()
    }); 

    const { name, email, password } = bodySchema.parse(request.body);
    const { userId } = paramsSchema.parse(request.params);

    const editUserUseCase = makeEditUserUseCase();

    const user = await editUserUseCase.execute({
        id: userId,
        data: {
            name,
            email,
            password
        }
    });

    reply.status(Status.OK).send({
        user: {
            ...user,
            password: undefined
        }
    });
} 
