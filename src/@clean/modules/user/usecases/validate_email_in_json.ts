import { User } from '@/@clean/shared/domain/entities/user';
import { IUserRepository } from '../domain/repositories/user_repository_interface';
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error';

export class validateEmailInJson {
  constructor(private userRepository: IUserRepository) {}

  execute(email: string): boolean {
    if (!User.validateEmail(email)) {
      throw new EntityError('email');
    }
    return this.userRepository.validateEmailInJson(email);
  }
}
