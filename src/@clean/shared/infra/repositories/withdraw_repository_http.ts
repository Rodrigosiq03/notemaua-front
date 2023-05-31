import { decorate, injectable } from 'inversify';
import { IWithdrawRepository } from '../../../modules/withdraw/domain/repositories/withdraw_repository_interface';
import { Withdraw } from '../../domain/entities/withdraw';
import axios from 'axios';
import { Notebook } from '../../domain/entities/notebook';

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  async getAllNotebooks(idToken: string): Promise<[Notebook, Withdraw[]][]> {
    var notebooks: [Notebook, Withdraw[]][] = [[new Notebook({numSerie : '34000', isActive: false}), [new Withdraw({numSerie : '34000', email: 'erro@maua.br', withdrawTime: Date.now(), finishTime: null})]]];
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/get-all-notebooks';
      const { data, status} = await axios.get<[Notebook, Withdraw[]][]>(url, {headers : {'Authorization' : `Bearer ${idToken}'`}});
      console.log('response status is', status);
      if (status === 200) {
          // console.log('response data is', data);
          const jsondata = JSON.stringify(data, null, 2);
          notebooks = JSON.parse(jsondata).notebooks as [Notebook, Withdraw[]][];
          console.log('notebooks is', notebooks);
          return notebooks;
      }
      else {
          console.log('response data is', data);
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
          console.log('error response is', error);
  } else {
          console.log('unknown error');
          console.log(error);
          
      }
    }
    return notebooks;
  }

  async createWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    var withdraw = new Withdraw({
      numSerie,
      email: 'teste@maua.br',
      withdrawTime: Date.now(),
      finishTime: null,
    });
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/create-withdraw';
      const { data, status } = await axios.post<Withdraw>(url, {"num_serie" : numSerie}, {headers : {'Authorization' : `Bearer ${idToken}'`}});
      console.log('response status is', status);
      if (status === 200) {
          console.log('response data is', data);
          const jsondata = JSON.stringify(data, null, 2);
          withdraw = JSON.parse(jsondata).withdraw as Withdraw;
      }
      else {
          console.log('response data is', data);
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
          console.log('error response is', error);
  } else {
          console.log('unknown error');
          console.log(error);
          
      }
  }
  return withdraw;
  }

  async finishWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    var withdraw = new Withdraw({
      numSerie,
      email: 'teste@maua.br',
      withdrawTime: Date.now(),
      finishTime: null,
    });
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/finish-withdraw';
      const { data, status } = await axios.put<Withdraw>(url, {"num_serie" : numSerie}, {headers : {'Authorization' : `Bearer ${idToken}'`}});
      console.log('response status is', status);
      if (status === 200) {
          console.log('response data is', data);
          const jsondata = JSON.stringify(data, null, 2);
          withdraw = JSON.parse(jsondata).withdraw as Withdraw;
      }
      else {
          console.log('response data is', data);
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
          console.log('error response is', error);
  } else {
          console.log('unknown error');
          console.log(error);
          
      }
  }
  return withdraw;
  }
}

decorate(injectable(), WithdrawRepositoryHttp);
