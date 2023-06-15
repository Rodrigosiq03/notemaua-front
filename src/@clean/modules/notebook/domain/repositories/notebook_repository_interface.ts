import { Withdraw } from '@/@clean/shared/domain/entities/withdraw';
import { Notebook } from '../../../../shared/domain/entities/notebook';

export interface INotebookRepository {
  getAllNotebooks(idToken: string): Promise<[Notebook, Withdraw[]][]>;
  validateNumSerieInJson(numSerie: string): boolean;
}
