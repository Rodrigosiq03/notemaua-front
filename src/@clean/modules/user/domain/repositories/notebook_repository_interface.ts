import { Notebook } from "@/@clean/shared/domain/entities/notebook";

export interface INotebookRepository {
    getNotebook(numSerie: string): Promise<Notebook>;
}