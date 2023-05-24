'use client';
import React, { useContext } from 'react';

import {
  Container,
  ContainerCardContent,
  ContainerRow,
} from '../../components/Container';
import { CardGray, CardWhite } from '../../components/Card';

import { Title } from '../../components/Title';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

import DialogComponentInfoPassword from '../../components/DialogMUI/DialogInfoPassword';

import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
} from '../../components/Form';
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';
import { UserContext } from '@/contexts/user_provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { InfoButton, InfoIcon } from '../../components/Icon';

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
    setError,
  } = useForm<IFormNovaSenha>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateUser, forgotPasswordSubmit } = useContext(UserContext);

  const [openDialogPassword, setOpenDialogPassword] = React.useState(false);

  const handleClickOpenDialogPassword = () => {
    setOpenDialogPassword(true);
  };

  const handleCloseDialogPassword = () => {
    setOpenDialogPassword(false);
  };

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
              <ContainerRow
                style={{ paddingTop: '0px', textDecoration: 'none' }}
              >
                <FormLabel style={{ paddingTop: '10px' }} htmlFor="password">
                  Nova senha
                </FormLabel>
                <InfoButton
                  style={{ paddingTop: '10px' }}
                  onClick={handleClickOpenDialogPassword}
                >
                  <InfoIcon />
                </InfoButton>
              </ContainerRow>
              <FormInput
                type="password"
                {...register('password', {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
              />
              {errors.password?.type === 'pattern' && (
                <span style={{ color: 'red', textAlign: 'center' }}>
                  Senha inválida. Verifique as <br />
                  informações
                </span>
              )}
              {errors.password?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
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
              {errors.confirmPassword?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              {errors.confirmPassword?.type === 'validate' && (
                <span style={{ color: 'red' }}>Senhas não conferem</span>
              )}
              <FormButton style={{ marginTop: '46px' }} type="submit">
                Confirmar
              </FormButton>
            </FormContainer>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <DialogComponentInfoPassword
        open={openDialogPassword}
        handleClose={handleCloseDialogPassword}
      >
        <p style={{ textAlign: 'center', fontSize: '20px' }}>
          Sua senha deve conter: <br />- no mínimo <strong>8</strong> caracteres{' '}
          <br /> - <strong>1</strong> letra maiúscula <br />- <strong>1</strong>{' '}
          letra minúscula <br />- <strong>1</strong> número <br />-{' '}
          <strong>1</strong> caractere especial
        </p>
      </DialogComponentInfoPassword>
      <ImageComponentMaua />
    </Container>
  );
}
