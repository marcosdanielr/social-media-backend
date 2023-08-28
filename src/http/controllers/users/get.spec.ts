import request from "supertest";
import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { Status } from "@/http/status";

describe("Get User (E2E)", () => {
    beforeAll(async() => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to get an user", async () => {
        const { body: data } = await request(app.server)
            .post("/users")
            .send({
                name: "Ludi",
                email: "woof@woof.com",
                password: "woofwoof123au"
            });

        const response = await request(app.server)
            .get(`/users/${data.user.id}`);

        expect(response.statusCode).toEqual(Status.OK);
    });
});
