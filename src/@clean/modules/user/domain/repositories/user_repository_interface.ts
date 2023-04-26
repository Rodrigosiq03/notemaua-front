import { User } from "@/@clean/shared/domain/entities/user";


export interface IUserRepository {
    createUser(email: string): Promise<User>;
    getUser(email: string): Promise<User>;
    updateUser(email: string, newPassword: string): Promise<User>;
    deleteUser(email: string): Promise<User>;
}


