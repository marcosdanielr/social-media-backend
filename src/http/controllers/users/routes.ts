import { FastifyInstance } from "fastify";

import { create } from "./create";
import { edit } from "./edit";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", create);
    app.patch("/users/:userId", edit);
}
