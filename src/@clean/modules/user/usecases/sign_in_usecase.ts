import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';

export class SignInUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string) {
    if (!User.validateEmail(email)) {
      throw new EntityError('email');
    }
    if (!User.validatePassword(password)) {
      throw new EntityError('password');
    }
    return await this.userRepo.signIn(email, password);
  }
}
