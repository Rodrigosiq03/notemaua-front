import { SubmitHandler, useForm } from 'react-hook-form';
import { ContainerRow } from '../Container';
import { FormButton, FormContainer, FormInputEye, FormLabel } from '../Form';
import { InfoButton, InfoIcon } from '../Icon';
import DialogComponentInfoPassword from '../DialogMUI/DialogInfoPassword';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { FormEventHandler } from 'react';

interface IFormNewPasswordADM {
  password: string;
  confirmPassword: string;
}

export function FormNewPasswordADM({
  onSubmit,
}: {
  onSubmit: SubmitHandler<IFormNewPasswordADM>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormNewPasswordADM>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [showPasswordNewPassword, setShowPasswordNewPassword] =
    React.useState(false);
  const [showPasswordConfirmPassword, setShowPasswordConfirmPassword] =
    React.useState(false);

  const handleNewPasswordVisibility = () => {
    setShowPasswordNewPassword(!showPasswordNewPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowPasswordConfirmPassword(!showPasswordConfirmPassword);
  };

  const [openDialogPassword, setOpenDialogPassword] = React.useState(false);

  const handleClickOpenDialogPassword = () => {
    setOpenDialogPassword(true);
  };

  const handleCloseDialogPassword = () => {
    setOpenDialogPassword(false);
  };

  return (
    <FormContainer
      style={{ marginLeft: '24px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContainerRow style={{ paddingTop: '0px', textDecoration: 'none' }}>
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
      <FormInputEye
        type={showPasswordNewPassword ? 'text' : 'password'}
        {...register('password', {
          required: true,
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%'"*_?&ç(`{}[#%=+)-])[A-Za-z\d@$!%'"*_?&ç(`{}[#%=+)-]{8,}$/,
        })}
        disableUnderline={true}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleNewPasswordVisibility}>
              {showPasswordNewPassword ? (
                <VisibilityOffIcon
                  sx={{ color: '#545454', fontSize: '20px' }}
                />
              ) : (
                <VisibilityIcon sx={{ color: '#545454', fontSize: '20px' }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors.password?.type === 'pattern' && (
        <span style={{ color: 'red', textAlign: 'center' }}>
          Senha inválida. Verifique as <br />
          informações
        </span>
      )}
      {errors.password?.type === 'required' && (
        <span style={{ color: 'red' }}>Este campo é um campo obrigatório</span>
      )}
      <FormLabel style={{ paddingRight: '' }} htmlFor="password">
        Confirme a Senha
      </FormLabel>
      <FormInputEye
        type={showPasswordConfirmPassword ? 'text' : 'password'}
        {...register('confirmPassword', {
          required: true,
          validate: (value) => {
            if (watch('password') !== value) {
              return 'Senhas não conferem';
            }
            return true;
          },
        })}
        disableUnderline={true}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleConfirmPasswordVisibility}>
              {showPasswordConfirmPassword ? (
                <VisibilityOffIcon
                  sx={{ color: '#545454', fontSize: '20px' }}
                />
              ) : (
                <VisibilityIcon sx={{ color: '#545454', fontSize: '20px' }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors.confirmPassword?.type === 'required' && (
        <span style={{ color: 'red' }}>Este campo é um campo obrigatório</span>
      )}
      {errors.confirmPassword?.type === 'validate' && (
        <span style={{ color: 'red' }}>Senhas não conferem</span>
      )}
      <FormButton style={{ marginTop: '46px' }} type="submit">
        Confirmar
      </FormButton>
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
    </FormContainer>
  );
}
