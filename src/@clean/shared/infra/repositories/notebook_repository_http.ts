import { INotebookRepository } from '@/@clean/modules/notebook/domain/repositories/notebook_repository_interface';
import { JsonProps, Notebook } from '../../domain/entities/notebook';
import { decorate, injectable } from 'inversify';
import axios, { AxiosRequestConfig } from 'axios';

import notebooksJson from '../jsons/notebooks.json';
import { Withdraw } from '../../domain/entities/withdraw';

interface NotebookJson {
  numSerie: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export class NotebookRepositoryHttp implements INotebookRepository {
  async getAllNotebooks(): Promise<Notebook[]> {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/get-all-notebooks`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${idToken}`,
    //     },
    //   }
    // // );
    // // const reponseJson = await response.json();
    // // const notebooks = Notebook.fromJSON(responseJson);
    // // const response = await axiosInstance.get<JsonProps>('/get-all-notebooks');
    // return notebooks;
    throw new Error('Method not implemented.');
  }

  validateNumSerieInJson(numSerie: string): boolean {
    const jsonData = JSON.parse(
      JSON.stringify(notebooksJson)
    ) as NotebookJson[];

    for (const notebook of jsonData) {
      if (notebook.numSerie === numSerie) {
        return true;
      }
    }
    return false;
  }
}

decorate(injectable(), NotebookRepositoryHttp);
