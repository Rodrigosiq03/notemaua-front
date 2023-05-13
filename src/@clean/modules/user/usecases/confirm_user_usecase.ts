import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';

export class ConfirmUserUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, code: string): Promise<User> {
    if (!User.validateEmail(email)) {
      throw new Error('email');
    }
    const user = await this.userRepo.confirmUser(email, code);
    return user;
  }
}
