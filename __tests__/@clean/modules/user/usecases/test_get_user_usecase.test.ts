import { GetUserUsecase } from "@/@clean/modules/user/usecases/get_user_usecase"
import { User } from "../../../../../src/@clean/shared/domain/entities/user"
import { UserRepositoryMock } from "@/@clean/shared/infra/repositories/user_repository_mock"

test('Test get user usecase', async () => {
  const repo = new UserRepositoryMock();
  const usecase = new GetUserUsecase(repo);
  const user = await usecase.execute('22.00680-0@maua.br');
  expect(user).toBeInstanceOf(User);
});
test('Test get user usecase with invalid email', () => {  
  const repo = new UserRepositoryMock();
  const usecase = new GetUserUsecase(repo);
  expect(usecase.execute('22.00680-0@gmail',)).rejects.toThrow('Field email is not valid');
});