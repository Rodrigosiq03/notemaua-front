'use client';
import { createContext, PropsWithChildren, useState } from 'react';
import { Notebook } from '../@clean/shared/domain/entities/notebook';
import React from 'react';
import {
  containerNotebook,
  RegistryNotebook,
} from '../@clean/shared/infra/containers/container_notebook';
import { GetAllNotebooksUsecase } from '../@clean/modules/notebook/usecases/get_all_notebooks_usecase';
import { ValidateNumSerieInJsonUsecase } from '@/@clean/modules/notebook/usecases/validate_numSerie_in_json';
import { Withdraw } from '@/@clean/shared/domain/entities/withdraw';

export type NotebookContextType = {
  notebooks: [Notebook, Withdraw[]][];
  getAllNotebooks: (
    idToken: string
  ) => Promise<[Notebook, Withdraw[]][] | undefined>;
  error: Error | null;
  validateNumSerieInJson: (numSerie: string) => boolean;
  setErrorNull: () => void;
};
const defaultContext: NotebookContextType = {
  notebooks: [],
  getAllNotebooks: async (
    idToken: string
  ): Promise<[Notebook, Withdraw[]][] | undefined> => {
    return Promise.resolve([] as [Notebook, Withdraw[]][]);
  },
  validateNumSerieInJson: () => false,
  error: null,
  setErrorNull: () => {},
};

export const NotebookContext = createContext(defaultContext);

const getAllNotebooksUsecase = containerNotebook.get<GetAllNotebooksUsecase>(
  RegistryNotebook.GetAllNotebooksUsecase
);
const validateNumSerieInJsonUsecase =
  containerNotebook.get<ValidateNumSerieInJsonUsecase>(
    RegistryNotebook.ValidateNumSerieInJsonUsecase
  );

export function NotebookProvider({ children }: PropsWithChildren) {
  const [notebooks, setNotebooks] = useState<[Notebook, Withdraw[]][]>([]);
  const [error, setError] = useState<Error | null>(null);
  async function getAllNotebooks(idToken: string) {
    try {
      const notebooks = await getAllNotebooksUsecase.execute(idToken);
      setNotebooks(notebooks);
      return notebooks;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  function validateNumSerieInJson(numSerie: string): boolean {
    try {
      const isValid = validateNumSerieInJsonUsecase.execute(numSerie);
      return isValid;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
      return false;
    }
  }

  function setErrorNull() {
    setError(null);
  }

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        getAllNotebooks,
        validateNumSerieInJson,
        error,
        setErrorNull,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
