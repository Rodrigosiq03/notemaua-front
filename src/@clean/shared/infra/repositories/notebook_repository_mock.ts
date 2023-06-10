import 'reflect-metadata';
import { INotebookRepository } from '../../../modules/notebook/domain/repositories/notebook_repository_interface';
import { Notebook } from '../../domain/entities/notebook';
import { NoItemsFoundError } from '../../domain/helpers/errors/domain_error';
import { decorate, injectable } from 'inversify';

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

  async getAllNotebooks(): Promise<Notebook[]> {
    return this.notebooks;
  }

  validateNumSerieInJson(numSerie: string): boolean {
    throw new Error('Method not implemented.');
  }
}

decorate(injectable(), NotebookRepositoryMock);
