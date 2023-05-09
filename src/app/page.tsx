'use client';
import React, { useContext } from 'react';

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
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });



export interface IFormlogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<IFormlogin>();
  const { users, getUser } = useContext(UserContext);

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

  const getUserFunction = async () => {
    const user = getUser('22.00680-0@maua.br');
    console.log(user);
    console.log(users);
  };

  const {getNotebook, notebooks} = useContext(NotebookContext);
  async function saco(){
    const notebook = await getNotebook('34100');
    console.log(process.env.NEXT_PUBLIC_STAGE);
    console.log('getNotebook ', notebook );
    console.log(notebooks);
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
              <FormLabel style={{ paddingRight: '' }} htmlFor="password">
                Senha
              </FormLabel>
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
    </Container>
  );
}
