import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/posts-repository";

interface CreatePostUseCaseRequest {
  title: string;
  description: string;
  user_id: string;
}

interface CreatePostUseCaseResponse {
 post: Post;
}

export class CreatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ title, description, user_id }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const post = await this.postsRepository.create({
            user_id,
            title,
            description
        });

        return { 
            post 
        };
    }
}
