import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackbarSc } from '../Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent({
  handleClose,
  open,
  message,
  horizontal,
  vertical,
}: {
  handleClose: () => void;
  open: boolean;
  message: string;
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'bottom';
}) {
  return (
    <SnackbarSc
      open={open}
      autoHideDuration={300000}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: '80%', color: 'white' }}
      >
        {message}
      </Alert>
    </SnackbarSc>
  );
}
