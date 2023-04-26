import { User } from "@/@clean/modules/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";
import { NoItemsFoundError } from "@/@clean/modules/domain/helpers/errors/domain_error";

export class GetUserUsecase {
    constructor(private userRepo: IUserRepository) {}

    async execute(userId: number): Promise<User> {
        try {
            const user = await this.userRepo.getUser(userId);
            return user;
        } catch (err) {
            throw new NoItemsFoundError(` id ${userId}`);
        }
    }
}