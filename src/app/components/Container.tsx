import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    padding-top: 0px;
    margin-right: -45px;
  }
  @media (max-width: 380px) {
    padding-left: 8px;
    margin-right: -84px;
  }
`;

const ContainerCenterMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 43%;
  left: 45%;

  @media (max-width: 450px) {
    top: 40%;
    left: 38%;
  }
`;

const ContainerCardContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;

  @media (max-width: 450px) {
  }

  @media (max-width: 380px) {
    padding-top: 0px;
  }
`;

const ContainerRowLink = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
`;

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 28px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ConteinerRowADM = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 15px;
`;

export {
  Container,
  ContainerCardContent,
  ContainerRowLink,
  ContainerRow,
  ContainerCenterMiddle,
  ConteinerRowADM
};
