'use client';
import React from 'react';


import {Container, ContainerCardContent} from '../components/Container';
import {CardGray, CardWhite} from '../components/Card';

import { Title } from '../components/Title';

import { useForm, SubmitHandler } from "react-hook-form";

import {Hind} from 'next/font/google';
const hind = Hind({subsets: ['latin'], weight: ['700', '300']})

import { FormButton, FormContainer, FormInput, FormLabel } from '../components/Form';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';


export interface IFormNovaSenha {
  password: string;
}

export default function NovaSenhaPage() {

    const {register, handleSubmit } = useForm<IFormNovaSenha>();

    const onSubmit: SubmitHandler<IFormNovaSenha> = data => {};

    return (
      <Container className={hind.className}>
        <CardGray>
          <CardWhite>
              <ContainerCardContent>
                <ImageComponentNoteMaua/>
                <Title>Redefinir Senha</Title>
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                  <FormLabel htmlFor='password'>Nova senha</FormLabel>
                  <FormInput type='password' {...register('password', { required: true })}/>
                  <FormLabel style={{paddingRight: ''}} htmlFor='password'>Confirme a Senha</FormLabel>
                  <FormInput type='password' {...register('password', { required: true})} />
                  <FormButton style={{marginTop:'46px'}}type='submit'>Confirmar</FormButton>
                </FormContainer>
              </ContainerCardContent>
          </CardWhite>
        </CardGray>
          <ImageComponentMaua />
      </Container>
    )
}


