import { IWithdrawRepository } from '../domain/repositories/withdraw_repository_interface';

export class GetAllNotebooksUsecase {
  constructor(private withdrawRepo: IWithdrawRepository) {}

  async execute(idToken: string) {
    const withdraws = await this.withdrawRepo.getAllNotebooks(idToken);
    return withdraws;
  }
}
