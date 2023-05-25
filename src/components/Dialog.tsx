import styled from 'styled-components';

const DialogButtonOK = styled.button`
  width: 200px;
  height: 30px;
  background-color: #00ce3a;
  color: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
`;

const DialogButtonResend = styled.button`
  width: 200px;
  height: 30px;
  background-color: #1669b6;
  color: white;
  border: none;
  border-radius: 12px;
`;

const DialogText = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 0px;
  color: black;
`;

export { DialogButtonOK, DialogButtonResend, DialogText };
