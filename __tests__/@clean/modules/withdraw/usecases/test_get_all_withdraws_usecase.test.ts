import { GetAllNotebooksUsecase } from "../../../../../src/@clean/modules/withdraw/usecases/get_all_notebooks_usecase";
import { Withdraw } from "../../../../../src/@clean/shared/domain/entities/withdraw";
import { WithdrawRepositoryMock } from "../../../../../src/@clean/shared/infra/repositories/withdraw_repository_mock";

test('Test get all withdraws usecase', () => {
  const repo = new WithdrawRepositoryMock();
  const usecase = new GetAllNotebooksUsecase(repo);  

  expect(usecase.execute()).toBeInstanceOf(Promise<Withdraw[]>);
});