import { INotebookRepository } from "@/@clean/modules/user/domain/repositories/notebook_repository_interface";
import { Notebook } from "../../domain/entities/notebook";
import { NoItemsFoundError } from "../../domain/helpers/errors/domain_error";

export class NotebookRepositoryMock implements INotebookRepository {
    private notebooks: Notebook[] = [
        new Notebook({
            numSerie: '34100',
        }),
        new Notebook({
            numSerie: '34101',
        }),
        new Notebook({
            numSerie: '34102',
        }),
        new Notebook({
            numSerie: '34103',
        }),
        new Notebook({
            numSerie: '34104',
        }),
        new Notebook({
            numSerie: '34105',
        }),
        new Notebook({
            numSerie: '34106',
        }),
        new Notebook({
            numSerie: '34107',
        }),
        new Notebook({
            numSerie: '34108',
        }),
        new Notebook({
            numSerie: '34109',
        }),
        new Notebook({
            numSerie: '34110',
        }),
    ];

    async getNotebook(numSerie: string): Promise<Notebook> {
        const notebook = this.notebooks.find(notebook => notebook.numSerie === numSerie);
        if (notebook) {
            return notebook;
        } else {
            throw new NoItemsFoundError(`notebook numSerie: ${numSerie}`);
        }

    }
    
}