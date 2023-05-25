import styled from 'styled-components';

const Title = styled.h2`
  padding-top: 0px;
  font-weight: 700;
  margin-bottom: 32px;

  @media (max-width: 450px) {
    padding-top: 0px;
  }

  @media (max-width: 380px) {
    padding-top: 20px;
    padding-bottom: 28px;
    margin-top: 0;
  }
`;
const TitleADM = styled.a`
  font-weight: 700;
  font-size: 13px;
  padding-left: 240px;

`;

const UserText = styled.p`
  text-align: center;
  font-size: 15px;
  margin: 0px;
  padding-top: 4px;
`;

export { Title, TitleADM, UserText };
