'use client';
import React, { createContext, PropsWithChildren, useState } from 'react';
import { User } from '../@clean/shared/domain/entities/user';
import {
  containerUser,
  RegistryUser,
} from '../@clean/shared/infra/containers/container_user';
import { GetUserUsecase } from '../@clean/modules/user/usecases/get_user_usecase';
import { CreateUserUsecase } from '../@clean/modules/user/usecases/create_user_usecase';
import { UpdateUserUsecase } from '../@clean/modules/user/usecases/update_user_usecase';
import { DeleteUserUsecase } from '../@clean/modules/user/usecases/delete_user_usecase';
import { GetNameFromJsonUsecase } from '@/@clean/modules/user/usecases/get_name_from_json';
import { ConfirmUserUsecase } from '@/@clean/modules/user/usecases/confirm_user_usecase';
import { ForgotPasswordUsecase } from '@/@clean/modules/user/usecases/forgot_password_usecase';
import { ForgotPasswordSubmitUsecase } from '@/@clean/modules/user/usecases/forgot_password_submit_usecase';
import { ValidateEmailInJsonUsecase } from '@/@clean/modules/user/usecases/validate_email_in_json';
import { SignInUsecase } from '@/@clean/modules/user/usecases/sign_in_usecase';
import { LogOutUsecase } from '@/@clean/modules/user/usecases/log_out_usecase';

export type UserContextType = {
  users: User[];
  createUser: (email: string, password: string) => void;
  getUser: (email: string) => void;
  updateUser: (email: string, newPassword: string, code: string) => void;
  deleteUser: (email: string) => void;
  getNameFromJson: (ra: string) => void;
  confirmUser: (email: string, code: string) => void;
  forgotPassword: (email: string) => void;
  forgotPasswordSubmit: (
    email: string,
    code: string,
    newPassword: string
  ) => void;
  validateEmailInJson: (email: string) => boolean;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
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
  forgotPasswordSubmit: (
    email: string,
    code: string,
    newPassword: string
  ) => {},
  validateEmailInJson: (email: string) => false,
  signIn: (email: string, password: string) => {},
  logOut: () => {},
  error: null,
  setErrorNull: () => {},
};

export const UserContext = createContext(defaultContext);

const getUserUsecase = containerUser.get<GetUserUsecase>(
  RegistryUser.GetUsersUsecase
);
const createUserUseCase = containerUser.get<CreateUserUsecase>(
  RegistryUser.CreateUserUsecase
);
const updateUserUseCase = containerUser.get<UpdateUserUsecase>(
  RegistryUser.UpdateUserUsecase
);
const deleteUserUseCase = containerUser.get<DeleteUserUsecase>(
  RegistryUser.DeleteUserUsecase
);
const getNameFromJsonUseCase = containerUser.get<GetNameFromJsonUsecase>(
  RegistryUser.GetNameFromJsonUsecase
);
const confirmUserUseCase = containerUser.get<ConfirmUserUsecase>(
  RegistryUser.ConfirmUserUsecase
);
const forgotPasswordUseCase = containerUser.get<ForgotPasswordUsecase>(
  RegistryUser.ForgotPasswordUsecase
);
const forgotPasswordSubmitUsecase =
  containerUser.get<ForgotPasswordSubmitUsecase>(
    RegistryUser.ForgotPasswordSubmitUsecase
  );
const validateEmailInJsonUsecase =
  containerUser.get<ValidateEmailInJsonUsecase>(
    RegistryUser.ValidateEmailInJsonUsecase
  );
const signInUsecase = containerUser.get<SignInUsecase>(
  RegistryUser.SignInUsecase
);

const logOutUsecase = containerUser.get<LogOutUsecase>(
  RegistryUser.LogOutUsecase
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
      setError(error);
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
      setError(error);
    }
  }

  async function deleteUser(email: string) {
    try {
      await deleteUserUseCase.execute(email);
      const usersFiltered = users.filter((user) => user.email !== email);
      setUsers(usersFiltered);
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  function getNameFromJson(ra: string) {
    try {
      const name = getNameFromJsonUseCase.execute(ra);
      return name;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  async function confirmUser(email: string, code: string) {
    try {
      const userConfirmed = await confirmUserUseCase.execute(email, code);
      return userConfirmed;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
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

  async function forgotPasswordSubmit(
    email: string,
    password: string,
    code: string
  ) {
    try {
      const userForgotPasswordSubmit =
        await forgotPasswordSubmitUsecase.execute(email, password, code);
      return userForgotPasswordSubmit;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  function validateEmailInJson(email: string): boolean {
    try {
      const isValid = validateEmailInJsonUsecase.execute(email);
      return isValid;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
      return false;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userSignedIn = await signInUsecase.execute(email, password);
      return userSignedIn;
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
    }
  }

  async function logOut() {
    try {
      await logOutUsecase.execute();
    } catch (error: any) {
      console.log(`ERROR PROVIDER: ${error}`);
      setError(error);
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
        forgotPasswordSubmit,
        validateEmailInJson,
        signIn,
        logOut,
        error,
        setErrorNull,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
