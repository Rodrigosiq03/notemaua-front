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
import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
} from '../components/Form';
import { ReturnLink } from '../components/Link';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Hind } from 'next/font/google';
import { UserContext } from '../../contexts/user_provider';
import DialogComponent from '../components/DialogMUI/Dialog';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

export interface IFormlogin {
  email: string;
  password: string;
}

export default function CadastroPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormlogin>();
  const { createUser, users } = useContext(UserContext);

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

  const onSubmit: SubmitHandler<IFormlogin> = (data) => {
    const userCreated = createUser(data.email, data.password);
    setTimeout(() => {
      handleClickOpenDialog(data.email);
    }, 3000);
    console.log('User created: ', userCreated);
    // console.log('Users: ', users);
    // console.log(process.env.NEXT_PUBLIC_STAGE);
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title style={{ marginBottom: '32px' }}>Realize seu cadastro</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="email">
                Digite seu E-mail (@maua.br)
              </FormLabel>
              <FormInput
                type="email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>Este campo é obrigatório</span>
              )}
              <FormLabel style={{ paddingRight: '' }} htmlFor="password">
                Digite uma senha
              </FormLabel>
              <FormInput
                type="password"
                {...register('password', { required: true })}
              />
              <FormButton type="submit">Cadastrar</FormButton>
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
          Um e-mail foi enviado para <strong>{emailDialog}.</strong> Confirme
          seu cadastro.
        </p>
      </DialogComponent>
    </Container>
  );
}
