import { Follow } from "@prisma/client";
import { FollowsRepository } from "../follows-repository";

export class InMemoryFollowsRepository implements FollowsRepository {
    public follows: Follow[] = [];

    async followById(follower_id: string, following_id: string) {
        this.follows.push({
            follower_id,
            following_id
        });
    }
}
