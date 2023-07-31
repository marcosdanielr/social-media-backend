import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { PostsRepository } from "@/repositories/posts-repository";

interface GetPostUseCaseRequest {
  id: string;
}

interface GetPostUseCaseResponse {
  post: Post;
}

export class GetPostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ id }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
        const post = await this.postsRepository.findById(id);

        if (!post) {
            throw new ResourceNotFoundError();
        }

        return {
            post
        };
    }
}
