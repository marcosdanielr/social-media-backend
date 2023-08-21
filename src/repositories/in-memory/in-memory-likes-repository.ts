import { Like } from "@prisma/client";
import { LikesRepository } from "../likes-repository";
import { randomUUID } from "node:crypto";

export class InMemoryLikesRepository implements LikesRepository {
    public likes: Like[] = [];

    async likePost(by_id: string, post_id: string) {
        const like = {
            id: randomUUID(),
            by_id,
            post_id
        };

        this.likes.push(like);
    }
}
