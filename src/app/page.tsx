'use client';
import React, { useContext, useEffect } from 'react';

import {
  Container,
  ContainerCardContent,
  ContainerRowLink,
} from './components/Container';
import { CardGray, CardWhite } from './components/Card';

import { Title } from './components/Title';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Hind } from 'next/font/google';

import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
} from './components/Form';
import { LinkStyled, TextForLink } from './components/Link';
import ImageComponentMaua from './components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from './components/ImageComponent/LogoNoteMaua';
import { UserContext } from '../contexts/user_provider';
import { useRouter, useSearchParams } from 'next/navigation';
import SnackbarComponent from './components/SnackbarMUI/Snackbar';
import { SnackbarOrigin } from '@mui/material';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

export interface IFormlogin {
  email: string;
  password: string;
}

export interface StateSnackBar extends SnackbarOrigin {
  open: boolean;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<IFormlogin>();
  const { users, confirmUser } = useContext(UserContext);
  const searchParams = useSearchParams();

  // Snackbar Logic

  const [stateSnackbar, setStateSnackbar] = React.useState<StateSnackBar>({
    vertical: 'top',
    horizontal: 'center',
    open: false,
  });

  const handleOpen = (newOpenState: SnackbarOrigin) => {
    setStateSnackbar({ open: true, ...newOpenState });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackbar({ ...stateSnackbar, open: false });
  };

  // confirm user logic

  useEffect(() => {
    if (searchParams.has('email') && searchParams.has('code')) {
      const email = searchParams.get('email');
      const code = searchParams.get('code');
      if (email && code) {
        confirmUser(email, code);
        console.log('confirmado!!!!!!');
        handleOpen({ vertical: 'bottom', horizontal: 'center' });
      }
    }
  }, [searchParams, confirmUser]);

  const onSubmit: SubmitHandler<IFormlogin> = async (data) => {
    const findUser = users.find((user) => user.email === data.email);
    if (findUser) {
      if (findUser.password === data.password) {
        console.log('Login realizado com sucesso!');
      } else {
        console.log('Senha incorreta!');
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
              />
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormInput
                type="password"
                {...register('password', { required: true })}
              />
              <FormButton type="submit">Entrar</FormButton>
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
        handleClose={handleClose}
        open={stateSnackbar.open}
        horizontal={stateSnackbar.horizontal}
        vertical={stateSnackbar.vertical}
        message="Email verificado com sucesso!"
      />
    </Container>
  );
}
