import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface";

export class GetAllWithdrawsUsecase {
  constructor(private withdrawRepo: IWithdrawRepository) {}
    
  async execute() {
    const withdraws = await this.withdrawRepo.getAllWithdraws();
    if (withdraws.length == 0) {
      throw Error('Withdraws empty')
    }
    return withdraws;
  }
}