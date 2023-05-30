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
import { Auth } from 'aws-amplify';
import { useContext } from 'react';
import { WithdrawContext } from '@/contexts/withdraw_provider';
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
  value,
  children,
  handleClose,
}: {
  open: boolean;
  children: React.ReactNode;
  value: string;
  handleClose: () => void;
  
})

  
{
  const { finishWithdraw } = useContext(WithdrawContext);

  const onSubmit = async () => {
    const idToken = await Auth.currentSession().then((response) => {
      return response.getIdToken().getJwtToken();
    });
    const response = (await finishWithdraw(value, idToken)) as any;
    handleClose();
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
        Confirmar Devolução
      </DialogTitle>
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
          <DialogButtonOK
            style={{
              marginTop: '30px',
              color: 'black',
              fontWeight: '700',
              width: '250px',
              height: '100',
            }}
            onClick={onSubmit}
          >
            Confirmar Devolução
          </DialogButtonOK>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
