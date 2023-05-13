'use client';
import { createContext, PropsWithChildren, useState } from 'react';
import { Notebook } from '../@clean/shared/domain/entities/notebook';
import {
  RegistryNotebook,
  containerNotebook,
} from '@/@clean/shared/infra/containers/container_notebook';
import { GetNotebookUsecase } from '@/@clean/modules/notebook/usecases/get_notebook_usecase';

export type NotebookContextType = {
  notebooks: Notebook[];
  getNotebook: (numSerie: string) => void;
  error: Error | null;
  setErrorNull: () => void;
};
const defaultContext: NotebookContextType = {
  notebooks: [],
  getNotebook: (numSerie: string) => {},
  error: null,
  setErrorNull: () => {},
};

export const NotebookContext = createContext(defaultContext);

const getNotebookUsecase = containerNotebook.get<GetNotebookUsecase>(
  RegistryNotebook.GetNotebookUsecase
);

export function NotebookProvider({ children }: PropsWithChildren) {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [error, setError] = useState<Error | null>(null);
  async function getNotebook(numSerie: string) {
    try {
      const notebookFound = await getNotebookUsecase.execute(numSerie);
      setNotebooks([...notebooks, notebookFound]);
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
    <NotebookContext.Provider
      value={{
        notebooks,
        getNotebook,
        error,
        setErrorNull,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
