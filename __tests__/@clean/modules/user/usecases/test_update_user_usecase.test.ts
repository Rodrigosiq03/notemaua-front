import { UpdateUserUsecase } from "../../../../../src/@clean/modules/user/usecases/update_user_usecase"
import { GetUserUsecase } from "../../../../../src/@clean/modules/user/usecases/get_user_usecase"
import { User } from "../../../../../src/@clean/shared/domain/entities/user"
import { UserRepositoryMock } from "../../../../../src/@clean/shared/infra/repositories/user_repository_mock"

test('Test update user usecase', async () => {
  const repo = new UserRepositoryMock();
  const usecase = new UpdateUserUsecase(repo);
  const getUser = new GetUserUsecase(repo) ; 
  const user = await getUser.execute('22.00680-0@maua.br');
  const passwordBefore = user.password;
  const userUpdated = await usecase.execute('22.00680-0@maua.br', 'senhatrocada');
  const passwordAfter = userUpdated.password;
  expect(passwordBefore).not.toBe(passwordAfter);
  expect(userUpdated).toBeInstanceOf(User);

});
test('Test update user usecase with invalid email', () => {
  const repo = new UserRepositoryMock()
  const usecase = new UpdateUserUsecase(repo)
  expect(usecase.execute('22.00680-0@gmail', 'senhatrocada')).rejects.toThrow('Field email is not valid')
});
test('Test update user usecase with invalid password', () => {  
  const repo = new UserRepositoryMock()
  const usecase = new UpdateUserUsecase(repo)
  expect(usecase.execute('22.00680-0@maua.br', '')).rejects.toThrow('Field newPassword is not valid')
}); 