import { User } from '../../../../shared/domain/entities/user';

export interface IUserRepository {
  createUser(email: string, password: string): Promise<User>;
  getUser(email: string): Promise<User>;
  updateUser(email: string, newPassword: string): Promise<User>;
  deleteUser(email: string): Promise<User>;
  getLength(): number;
  getNameFromJson(ra: string): string;
  confirmUser(email: string, code: string): Promise<User>;
}
