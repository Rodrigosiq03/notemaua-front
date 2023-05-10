'use client';
import React, { PropsWithChildren, createContext, useState } from 'react';
import { Withdraw } from '../@clean/shared/domain/entities/withdraw';
import {
  RegistryWithdraw,
  containerWithdraw,
} from '../@clean/shared/infra/containers/container_withdraw';
import { CreateWithdrawUsecase } from '../@clean/modules/withdraw/usecases/create_withdraw_usecase';
import { FinishWithdrawUsecase } from '../@clean/modules/withdraw/usecases/finish_withdraw_usecase';
import { GetAllWithdrawsUsecase } from '../@clean/modules/withdraw/usecases/get_all_withdraws_usecase';

export type WithdrawContextType = {
  withdraws: Withdraw[];
  createWithdraw: (numSerie: string, email: string) => void;
  finishWithdraw: (numSerie: string) => void;
  getAllWithdraws: () => void;
  error: Error | null;
  setErrorNull: () => void;
};

const defaultContext: WithdrawContextType = {
  withdraws: [],
  createWithdraw: (numSerie: string, email: string) => {},
  finishWithdraw: (numSerie: string) => {},
  getAllWithdraws: () => {},
  error: null,
  setErrorNull: () => {},
};

export const WithdrawContext = createContext(defaultContext);

const createWithdrawUsecase = containerWithdraw.get<CreateWithdrawUsecase>(
  RegistryWithdraw.CreateWithdrawUsecase
);

const finishWithdrawUsecase = containerWithdraw.get<FinishWithdrawUsecase>(
  RegistryWithdraw.FinishWithdrawUsecase
);

const getAllWithdrawsUsecase = containerWithdraw.get<GetAllWithdrawsUsecase>(
  RegistryWithdraw.GetAllWithdrawsUsecase
);

export function WithdrawProvider({ children }: PropsWithChildren) {
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [error, setError] = useState<Error | null>(null);

  async function createWithdraw(numSerie: string, email: string) {
    try {
      const withdrawCreated = await createWithdrawUsecase.execute(
        numSerie,
        email
      );
      setWithdraws([...withdraws, withdrawCreated]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function finishWithdraw(numSerie: string) {
    try {
      const withdrawFinished = await finishWithdrawUsecase.execute(numSerie);
      setWithdraws([...withdraws, withdrawFinished]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function getAllWithdraws() {
    try {
      const AllWithdrawsFound = await getAllWithdrawsUsecase.execute();
      setWithdraws(AllWithdrawsFound);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  function setErrorNull() {
    setError(null);
  }
  return (
    <WithdrawContext.Provider
      value={{
        withdraws,
        createWithdraw,
        finishWithdraw,
        getAllWithdraws,
        error,
        setErrorNull,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
}
