'use client';

import { Card } from '@mui/material';
import { CardADM, CardGrayADM, CardWhiteADM } from '../components/Card';
import { Container, ContainerRow, ContainerRowADM, ContainerRowADM2 } from '../components/Container';
import { FormButtonADM, FormButtonSearch, FormContainer, FormInput, FormSelect } from '../components/Form';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';

import { Hind } from 'next/font/google';
import { Search_Icon } from '../components/Icon';
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
                        <CardADM>
                            <hr style={{marginLeft: '20px', marginRight: '20px', borderColor: 'd6d6d6'}}/>
                            <ContainerRowADM2>
                                <FormInput placeholder='Pesquisar' style={{marginLeft: '20px', width: '160px', height: '30px'}}></FormInput>
                                <FormSelect>
                                    <option>RA</option>
                                    <option>Número de série</option>
                                </FormSelect>
                                <FormButtonSearch type="submit"><Search_Icon/></FormButtonSearch>
                            </ContainerRowADM2>
                            <hr style={{marginLeft: '20px', marginRight: '20px', borderColor: 'd6d6d6'}}/>
                        </CardADM>
                    </FormContainer>
                </CardWhiteADM>
            </CardGrayADM>
            <ImageComponentMaua/>
        </Container>
    );
}