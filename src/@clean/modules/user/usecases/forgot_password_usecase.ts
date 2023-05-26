import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';

export class ForgotPasswordUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new EntityError('email');
    }
    const user = await this.userRepo.forgotPassword(email);
    return user;
  }
}
