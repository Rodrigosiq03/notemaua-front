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
import { NotebookContext } from '@/contexts/notebook_provider';
import { WithdrawContext } from '@/contexts/withdraw_provider';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
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
  const [messageSnackbar, setMessageSnackbar] = React.useState<string>('');

  const handleOpenSnack = (newOpenState: SnackbarOrigin) => {
    setStateSnackbar({ open: true, ...newOpenState });
  };

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackbar({ ...stateSnackbar, open: false });
  };

  // dialog logic

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // confirm user logic

  if (searchParams.has('email') && searchParams.has('code')) {
    const email = searchParams.get('email');
    const code = searchParams.get('code');
    if (email && code) {
      confirmUser(email, code);
      console.log('confirmado!!!!!!');
      setMessageSnackbar('Usuário confirmado com sucesso!');
      setTimeout(() => {
        handleOpenSnack({ vertical: 'bottom', horizontal: 'center' });
      }, 3000);
    }
  }
  if (searchParams.has('passwordReset')) {
    setMessageSnackbar('Senha alterada com sucesso!');
    setTimeout(() => {
      handleOpenSnack({ vertical: 'bottom', horizontal: 'center' });
    }, 3000);
  }

  const onSubmit: SubmitHandler<IFormlogin> = async (data) => {
    setMessageSnackbar('Usuário confirmado com sucesso!');
    handleOpenSnack({ vertical: 'bottom', horizontal: 'center' });
  };

  const { getNotebook, notebooks } = useContext(NotebookContext);
  async function teste_notebook() {
    const notebook = await getNotebook('34100');
    console.log(process.env.NEXT_PUBLIC_STAGE);
    console.log('getNotebook ', notebook);
    console.log(notebooks);
  }

  const { withdraws, createWithdraw } = useContext(WithdrawContext);
  async function teste_withdraw() {
    const withdraw = await createWithdraw('34100', '22.00680-0@maua.br');
    console.log('createWithdraw ', withdraw);
    console.log(withdraws);
  }  

  const { finishWithdraw } = useContext(WithdrawContext);
  async function teste_finish_withdraw() {
    const withdraw = await finishWithdraw('34100');
    console.log('finishWithdraw ', withdraw);
    console.log(withdraws);
  }

  const { getAllWithdraws } = useContext(WithdrawContext);
  async function teste_get_all_withdraws() {
    const withdraw = await getAllWithdraws();
    console.log('getAllWithdraws ', withdraw);
    console.log(withdraws);
  }


  

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
      <button onClick={teste_withdraw}>Create Withdraw</button>
      <button onClick={teste_finish_withdraw}>Finish Witdraw</button>
      <button onClick={teste_get_all_withdraws}>Get All Witdraws</button>
      <SnackbarComponent
        style={undefined}
        handleClose={handleCloseSnack}
        open={stateSnackbar.open}
        horizontal={stateSnackbar.horizontal}
        vertical={stateSnackbar.vertical}
      >
        {messageSnackbar}
      </SnackbarComponent>
    </Container>
  );
}
