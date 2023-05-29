'use client';
import { createContext, PropsWithChildren, useState } from 'react';
import { Notebook } from '../@clean/shared/domain/entities/notebook';
import {
  RegistryNotebook,
  containerNotebook,
} from '@/@clean/shared/infra/containers/container_notebook';
import { GetNotebookUsecase } from '@/@clean/modules/notebook/usecases/get_all_notebooks_usecase';
import { ValidateNumSerieInJsonUsecase } from '@/@clean/modules/notebook/usecases/validate_numSerie_in_json';

export type NotebookContextType = {
  notebooks: Notebook[];
  getAllNotebooks: () => Promise<void>;
  validateNumSerieInJson: (numSerie: string) => boolean;
  error: Error | null;
  setErrorNull: () => void;
};
const defaultContext: NotebookContextType = {
  notebooks: [],
  getAllNotebooks: () => new Promise<void>(() => {}),
  validateNumSerieInJson(numSerie: string): boolean {
    return false;
  },

  error: null,
  setErrorNull: () => {},
};

export const NotebookContext = createContext(defaultContext);

const getNotebookUsecase = containerNotebook.get<GetNotebookUsecase>(
  RegistryNotebook.GetNotebookUsecase
);
const validateNumSerieInJsonUsecase =
  containerNotebook.get<ValidateNumSerieInJsonUsecase>(
    RegistryNotebook.ValidateNumSerieInJsonUsecase
  );

export function NotebookProvider({ children }: PropsWithChildren) {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [error, setError] = useState<Error | null>(null);
  async function getAllNotebooks() {
    try {
      await getNotebookUsecase.execute().then((notebooks) => {
        setNotebooks(notebooks);
      });
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
      const setError = error;
      setError(setError);
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
        error,
        setErrorNull,
        validateNumSerieInJson,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
