import { decorate, injectable } from 'inversify';
import { IWithdrawRepository } from '../../../modules/withdraw/domain/repositories/withdraw_repository_interface';
import { Withdraw, WithdrawJson } from '../../domain/entities/withdraw';
import axios from 'axios';
import { Auth } from 'aws-amplify';

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error('Method not implemented.');
  }

  async createWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    var withdraw: Withdraw = new Withdraw({
      numSerie: '',
      email: '',
      withdrawTime: 1600000,
      finishTime: null,
    });
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/create-withdraw';
      const response = await axios.post<WithdrawJson>(
        url,
        { num_serie: numSerie },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      console.log('response is', response);
      if (response.status === 200) {
        const jsondata = JSON.stringify(response.data, null, 2);
        var withdrawResponse = JSON.parse(jsondata).withdraw as WithdrawJson;
        withdraw = Withdraw.fromJSON(withdrawResponse);
        return withdraw;
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

  async finishWithdraw(numSerie: string, idToken: string): Promise<Withdraw> {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/finish-withdraw';
      const response = await axios.put<WithdrawJson>(
        url,
        { num_serie: numSerie },
        { headers: { Authorization: `Bearer ${idToken}'` } }
      );
      console.log('response status is', status);
      if (response.status === 200) {
        console.log('response data is', response.data);
        const jsondata = JSON.stringify(response.data, null, 2);
        var withdraw = JSON.parse(jsondata).withdraw;
        withdraw = Withdraw.fromJSON(withdraw);
        console.log('withdraw on response treat is', withdraw);
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
    console.log('withdraw on return is', withdraw);
    return withdraw;
  }
}

decorate(injectable(), WithdrawRepositoryHttp);
