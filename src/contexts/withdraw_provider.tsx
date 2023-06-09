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
  createWithdraw: (
    numSerie: string,
    idToken: string
  ) => Promise<Withdraw | undefined>;
  finishWithdraw: (
    numSerie: string,
    idToken: string
  ) => Promise<Withdraw | undefined>;
  getAllWithdraws: () => void;
  error: Error | null;
  setErrorNull: () => void;
};

const defaultContext: WithdrawContextType = {
  withdraws: [],
  createWithdraw: async (
    numSerie: string,
    idToken: string
  ): Promise<Withdraw> => {
    return Promise.resolve({} as Withdraw);
  },
  finishWithdraw: async (
    numSerie: string,
    idToken: string
  ): Promise<Withdraw> => {
    return Promise.resolve({} as Withdraw);
  },
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

  async function createWithdraw(numSerie: string, idToken: string) {
    try {
      const withdrawCreated = await createWithdrawUsecase.execute(
        numSerie,
        idToken
      );
      if (withdrawCreated) {
        setWithdraws([...withdraws, withdrawCreated]);
        return withdrawCreated;
      }
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  async function finishWithdraw(numSerie: string, idToken: string) {
    try {
      const withdrawFinished = await finishWithdrawUsecase.execute(
        numSerie,
        idToken
      );
      if (withdrawFinished) {
        setWithdraws([...withdraws, withdrawFinished]);
        return withdrawFinished;
      }
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function getAllWithdraws() {
    try {
      const allWithdrawsFound = await getAllWithdrawsUsecase.execute();
      setWithdraws(allWithdrawsFound);
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
