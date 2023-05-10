import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';

export class ForgotPasswordSubmitUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    email: string,
    code: string,
    newPassword: string
  ): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new EntityError('email');
    }
    if (!User.validatePassword(newPassword)) {
      throw new EntityError('newPassword');
    }

    const user = await this.userRepo.forgotPasswordSubmit(
      email,
      code,
      newPassword
    );
    return user;
  }
}
