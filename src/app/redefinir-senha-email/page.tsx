'use client';
import React from 'react';

import {Container, ContainerCardContent, ContainerRow} from '../components/Container';
import {CardGray, CardWhite} from '../components/Card';
import { Title } from '../components/Title';
import { useForm, SubmitHandler } from "react-hook-form";
import {Hind} from 'next/font/google';
const hind = Hind({subsets: ['latin'], weight: '700'})
import { FormButton, FormContainer, FormInput, FormLabel } from '../components/Form';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';
import { ReturnLink } from '../components/Link';
import { ExitIcon } from '../components/Icon';



export interface IFormRedefinirSenhaEmail {
    email: string;
}

export default function RedefinirSenhaEmailPage() {
    
    const {register, handleSubmit} = useForm<IFormRedefinirSenhaEmail>();

    const onSubmit: SubmitHandler<IFormRedefinirSenhaEmail> = (data) => {};

    return (
        <Container className={hind.className}>
            <CardGray>
                <CardWhite>
                    <ContainerCardContent>
                        <ImageComponentMaua />
                        <Title>Redefinir Senha</Title>
                        <FormContainer onSubmit={handleSubmit(onSubmit)}>
                            <FormLabel htmlFor='email'>E-mail (@maua.br)</FormLabel>
                            <FormInput type='email' {...register('email', {required: true})} />
                            <FormButton type='submit'>Enviar</FormButton>
                        </FormContainer>
                        <ContainerRow>
                            <ReturnLink href="/">Voltar</ReturnLink>
                            <ExitIcon />
                        </ContainerRow>
                    </ContainerCardContent>
                </CardWhite>
            </CardGray>
                <ImageComponentMaua />
        </Container>
    );
    
}
