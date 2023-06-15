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
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/create-withdraw';
      const response = await axios.post<WithdrawJson>(
        url,
        { num_serie: numSerie },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      if (response.status === 201) {
        const jsondata = JSON.stringify(response.data, null, 2);
        var withdraw = JSON.parse(jsondata).withdraw;
        withdraw = Withdraw.fromJSON(withdraw);
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
      if (response.status === 200) {
        const jsondata = JSON.stringify(response.data, null, 2);
        var withdraw = JSON.parse(jsondata).withdraw;
        withdraw = Withdraw.fromJSON(withdraw);
      }
    } catch (error) {
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
