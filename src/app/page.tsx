'use client';
import React from 'react';

// import logo from '../../public/images/logoMaua.svg';
import Image from 'next/image';

import {Container, ContainerCardContent, ContainerRowLink} from './components/Container';
import {CardGray, CardWhite} from './components/Card';

import { Title } from './components/Title';

import { useForm, SubmitHandler } from "react-hook-form";

import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

import {Hind} from 'next/font/google';
const hind = Hind({subsets: ['latin'], weight: '700'})

import { FormButton, FormContainer, FormInput, FormLabel } from './components/Form';
import { LinkStyled, TextForLink } from './components/Link';
import ImageComponentMaua from './components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from './components/ImageComponent/LogoNoteMaua';


export interface IFormlogin {
  email: string;
  password: string;
}

export default function LoginPage() {

  async function getUser() {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  }

    const {register, handleSubmit } = useForm<IFormlogin>();

    const onSubmit: SubmitHandler<IFormlogin> = async (data) => {
      const auth = Auth.signIn(data.email, data.password);
      if (auth) {
        auth.then((res) => {
          console.log('RES ', res.challengeName);
          if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
            Auth.completeNewPassword(
              res, 'Teste123!', { name: 'a80d1c8e-d937-4d6e-8979-ce6b6ed1a323' }
            ).then((res) => {
              Auth.forgotPassword(data.email).then((res) => {
                console.log('RES ', res);
              }).catch((err) => {
                console.log('ERR ', err);
              });
              console.log(res)
            }).catch((err) => {
              console.log('ERR ', err);
            }
            );
          }
          Auth.currentAuthenticatedUser().then((res) => {
            console.log('RES ', res);
          }) 
        });

      } else {
        console.log('ERROR LOGGED IN ', auth)
      }
    };

    return (
      <Container className={hind.className}>
        <CardGray>
          <CardWhite>
              <ContainerCardContent>
                <ImageComponentNoteMaua/>
                <Title>Login</Title>
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                  <FormLabel htmlFor='email'>E-mail (@maua.br)</FormLabel>
                  <FormInput type='email' {...register('email', { required: true })}/>
                  <FormLabel style={{paddingRight: ''}} htmlFor='password'>Senha</FormLabel>
                  <FormInput type='password' {...register('password', { required: true})} />
                  <FormButton type='submit'>Entrar</FormButton>
                </FormContainer>
                <ContainerRowLink>
                  <TextForLink>Primeiro Acesso?</TextForLink>
                  <LinkStyled href="/primeiro-acesso">Clique aqui</LinkStyled>
                </ContainerRowLink>
                    <LinkStyled href="/esqueci-minha-senha">Esqueci minha senha</LinkStyled>
              </ContainerCardContent>
          </CardWhite>
        </CardGray>
          <ImageComponentMaua />
      </Container>
    )
}


