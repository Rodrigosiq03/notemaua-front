'use client';
import { CardGray, CardWhite } from '../../components/Card';
import {
  Container,
  ContainerCardContent,
  ContainerRow,
  ContainerRowLink,
} from '../../components/Container';
import {
  FormButton,
  FormButtonScan,
  FormContainer,
  FormInput,
  FormLabel,
} from '../../components/Form';
import { ReturnIcon, ScanIcon, TermsButton } from '../../components/Icon';
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';
import { ReturnLink, TextForLink } from '../../components/Link';
import { Title } from '../../components/Title';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

import DialogComponentTermsOfUse from '../../components/DialogMUI/DialogTermsOfUse';
import React, { useContext, useEffect } from 'react';
import DialogScanner from '../../components/DialogMUI/DialogScanner';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Auth } from 'aws-amplify';
import { NotebookContext } from '../../contexts/notebook_provider';
import { UserContext } from '@/contexts/user_provider';
import { WithdrawContext } from '@/contexts/withdraw_provider';

export interface IFormRetirada {
  numSerie: string;
}

export default function RetiradaPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormRetirada>();

  const { validateNumSerieInJson, error } = useContext(NotebookContext);
  const { logOut, getIdToken } = useContext(UserContext);
  const { createWithdraw } = useContext(WithdrawContext);
  const router = useRouter();

  // Scanner state

  const setDataScanner = React.useRef(null);
  const [openScanner, setOpenScanner] = React.useState(false);

  const handleClickOpenDialogScanner = () => {
    setOpenScanner(true);
  };

  // logic dialog for terms of use

  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialogTermsOfUse = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // logout logic

  const handleLogout = async () => {
    const response = await logOut();
    if (response !== undefined || response !== null) {
      router.push('/');
    }
  };

  useEffect(() => {
    const response = Auth.currentAuthenticatedUser();
    response
      .then((user) => {
        const customAttributes = user.attributes['custom:role'];
        if (customAttributes === 'STUDENT') {
          return;
        }
        if (customAttributes === 'EMPLOYEE') {
          router.push('/');
        }
      })
      .catch((error) => {
        router.push('/');
      });
  }, [router]);

  // form logic
  const onSubmit: SubmitHandler<IFormRetirada> = async (data) => {
    const { numSerie } = data;
    if (!validateNumSerieInJson(numSerie))
      setError('numSerie', {
        type: 'manual',
        message: 'Notebook não encontrado',
      });
    else {
      const idToken = await getIdToken();
      if (idToken) {
        console.log('numSerie is ', numSerie);
        const response = await createWithdraw(numSerie, idToken);
        if (response !== undefined || response !== null) {
          console.log('response on retirada page is ', response);
          const withdrawTime = response?.withdrawTime;
          console.log('withdrawTime is ', withdrawTime);
          const email = response?.email;
          console.log('email is ', email);
          router.push(
            `/confirmacao-retirada?withdrawTime=${withdrawTime}&email=${email}`
          );
        }
        console.log('response on retirada page is ', response);
      }
    }
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title>Retirada de Notebook</Title>
            <FormContainer
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormLabel htmlFor="numSerie">
                Digite/Escaneie o número de serie:
              </FormLabel>
              <FormInput
                type="text"
                style={{ marginBottom: '0px' }}
                {...register('numSerie', {
                  required: true,
                  maxLength: 5,
                  minLength: 5,
                })}
                disableUnderline={true}
              />
              {errors.numSerie?.type === 'required' && (
                <span style={{ color: 'red', paddingTop: '4px' }}>
                  Este campo é um campo obrigatório
                </span>
              )}
              {errors.numSerie?.type === 'minLength' && (
                <span
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    paddingTop: '4px',
                  }}
                >
                  Número de série inválido
                </span>
              )}
              {errors.numSerie?.type === 'manual' &&
                errors.numSerie?.message === 'Notebook não encontrado' && (
                  <span
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      paddingTop: '4px',
                    }}
                  >
                    Notebook inexistente
                  </span>
                )}
              {errors.numSerie?.type === 'manual' &&
                errors.numSerie?.message ===
                  'Usuário ja possui um notebook em seu nome' && (
                  <span
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      paddingTop: '4px',
                    }}
                  >
                    Usuário ja possui um notebook em seu nome
                  </span>
                )}
              <h4
                style={{
                  fontWeight: '300',
                  margin: '1px',
                  textAlign: 'center',
                }}
              >
                ou
              </h4>
              <FormButtonScan
                style={{ left: '0' }}
                onClick={handleClickOpenDialogScanner}
              >
                <ScanIcon />
              </FormButtonScan>
              <ContainerRowLink style={{ paddingTop: '34px' }}>
                <TextForLink style={{ fontWeight: '300' }}>
                  <input type="checkbox" required />
                  Concordo com os
                </TextForLink>
                <TermsButton onClick={handleClickOpenDialogTermsOfUse}>
                  termos de uso.
                </TermsButton>
              </ContainerRowLink>
              <FormButton
                type="submit"
                style={{ backgroundColor: '#00CE3A', left: '0' }}
              >
                Confirmar
              </FormButton>
            </FormContainer>
            <ContainerRow style={{ paddingTop: '20px' }}>
              <ReturnLink onClick={handleLogout} href="#">
                Sair
              </ReturnLink>
              <ReturnIcon />
            </ContainerRow>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
      <DialogComponentTermsOfUse open={open} handleClose={handleClose}>
        <p>
          Declaro que estou ciente de que Centro Universitário do Instituto Mauá
          de Tecnologia (IMT) cederá um kit notebook para o meu uso nas aulas
          práticas de computação quando ocorrerem em que não sejam laboratórios
          de informática equipados com desktops. Conforme horário de aulas e
          indicação de uso, poderei retirar com um funcionário do corpo técnico
          do IMT um kit notebook, composto: de 1 (um) notebook, 1 (uma) fonte e
          1 (um) mouse.
        </p>
        <p>
          <strong>
            Para esse uso, assumo as responsabilidades abaixo e estou ciente de
            que:
          </strong>
          <br />
          <br />
          - A retirada do kit notebook se dará pela minha presença nas salas U20
          ou H207, conforme o prédio onde se dará as aulas, onde haverá um
          mecanismo de identificação e de controle de retirada; o controle de
          retirada e uso se dará pelo número de série do notebook, horário de
          retirada e pela minha assinatura ou outra forma de autenticação;
          <br />
          <br />
          - Ao final de cada aula prática, me comprometo a devolver o kit
          notebook no mesmo local onde foi retirado, e assinarei um protocolo de
          entrega, com o horário da devolução;
          <br />
          <br />
          - Estou ciente de que poderei ficar com o kit notebook retirado, caso
          a aula seguinte também seja uma aula prática e não for ser ministrada
          em sala onde já haja desktops;
          <br />
          <br />
          - Não devo circular com o kit notebook nas dependências da Mauá;
          <br />
          <br />
          - Não devo sair em hipótese alguma do campus da Mauá com o kit
          notebook;
          <br />
          <br />
          - É de minha responsabilidade zelar pela guarda e conservação do kit
          notebook que me foi cedido para uso;
          <br />
          <br />- Caso ocorra algo com o kit notebook ou algum problema de
          funcionamento, comunicarei ao técnico responsável na sala em que
          retirei o kit notebook;
        </p>
      </DialogComponentTermsOfUse>
      <DialogScanner
        open={openScanner}
        handleClose={() => setOpenScanner(false)}
      >
        Não implementado ainda
      </DialogScanner>
    </Container>
  );
}
