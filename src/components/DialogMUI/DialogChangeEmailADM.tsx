import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogButtonOK } from '../Dialog';
import { Hind } from 'next/font/google';
import { FormContainer } from '../Form';
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
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
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
      <DialogTitle
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '35px',
          marginBottom: '20px',
          marginTop: '20px',
          color: 'black',
        }}
      >
        Troque seu e-mail
      </DialogTitle>
      <DialogContent
        sx={{
          '& .MuiDialogContent-root': {
            paddingBottom: '0px',
          },
        }}
      >
        <FormContainer></FormContainer>
        <DialogActions>
          <DialogButtonOK
            style={{
              marginTop: '30px',
              color: 'black',
              fontWeight: '700',
              width: '250px',
              height: '100',
              margin: '0 auto',
            }}
            onClick={() => null}
          >
            Confirmar
          </DialogButtonOK>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}