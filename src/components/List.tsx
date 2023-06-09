import styled from 'styled-components';

const ListNumSerie = styled.ul`
  list-style: none;
  text-align: center;
  padding-left: 20px;
  margin-top: 20px;
  overflow-y: scroll;
  width: 96%;
  height: 60%;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #d6d6d6;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bcbcbc;
    border-radius: 5px;
  }
`;
const ListItemLeft = styled.li`
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 35px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  width: 160px;
`;

const ListItemRight = styled.li`
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 35px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  width: 1400px;
  justify-content: space-around;
  margin-left: 100px;
  font-weight: 300;
`;

export { ListNumSerie, ListItemLeft, ListItemRight };
