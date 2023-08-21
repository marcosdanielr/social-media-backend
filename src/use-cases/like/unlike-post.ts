import { LikesRepository } from "@/repositories/likes-repository";

interface UnlikePostUseCaseRequest {
  by_id: string;
  post_id: string;
}

export class UnlikePostUseCase {
    constructor(private likesRepository: LikesRepository) { }

    async execute({ by_id, post_id }: UnlikePostUseCaseRequest): Promise<void> {
        await this.likesRepository.unlikePost(by_id, post_id);
    }
} 
