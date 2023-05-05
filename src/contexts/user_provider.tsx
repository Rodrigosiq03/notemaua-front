'use client';
import React, { createContext, PropsWithChildren, useState } from "react";
import { User } from "../@clean/shared/domain/entities/user";
import { container, Registry } from "../@clean/shared/infra/containers/container_user";
import { GetUserUsecase } from "../@clean/modules/user/usecases/get_user_usecase";
import { CreateUserUsecase } from "../@clean/modules/user/usecases/create_user_usecase";
import { UpdateUserUsecase } from "../@clean/modules/user/usecases/update_user_usecase";
import { DeleteUserUsecase } from "../@clean/modules/user/usecases/delete_user_usecase";
import { AxiosError } from "axios";


export type UserContextType = {
  users: User[];
  createUser: (email: string, password: string) => void;
  getUser: (email: string) => void;
  updateUser: (email: string, newPassword: string) => void;
  deleteUser: (email: string) => void;
  error: Error | null;
  setErrorNull: () => void;
}


const defaultContext: UserContextType = {
  users: [],
  createUser: (email: string, password: string) => {},
  getUser: (email: string) => {},
  updateUser: (email: string, newPassword: string) => {},
  deleteUser: (email: string) => {},
  error: null,
  setErrorNull: () => {}
}

export const UserContext = createContext(defaultContext);

const getUserUsecase = container.get<GetUserUsecase>(Registry.GetUsersUsecase)
const createUserUseCase = container.get<CreateUserUsecase>(Registry.CreateUserUsecase)
const updateUserUseCase = container.get<UpdateUserUsecase>(Registry.UpdateUserUsecase)
const deleteUserUseCase = container.get<DeleteUserUsecase>(Registry.DeleteUserUsecase)

export function UserProvider({ children }: PropsWithChildren) {
  // State for error in API
  // const [error, setError] = useState<AxiosError | Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  async function createUser(email: string, password: string) {
    try {
      const userCreated = await createUserUseCase.execute(email, password)
      setUsers([...users, userCreated])
    } catch(error: any) {
      console.log(`ERROR PROVIDER: ${error}`)
      const setError = error
      setError(setError)
    }
  }

  async function getUser(email: string) {
    try {
      const userFound = await getUserUsecase.execute(email)
      setUsers([...users, userFound])
    } catch(error: any) {
      console.log(`ERROR PROVIDER: ${error}`)
      const setError = error
      setError(setError)
    }
  }

  async function updateUser(email: string, newPassword: string) { 
    try {
      const userUpdated = await updateUserUseCase.execute(email, newPassword)
      const usersFiltered = users.filter(user => user.email !== email)
      setUsers([...usersFiltered, userUpdated])
    } catch(error: any) {
      console.log(`ERROR PROVIDER: ${error}`)
      const setError = error
      setError(setError)
    }
  }

  async function deleteUser(email: string) {
    try {
      await deleteUserUseCase.execute(email)
      const usersFiltered = users.filter(user => user.email !== email)
      setUsers(usersFiltered)
    } catch(error: any) {
      console.log(`ERROR PROVIDER: ${error}`)
      const setError = error
      setError(setError)
    }

  }

  function setErrorNull() {
    setError(null)
  }

  return (
    <UserContext.Provider 
      value={{ 
        users, 
        createUser, 
        getUser, 
        updateUser, 
        deleteUser, 
        error, 
        setErrorNull 
      }}
    >
      { children }
    </UserContext.Provider>
  )
}

