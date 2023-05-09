'use client';
import React, { createContext, PropsWithChildren, useState } from 'react';
import { User } from '../@clean/shared/domain/entities/user';
import {
  containerUser,
  Registry,
} from '../@clean/shared/infra/containers/container_user';
import { GetUserUsecase } from '../@clean/modules/user/usecases/get_user_usecase';
import { CreateUserUsecase } from '../@clean/modules/user/usecases/create_user_usecase';
import { UpdateUserUsecase } from '../@clean/modules/user/usecases/update_user_usecase';
import { DeleteUserUsecase } from '../@clean/modules/user/usecases/delete_user_usecase';
import { GetNameFromJsonUsecase } from '@/@clean/modules/user/usecases/get_name_from_json';
import { ConfirmUserUsecase } from '@/@clean/modules/user/usecases/confirm_user_usecase';
import { ForgotPasswordUsecase } from '@/@clean/modules/user/usecases/forgot_password_usecase';

export type UserContextType = {
  users: User[];
  createUser: (email: string, password: string) => void;
  getUser: (email: string) => void;
  updateUser: (email: string, newPassword: string, code: string) => void;
  deleteUser: (email: string) => void;
  getNameFromJson: (ra: string) => void;
  confirmUser: (email: string, code: string) => void;
  forgotPassword: (email: string) => void;
  error: Error | null;
  setErrorNull: () => void;
};

const defaultContext: UserContextType = {
  users: [],
  createUser: (email: string, password: string) => {},
  getUser: (email: string) => {},
  updateUser: (email: string, newPassword: string, code: string) => {},
  deleteUser: (email: string) => {},
  getNameFromJson: (ra: string) => {},
  confirmUser: (email: string, code: string) => {},
  forgotPassword: (email: string) => {},
  error: null,
  setErrorNull: () => {},
};

export const UserContext = createContext(defaultContext);

const getUserUsecase = containerUser.get<GetUserUsecase>(
  Registry.GetUsersUsecase
);
const createUserUseCase = containerUser.get<CreateUserUsecase>(
  Registry.CreateUserUsecase
);
const updateUserUseCase = containerUser.get<UpdateUserUsecase>(
  Registry.UpdateUserUsecase
);
const deleteUserUseCase = containerUser.get<DeleteUserUsecase>(
  Registry.DeleteUserUsecase
);
const getNameFromJsonUseCase = containerUser.get<GetNameFromJsonUsecase>(
  Registry.GetNameFromJsonUsecase
);
const confirmUserUseCase = containerUser.get<ConfirmUserUsecase>(
  Registry.ConfirmUserUsecase
);
const forgotPasswordUseCase = containerUser.get<ForgotPasswordUsecase>(
  Registry.ForgotPasswordUsecase
);

export function UserProvider({ children }: PropsWithChildren) {
  // State for error in API
  // const [error, setError] = useState<AxiosError | Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  async function createUser(email: string, password: string) {
    try {
      const userCreated = await createUserUseCase.execute(email, password);
      setUsers([...users, userCreated]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  async function getUser(email: string) {
    try {
      const userFound = await getUserUsecase.execute(email);
      setUsers([...users, userFound]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function updateUser(email: string, newPassword: string, code: string) {
    try {
      const userUpdated = await updateUserUseCase.execute(
        email,
        newPassword,
        code
      );
      const usersFiltered = users.filter((user) => user.email !== email);
      setUsers([...usersFiltered, userUpdated]);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function deleteUser(email: string) {
    try {
      await deleteUserUseCase.execute(email);
      const usersFiltered = users.filter((user) => user.email !== email);
      setUsers(usersFiltered);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  function getNameFromJson(ra: string) {
    try {
      const name = getNameFromJsonUseCase.execute(ra);
      return name;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function confirmUser(email: string, code: string) {
    try {
      const userConfirmed = await confirmUserUseCase.execute(email, code);
      return userConfirmed;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      const setError = error;
      setError(setError);
    }
  }

  async function forgotPassword(email: string) {
    try {
      const userForgotPassword = await forgotPasswordUseCase.execute(email);
      return userForgotPassword;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
    }
  }

  function setErrorNull() {
    setError(null);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        getUser,
        updateUser,
        deleteUser,
        getNameFromJson,
        confirmUser,
        forgotPassword,
        error,
        setErrorNull,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
