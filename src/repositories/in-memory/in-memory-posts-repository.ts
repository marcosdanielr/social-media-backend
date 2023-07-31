import { Post, Prisma } from "@prisma/client";
import { PostsRepository } from "../posts-repository";
import { randomUUID } from "crypto";

export class InMemoryPostsRepository implements PostsRepository {
    public posts: Post[] = []; 

    async create(data: Prisma.PostUncheckedCreateInput) {
        const post: Post = {
            id: randomUUID(),
            title: data.title,
            user_id: data.user_id,
            description: data.description,
            created_at: new Date(),
            updated_at: new Date(),
        };

        this.posts.push(post);

        return post;
    }

} 
