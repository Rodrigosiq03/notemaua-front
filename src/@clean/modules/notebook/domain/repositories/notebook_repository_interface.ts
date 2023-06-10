import { Notebook } from '../../../../shared/domain/entities/notebook';

export interface INotebookRepository {
  getAllNotebooks(): Promise<Notebook[]>;
  validateNumSerieInJson(numSerie: string): boolean;
}
