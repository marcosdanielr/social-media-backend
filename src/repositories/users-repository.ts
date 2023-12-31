import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  editById(id: string, data: Prisma.UserUpdateInput): Promise<Prisma.UserUpdateInput | null>;
  deleteById(id: string): Promise<User | null>;
  searchByName(name: string): Promise<User[]>;
}
