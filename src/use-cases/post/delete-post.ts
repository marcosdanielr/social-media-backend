import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeletePostUseCaseRequest {
  id: string;
}

interface DeletePostUseCaseResponse {
  post: Post;
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ id }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
        const postExists = await this.postsRepository.findById(id);

        if (!postExists) {
            throw new ResourceNotFoundError();
        }

        const post = await this.postsRepository.deleteById(id);

        return {
            post
        };
    }
}
