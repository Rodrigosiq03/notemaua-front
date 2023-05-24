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
  background-color: #bcbcbc;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;

  @media (max-width: 450px) {
    background-color: white;
    margin-top: 0px;
  }
`;

const CardGrayADM = styled.div`
  width: 1780px;
  height: 710px;
  background-color: #bcbcbc;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 1550px) {
    width: 1420px;
    height: 500px;
  }
`;

const CardWhiteADM = styled.div`
  width: 1760px;
  height: 690px;
  background-color: white;
  border-radius: 10px;
  display: flex;

  @media (max-width: 1550px) {
    width: 1400px;
    height: 480px;
  }
`;

const CardADM = styled.div`
  width: 1760px;
  height: 680px;
  background-color: none;
  border: none;

  @media (max-width: 1550px) {
    width: 1400px;
    height: 480px;
  }
`;

export { CardWhite, CardGray, CardGrayADM, CardWhiteADM, CardADM };
