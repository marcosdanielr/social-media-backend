import { LikesRepository } from "@/repositories/likes-repository";

interface LikePostUseCaseRequest {
  by_id: string;
  post_id: string;
}

export class LikePostUseCase {
    constructor(private likesRepository: LikesRepository) { }

    async execute({ by_id, post_id }: LikePostUseCaseRequest): Promise<void> {
        await this.likesRepository.likePost(by_id, post_id);
    }
} 
