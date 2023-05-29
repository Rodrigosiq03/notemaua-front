import { Notebook } from '../../../../../src/@clean/shared/domain/entities/notebook';
import { NotebookRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/notebook_repository_mock';
import { GetNotebookUsecase } from '../../../../../src/@clean/modules/notebook/usecases/get_all_notebooks_usecase';

test('Test get a notebook usecase', async () => {
  const repo = new NotebookRepositoryMock();
  const usecase = new GetNotebookUsecase(repo);
  const notebooks = await usecase.execute();

  expect(notebooks).toBeInstanceOf(Array);
});
