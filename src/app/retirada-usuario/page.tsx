'use client';
import { CardGray, CardWhite } from "../components/Card";
import { Container, ContainerCardContent, ContainerRow, ContainerRowLink } from "../components/Container";
import { FormButton, FormButtonScan, FormContainer, FormInput, FormLabel } from "../components/Form";
import { ReturnIcon, ScanIcon } from "../components/Icon";
import ImageComponentMaua from "../components/ImageComponent/LogoMaua";
import ImageComponentNoteMaua from "../components/ImageComponent/LogoNoteMaua";
import { LinkStyled, ReturnLink, TextForLink } from "../components/Link";
import { Title } from "../components/Title";

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

export interface IFormRetirada{
  numSerie: string;
}



export default function RetiradaPage(){
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
                  <TextForLink style={{fontWeight: '300'}}><input type="checkbox"/>Concordo com os</TextForLink>
                  <LinkStyled href="/termosDeUso">termos de uso.</LinkStyled>
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
    </Container>
  )
}