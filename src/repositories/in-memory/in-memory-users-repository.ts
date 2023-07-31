import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = [];

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()    
        };

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find(item => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async findById(id: string) {
        const user = this.users.find(item => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

    async editById(id: string, data: User) {
        const index = this.users.findIndex(item => item.id === id);

        if(index < 0) {
            return null;
        }

        const user = this.users[index];

        this.users[index] = {
            ...user,
            name: data.name ?? user.name,
            password_hash: data.password_hash ?? user.password_hash,
            email: data.email ?? user.email,
        };

        return this.users[index];
    }

    async deleteById(id: string) {
        const index = this.users.findIndex(item => item.id === id);

        if (index < 0) {
            return null;
        }

        const user = this.users[index];

        this.users.splice(index, 1);

        return user;      
    }
}
