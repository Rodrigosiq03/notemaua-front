import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 450px) {
      padding-top: 0px;
    }
    @media (max-width: 380px) {
      padding-left: 8px;
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
`

export { Container, ContainerCardContent, ContainerRowLink, ContainerRow };