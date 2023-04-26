'use client';
import React from 'react';
import { Container, ContainerCardContent } from '../components/Container';
import { CardGray, CardWhite } from '../components/Card';

import logo from 'public/images/logo.svg';
import Image from 'next/image';

import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: '700'})

export default function LoginPage() {
    return (
        <Container>
           <CardGray>
                <CardWhite>
                   <ContainerCardContent>
                    <Image src={logo} alt='logo_note_maua' width={250} />
                    <h2>Login</h2>
                   </ContainerCardContent>
                </CardWhite>
           </CardGray>
        </Container>
    )
}