import { Like } from "@prisma/client";
import { LikesRepository } from "../likes-repository";

export class InMemoryLikesRepository implements LikesRepository {
  public likes: Like[] = [];

  async likePost(by_id: string, post_id: string) {
    this.likes.push({
      by_id,
      post_id
    })
  }
}
