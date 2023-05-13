import { decorate, injectable } from 'inversify';
import { IWithdrawRepository } from '../../../modules/withdraw/domain/repositories/withdraw_repository_interface';
import { Withdraw } from '../../domain/entities/withdraw';

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error('Method not implemented.');
  }

  createWithdraw(numSerie: string, email: string): Promise<Withdraw> {
    throw new Error('Method not implemented.');
  }

  finishWithdraw(numSerie: string): Promise<Withdraw> {
    throw new Error('Method not implemented.');
  }
}

decorate(injectable(), WithdrawRepositoryHttp);
