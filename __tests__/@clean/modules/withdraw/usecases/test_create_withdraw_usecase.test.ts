import { CreateWithdrawUsecase } from '../../../../../src/@clean/modules/withdraw/usecases/create_withdraw_usecase';
import { Withdraw } from '../../../../../src/@clean/shared/domain/entities/withdraw';
import { WithdrawRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/withdraw_repository_mock';

test('Test create withdraw usecase', async () => {
  const repo = new WithdrawRepositoryMock();
  const usecase = new CreateWithdrawUsecase(repo);
  const withdraw = await usecase.execute('34100');
  expect(withdraw).toBeInstanceOf(Withdraw);
});
test('Test create withdraw usecase with invalid numSerie', () => {
  const repo = new WithdrawRepositoryMock();
  const usecase = new CreateWithdrawUsecase(repo);
  expect(usecase.execute('')).rejects.toThrow('Field numSerie is not valid');
});
