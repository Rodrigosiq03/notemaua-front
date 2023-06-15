'use client';
import React, { useContext, useEffect } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { Auth } from 'aws-amplify';

export default function ConfirmReturnPage() {
  const { logOut, getNameFromJson } = useContext(UserContext);
  const router = useRouter();
  const serachparams = useSearchParams();

  function convertTimestampToHoursMinutes(timestamp: string | number): string {
    if (typeof timestamp === 'string') {
      const date = new Date(parseInt(timestamp));
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // Adiciona um zero à esquerda se os minutos forem menores que 10
      const formattedMinutes =
        minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${hours}:${formattedMinutes}`;
    } else if (typeof timestamp === 'number' && timestamp > 0.0) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      // Adiciona um zero à esquerda se os minutos forem menores que 10
      const formattedMinutes =
        minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${hours}:${formattedMinutes}`;
    }
    return '';
  }

  const [withdrawTime, setWithdrawTime] = React.useState('');
  const [name, setName] = React.useState('');
  const [ra, setRa] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleLogout = async () => {
    const response = await logOut();
    if (response !== undefined || response !== null) {
      router.push('/');
    }
  };

  async function getEmailFromAuth(): Promise<string> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes.email;
    } catch (error) {
      console.log('Error getting authenticated user:', error);
      throw error; // or handle the error accordingly
    }
  }

  useEffect(() => {
    if (!serachparams.get('withdrawTime') || !serachparams.get('email')) {
      router.push('/');
    }
    const withdrawTimeParam = serachparams.get('withdrawTime');
    if (withdrawTimeParam !== null && withdrawTimeParam !== undefined) {
      const emailAuth = getEmailFromAuth().then((email) => {
        setEmail(email);
      });
      const name = getNameFromJson(email.split('@')[0]) as string;
      if (name !== undefined || name !== null) {
        setName(name);
      }
      const ra = email.split('@')[0];
      setRa(ra);
      const withdrawTime = convertTimestampToHoursMinutes(withdrawTimeParam);
      setWithdrawTime(convertTimestampToHoursMinutes(withdrawTime));
    }
  }, [email, getNameFromJson, router, serachparams]);

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
                Horário de Retirada: <strong>{withdrawTime}</strong>
              </UserText>
              <UserText>{name}</UserText>
              <UserText>{email}</UserText>
              <UserText>
                RA: <strong>{ra}</strong>
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
