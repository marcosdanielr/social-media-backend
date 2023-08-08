import { Prisma } from "@prisma/client";
import { EditPost, PostsRepository } from "../posts-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPostsRepository implements PostsRepository {
    public posts: Prisma.PostUncheckedCreateInput[] = [];

    async create(data: Prisma.PostUncheckedCreateInput) {
        const post: Prisma.PostUncheckedCreateInput = {
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
        const post: Prisma.PostUncheckedCreateInput = this.posts[index];

        this.posts[index] = {
            ...post,
            description: data.description,
            updated_at: new Date()
        };

        return this.posts[index];
    }

    async deleteById(id: string) {
        const index = this.posts.findIndex(item => item.id === id);
        const post = this.posts[index];

        this.posts.splice(index, 1);

        return post;
    }

    async list(user_id: string, page: number, items_per_page: number = 20) {
        const posts = this.posts.filter(item => item.user_id === user_id).slice((page - 1) * items_per_page, page * items_per_page);

        return posts;
    }
} 
