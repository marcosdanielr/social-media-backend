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

    async unfollowById(follower_id: string, following_id: string) {
        const index = this.follows.findIndex(item => item.follower_id === follower_id && item.following_id === following_id);

        if (index >= 0) {
            this.follows.splice(index, 1); 
        }
    }
}
