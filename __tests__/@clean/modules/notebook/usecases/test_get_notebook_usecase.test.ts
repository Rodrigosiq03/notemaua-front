import { GetNotebookUsecase } from "@/@clean/modules/notebook/usecases/get_notebook_usecase";
import { Notebook } from "@/@clean/shared/domain/entities/notebook";
import { NotebookRepositoryMock } from "@/@clean/shared/infra/repositories/notebook_repository_mock";

test('Test get a notebook usecase', async () => {
  const repo = new NotebookRepositoryMock();
  const usecase = new GetNotebookUsecase(repo);
  const notebook = await usecase.execute('34100');  

  expect(notebook).toBeInstanceOf(Notebook);  
});
test('Test get a notebook usecase with invalid numSerie', () => {
  const repo = new NotebookRepositoryMock();
  const usecase = new GetNotebookUsecase(repo);
  expect(usecase.execute('')).rejects.toThrow('Field numSerie is not valid');
});