import { FollowsRepository } from "@/repositories/follows-repository";
import { Follow } from "@prisma/client";

interface ListFollowersUseCaseRequest {
  user_id: string;
  page?: number;
  items_per_page?: number
}

interface ListFollowersUseCaseResponse {
  followers: Follow[];
}

export class ListFollowersUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({ user_id, page = 1, items_per_page = 10 }: ListFollowersUseCaseRequest): Promise<ListFollowersUseCaseResponse> {
        const followers = await this.followsRepository.listFollowers({ user_id, page, items_per_page } );

        return {
            followers
        }; 
    }
}
