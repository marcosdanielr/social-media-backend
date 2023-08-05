import { Post, Prisma } from "@prisma/client";
import { EditPost, PostsRepository } from "../posts-repository";
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

        if (!post) {
            return null;
        }

        return post;
    }

    async edit({ id, user_id, data }: EditPost) {
        const index = this.posts.findIndex(item => item.id === id && item.user_id === user_id);
        const post: Post = this.posts[index];

        this.posts[index] = {
            ...post,
            description: data.description,
            updated_at: new Date()
        };

        return this.posts[index];
    }
} 
