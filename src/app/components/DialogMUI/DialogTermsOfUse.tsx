import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogButtonOK } from '../Dialog';
import { Hind } from 'next/font/google';
const hind = Hind({ subsets: ['latin'], weight: ['700', '300'] });

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ScrollDialog({
    open,
    children,
    handleClose,
}: { open: boolean; children: React.ReactNode; handleClose: () => void; }) {
    
    const scroll = 'paper';
    
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
  
    return (
        <Dialog
          className={hind.className}
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: '20px',
              border: '10px solid #D6D6D6',
              marginBottom: '20px',
            },
          }}
        >
          <DialogTitle id="scroll-dialog-title" style={{textAlign:"center" }}><strong>Termos De Uso</strong></DialogTitle>
          <DialogContent dividers={scroll === 'paper'}
            sx={{
                '& .MuiDialogContent-root': {
                  paddingBottom: '0px',
                },
              }}
          >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <DialogButtonOK onClick={handleClose}>Aceitar</DialogButtonOK>
          </DialogActions>
        </Dialog>
    );
  }