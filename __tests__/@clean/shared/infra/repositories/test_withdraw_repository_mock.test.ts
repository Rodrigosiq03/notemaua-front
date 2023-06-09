import { NoItemsFoundError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error';
import { WithdrawRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/withdraw_repository_mock';

test('Test withdraw repository mock get all withdraws', () => {
  const repo = new WithdrawRepositoryMock();

  repo.getAllWithdraws().then((withdraws) => {
    expect(withdraws.length).toBe(3);
  });
  repo.getAllWithdraws().then((withdraws) => {
    expect(withdraws[0].numSerie).toBe('34100');
  });
  repo.getAllWithdraws().then((withdraws) => {
    expect(withdraws[1].numSerie).toBe('34101');
  });
  repo.getAllWithdraws().then((withdraws) => {
    expect(withdraws[2].numSerie).toBe('34102');
  });
});

test('Test withdraw repository mock create withdraw', async () => {
  const repoWithdraw = new WithdrawRepositoryMock();
  const withdraws = await repoWithdraw.getAllWithdraws();

  const withdraw = await repoWithdraw.createWithdraw(
    '34103',
    '22.00680-0@maua.br'
  );

  expect(withdraw.numSerie).toBe('34103');
  expect(withdraws.length).toBe(4);
});
test('Test withdraw repository mock finish withdraw', async () => {
  const repoWithdraw = new WithdrawRepositoryMock();
  const withdraws = await repoWithdraw.getAllWithdraws();

  const withdraw = await repoWithdraw.finishWithdraw('34100', 'teste_id_token');

  expect(withdraws.length).toBe(2);
  expect(withdraw.numSerie).toBe('34100');
});
test('Test notebook error to find', async () => {
  const repo = new WithdrawRepositoryMock();

  await expect(repo.finishWithdraw('34104', 'teste_id_token')).rejects.toThrow(
    NoItemsFoundError
  );
  await expect(repo.finishWithdraw('34104', 'teste_id_token')).rejects.toThrow(
    'No items found for this withdraw numSerie: 34104'
  );
});
