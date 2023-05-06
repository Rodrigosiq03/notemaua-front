import { User } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";
import {
  EntityError,
  NoItemsFoundError,
} from "../../../shared/domain/helpers/errors/domain_error";

export class GetUserUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new EntityError("email");
    }
    const user = await this.userRepo.getUser(email);
    return user;
  }
}
