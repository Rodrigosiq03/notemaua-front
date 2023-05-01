import { NoItemsFoundError } from "@/@clean/shared/domain/helpers/errors/domain_error";
import { User } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class UpdateUserUsecase {
    constructor(private userRepo: IUserRepository) {}

    async execute(email: string, newPassword: string): Promise<User> {
        if (!User.validateEmail(email)) {
            throw new NoItemsFoundError("email");
        }
        if (!User.validatePassword(newPassword)) {
            throw new NoItemsFoundError("newPassword");
        }
        const user = await this.userRepo.updateUser(email, newPassword);
        return user;
        
    }
}