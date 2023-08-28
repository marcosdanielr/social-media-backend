import request from "supertest";
import { app } from "@/app";
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import { Status } from "../../status";

describe("Create User (E2E)", () => {
    beforeAll(async() => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create an user", async () => {
        const response = await request(app.server)
            .post("/users")
            .send({
                name: "Ludi",
                email: "woof@woof.com",
                password: "woofwoof123au"
            });

        expect(response.statusCode).toEqual(Status.CREATED);
    });
});
