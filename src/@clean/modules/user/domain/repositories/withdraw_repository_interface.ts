import { Withdraw } from "@/@clean/shared/domain/entities/withdraw";

export interface IWithdrawRepository {
    getAllWithdraws(): Promise<Withdraw[]>;
    createWithdraw(numSerie: string, email: string): Promise<Withdraw>;
    finishWithdraw(numSerie: string): Promise<Withdraw>;
}