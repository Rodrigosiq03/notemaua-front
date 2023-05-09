import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';

const SnackbarSc = styled(Snackbar)`
  @media (max-width: 450px) {
    padding-bottom: 180px;
  }
`;

export { SnackbarSc };
