'use client';

import React, { useContext } from 'react';

import {
  Container,
  ContainerCardContent,
  ContainerRow,
} from '../../components/Container';
import { CardGray, CardWhite } from '../../components/Card';
import { Title } from '../../components/Title';
import { ExitIcon } from '../../components/Icon';
import {
  FormButton,
  FormContainer,
  FormInput,
  FormInputEye,
  FormLabel,
} from '../../components/Form';
import { ReturnLink } from '../../components/Link';
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

import { UserContext } from '../../contexts/user_provider';
import DialogComponentSignUp from '../../components/DialogMUI/DialogSignUp';
import DialogComponentInfoPassword from '../../components/DialogMUI/DialogInfoPassword';
import { InfoIcon, InfoButton } from '../../components/Icon';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const { createUser, error, validateEmailInJson } = useContext(UserContext);

  // mui input eye logic
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // dialog logic

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogPassword, setOpenDialogPassword] = React.useState(false);
  const [emailDialog, setEmailDialog] = React.useState('');

  const handleClickOpenDialog = (email: string) => {
    setOpenDialog(true);
    setEmailDialog(email);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpenDialogPassword = () => {
    setOpenDialogPassword(true);
  };

  const handleCloseDialogPassword = () => {
    setOpenDialogPassword(false);
  };

  const onSubmit: SubmitHandler<IFormlogin> = (data) => {
    if (!error) {
      if (!validateEmailInJson(data.email)) {
        setError('email', {
          type: 'manual',
          message: 'Email não válido para cadastro',
        });
        return;
      }
      const userCreated = createUser(data.email, data.password);
      setTimeout(() => {
        handleClickOpenDialog(data.email);
      }, 3000);
      console.log('User created: ', userCreated);
    } else {
      if (error?.message === 'Falha no cadastro do usuário') {
        setError('email', {
          type: 'manual',
          message: 'Falha no cadastro do usuário',
        });
      }
    }
    console.log('Erro ao criar usuário: ');
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
                disableUnderline={true}
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
              {errors.email?.type === 'manual' &&
                errors.email?.message === 'Falha no cadastro do usuário' && (
                  <span style={{ color: 'red' }}>
                    Falha no cadastro do usuário
                  </span>
                )}
              {errors.email?.type === 'manual' &&
                errors.email?.message === 'Email não válido para cadastro' && (
                  <span style={{ color: 'red' }}>
                    Email não válido para cadastro
                  </span>
                )}
              <ContainerRow
                style={{ paddingTop: '0px', textDecoration: 'none' }}
              >
                <FormLabel style={{ paddingTop: '8px' }} htmlFor="password">
                  Digite uma senha
                </FormLabel>
                <InfoButton onClick={handleClickOpenDialogPassword}>
                  <InfoIcon />
                </InfoButton>
              </ContainerRow>
              <FormInputEye
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%'"*_?&ç(`{}[#%=+)-])[A-Za-z\d@$!%'"*_?&ç(`{}[#%=+)-]{8,}$/,
                })}
                disableUnderline={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityOffIcon
                          sx={{ color: '#545454', fontSize: '20px' }}
                        />
                      ) : (
                        <VisibilityIcon
                          sx={{ color: '#545454', fontSize: '20px' }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password?.type === 'required' && (
                <span style={{ color: 'red' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              {errors.password?.type === 'pattern' && (
                <span style={{ color: 'red' }}>
                  Senha inválida. Verifique as <br />
                  informações
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
      <DialogComponentSignUp open={openDialog} handleClose={handleCloseDialog}>
        <p style={{ textAlign: 'center', fontSize: '20px' }}>
          Um e-mail foi enviado para <strong>{emailDialog}.</strong> Confirme
          seu cadastro. Isso pode levar até 5 minutos.
        </p>
      </DialogComponentSignUp>
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
    </Container>
  );
}
