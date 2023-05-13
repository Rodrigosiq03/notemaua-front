import { User } from '@/@clean/shared/domain/entities/user';
import { ROLE } from '@/@clean/shared/domain/enums/role_enum';
import { NoItemsFoundError } from '@/@clean/shared/domain/helpers/errors/domain_error';
import { UserRepositoryMock } from '@/@clean/shared/infra/repositories/user_repository_mock';

test('Test create user', () => {
  const repo = new UserRepositoryMock();
  const oldPass = repo
    .getUser('22.00680-0@maua.br')
    .then((user) => user.password);
  const user = repo.createUser('22.00680-0@maua.br');
  const userPassword = user.then((user) => user.password);
  const userRole = user.then((user) => user.props.role);
  expect(user).toBeInstanceOf(Promise<User>);
  expect(userPassword).not.toBe(oldPass);
  expect(userPassword).resolves.toBe('senhatrocada_apos_criacao');
  expect(userRole).resolves.toBe(ROLE.STUDENT);
});
test('Test get user', () => {
  const repo = new UserRepositoryMock();

  // get one user
  const user1 = repo.getUser('22.00680-0@maua.br');
  const user1Name = user1.then((user) => user.name);
  const user1Email = user1.then((user) => user.email);
  const user1Role = user1.then((user) => user.props.role);

  // assert user1 to be one User
  expect(user1).toBeInstanceOf(Promise<User>);
  expect(user1Name).resolves.toBe('Rodrigo Siqueira');
  expect(user1Email).resolves.toBe('22.00680-0@maua.br');
  expect(user1Role).resolves.toBe(ROLE.STUDENT);
});
test('Test update user', () => {
  const repo = new UserRepositoryMock();

  const oldPass = repo
    .getUser('22.00680-0@maua.br')
    .then((user) => user.password);
  const userUpdated = repo.updateUser('22.00680-0@maua.br', '123456789');
  const userUpdatedPassword = userUpdated.then((user) => user.password);

  expect(userUpdated).toBeInstanceOf(Promise<User>);
  expect(userUpdatedPassword).resolves.toBe('123456789');
  expect(userUpdatedPassword).not.toBe(oldPass);
});
test('Test delete user', () => {
  const repo = new UserRepositoryMock();

  const lengthUsers = repo.getLength();

  const userDeleted = repo.deleteUser('22.00680-0@maua.br');
  const userDeletedName = userDeleted.then((user) => user.name);

  expect(userDeleted).toBeInstanceOf(Promise<User>);
  expect(userDeletedName).resolves.toBe('Rodrigo Siqueira');
  expect(repo.getLength()).toBe(lengthUsers - 1);
});
test('Test error get user', () => {
  const repo = new UserRepositoryMock();

  const user = repo.getUser('22.00000-0@maua.br');

  expect(user).rejects.toThrow(NoItemsFoundError);
  expect(user).rejects.toThrow(
    'No items found for this user email: 22.00000-0@maua.br'
  );
});
