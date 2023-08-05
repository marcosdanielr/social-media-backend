import { Post } from "@prisma/client";
import { EditPost, PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

type EditPostUseCaseRequest = EditPost

interface EditPostUseCaseResponse {
  post: Post;
}

export class EditPostUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ id, user_id, data }: EditPostUseCaseRequest): Promise<EditPostUseCaseResponse> {
        const postExists = await this.postsRepository.findById(id);

        if (!postExists) {
            throw new ResourceNotFoundError();
        }

        const post = await this.postsRepository.edit({
            id,
            user_id,
            data
        });

        return {
            post
        };
    }
}
