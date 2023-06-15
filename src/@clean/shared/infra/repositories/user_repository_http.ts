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
    try {
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
    } catch (error: any) {
      switch (error.code) {
        case 'UsernameExistsException':
          throw new Error('Usuário já existe');
        case 'InvalidPasswordException':
          throw new Error('Senha inválida');
        case 'InvalidParameterException':
          throw new Error('Email inválido');
        default:
          throw new Error('Erro desconhecido');
      }
    }
  }

  async updateUser(
    email: string,
    newPassword: string,
    code: string
  ): Promise<User> {
    const userUpdated = await Auth.forgotPasswordSubmit(
      email,
      code,
      newPassword
    );
    return new User({
      email: email,
      name: this.getNameFromJson(email.substring(0, 10)),
      ra: email.substring(0, 10),
      password: 'cannot_pass_by_here',
    });
  }

  async deleteUser(email: string): Promise<User> {
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
    try {
      const user = await Auth.confirmSignUp(email, code);
      return new User({
        email: user.attributes.email,
        name: user.attributes.name,
        ra: user.attributes.email.substring(0, 10),
        password: 'cannot_pass_by_here',
      });
    } catch (error: any) {
      switch (error.code) {
        case 'UserNotFoundException':
          throw new Error('Usuário não encontrado');
        case 'CodeMismatchException':
          throw new Error('Código inválido');
        case 'ExpiredCodeException':
          throw new Error('Código expirado');
        case 'NotAuthorizedException':
          throw new Error(
            'Usuário não pode ser confirmado. Usuário já confirmado'
          );
        case 'TooManyFailedAttemptsException':
          throw new Error('Muitas tentativas');
        case 'LimitExceededException':
          throw new Error(
            'Limites de confirmação de usuário excedidos. Usuário já confirmado'
          );
        default:
          throw new Error(error.code);
      }
    }
  }

  async forgotPassword(email: string): Promise<User> {
    try {
      const user = await Auth.forgotPassword(email);
      return new User({
        email: user.attributes.email,
        name: user.attributes.name,
        ra: user.attributes.email.substring(0, 10),
        password: 'cannot_pass_by_here',
      });
    } catch (error: any) {
      switch (error.code) {
        case 'UserNotFoundException':
          throw new Error('Usuário não encontrado');
        default:
          throw new Error(error.code);
      }
    }
  }

  async forgotPasswordSubmit(
    email: string,
    code: string,
    newPassword: string
  ): Promise<User> {
    const user = await Auth.forgotPasswordSubmit(email, code, newPassword);
    return new User({
      email: email,
      name: this.getNameFromJson(email.substring(0, 10)),
      ra: email.substring(0, 10),
      password: 'cannot_pass_by_here',
    });
  }

  validateEmailInJson(email: string): boolean {
    const jsonData = JSON.parse(JSON.stringify(userJson)) as StudentJson[];
    const ra = email.substring(0, 10);

    for (const student of jsonData) {
      if (student.RA === ra) {
        return true;
      }
    }
    return false;
  }

  async resendConfirmationCode(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error: any) {
      console.log('User repository http error: ', error);
      switch (error.code) {
        case 'UserNotFoundException':
          throw new Error('Usuário não encontrado');
        case 'NotAuthorizedException':
          throw new Error('Usuário ou senha incorretos');
        case 'NotAuthorizedException: Password attempts exceeded':
          throw new Error('Muitas tentativas de login');
        case 'UserNotConfirmedException':
          throw new Error('Usuário não confirmado');
        case 'PasswordResetRequiredException':
          throw new Error('Senha resetada');
        case 'TooManyFailedAttemptsException':
          throw new Error('Muitas tentativas');
        case 'InvalidPasswordException':
          throw new Error('Senha inválida');
        default:
          throw new Error(error.code);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await Auth.signOut();
      console.log('User signed out');
    } catch (error: any) {
      throw new Error(error.code);
    }
  }

  async completeNewPassword(email: string, newPassword: string): Promise<User> {
    try {
      const user = await Auth.completeNewPassword(email, newPassword);
      return new User({
        email: user.attributes.email,
        name: user.attributes.name,
        ra: user.attributes.email.substring(0, 10),
        password: 'cannot_pass_by_here',
      });
    } catch (error: any) {
      switch (error.code) {
        case 'UserNotFoundException':
          throw new Error('Usuário não encontrado');
        case 'InvalidPasswordException':
          throw new Error('Senha inválida');
        case 'InvalidParameterException':
          throw new Error('Email inválido');
        default:
          throw new Error('Erro desconhecido');
      }
    }
  }

  async getIdToken(): Promise<string> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.signInUserSession.idToken.jwtToken;
    } catch (error: any) {
      throw new Error(error.code);
    }
  }
}

decorate(injectable(), UserRepositoryHttp);
