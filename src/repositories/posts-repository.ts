import { Post, Prisma } from "@prisma/client";

export interface EditPost {
  id: string;
  user_id: string;
  data: {
    description: string;
  }
}

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  edit({ id, user_id, data }: EditPost): Promise<Post>;
  deleteById(id: string): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  list(user_id: string, page: number, items_per_page: number): Promise<Post[]>;
}
