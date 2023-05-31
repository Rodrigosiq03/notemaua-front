import { NoItemsFoundError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error';
import { NotebookRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/notebook_repository_mock';

test('Test Notebook repository mock', async () => {
  const repo = new NotebookRepositoryMock();

  const notebooks = await repo.getAllNotebooks();
  expect(notebooks.length).toBe(11);
});
// test('Test Notebook repository mock error to find', async () => {
//   const repo = new NotebookRepositoryMock();

//   await expect(repo.getNotebook('34000')).rejects.toThrow(NoItemsFoundError);
// });
