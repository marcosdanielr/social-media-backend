import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/posts-repository";

interface CreatePostUseCaseRequest {
  description: string;
  user_id: string;
}

interface CreatePostUseCaseResponse {
 post: Post;
}

export class CreatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ description, user_id }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const post = await this.postsRepository.create({
            user_id,
            description
        });

        return { 
            post 
        };
    }
}
