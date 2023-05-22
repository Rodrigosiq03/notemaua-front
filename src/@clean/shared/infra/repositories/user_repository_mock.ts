import 'reflect-metadata';
import { decorate, injectable } from 'inversify';
import { IUserRepository } from '../../../../@clean/modules/user/domain/repositories/user_repository_interface';
import { User } from '../../../shared/domain/entities/user';
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error';

export class UserRepositoryMock implements IUserRepository {
  private users: User[] = [
    new User({
      ra: '22.00680-0',
      name: 'Rodrigo Siqueira',
      email: '22.00680-0@maua.br',
      password: null,
    }),
    new User({
      ra: '22.01290-7',
      name: 'Leonardo Stuber',
      email: '22.01290-7@maua.br',
      password: null,
    }),
    new User({
      ra: '22.01102-0',
      name: 'Luigi Trevisan',
      email: '22.01102-0@maua.br',
      password: null,
    }),
    new User({
      ra: '22.01589-2',
      name: 'Gabriel Parmigiano',
      email: '22.01589-2@maua.br',
      password: null,
    }),
    new User({
      ra: '22.01049-0',
      name: 'Vitor Negresiolo',
      email: '22.01049-0@maua.br',
      password: null,
    }),
    new User({
      ra: '22.00820-9',
      name: 'Dimitri Zenaro',
      email: '22.00820-9@maua.br',
      password: null,
    }),
    new User({
      ra: '22.01019-0',
      name: 'Rafael Bidetti',
      email: '22.01019-0@maua.br',
      password: null,
    }),
  ];

  async createUser(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new NoItemsFoundError(`user email: ${email}`);
    }
    this.updateUser(email, 'senhatrocada_apos_criacao');
    return user as User;
  }

  async getUser(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new NoItemsFoundError(`user email: ${email}`);
    }
    return user;
  }

  async updateUser(email: string, newPassword: string): Promise<User> {
    const user = await this.getUser(email);
    if (user) {
      user.setPassword = newPassword;
    }
    return user;
  }

  async deleteUser(email: string): Promise<User> {
    const user = this.getUser(email);
    this.users = this.users.filter((user) => user.email !== email);
    return user;
  }

  getLength(): number {
    return this.users.length;
  }

  getNameFromJson(ra: string): string {
    throw new Error('Method not implemented.');
  }

  confirmUser(email: string, code: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  forgotPassword(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  forgotPasswordSubmit(
    email: string,
    code: string,
    newPassword: string
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }

  validateEmailInJson(email: string): boolean {
    throw new Error('Method not implemented.');
  }

  resendConfirmationCode(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

decorate(injectable(), UserRepositoryMock);
