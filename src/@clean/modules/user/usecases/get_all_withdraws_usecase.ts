import { NoItemsFoundError } from "@/@clean/shared/domain/helpers/errors/domain_error";
import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface";

export class GetAllWithdraws {
    constructor(private withdrawRepo: IWithdrawRepository) {}

    async execute() {
        const withdraws = await this.withdrawRepo.getAllWithdraws();
        if (withdraws.length == 0) {
            throw Error('Withdraws empty')
        }
        return withdraws;
    }
}