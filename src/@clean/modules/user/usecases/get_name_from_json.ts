import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';

export class GetNameFromJsonUsecase {
  constructor(private userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  execute(ra: string): string {
    if (!User.validateRa(ra)) {
      throw new EntityError('ra');
    }

    return this.userRepo.getNameFromJson(ra);
  }
}
