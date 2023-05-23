import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const FormInput = styled.input`
  margin-bottom: 8px;
  border-radius: 5px;
  width: 240px;
  height: 36px;
  border: none;
  padding-left: 8px;
  background-color: #d6d6d6 !important;
  color: #000;
`;

const FormLabel = styled.label`
  display: inline-block;
  text-align: left;
  font-size: 15px;
  font-weight: 300;
`;

const FormButton = styled.button`
  margin-top: 16px;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  position: relative;
  left: 10%;
  font-size: 20px;
  color: white;
  background-color: #1669b6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: bold;

  &:hover {
    background-color: #0d4a7c;
  }
`;

const FormButtonADM = styled.button`
  width: 200px;
  height: 36px;
  border-radius: 5px;
  position: relative;
  left: 5%;
  font-size: 15px;
  background-color: #00CE3A;
  color: black;
  border: none;
  font-weight: bold;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  &:hover {
    background-color: #00a12e;
    text-decoration: none;
  }

`;

const FormButtonScan = styled.button`
  margin: 0px;
  width: 157px;
  height: 30px;
  border-radius: 5px;
  font-size: 10px;
  color: white;
  background-color: #B3C3FF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: bold;
  position: relative;
  left: 20%;

  &:hover {
    background-color: #1669b6;
  }
`;

export { FormContainer, FormInput, FormLabel, FormButton, FormButtonScan, FormButtonADM };
