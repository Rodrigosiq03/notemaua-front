'use client';
import React from 'react';

import {Container, ContainerCardContent} from '../components/Container';
import {CardGray, CardWhite} from '../components/Card';
import { Title } from '../components/Title';
import { useForm, SubmitHandler } from "react-hook-form";
import {Hind} from 'next/font/google';
const hind = Hind({subsets: ['latin'], weight: '700'})
import { FormButton, FormContainer, FormInput, FormLabel } from '../components/Form';
import ImageComponentMaua from '../components/ImageComponent/LogoMaua';
import ImageComponentNoteMaua from '../components/ImageComponent/LogoNoteMaua';

export interface IFormRedefinirSenhaEmail {
    email: string;
}

export default function RedefinirSenhaEmailPage() {
    
    const {register, handleSubmit} = useForm<IFormRedefinirSenhaEmail>();

    
    
    
}
