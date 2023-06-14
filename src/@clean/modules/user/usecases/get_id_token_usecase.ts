import { IUserRepository } from '../domain/repositories/user_repository_interface';

export class GetIdTokenUsecase {
  constructor(private userRepo: IUserRepository) {}

  async execute(): Promise<string> {
    const idToken = await this.userRepo.getIdToken();
    return idToken;
  }
}
