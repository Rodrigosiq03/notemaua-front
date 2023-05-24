'use client';

import { CardADM, CardGrayADM, CardWhiteADM } from '../components/Card';
import { Container, ContainerRowADM } from '../components/Container';
import { FormButtonADM, FormContainer, FormInput } from '../components/Form';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });



export default function PainelAdmPage() {
    return(
        <Container className={hind.className}>
            <ImageComponentNoteMaua />
            <CardGrayADM>
                <CardWhiteADM>
                    <FormContainer>
                        <ContainerRowADM>
                            <FormInput placeholder='Número de série'></FormInput>
                            <FormButtonADM type="submit">Confirmar devolução</FormButtonADM>
                        </ContainerRowADM>
                    </FormContainer>
                </CardWhiteADM>
            </CardGrayADM>
            <ImageComponentMaua/>
        </Container>
    );
}