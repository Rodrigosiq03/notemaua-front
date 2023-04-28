import styled from 'styled-components';

const Title = styled.h2`
    padding-top : 16px;
    font-weight: 700;


    @media (max-width: 450px) {
      padding-top: 0px;
    }

    @media (max-width: 380px) {
      padding-top: 20px;
      padding-bottom: 28px;
      margin-top: 0;
    }

`;
export { Title };