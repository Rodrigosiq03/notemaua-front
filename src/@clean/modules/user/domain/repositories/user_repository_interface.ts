import { User } from '../../../../shared/domain/entities/user';

export interface IUserRepository {
  createUser(email: string, password: string): Promise<User>;
  getUser(email: string): Promise<User>;
  updateUser(email: string, newPassword: string, code: string): Promise<User>;
  deleteUser(email: string): Promise<User>;
  getLength(): number;
  getNameFromJson(ra: string): string;
  confirmUser(email: string, code: string): Promise<User>;
  forgotPassword(email: string): Promise<User>;
  forgotPasswordSubmit(
    email: string,
    code: string,
    newPassword: string
  ): Promise<User>;
  validateEmailInJson(email: string): boolean;
  resendConfirmationCode(email: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  logout(): Promise<User>;
}
