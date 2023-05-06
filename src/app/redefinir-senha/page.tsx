"use client";
import React from "react";

import logo from "public/images/logo.svg";
import Image from "next/image";

import {
  Container,
  ContainerCardContent,
  ContainerRow,
} from "../components/Container";
import { CardGray, CardWhite } from "../components/Card";
import { Title } from "../components/Title";
import { ExitIcon } from "../components/Icon";
import { useForm, SubmitHandler } from "react-hook-form";
import { Hind } from "next/font/google";
const hind = Hind({ subsets: ["latin"], weight: ["700", "300"] });
import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
} from "../components/Form";
import { ReturnLink, LinkStyled, TextForLink } from "../components/Link";
import ImageComponentMaua from "../components/ImageComponent/LogoMaua";
import ImageComponentNoteMaua from "../components/ImageComponent/LogoNoteMaua";

export interface IFormRedefinirSenhaEmail {
  email: string;
}

export default function RedefinirSenhaEmailPage() {
  const { register, handleSubmit } = useForm<IFormRedefinirSenhaEmail>();

  const onSubmit: SubmitHandler<IFormRedefinirSenhaEmail> = (data) => {};

  return (
    <Container className={hind.className}>
      <CardGray>
        <CardWhite>
          <ContainerCardContent>
            <ImageComponentNoteMaua />
            <Title style={{ paddingTop: "0px", marginBottom: "0px" }}>
              Redefinir Senha
            </Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Você receberá um e-mail
                <br />
                para redefinir sua senha.
              </p>
              <FormLabel htmlFor="email">E-mail (@maua.br)</FormLabel>
              <FormInput
                type="email"
                {...register("email", { required: true })}
              />
              <FormButton type="submit">Enviar</FormButton>
            </FormContainer>
            <ContainerRow>
              <ReturnLink href="/">Voltar</ReturnLink>
              <ExitIcon />
            </ContainerRow>
          </ContainerCardContent>
        </CardWhite>
      </CardGray>
      <ImageComponentMaua />
    </Container>
  );
}
