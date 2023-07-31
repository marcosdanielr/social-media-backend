import { Post, Prisma } from "@prisma/client";
import { PostsRepository } from "../posts-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPostsRepository implements PostsRepository {
    public posts: Post[] = []; 

    async create(data: Prisma.PostUncheckedCreateInput) {
        const post: Post = {
            id: randomUUID(),
            description: data.description,
            user_id: data.user_id,
            created_at: new Date(),
            updated_at: new Date(),
        };

        this.posts.push(post);

        return post;
    }

    async findById(id: string) {
        const post = this.posts.find(item => item.id === id);

        if(!post) {
            return null;
        }

        return post;
    }

} 
