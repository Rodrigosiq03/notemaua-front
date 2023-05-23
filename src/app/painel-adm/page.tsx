'use client';

import { CardGrayADM, CardWhiteADM } from '../components/Card';
import { Container, ConteinerRowADM } from '../components/Container';
import { FormButton, FormButtonADM, FormContainer, FormInput } from '../components/Form';
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
                        <ConteinerRowADM>
                            <FormInput placeholder='Número de série'></FormInput>
                            <FormButtonADM type="submit">Confirmar devolução</FormButtonADM>
                        </ConteinerRowADM>
                </CardWhiteADM>
            </CardGrayADM>
            <ImageComponentMaua/>
        </Container>
    );
}