'use client';
import React, { useContext } from 'react';

import {
  Container,
  ContainerCardContent,
  ContainerRow,
} from '../components/Container';
import { CardGray, CardWhite } from '../components/Card';
import { Title } from '../components/Title';
import { ExitIcon } from '../components/Icon';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });
import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
} from '../components/Form';
import { ReturnLink } from '../components/Link';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';
import { UserContext } from '@/contexts/user_provider';
import SnackbarComponent from '../components/SnackbarMUI/Snackbar';
import { SnackbarOrigin } from '@mui/material';
import DialogComponent from '../components/DialogMUI/Dialog';

export interface IFormResetPassword {
  email: string;
}

export interface StateSnackBar extends SnackbarOrigin {
  open: boolean;
}

export default function ResetPasswordPage() {
  const { register, handleSubmit } = useForm<IFormResetPassword>();
  const { forgotPassword } = useContext(UserContext);

  // dialog logic

  const [openDialog, setOpenDialog] = React.useState(false);
  const [emailDialog, setEmailDialog] = React.useState('');

  const handleClickOpenDialog = (email: string) => {
    setOpenDialog(true);
    setEmailDialog(email);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // form logic

  const onSubmit: SubmitHandler<IFormResetPassword> = (data) => {
    // console.log(process.env.NEXT_PUBLIC_STAGE);
    // console.log('Email: ', data.email);
    const forgotPasswordResponse = forgotPassword(data.email);
    // handleOpenSnack({ vertical: 'bottom', horizontal: 'center' });
    setTimeout(() => {
      handleClickOpenDialog(data.email);
    }, 5000);
    console.log('Forgot password response: ', forgotPasswordResponse);
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title style={{ paddingTop: '0px', marginBottom: '0px' }}>
              Redefinir Senha
            </Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <p style={{ textAlign: 'center', fontSize: '20px' }}>
                Você receberá um e-mail
                <br />
                para redefinir sua senha.
              </p>
              <FormLabel htmlFor="email">E-mail (@maua.br)</FormLabel>
              <FormInput
                type="email"
                {...register('email', { required: true })}
              />
              <FormButton type="submit">Enviar</FormButton>
            </FormContainer>
            <ContainerRow>
              <ReturnLink href="/">Voltar</ReturnLink>
              <ExitIcon />
            </ContainerRow>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
      <DialogComponent open={openDialog} handleClose={handleCloseDialog}>
        <p style={{ textAlign: 'center', fontSize: '20px' }}>
          Um e-mail foi enviado para <strong>{emailDialog}.</strong> Redefina
          sua senha.
        </p>
      </DialogComponent>
    </Container>
  );
}
