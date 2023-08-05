import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/posts-repository";

interface ListPostsUseCaseRequest {
  user_id: string;
  page: number;
  items_per_list: number;
}

interface ListPostsUseCaseResponse {
  posts: Post[];
}

export class ListPostsUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ user_id, page, items_per_list }: ListPostsUseCaseRequest): Promise<ListPostsUseCaseResponse> {

        const posts = await this.postsRepository.list(user_id, page, items_per_list);

        return {
            posts
        };
    }
}
