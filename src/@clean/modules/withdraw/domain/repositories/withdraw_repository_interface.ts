import { Notebook } from '@/@clean/shared/domain/entities/notebook';
import { Withdraw } from '@/@clean/shared/domain/entities/withdraw';

export interface IWithdrawRepository {
  getAllNotebooks(idToken: string): Promise<[Notebook, Withdraw[]][]>;
  createWithdraw(numSerie: string, idToken: string): Promise<Withdraw>;
  finishWithdraw(numSerie: string, idToken: string): Promise<Withdraw>;
}
