import 'reflect-metadata';
import { Container } from 'inversify';
import { http } from '../http';
import { CreateWithdrawUsecase } from '@/@clean/modules/withdraw/usecases/create_withdraw_usecase';
import { GetAllNotebooksUsecase } from '@/@clean/modules/withdraw/usecases/get_all_notebooks_usecase';
import { FinishWithdrawUsecase } from '@/@clean/modules/withdraw/usecases/finish_withdraw_usecase';
import { WithdrawRepositoryMock } from '../repositories/withdraw_repository_mock';
import { WithdrawRepositoryHttp } from '../repositories/withdraw_repository_http';

export const RegistryWithdraw = {
  // Axios Adapter
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  // Repositories
  WithdrawRepositoryMock: Symbol.for('WithdrawRepositoryMock'),
  WithdrawRepositoryHttp: Symbol.for('WithdrawRepositoryHttp'),

  // Usecases
  CreateWithdrawUsecase: Symbol.for('CreateWithdrawUsecase'),
  GetAllNotebooksUsecase: Symbol.for('GetAllNotebooksUsecase'),
  FinishWithdrawUsecase: Symbol.for('FinishWithdrawUsecase'),
};

export const containerWithdraw = new Container();

containerWithdraw.bind(RegistryWithdraw.AxiosAdapter).toConstantValue(http);

containerWithdraw
  .bind(RegistryWithdraw.WithdrawRepositoryMock)
  .to(WithdrawRepositoryMock);

containerWithdraw
  .bind(RegistryWithdraw.WithdrawRepositoryHttp)
  .to(WithdrawRepositoryHttp);

containerWithdraw
  .bind(RegistryWithdraw.CreateWithdrawUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new CreateWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new CreateWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      return new CreateWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    }
  });

containerWithdraw
  .bind(RegistryWithdraw.GetAllNotebooksUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new GetAllNotebooksUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new GetAllNotebooksUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      return new GetAllNotebooksUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    }
  });

containerWithdraw
  .bind(RegistryWithdraw.FinishWithdrawUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new FinishWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new FinishWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      return new FinishWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    }
  });
