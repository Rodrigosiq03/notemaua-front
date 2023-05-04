import { Notebook } from "@/@clean/shared/domain/entities/notebook";
import { NoItemsFoundError } from "@/@clean/shared/domain/helpers/errors/domain_error";
import { NotebookRepositoryMock } from "@/@clean/shared/infra/repositories/notebook_repository_mock";

test('Test Notebook repository mock', () => {
    const repo = new NotebookRepositoryMock();

    const notebook = repo.getNotebook('34100');
    const numSerieNotebook = notebook.then(notebook => notebook.numSerie);
    const isActiveNotebook = notebook.then(notebook => notebook.isActive);

    expect(notebook).toBeInstanceOf(Promise<Notebook>);
    expect(numSerieNotebook).resolves.toBe('34100');
    expect(isActiveNotebook).resolves.toBe(false);
});
test('Test Notebook repository mock error to find', async () => {
    const repo = new NotebookRepositoryMock();

    await expect(repo.getNotebook('34000')).rejects.toThrow(NoItemsFoundError);
});