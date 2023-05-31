import { CreateWithdrawUsecase } from '../../../../../src/@clean/modules/withdraw/usecases/create_withdraw_usecase';
import { Withdraw } from '../../../../../src/@clean/shared/domain/entities/withdraw';
import { WithdrawRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/withdraw_repository_mock';

test('Test create withdraw usecase', async () => {
  const repo = new WithdrawRepositoryMock();
  const usecase = new CreateWithdrawUsecase(repo);
  const withdraw = await usecase.execute('34100', '22.00680-0@maua.br');
  expect(withdraw).toBeInstanceOf(Withdraw);
});
// test('Test create withdraw usecase with invalid numSerie', () => {
//   const repo = new WithdrawRepositoryMock();
//   const usecase = new CreateWithdrawUsecase(repo);
//   expect(usecase.execute('', '22.00680-0@maua.br')).rejects.toThrow(
//     'Field numSerie is not valid'
//   );
// });
// test('Test create withdraw usecase with invalid email', () => {
//   const repo = new WithdrawRepositoryMock();
//   const usecase = new CreateWithdrawUsecase(repo);
//   expect(usecase.execute('34100', '22.00680-0@gmail.com')).rejects.toThrow(
//     'Field email is not valid'
//   );
// });
