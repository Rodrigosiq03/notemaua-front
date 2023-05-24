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
  left: 2%;
  font-size: 15px;
  background-color: #00ce3a;
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
  background-color: #b3c3ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: bold;
  position: relative;
  left: 20%;

  &:hover {
    background-color: #1669b6;
  }
`;

const FormSelect = styled.select`
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  margin-left: 15px;
`;

const FormButtonSearch = styled.button`
  width: 40px;
  height: 30px;
  margin-left: 8px;
  border: none;
  background-color: white;
`;

export {
  FormContainer,
  FormInput,
  FormLabel,
  FormButton,
  FormButtonScan,
  FormButtonADM,
  FormSelect,
  FormButtonSearch,
};