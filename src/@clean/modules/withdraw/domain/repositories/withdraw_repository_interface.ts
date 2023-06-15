import { Withdraw } from '../../../../shared/domain/entities/withdraw';

export interface IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]>;
  createWithdraw(numSerie: string, idToken: string): Promise<Withdraw>;
  finishWithdraw(numSerie: string, idToken: string): Promise<Withdraw>;
}
