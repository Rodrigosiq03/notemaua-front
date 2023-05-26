'use client';
import React, { useContext, useEffect } from 'react';

import {
  Container,
  ContainerCardContent,
  ContainerRowLink,
} from '../components/Container';
import { CardGray, CardWhite } from '../components/Card';

import { Title } from '../components/Title';

import { useForm, SubmitHandler, set } from 'react-hook-form';

import { Hind } from 'next/font/google';

import {
  FormButton,
  FormContainer,
  FormInput,
  FormInputEye,
  FormLabel,
} from '../components/Form';
import { LinkStyled, TextForLink } from '../components/Link';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';
import SnackbarComponent from '../components/SnackbarMUI/Snackbar';
import DialogComponentFirstAccess from '@/components/DialogMUI/DialogFirstAccessADM';
import { UserContext } from '../contexts/user_provider';
import { useSearchParams, useRouter } from 'next/navigation';
import { IconButton, InputAdornment, SnackbarOrigin } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

import { Auth } from 'aws-amplify';
import { FormNewPasswordADM } from '@/components/FormADM/FormNewPassword';

interface IFormlogin {
  email: string;
  password: string;
}

interface IFormNewPasswordADM {
  password: string;
  confirmPassword: string;
}

interface StateSnackBar extends SnackbarOrigin {
  open: boolean;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IFormlogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { signIn, confirmUser, error } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  // STATE SNACKBAR SUCCESS
  const [stateSnackbarSuccess, setStateSnackbarSuccess] =
    React.useState<StateSnackBar>({
      vertical: 'top',
      horizontal: 'center',
      open: false,
    });
  const [messageSnackbarSuccess, setMessageSnackbarSuccess] =
    React.useState<string>('');

  // STATE SNACKBAR ERROR
  const [stateSnackbarError, setStateSnackbarError] =
    React.useState<StateSnackBar>({
      vertical: 'top',
      horizontal: 'center',
      open: false,
    });
  const [messageSnackbarError, setMessageSnackbarError] =
    React.useState<string>('');

  // ACTIONS SNACKBAR SUCCESS
  const handleOpenSnackSuccess = (newOpenState: SnackbarOrigin) => {
    setStateSnackbarSuccess({ open: true, ...newOpenState });
  };

