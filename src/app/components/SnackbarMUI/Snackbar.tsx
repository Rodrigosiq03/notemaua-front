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
  children,
  horizontal,
  vertical,
  style,
}: {
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'bottom';
  style: React.CSSProperties;
}) {
  return (
    <SnackbarSc
      style={style}
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
        {children}
      </Alert>
    </SnackbarSc>
  );
}
