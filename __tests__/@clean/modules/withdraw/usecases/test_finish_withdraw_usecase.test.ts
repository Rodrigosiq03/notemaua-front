import { FinishWithdrawUsecase } from '../../../../../src/@clean/modules/withdraw/usecases/finish_withdraw_usecase';
import { Withdraw } from '../../../../../src/@clean/shared/domain/entities/withdraw';
import { WithdrawRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/withdraw_repository_mock';

test('Test finish withdraw usecase', () => {
  const repo = new WithdrawRepositoryMock();
  const usecase = new FinishWithdrawUsecase(repo);

  expect(usecase.execute('34100', 'teste')).toBeInstanceOf(Promise<Withdraw>);
});
// test('Test finish withdraw usecase with invalid numSerie', () => {
//   const repo = new WithdrawRepositoryMock();
//   const usecase = new FinishWithdrawUsecase(repo);
//   expect(usecase.execute('')).rejects.toThrow('Field numSerie is not valid');
// });
