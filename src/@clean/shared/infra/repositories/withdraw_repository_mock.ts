import "reflect-metadata";
import { decorate, injectable } from "inversify"; 
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import { Withdraw } from "../../domain/entities/withdraw";
import { NoItemsFoundError } from "../../domain/helpers/errors/domain_error";

export class WithdrawRepositoryMock implements IWithdrawRepository {
    private withdraws: Withdraw[] = [
        new Withdraw({
            numSerie: '34100',
            email: '22.00680-0@maua.br',
            withdrawTime: 1672585200001,
            finishTime: 1672585200002
        }),
        new Withdraw({
            numSerie: '34101',
            email: '22.01102-0@maua.br', // HEY LOUNIS
            withdrawTime: 1672585200001,
            finishTime: 1672585200002
        }),
        new Withdraw({
            numSerie: '34102',
            email: '22.01049-0@maua.br', // vitin
            withdrawTime: 1672585200001,
            finishTime: 1672585200002
        }),
    ]

    async getAllWithdraws(): Promise<Withdraw[]> {
        return this.withdraws;   
    }
    async createWithdraw(numSerie: string, email: string): Promise<Withdraw> {
        const withdraw = new Withdraw({
            numSerie: numSerie,
            email: email,
            withdrawTime: Date.now(),
            finishTime: null
        });

        this.withdraws.push(withdraw);
        return withdraw;        
    }
    async finishWithdraw(numSerie: string): Promise<Withdraw> {
        const withdraw = this.withdraws.find(withdraw => withdraw.numSerie === numSerie) as Withdraw;
        if (!withdraw) {
            throw new NoItemsFoundError(`withdraw numSerie: ${numSerie}`);
        }
        withdraw.setFinishTime = Date.now();
        this.withdraws.splice(this.withdraws.indexOf(withdraw), 1);
        return withdraw;
    }
}

decorate(injectable(), WithdrawRepositoryMock);