import 'reflect-metadata';
import { Container } from 'inversify';
import { UserRepositoryMock } from '../repositories/user_repository_mock';
import { UserRepositoryHttp } from '../repositories/user_repository_http';
import { CreateUserUsecase } from '@/@clean/modules/user/usecases/create_user_usecase';
import { GetUserUsecase } from '@/@clean/modules/user/usecases/get_user_usecase';
import { UpdateUserUsecase } from '@/@clean/modules/user/usecases/update_user_usecase';
import { DeleteUserUsecase } from '@/@clean/modules/user/usecases/delete_user_usecase';
import { ConfirmUserUsecase } from '@/@clean/modules/user/usecases/confirm_user_usecase';
import { ForgotPasswordUsecase } from '@/@clean/modules/user/usecases/forgot_password_usecase';
import { ValidateEmailInJsonUsecase } from '@/@clean/modules/user/usecases/validate_email_in_json';

// import { UserHttpRepository } from "../repositories/user_http_repository";
import { http } from '../http';
import { GetNameFromJsonUsecase } from '@/@clean/modules/user/usecases/get_name_from_json';
import { ForgotPasswordSubmitUsecase } from '@/@clean/modules/user/usecases/forgot_password_submit_usecase';
import { SignInUsecase } from '@/@clean/modules/user/usecases/sign_in_usecase';

export const RegistryUser = {
  // Axios Adapter
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  // Repositories
  UserRepositoryMock: Symbol.for('UserRepositoryMock'),
  UserRepositoryHttp: Symbol.for('UserHttpRepository'),

  // Usecases
  CreateUserUsecase: Symbol.for('CreateUserUsecase'),
  GetUsersUsecase: Symbol.for('GetUsersUsecase'),
  UpdateUserUsecase: Symbol.for('UpdateUserUsecase'),
  DeleteUserUsecase: Symbol.for('DeleteUserUsecase'),
  GetNameFromJsonUsecase: Symbol.for('GetNameFromJsonUsecase'),
  ConfirmUserUsecase: Symbol.for('ConfirmUserUsecase'),
  ForgotPasswordUsecase: Symbol.for('ForgotPasswordUsecase'),
  ForgotPasswordSubmitUsecase: Symbol.for('ForgotPasswordSubmitUsecase'),
  ValidateEmailInJsonUsecase: Symbol.for('ValidateEmailInJsonUsecase'),
  SignInUsecase: Symbol.for('SignInUsecase'),
};

export const containerUser = new Container();

// HTTP
containerUser.bind(RegistryUser.AxiosAdapter).toConstantValue(http);
// Repositories
containerUser.bind(RegistryUser.UserRepositoryMock).to(UserRepositoryMock);
containerUser.bind(RegistryUser.UserRepositoryHttp).to(UserRepositoryHttp);
// Usecases
containerUser.bind(RegistryUser.CreateUserUsecase).toDynamicValue((context) => {
  if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
    return new CreateUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
    return new CreateUserUsecase(
      context.container.get(RegistryUser.UserRepositoryHttp)
    );
  } else {
    return new CreateUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  }
});

containerUser.bind(RegistryUser.GetUsersUsecase).toDynamicValue((context) => {
  if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
    return new GetUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
    return new GetUserUsecase(
      context.container.get(RegistryUser.UserRepositoryHttp)
    );
  } else {
    return new GetUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  }
});

containerUser.bind(RegistryUser.UpdateUserUsecase).toDynamicValue((context) => {
  if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
    return new UpdateUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
    return new UpdateUserUsecase(
      context.container.get(RegistryUser.UserRepositoryHttp)
    );
  } else {
    return new UpdateUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  }
});

containerUser.bind(RegistryUser.DeleteUserUsecase).toDynamicValue((context) => {
  if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
    return new DeleteUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
    return new DeleteUserUsecase(
      context.container.get(RegistryUser.UserRepositoryHttp)
    );
  } else {
    return new DeleteUserUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  }
});

containerUser
  .bind(RegistryUser.GetNameFromJsonUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new GetNameFromJsonUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new GetNameFromJsonUsecase(
        context.container.get(RegistryUser.UserRepositoryHttp)
      );
    } else {
      return new GetNameFromJsonUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    }
  });

containerUser
  .bind(RegistryUser.ConfirmUserUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new ConfirmUserUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new ConfirmUserUsecase(
        context.container.get(RegistryUser.UserRepositoryHttp)
      );
    } else {
      return new ConfirmUserUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    }
  });

containerUser
  .bind(RegistryUser.ForgotPasswordUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new ForgotPasswordUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new ForgotPasswordUsecase(
        context.container.get(RegistryUser.UserRepositoryHttp)
      );
    } else {
      return new ForgotPasswordUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    }
  });

containerUser
  .bind(RegistryUser.ForgotPasswordSubmitUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new ForgotPasswordSubmitUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new ForgotPasswordSubmitUsecase(
        context.container.get(RegistryUser.UserRepositoryHttp)
      );
    } else {
      return new ForgotPasswordSubmitUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    }
  });

containerUser
  .bind(RegistryUser.ValidateEmailInJsonUsecase)
  .toDynamicValue((context) => {
    if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
      return new ValidateEmailInJsonUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
      return new ValidateEmailInJsonUsecase(
        context.container.get(RegistryUser.UserRepositoryHttp)
      );
    } else {
      return new ValidateEmailInJsonUsecase(
        context.container.get(RegistryUser.UserRepositoryMock)
      );
    }
  });

containerUser.bind(RegistryUser.SignInUsecase).toDynamicValue((context) => {
  if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
    return new SignInUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
    return new SignInUsecase(
      context.container.get(RegistryUser.UserRepositoryHttp)
    );
  } else {
    return new SignInUsecase(
      context.container.get(RegistryUser.UserRepositoryMock)
    );
  }
});
