'use client';
import React, { useContext } from 'react';
import {
  Container,
  ContainerCardContent,
  ContainerRow,
} from '../../components/Container';
import { CardGray, CardWhite } from '../../components/Card';
import { Title } from '../../components/Title';
import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ReturnLink } from '../../components/Link';
import { ExitIcon } from '../../components/Icon';

export default function ConfirmReturnPage() {
  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title style={{ paddingTop: '0px', marginBottom: '0px' }}>
              Retirada Confirmada
            </Title>
            <CheckCircleIcon
              style={{
                fontSize: '140px',
                color: '#00b300',
                paddingTop: '10px',
                paddingBottom: '20px',
              }}
            />
            <div>
              <p
                style={{ textAlign: 'center', fontSize: '13px', margin: '0px' }}
              >
                Horário de Retirada: <strong>7:40</strong>
              </p>
              {/* <p style={{ textAlign: 'center', fontSize: '13px', margin: '0px', paddingTop: '2px'  }}></p> */}
              <p
                style={{ textAlign: 'center', fontSize: '13px', margin: '0px' }}
              >
                Luigi Guimarães Trevisan
              </p>
              <p
                style={{ textAlign: 'center', fontSize: '13px', margin: '0px' }}
              >
                22.01102-0@maua.br
              </p>
              <p
                style={{ textAlign: 'center', fontSize: '13px', margin: '0px' }}
              >
                RA:<strong>22.01102-0</strong>
              </p>
            </div>
            <ContainerRow>
              <ReturnLink href="/">Sair</ReturnLink>
              <ExitIcon style={{ paddingTop: '2px' }} />
            </ContainerRow>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
    </Container>
  );
}
