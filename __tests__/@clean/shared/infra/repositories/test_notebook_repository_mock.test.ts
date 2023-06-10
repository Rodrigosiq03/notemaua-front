import { Notebook } from '@/@clean/shared/domain/entities/notebook';
import { NotebookRepositoryMock } from '@/@clean/shared/infra/repositories/notebook_repository_mock';

test('Test Notebook repository mock', async () => {
  const repo = new NotebookRepositoryMock();

  const notebook = await repo.getAllNotebooks();

  expect(notebook).toBeInstanceOf(Array);
});
