'use client';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Container,
  ContainerCardContent,
  ContainerCenterMiddle,
} from '@/app/components/Container';
import { CardGray, CardWhite } from '@/app/components/Card';
import ImageComponentNoteMaua from '@/app/components/ImageComponent/LogoNoteMaua';
import { Title } from '@/app/components/Title';
import ImageComponentMaua from '@/app/components/ImageComponent/LogoMaua';

export default function ConfirmarCadastro() {
  return (
    <ContainerCenterMiddle>
      <CircularProgress size={100} sx={{ color: '#1669B6' }} />
    </ContainerCenterMiddle>
    // <Container>
    //   <CardGray>
    //     <CardWhite>
    //       <ContainerCardContent>
    //         <ImageComponentNoteMaua />
    //         <Title>Email Verificado</Title>
    //       </ContainerCardContent>
    //     </CardWhite>
    //   </CardGray>
    //   <ImageComponentMaua />
    // </Container>
  );
}
