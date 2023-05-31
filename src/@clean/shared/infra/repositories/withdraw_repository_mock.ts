import 'reflect-metadata';
import { decorate, injectable } from 'inversify';
import { IWithdrawRepository } from '../../../modules/withdraw/domain/repositories/withdraw_repository_interface';
import { Withdraw } from '../../domain/entities/withdraw';
import { NoItemsFoundError } from '../../domain/helpers/errors/domain_error';
import { Notebook } from '../../domain/entities/notebook';

export class WithdrawRepositoryMock implements IWithdrawRepository {
  private withdraws: Withdraw[] = [
    new Withdraw({
      numSerie: '34100',
      email: '22.00680-0@maua.br',
      withdrawTime: 1672585200001,
      finishTime: 1672585200002,
    }),
    new Withdraw({
      numSerie: '34101',
      email: '22.01102-0@maua.br', // HEY LOUNIS
      withdrawTime: 1672585200001,
      finishTime: 1672585200002,
    }),
    new Withdraw({
      numSerie: '34102',
      email: '22.01049-0@maua.br', // vitin
      withdrawTime: 1672585200001,
      finishTime: 1672585200002,
    }),
  ];

  // async createWithdraw(numSerie: string, email: string): Promise<Withdraw> {
  //   const withdraw = new Withdraw({
  //     numSerie,
  //     email,
  //     withdrawTime: Date.now(),
  //     finishTime: null,
  //   });

  //   this.withdraws.push(withdraw);
  //   return withdraw;
  // }

  async createWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    const withdraw = new Withdraw({
      numSerie,
      email: 'teste@maua.br',
      withdrawTime: Date.now(),
      finishTime: null,
    });

    this.withdraws.push(withdraw);
    return withdraw;
  }
  async finishWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    const withdraw = this.withdraws.find((withdraw) => {
      return withdraw.numSerie === numSerie;
    });

    if (!withdraw) {
      throw new NoItemsFoundError('numSerie: ' + numSerie);
    }

    withdraw.setFinishTime = 1672585200001;

    return withdraw;
  }

  async getAllNotebooks(): Promise<[Notebook, Withdraw[]][]> {
    const notebooks: [Notebook, Withdraw[]][] = [];
    for (const withdraw of this.withdraws) {
      const numSerie = withdraw.numSerie;
      var isActive = false;
      if (withdraw.finishTime !== null) {
        isActive = true;
        const notebook = new Notebook({
          numSerie,
          isActive,
        });
        notebooks.push([notebook, [withdraw]]);
      }
    }
    return notebooks;
  }
}

decorate(injectable(), WithdrawRepositoryMock);
