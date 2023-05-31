'use client';
import React, { PropsWithChildren, createContext, useState } from 'react';
import { Withdraw } from '../@clean/shared/domain/entities/withdraw';
import {
  RegistryWithdraw,
  containerWithdraw,
} from '../@clean/shared/infra/containers/container_withdraw';
import { CreateWithdrawUsecase } from '../@clean/modules/withdraw/usecases/create_withdraw_usecase';
import { FinishWithdrawUsecase } from '../@clean/modules/withdraw/usecases/finish_withdraw_usecase';
import { GetAllNotebooksUsecase } from '../@clean/modules/withdraw/usecases/get_all_notebooks_usecase';
import { Notebook } from '@/@clean/shared/domain/entities/notebook';

export type WithdrawContextType = {
  withdraws: Withdraw[];
  notebooks: [Notebook, Withdraw[]][]
  createWithdraw: (numSerie: string, idToken: string) => void;
  finishWithdraw: (numSerie: string, idToken: string) => void;
  getAllNotebooks: (idToken: string) => Promise<[Notebook, Withdraw[]][]>;
  error: Error | null;
  setErrorNull: () => void;
};

const defaultContext: WithdrawContextType = {
  withdraws: [],
  notebooks: [],
  createWithdraw: (numSerie: string, idToken: string) => {},
  finishWithdraw: (numSerie: string, idToken: string) => {},
  getAllNotebooks: (idToken: string) => Promise.resolve([]),
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

const getAllNotebooksUsecase = containerWithdraw.get<GetAllNotebooksUsecase>(
  RegistryWithdraw.GetAllNotebooksUsecase
);

export function WithdrawProvider({ children }: PropsWithChildren) {
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [notebooks, setNotebooks] = useState<[Notebook, Withdraw[]][]>([]);
  const [error, setError] = useState<Error | null>(null);

  async function createWithdraw(numSerie: string, idToken: string) {
    try {
      const withdrawCreated = await createWithdrawUsecase.execute(
        numSerie,
        idToken
      );
      setWithdraws([...withdraws, withdrawCreated]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function finishWithdraw(numSerie: string, idToken: string) {
    try {
      const withdrawFinished = await finishWithdrawUsecase.execute(numSerie, idToken);
      setWithdraws([...withdraws, withdrawFinished]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function getAllNotebooks(idToken: string){
    try {
      const notebooks = await getAllNotebooksUsecase.execute(idToken);
      setNotebooks(notebooks);
      return notebooks;
    }
    catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
      return [];
    }
  }

  function setErrorNull() {
    setError(null);
  }
  return (
    <WithdrawContext.Provider
      value={{
        withdraws,
        notebooks,
        createWithdraw,
        finishWithdraw,
        getAllNotebooks,
        error,
        setErrorNull,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
}
