import { FollowsRepository } from "@/repositories/follows-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FollowUserUseCaseRequest {
  follower_id: string; 
  following_id: string;
}

export class FollowUserUseCase {
    constructor(
    private followsRepository: FollowsRepository,
    private usersRepository: UsersRepository
    ) {}

    async execute({ follower_id, following_id }: FollowUserUseCaseRequest): Promise<void> {
        const userExists = await this.usersRepository.findById(following_id);

        if (!userExists) {
            throw new ResourceNotFoundError();
        }

        await this.followsRepository.followById(follower_id, following_id);
    }
}
