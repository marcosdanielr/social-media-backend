import { Post, Prisma } from "@prisma/client";

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
}
