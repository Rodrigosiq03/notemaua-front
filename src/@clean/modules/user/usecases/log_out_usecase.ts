import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';

export class LogOutUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(): Promise<void> {
    return await this.userRepo.logout();
  }
}
