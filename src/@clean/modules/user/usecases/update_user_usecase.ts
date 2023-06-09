import { EntityError } from '../../../../@clean/shared/domain/helpers/errors/domain_error';
import { User } from '../../../shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';

export class UpdateUserUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    email: string,
    newPassword: string,
    code: string
  ): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new EntityError('email');
    }
    if (!User.validatePassword(newPassword)) {
      throw new EntityError('newPassword');
    }
    const user = await this.userRepo.updateUser(email, newPassword, code);
    return user;
  }
}
