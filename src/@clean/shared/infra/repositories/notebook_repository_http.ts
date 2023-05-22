import { INotebookRepository } from '@/@clean/modules/notebook/domain/repositories/notebook_repository_interface';
import { Notebook } from '../../domain/entities/notebook';
import { decorate, injectable } from 'inversify';

import notebooksJson from '../jsons/notebooks.json'

interface NotebookJson {
  numSerie: string;
}

export class NotebookRepositoryHttp implements INotebookRepository {
  getNotebook(numSerie: string): Promise<Notebook> {
    throw new Error('Method not implemented.');
  }

  validateNumSerieInJson(numSerie: string): boolean {
    const jsonData = JSON.parse(JSON.stringify(notebooksJson)) as NotebookJson[];

    for (const notebook of jsonData) {
      if (notebook.numSerie === numSerie) {
        return true;
      }
    }
    return false; 
  }
}

decorate(injectable(), NotebookRepositoryHttp);
