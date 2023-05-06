import { EntityError } from "../../../../@clean/shared/domain/helpers/errors/domain_error";
import { User } from "../../../shared/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class CreateUserUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new EntityError("email");
    }
    if (!User.validatePassword(password)) {
      throw new EntityError("password");
    }
    const userCreated = await this.userRepo.createUser(email, password);
    return userCreated;
  }
}
