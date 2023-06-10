import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';

export class CompleteNewPasswordUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, newPassword: string): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new EntityError('props.email');
    }
    if (!User.validatePassword(newPassword)) {
      throw new EntityError('props.password');
    }

    return await this.userRepo.completeNewPassword(email, newPassword);
  }
}
