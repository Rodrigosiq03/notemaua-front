'use client';
import { CardGray, CardWhite } from "../components/Card";
import { Container, ContainerCardContent, ContainerRow, ContainerRowLink } from "../components/Container";
import { FormButton, FormButtonScan, FormButtonTerms, FormContainer, FormInput, FormLabel } from "../components/Form";
import { ReturnIcon, ScanIcon } from "../components/Icon";
import ImageComponentMaua from "../components/ImageComponent/LogoMaua";
import ImageComponentNoteMaua from "../components/ImageComponent/LogoNoteMaua";
import { LinkStyled, ReturnLink, TextForLink } from "../components/Link";
import { Title } from "../components/Title";

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });


import DialogComponentTermsOfUse from '../components/DialogMUI/DialogTermsOfUse';
import React from "react";
import { DialogProps } from "@mui/material";

export interface IFormRetirada{
  numSerie: string;
}

export default function RetiradaPage(){

  // logic dialog for terms of use

  const [open, setOpen] = React.useState(false);
  
    const handleClickOpenDialogTermsOfUse = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

  return(
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua/>
            <Title>Retirada de Notebook</Title>
            <FormContainer>
              <FormLabel htmlFor="numSerie">Digite/Escaneie o número de serie:</FormLabel>
              <FormInput type="numSerie" style={{marginBottom: '0px'}}/>
              <h4 style={{fontWeight: '300', margin: '1px', textAlign: 'center'}}>ou</h4>
              <FormButtonScan>
                <ScanIcon/>
              </FormButtonScan>
              <ContainerRowLink style={{paddingTop: '34px'}}>
                  <TextForLink style={{fontWeight: '300'}}><input type="checkbox" required/>Concordo com os</TextForLink>
                  <FormButtonTerms onClick={handleClickOpenDialogTermsOfUse}>termos de uso.</FormButtonTerms>
              </ContainerRowLink>
              <FormButton type="submit" style={{backgroundColor: '#00CE3A'}}>Confirmar</FormButton>
            </FormContainer>
            <ContainerRow>
              <ReturnLink href="/">Sair</ReturnLink>
              <ReturnIcon/>
            </ContainerRow>
          </ContainerCardContent>               
        </CardWhite>
      </CardGray>
      <ImageComponentMaua/>
      <FormButtonTerms onClick={handleClickOpenDialogTermsOfUse}>termos de uso.</FormButtonTerms>
      <DialogComponentTermsOfUse
        open={open}
        handleClose={handleClose}     
      >
      <p>Declaro que estou ciente de que Centro Universitário do Instituto Mauá de Tecnologia (IMT) cederá um kit notebook para o meu uso nas aulas práticas de computação quando ocorrerem em que não sejam laboratórios de informática equipados com desktops.
Conforme horário de aulas e indicação de uso, poderei retirar com um funcionário do corpo técnico do IMT um kit notebook, composto: de 1 (um) notebook, 1 (uma) fonte e 1 (um) mouse.</p>
      <p><strong>Para esse uso, assumo as responsabilidades abaixo e estou ciente de que:</strong><br/><br/>
      A retirada do kit notebook se dará pela minha presença nas salas U20 ou H207, conforme o prédio onde se dará as aulas, onde haverá um mecanismo de identificação e de controle de retirada;
o controle de retirada e uso se dará pelo número de série do notebook, horário de retirada e pela minha assinatura ou outra forma de autenticação;<br/>
      Ao final de cada aula prática, me comprometo a devolver o kit notebook no mesmo local onde foi retirado, e assinarei um protocolo de entrega, com o horário da devolução;<br/>
      Estou ciente de que poderei ficar com o kit notebook retirado, caso a aula seguinte também seja uma aula prática e não for ser ministrada em sala onde já haja desktops;<br/>
      Não devo circular com o kit notebook nas dependências da Mauá;<br/>
      Não devo sair em hipótese alguma do campus da Mauá com o kit notebook;<br/>
      É de minha responsabilidade zelar pela guarda e conservação do kit notebook que me foi cedido para uso;<br/>
      Caso ocorra algo com o kit notebook ou algum problema de funcionamento, comunicarei ao técnico responsável na sala em que retirei o kit notebook;
      </p>
      </DialogComponentTermsOfUse>
    </Container>
  )
}