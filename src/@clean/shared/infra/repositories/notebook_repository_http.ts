import { Notebook } from '../../domain/entities/notebook';
import { decorate, injectable } from 'inversify';
import axios from 'axios';

import notebooksJson from '../jsons/notebooks.json';
import { Withdraw, WithdrawJson } from '../../domain/entities/withdraw';
import { INotebookRepository } from '../../../modules/notebook/domain/repositories/notebook_repository_interface';

interface NotebookJson {
  numSerie: string;
}

export class NotebookRepositoryHttp implements INotebookRepository {
  async getAllNotebooks(idToken: string): Promise<[Notebook, Withdraw[]][]> {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/get-all-notebooks';
      const response = (await axios.get<[NotebookJson, WithdrawJson[]][]>(url, {
        headers: { Authorization: `Bearer ${idToken}'` },
      })) as any;
      if (response.status === 200) {
        const jsondata = JSON.stringify(response.data, null, 2);
        const data = JSON.parse(jsondata).notebooks;
        var notebooks = data;
        console.log('notebooks is', notebooks);
        return notebooks;
      } else {
        console.log('response data is', response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error response is', error);
      } else {
        console.log('unknown error');
        console.log(error);
      }
    }
    return notebooks;
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
