import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';

const SnackbarSc = styled(Snackbar)`
  @media (max-width: 450px) {
    padding-bottom: 340px;
  }
  @media (max-height: 1200px) {
    padding-bottom: 320px;
  }
  @media (max-height: 1050px) {
    padding-bottom: 150px;
  }
  @media (max-height: 950px) {
    padding-bottom: 400px;
  }
  @media (max-height: 920px) {
    padding-bottom: 380px;
  }
  @media (max-height: 900px) {
    padding-bottom: 364px;
  }
  @media (max-height: 880px) {
    padding-bottom: 318px;
  }
  @media (max-height: 850px) {
    padding-bottom: 310px;
  }
  @media (max-height: 800px) {
    padding-bottom: 250px;
  }
  @media (max-height: 750px) {
    padding-bottom: 180px;
  }
  @media (max-height: 680px) {
    padding-bottom: 100px;
  }
`;

export { SnackbarSc };
