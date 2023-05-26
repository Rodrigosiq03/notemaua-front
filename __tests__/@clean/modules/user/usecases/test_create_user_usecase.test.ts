import { CreateUserUsecase } from "../../../../../src/@clean/modules/user/usecases/create_user_usecase"
import { User } from "../../../../../src/@clean/shared/domain/entities/user"
import { UserRepositoryMock } from "../../../../../src/@clean/shared/infra/repositories/user_repository_mock"
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'

test('Test use case', async () => {
  const repo = new UserRepositoryMock();
  const usecase = new CreateUserUsecase(repo);
  const email = '22.00680-0@maua.br';
  const password = 'Maua1234!';
  const userCreated = await usecase.execute(email, password);

  expect(userCreated).toBeInstanceOf(User)
expect(userCreated).toBeInstanceOf(User);
});
test('Test use case with invalid email', () => {
  const repo = new UserRepositoryMock();
  const usecase = new CreateUserUsecase(repo);
  const email = '22.00680-0@gmail';
  const password = 'Maua1234!';


  expect(usecase.execute(email, password)).rejects.toThrow(EntityError);
  expect(usecase.execute(email, password)).rejects.toThrow('Field email is not valid');
});
test('Test use case with invalid password', () => {
  const repo = new UserRepositoryMock();
  const usecase = new CreateUserUsecase(repo);
  const email = '22.00680-0@maua.br';
  const password = '';

  expect(usecase.execute(email, password)).rejects.toThrow(EntityError);
  expect(usecase.execute(email, password)).rejects.toThrow('Field password is not valid');
});