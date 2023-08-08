export interface LikesRepository {
  likePost(by_id: string, post_id: string): Promise<void>;
}
