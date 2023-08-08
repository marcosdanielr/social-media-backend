import { Post, Prisma } from "@prisma/client";

export interface EditPost {
  id: string;
  user_id: string;
  data: {
    description: string;
  }
}

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Prisma.PostUncheckedCreateInput | Post>;
  edit({ id, user_id, data }: EditPost): Promise<Prisma.PostUncheckedCreateInput | Post>;
  deleteById(id: string): Promise<Prisma.PostUncheckedCreateInput | Post>;
  findById(id: string): Promise<Prisma.PostUncheckedCreateInput | null>;
  list(user_id: string, page: number, items_per_page: number): Promise<Post[] | Prisma.PostUncheckedCreateInput[]>;
}
