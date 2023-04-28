'use client';
import React from 'react';

import logo from 'public/images/logo.svg';
import Image from 'next/image';

import {Container, ContainerCardContent, ContainerRowLink} from '../components/Container';
import {CardGray, CardWhite} from '../components/Card';

import { Title } from '../components/Title';

import { useForm, SubmitHandler } from "react-hook-form";

import {Hind} from 'next/font/google';
const hind = Hind({subsets: ['latin'], weight: ['700', '400']})

import { FormButton, FormContainer, FormInput, FormLabel } from '../components/Form';
import { ReturnLink, LinkStyled, TextForLink } from '../components/Link';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';


export interface IFormlogin {
    email: string;
}

export default function PrimeiroAcessoPage() {

    const {register, handleSubmit } = useForm<IFormlogin>();

    const onSubmit: SubmitHandler<IFormlogin> = data => {};

    return (
        <Container className={hind.className}>
          <CardGray>
            <CardWhite>
                <ContainerCardContent>
                  <ImageComponentNoteMaua/>
                  <Title>Primeiro Acesso</Title>
                  <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor='email'>E-mail (@maua.br)</FormLabel>
                    <FormInput type='email' {...register('email', { required: true })}/>
                    <FormButton type='submit'>Entrar</FormButton>
                  </FormContainer>
                  <ContainerRowLink>
                    <ReturnLink href="/">Voltar</ReturnLink>
                  </ContainerRowLink>
                </ContainerCardContent>
            </CardWhite>
          </CardGray>
            <ImageComponentMaua />
        </Container>
      )

}