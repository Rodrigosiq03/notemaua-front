'use client';
import { CardGray, CardWhite } from '../components/Card';
import {
  Container,
  ContainerCardContent,
  ContainerRow,
  ContainerRowLink,
  ContainerScanner,
} from '../components/Container';
import {
  FormButton,
  FormButtonScan,
  FormContainer,
  FormInput,
  FormLabel,
} from '../components/Form';
import { ReturnIcon, ScanIcon, TermsButton } from '../components/Icon';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';
import { ReturnLink, TextForLink } from '../components/Link';
import { Title } from '../components/Title';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

import DialogComponentTermsOfUse from '../components/DialogMUI/DialogTermsOfUse';
import DialogScanner from '../components/DialogMUI/DialogScanner';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NotebookContext } from '@/contexts/notebook_provider';
import { UserContext } from '@/contexts/user_provider';
import Scanner from '../components/Scanner/Scanner';

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
  const { validateNumSerieInJson } = useContext(NotebookContext);
  const { logOut } = useContext(UserContext);

  // logic dialog for terms of use

  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialogTermsOfUse = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // scanner dialog logic

  const [openScanner, setOpenScanner] = React.useState(false);

  const handleClickOpenDialogScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseScanner = () => {
    setOpenScanner(false);
  };

  // React qr code and scanner scanner logic

  const [scanResultFile, setScanResultFile] = React.useState('');
  // logout logic

  const handleLogout = () => {
    logOut();
  };

  // form logic
  const onSubmit: SubmitHandler<IFormRetirada> = (data) => {
    if (!validateNumSerieInJson(data.numSerie))
      setError('numSerie', {
        type: 'manual',
        message: 'Notebook não encontrado',
      });
    return;
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title>Retirada de Notebook</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
                value={scanResultFile}
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
              <h4
                style={{
                  fontWeight: '300',
                  margin: '1px',
                  textAlign: 'center',
                }}
              >
                ou
              </h4>
              <FormButtonScan onClick={handleClickOpenDialogScanner}>
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
              <FormButton type="submit" style={{ backgroundColor: '#00CE3A' }}>
                Confirmar
              </FormButton>
            </FormContainer>
            <ContainerRow style={{ paddingTop: '20px' }}>
              <ReturnLink onClick={handleLogout} href="/">
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
          retirei o kit notebook;
        </p>
      </DialogComponentTermsOfUse>
      <DialogScanner handleClose={handleCloseScanner} open={openScanner}>
        <Scanner
          onUpdate={(err: any, result: any) => {
            if (result) {
              setScanResultFile(result.text);
              handleCloseScanner();
            }
          }}
          height={400}
          width={240}
        />
      </DialogScanner>
    </Container>
  );
}
