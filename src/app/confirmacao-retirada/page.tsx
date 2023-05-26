'use client';
import React, { useContext } from 'react';
import {
  Container,
  ContainerCardContent,
  ContainerRow,
} from '../../components/Container';
import { CardGray, CardWhite } from '../../components/Card';
import { Title, UserText } from '../../components/Title';
import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });
import ImageComponentMaua from '../../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../../components/ImageComponent/LogoNoteMaua';
import { ReturnLink } from '../../components/Link';
import { CheckCircle, ExitIcon } from '../../components/Icon';
import { UserContext } from '@/contexts/user_provider';
import { useRouter } from 'next/navigation';

export default function ConfirmReturnPage() {
  const { logOut } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logOut();
    if (response !== undefined || response !== null) {
      router.push('/');
    }
  };

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title style={{ marginBottom: '0px', paddingTop: '20px' }}>
              Retirada Confirmada
            </Title>
            <CheckCircle />
            <div>
              <UserText>
                Horário de Retirada: <strong>7:40</strong>
              </UserText>
              <UserText>Luigi Guimarães Trevisan</UserText>
              <UserText>22.01102-0@maua.br</UserText>
              <UserText>
                RA: <strong>22.01102-0</strong>
              </UserText>
            </div>
            <ContainerRow>
              <ReturnLink onClick={handleLogout} href="#">
                Sair
              </ReturnLink>
              <ExitIcon style={{ paddingTop: '2px' }} />
            </ContainerRow>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
    </Container>
  );
}
