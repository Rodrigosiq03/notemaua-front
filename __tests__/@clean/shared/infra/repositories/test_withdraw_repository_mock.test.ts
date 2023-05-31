import { WithdrawRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/withdraw_repository_mock';

test('Test withdraw repository mock get all withdraws', async () => {
  const repo = new WithdrawRepositoryMock();

  const withdraws = await repo.getAllNotebooks();
  expect(withdraws.length).toBe(3);
});
test('Test withdraw repository mock finish withdraw', async () => {
  const repo = new WithdrawRepositoryMock();

  const withdraw = await repo.finishWithdraw('34100', 'teste');
  expect(withdraw.numSerie).toBe('34100');
});
// test('Test withdraw repository mock create withdraw', async () => {
//   const repoWithdraw = new WithdrawRepositoryMock();
//   const withdraws = await repoWithdraw.getAllWithdraws();

//   const withdraw = await repoWithdraw.createWithdraw(
//     '34103',
//     '22.00680-0@maua.br'
//   );

//   expect(withdraw.numSerie).toBe('34103');
//   expect(withdraw.email).toBe('22.00680-0@maua.br');
//   expect(withdraws.length).toBe(4);
// });

// test('Test withdraw repository mock finish withdraw', async () => {
//   const repoWithdraw = new WithdrawRepositoryMock();
//   const withdraws = await repoWithdraw.getAllWithdraws();

//   const withdraw = await repoWithdraw.finishWithdraw('34100');

//   expect(withdraws.length).toBe(2);
//   expect(withdraw.numSerie).toBe('34100');
// });
// test('Test notebook error to find', async () => {
//   const repo = new WithdrawRepositoryMock();

//   await expect(repo.finishWithdraw('34104')).rejects.toThrow(NoItemsFoundError);
//   await expect(repo.finishWithdraw('34104')).rejects.toThrow(
//     'No items found for this withdraw numSerie: 34104'
//   );
// });
