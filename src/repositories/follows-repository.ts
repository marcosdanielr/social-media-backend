export interface FollowsRepository {
  followById(follower_id: string, following_id: string): Promise<void>;
  unfollowById(follower_id: string, following_id: string): Promise<void>;
}
