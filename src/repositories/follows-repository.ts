import { Follow } from "@prisma/client";

export interface ListFollowers {
  user_id: string;
  page: number;
  items_per_page: number;
}

export interface FollowsRepository {
  followById(follower_id: string, following_id: string): Promise<void>;
  unfollowById(follower_id: string, following_id: string): Promise<void>;
  listFollowers({ user_id, page, items_per_page }: ListFollowers): Promise<Follow[]>
}
