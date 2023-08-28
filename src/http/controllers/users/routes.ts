import { FastifyInstance } from "fastify";

import { create } from "./create";
import { edit } from "./edit";
import { get } from "./get";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", create);
    app.get("/users/:userId", get);
    app.patch("/users/:userId", edit);
}
