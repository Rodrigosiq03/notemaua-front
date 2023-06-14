import 'reflect-metadata';
import { INotebookRepository } from '../../../modules/notebook/domain/repositories/notebook_repository_interface';
import { Notebook } from '../../domain/entities/notebook';
import { NoItemsFoundError } from '../../domain/helpers/errors/domain_error';
import { decorate, injectable } from 'inversify';
import { Withdraw } from '../../domain/entities/withdraw';

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

  async getAllNotebooks(): Promise<[Notebook, Withdraw[]][]> {
    return this.notebooks.map((notebook) => {
      const withdraws = this.withdraws.filter(
        (withdraw) => withdraw.numSerie === notebook.numSerie
      );
      return [notebook, withdraws];
    });
  }

  validateNumSerieInJson(numSerie: string): boolean {
    throw new Error('Method not implemented.');
  }
}

decorate(injectable(), NotebookRepositoryMock);
