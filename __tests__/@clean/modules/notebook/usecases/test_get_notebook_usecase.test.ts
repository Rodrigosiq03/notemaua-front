import { Notebook } from '../../../../../src/@clean/shared/domain/entities/notebook'; 
import { NotebookRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/notebook_repository_mock';
import { GetNotebookUsecase } from '../../../../../src/@clean/modules/notebook/usecases/get_notebook_usecase';  

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