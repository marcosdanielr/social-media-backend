import { Like } from "@prisma/client";
import { LikesRepository } from "../likes-repository";

export class InMemoryLikesRepository implements LikesRepository {
    public likes: Like[] = [];

    async likePost(by_id: string, post_id: string) {
        const like = {
            by_id,
            post_id
        };

        this.likes.push(like);
    }
  
    async unlikePost(by_id: string, post_id: string) {
        const index = this.likes.findIndex(item => item.by_id === by_id && item.post_id === post_id);

        if (index < 0) {
            return;
        }

        this.likes.splice(index, 1);
    }
}
