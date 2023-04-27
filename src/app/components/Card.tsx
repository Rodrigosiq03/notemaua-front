import styled from 'styled-components';

const CardWhite = styled.div`
    width: 400px;
    height: 480px;
    background-color: white;
    border-radius: 10px;
    justify-content: center;
    display: flex;

`;

const CardGray = styled.div`
    width: 420px;
    height: 500px;
    background-color: #BCBCBC;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 120px;

    @media (max-width: 400px) {
      background-color: white;
      margin-top: 0px;
    }
    
`;

export { CardWhite, CardGray };