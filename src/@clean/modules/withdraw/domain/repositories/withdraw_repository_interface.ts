<<<<<<< HEAD:src/@clean/modules/user/domain/repositories/withdraw_repository_interface.ts
import { Withdraw } from "@/@clean/shared/domain/entities/withdraw";

export interface IWithdrawRepository {
    getAllWithdraws(): Promise<Withdraw[]>;
    createWithdraw(numSerie: string, email: string): Promise<Withdraw>;
    finishWithdraw(numSerie: string): Promise<Withdraw>;
=======
import { Withdraw } from "../../../../shared/domain/entities/withdraw";

export interface IWithdrawRepository {
    getAllWithdraws(): Promise<Withdraw[]>;
    createWithdraw(numSerie: string, email: string): Promise<Withdraw>;
    finishWithdraw(numSerie: string): Promise<Withdraw>;
>>>>>>> develop:src/@clean/modules/withdraw/domain/repositories/withdraw_repository_interface.ts
}