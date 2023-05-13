import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';

const SnackbarSc = styled(Snackbar)`
  @media (max-width: 450px) {
    padding-bottom: 350px;
  }
  @media (max-height: 1200px) {
    padding-bottom: 320px;
  }
  @media (max-height: 950px) {
    padding-bottom: 400px;
  }
  @media (max-height: 900px) {
    padding-bottom: 380px;
  }
  @media (max-height: 880px) {
    padding-bottom: 338px;
  }
  @media (max-height: 850px) {
    padding-bottom: 330px;
  }
  @media (max-height: 750px) {
    padding-bottom: 200px;
  }
  @media (max-height: 680px) {
    padding-bottom: 130px;
  }
`;

export { SnackbarSc };
