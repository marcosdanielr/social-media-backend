import request from "supertest";
import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { Status } from "@/http/status";

describe("Edit User (E2E)", () => {
    beforeAll(async() => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to edit an user", async () => {
        const { body: data } = await request(app.server)
            .post("/users")
            .send({
                name: "Ludi",
                email: "woof@woof.com",
                password: "woofwoof123au"
            });

        const response = await request(app.server)
            .patch(`/users/${data.user.id}`)
            .send({
                name: "Ludi",
                email: "woof@woof.com",
                password: "woofwoof123au"
            });

        expect(response.statusCode).toEqual(Status.OK);
    });
});
