import { decorate, injectable } from 'inversify';
import { IWithdrawRepository } from '../../../modules/withdraw/domain/repositories/withdraw_repository_interface';
import { Withdraw } from '../../domain/entities/withdraw';
import axios from 'axios';

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error('Method not implemented.');
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

  finishWithdraw(numSerie: string): Promise<Withdraw> {
    throw new Error('Method not implemented.');
  }
}

decorate(injectable(), WithdrawRepositoryHttp);
