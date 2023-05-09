import 'reflect-metadata';
import { IUserRepository } from '../../../modules/user/domain/repositories/user_repository_interface';
import { User } from '../../../shared/domain/entities/user';
import { decorate, injectable } from 'inversify';
import { Auth, Amplify } from 'aws-amplify';
import awsconfig from '../../../../aws-exports';
Amplify.configure(awsconfig);

import userJson from '../jsons/users.json';

interface StudentJson {
  RA: string;
  Aluno: string;
}

export class UserRepositoryHttp implements IUserRepository {
  getNameFromJson(ra: string): string {
    const jsonData = JSON.parse(JSON.stringify(userJson)) as StudentJson[];

    for (const student of jsonData) {
      if (student.RA === ra) {
        return student.Aluno;
      }
    }

    return 'não foi encontrado!';
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: this.getNameFromJson(email.substring(0, 10)),
        'custom:ra': email.substring(0, 10),
        'custom:role': 'STUDENT',
      },
    });
    console.log(user);
    return new User({
      email: email,
      name: this.getNameFromJson(email.substring(0, 10)),
      ra: email.substring(0, 10),
      password: password,
    });
  }
  updateUser(email: string, newPassword: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteUser(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getLength(): number {
    throw new Error('Method not implemented.');
  }
  async getUser(): Promise<User> {
    const user = await Auth.currentAuthenticatedUser();
    return new User({
      email: user.attributes.email,
      name: user.attributes.name,
      ra: user.attributes.email.substring(0, 10),
      password: 'cannot_pass_by_here',
    });
  }
  async confirmUser(email: string, code: string): Promise<User> {
    const user = await Auth.confirmSignUp(email, code);
    return new User({
      email: user.attributes.email,
      name: user.attributes.name,
      ra: user.attributes.email.substring(0, 10),
      password: 'cannot_pass_by_here',
    });
  }
}

decorate(injectable(), UserRepositoryHttp);
