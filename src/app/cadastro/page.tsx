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
    setError,
  } = useForm<IFormlogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { createUser, users, error } = useContext(UserContext);

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
    if (!error) {
      const userCreated = createUser(data.email, data.password);
      setTimeout(() => {
        handleClickOpenDialog(data.email);
      }, 3000);
      console.log('User created: ', userCreated);
    } else {
      if (error?.message === 'Usuário já cadastrado') {
        setError('email', {
          type: 'manual',
          message: 'Usuário já cadastrado',
        });
      }
      if (errors.password?.type === 'pattern') {
        setError('password', {
          type: 'pattern',
          message:
            'Padrão de senha inválido, deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número',
        });
      }
    }
    console.log('Erro ao criar usuário: ');
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
                {...register('email', { required: true, pattern: /@maua.br/ })}
              />
              {errors.email?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              {errors.email?.type === 'pattern' && (
                <span style={{ color: 'red' }}>
                  O e-mail deve conter @maua.br
                </span>
              )}
              <FormLabel style={{ paddingRight: '' }} htmlFor="password">
                Digite uma senha
              </FormLabel>
              <FormInput
                type="password"
                {...register('password', {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                })}
              />
              {errors.password?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              {errors.password?.type === 'pattern' && (
                <span style={{ color: 'red' }}>
                  Sua senha deve conter: <br />
                  - no mínimo 8 caracteres <br />
                  - 1 letra maiúscula <br />
                  - 1 letra minúscula <br />
                  - 1 número <br />- 1 caractere especial
                </span>
              )}
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
