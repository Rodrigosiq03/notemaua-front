'use client';
import React, { useContext } from 'react';

import { Container, ContainerCardContent } from '../components/Container';
import { CardGray, CardWhite } from '../components/Card';

import { Title } from '../components/Title';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
} from '../components/Form';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';
import { UserContext } from '@/contexts/user_provider';
import { useRouter, useSearchParams } from 'next/navigation';

export interface IFormNovaSenha {
  password: string;
  confirmPassword: string;
}

export default function NovaSenhaPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormNovaSenha>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateUser, forgotPasswordSubmit } = useContext(UserContext);

  const onSubmit: SubmitHandler<IFormNovaSenha> = (data) => {
    if (searchParams.has('email') && searchParams.has('code')) {
      const email = searchParams.get('email');
      const code = searchParams.get('code');
      if (email && code) {
        forgotPasswordSubmit(email, code, data.password);
        router.push('/?passwordReset=true');
      }
    }
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title>Redefinir Senha</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="password">Nova senha</FormLabel>
              <FormInput
                type="password"
                {...register('password', { required: true })}
              />
              <FormLabel style={{ paddingRight: '' }} htmlFor="password">
                Confirme a Senha
              </FormLabel>
              <FormInput
                type="password"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return 'Senhas não conferem';
                    }
                    return true;
                  },
                })}
              />
              {errors.confirmPassword && (
                <span style={{ color: 'red' }}>Senhas não conferem</span>
              )}
              <FormButton style={{ marginTop: '46px' }} type="submit">
                Confirmar
              </FormButton>
            </FormContainer>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
    </Container>
  );
}
