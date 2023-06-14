import { decorate, injectable } from 'inversify';
import { IWithdrawRepository } from '../../../modules/withdraw/domain/repositories/withdraw_repository_interface';
import { Withdraw } from '../../domain/entities/withdraw';
import axios from 'axios';
import { Auth } from 'aws-amplify';

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error('Method not implemented.');
  }

  async createWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    var withdraw = new Withdraw({
      numSerie,
      email: '22.00680-0@maua.br',
      withdrawTime: Date.now(),
      finishTime: null,
    });
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/create-withdraw';
      const response = (await axios.post<Withdraw>(
        url,
        { num_serie: numSerie },
        { headers: { Authorization: `Bearer ${idToken}` } }
      )) as any;
      console.log('response is', response);
      if (response.status === 200) {
        const jsondata = JSON.stringify(response.data, null, 2);
        withdraw = JSON.parse(jsondata).withdraw;
        withdraw = new Withdraw(withdraw);
      }
      return withdraw;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error response is', error);
      } else {
        console.log('Unknown Error');
        console.log(error);
      }
    }
    return withdraw;
  }

  async finishWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    var withdraw = new Withdraw({
      numSerie,
      email: '',
      withdrawTime: Date.now(),
      finishTime: null,
    });
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/finish-withdraw';
      const { data, status } = await axios.post<Withdraw>(
        url,
        { num_serie: numSerie },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      if (status === 200) {
        const jsondata = JSON.stringify(data, null, 2);
        withdraw = JSON.parse(jsondata).withdraw as Withdraw;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error response is', error);
      } else {
        console.log('Unknown Error');
        console.log(error);
      }
    }
    return withdraw;
  }
}

decorate(injectable(), WithdrawRepositoryHttp);
