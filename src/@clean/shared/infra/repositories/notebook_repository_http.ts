import { INotebookRepository } from '@/@clean/modules/notebook/domain/repositories/notebook_repository_interface';
import { Notebook } from '../../domain/entities/notebook';
import { decorate, injectable } from 'inversify';

export class NotebookRepositoryHttp implements INotebookRepository {
  getNotebook(numSerie: string): Promise<Notebook> {
    throw new Error('Method not implemented.');
  }
}

decorate(injectable(), NotebookRepositoryHttp);