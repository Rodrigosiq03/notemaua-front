import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogButtonOK } from '../Dialog';
import { Hind } from 'next/font/google';
import { useRouter } from 'next/navigation';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponent({
  open,
  children,
  handleClose,
}: {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}) {
  const router = useRouter();
  const goToLogin = () => {
    router.push('/');
  };

  return (
    <Dialog
      className={hind.className}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '20px',
          border: '10px solid #D6D6D6',
          marginBottom: '230px',
        },
      }}
    >
      <DialogContent
        sx={{
          '& .MuiDialogContent-root': {
            paddingBottom: '0px',
          },
        }}
      >
        <DialogContentText id="alert-dialog-slide-description">
          {children}
        </DialogContentText>
        <DialogActions>
          <DialogButtonOK onClick={handleClose}>OK</DialogButtonOK>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
