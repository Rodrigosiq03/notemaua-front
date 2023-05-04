import { CreateUserUsecase } from "../../../../../src/@clean/modules/user/usecases/create_user_usecase"
import { User } from "../../../../../src/@clean/shared/domain/entities/user"
import { ROLE } from "../../../../../src/@clean/shared/domain/enums/role_enum"
import { UserRepositoryMock } from "../../../../../src/@clean/shared/infra/repositories/user_repository_mock"

test('Test use case', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const email = '22.00680-0@maua.br'
    const password = 'Maua1234!'  
    const userCreated = await usecase.execute(email, password)

    expect(userCreated).toBeInstanceOf(User)
});