  const handleCloseSnackSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackbarSuccess({ ...stateSnackbarSuccess, open: false });
  };

  // ACTIONS SNACKBAR ERROR
  const handleOpenSnackError = (newOpenState: SnackbarOrigin) => {
    setStateSnackbarError({ open: true, ...newOpenState });
  };

  const handleCloseSnackError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackbarError({ ...stateSnackbarError, open: false });
  };

  // DIALOG FIRST ACCESS ADM

  const [openDialogFirstAccess, setOpenDialogFirstAccess] =
    React.useState(false);
  const [responseNewPasswordADM, setResponseNewPasswordADM] = React.useState();

  const handleOpenDialogFirstAccess = () => {
    setOpenDialogFirstAccess(true);
  };

  const handleCloseDialogFirstAccess = () => {
    setOpenDialogFirstAccess(false);
  };

  const handleSubmitNewPasswordADM: SubmitHandler<IFormNewPasswordADM> = (
    data
  ) => {
    const { password } = data;

    if (responseNewPasswordADM) {
      Auth.completeNewPassword(responseNewPasswordADM, password).then(
        (response) => {
          console.log(response);
          setMessageSnackbarSuccess('Senha alterada com sucesso!');
          setTimeout(() => {
            handleOpenSnackSuccess({
              vertical: 'bottom',
              horizontal: 'center',
            });
          }, 1000);
          setTimeout(() => {
            router.push('/painel-adm');
          }, 2000);
        }
      );
    }
  };

  // confirm user logic

  useEffect(() => {
    if (searchParams.has('email') && searchParams.has('code')) {
      const email = searchParams.get('email');
      const code = searchParams.get('code');
      confirmUser(email as string, code as string);
      console.log('confirmado!!!!!!');
      setMessageSnackbarSuccess('Usuário confirmado com sucesso!');
      setTimeout(() => {
        handleOpenSnackSuccess({
          vertical: 'bottom',
          horizontal: 'center',
        });
      }, 3000);
    }
    if (searchParams.has('passwordReset')) {
      setMessageSnackbarSuccess('Senha alterada com sucesso!');
      setTimeout(() => {
        handleOpenSnackSuccess({ vertical: 'bottom', horizontal: 'center' });
      }, 3000);
    }
  }, [confirmUser, error, searchParams]);

  // eye input logic
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit: SubmitHandler<IFormlogin> = async (data) => {
    const response = (await signIn(data.email, data.password)) as any;
    if (error) {
      if (error?.message === 'Usuário não encontrado') {
        setError('email', {
          type: 'manual',
          message: 'Usuário ou senha incorretos',
        });
      }
      if (error?.message === 'Usuário ou senha incorretos') {
        setError('password', {
          type: 'manual',
          message: 'Usuário ou senha incorretos',
        });
      }
      if (error?.message === 'Usuário não confirmado') {
        setError('email', {
          type: 'manual',
          message: 'Usuário não confirmado',
        });
      }
    } else {
      if (response) {
        const challengeName = response.challengeName;
        if (challengeName === 'NEW_PASSWORD_REQUIRED') {
          handleOpenDialogFirstAccess();
          setResponseNewPasswordADM(response);
        }
        await Auth.currentAuthenticatedUser().then((user) => {
          const customAttributes = user.attributes['custom:role'];
          if (customAttributes === 'STUDENT') {
            router.push('/retirada');
          }
          if (customAttributes === 'EMPLOYEE') {
            router.push('/painel-adm');
          }
        });
        console.log('logado', response);
      }
    }
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title>Login</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="email">E-mail (@maua.br)</FormLabel>
              <FormInput
                type="email"
                {...register('email', { required: true })}
                disableUnderline={true}
              />
              {errors.email?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormInputEye
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%'"*_?&ç(`{}[#%=+)-])[A-Za-z\d@$!%'"*_?&ç(`{}[#%=+)-]{8,}$/,
                })}
                disableUnderline={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityOffIcon
                          sx={{ color: '#545454', fontSize: '20px' }}
                        />
                      ) : (
                        <VisibilityIcon
                          sx={{ color: '#545454', fontSize: '20px' }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              {errors.password?.type === 'pattern' && (
                <span style={{ color: 'red', textAlign: 'center' }}>
                  Senha inválida
                </span>
              )}
              {errors.password?.type === 'manual' &&
                errors.password?.message === 'Usuário ou senha incorretos' && (
                  <span style={{ color: 'red', textAlign: 'center' }}>
                    Usuário ou senha incorretos
                  </span>
                )}
              {errors.email?.type === 'manual' &&
                errors.email?.message === 'Usuário ou senha incorretos' && (
                  <span style={{ color: 'red', textAlign: 'center' }}>
                    Usuário ou senha incorretos
                  </span>
                )}
              {errors.email?.type === 'manual' &&
                errors.email?.message === 'Usuário não confirmado' && (
                  <span style={{ color: 'red', textAlign: 'center' }}>
                    Usuário não confirmado
                  </span>
                )}
              <FormButton id="loginButton" type="submit">
                Entrar
              </FormButton>
            </FormContainer>
            <ContainerRowLink>
              <TextForLink>Primeiro Acesso?</TextForLink>
              <LinkStyled href="/cadastro">Clique aqui</LinkStyled>
            </ContainerRowLink>
            <LinkStyled href="/redefinir-senha">Esqueci minha senha</LinkStyled>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
      <SnackbarComponent
        style={undefined}
        handleClose={handleCloseSnackSuccess}
        open={stateSnackbarSuccess.open}
        horizontal={stateSnackbarSuccess.horizontal}
        vertical={stateSnackbarSuccess.vertical}
        severity="success"
      >
        {messageSnackbarSuccess}
      </SnackbarComponent>
      <SnackbarComponent
        style={undefined}
        handleClose={handleCloseSnackError}
        open={stateSnackbarError.open}
        horizontal={stateSnackbarError.horizontal}
        vertical={stateSnackbarError.vertical}
        severity="error"
      >
        {messageSnackbarError}
      </SnackbarComponent>
      <DialogComponentFirstAccess
        open={openDialogFirstAccess}
        handleClose={handleCloseDialogFirstAccess}
      >
        <FormNewPasswordADM onSubmit={handleSubmitNewPasswordADM} />
      </DialogComponentFirstAccess>
    </Container>
  );
}
