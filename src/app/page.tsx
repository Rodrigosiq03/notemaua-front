'use client';
import React from 'react';

import logo from 'public/images/logo.svg';
import logoMaua from 'public/images/logoMaua.svg';
import Image from 'next/image';

import {Container, ContainerCardContent, ContainerRowLink} from './components/Container';
import {CardGray, CardWhite} from './components/Card';

import { Title } from './components/Title';

import { useForm, SubmitHandler } from "react-hook-form";

import {Hind} from 'next/font/google';
const hind = Hind({subsets: ['latin'], weight: '700'})

import { FormButton, FormContainer, FormInput, FormLabel } from './components/Form';
import { LinkStyled, TextForLink } from './components/Link';


export interface IFormlogin {
  email: string;
  password: string;
}

export default function LoginPage() {

    const {register, handleSubmit } = useForm<IFormlogin>();

    const onSubmit: SubmitHandler<IFormlogin> = data => {};

    return (
        <Container className={hind.className}>
            <CardGray>
                <CardWhite>
                    <ContainerCardContent>
                        <Image src={logo} alt='logo_note_maua' width={250}/>
                        <Title>Login</Title>
                        <FormContainer onSubmit={handleSubmit(onSubmit)}>
                            <FormLabel htmlFor='email'>Email (@maua.br)</FormLabel>
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
            <Image src={logoMaua} alt='logoMaua' width={100} style={{ paddingTop: '24px'}} />
        </Container>
    )
}


