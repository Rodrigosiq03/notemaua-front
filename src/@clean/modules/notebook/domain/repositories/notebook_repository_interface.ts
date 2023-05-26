import { Notebook } from '../../../../shared/domain/entities/notebook';

export interface INotebookRepository {
  getNotebook(numSerie: string): Promise<Notebook>;
  validateNumSerieInJson(numSerie: string): boolean;
}
