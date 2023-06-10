import { Withdraw } from '../../../shared/domain/entities/withdraw';
import { IWithdrawRepository } from '../domain/repositories/withdraw_repository_interface';
import { EntityError } from '../../../shared/domain/helpers/errors/domain_error';

export class CreateWithdrawUsecase {
  constructor(private withdrawRepo: IWithdrawRepository) {}

  async execute(numSerie: string) {
    if (!Withdraw.validateNumSerie(numSerie)) {
      throw new EntityError('numSerie');
    }
    const withdraw = await this.withdrawRepo.createWithdraw(numSerie);
    return withdraw;
  }
}
