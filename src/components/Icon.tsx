import { styled as styledMUI } from '@mui/system';
import styled from 'styled-components';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButtonMui from '@mui/material/IconButton';
import IIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Button from '@mui/material/Button';
import SearchIconMUI from '@mui/icons-material/Search';
import CircleIconMUI from '@mui/icons-material/Circle';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { text } from 'stream/consumers';


const SearchIcon = styled(SearchIconMUI)({
  color: '#000000',
  fontSize: '24px',
});

const ScanIcon = styled(QrCodeScannerIcon)({
  color: '#000000',
  fontSize: '28px',
});

const ExitIcon = styledMUI(ExitToAppIcon)({
  color: '#545454',
  paddingTop: '2px',
  paddingLeft: '4px',
  fontSize: '20px',
});

const ReturnIcon = styled(LogoutIcon)({
  color: '#545454',
  paddingTop: '2px',
  paddingLeft: '4px',
  fontSize: '20px',
});

const InfoIcon = styled(IIcon)({
  color: '#b4b4b4',
  fontSize: '20px',
  paddingTop: '2px',
});

const InfoButton = styledMUI(IconButtonMui)({
  width: '30px',
});

const TermsButton = styled(Button)({
  background: 'none!important',
  border: 'none',
  padding: '0!important',
  color: '#1669b6',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '700',
  marginTop: '1px',

  '&:hover': {
    textDecoration: 'underline',
  },
});

const CheckCircle = styled(CheckCircleIcon)({
  fontSize: '140px',
  color: '#00b300',
  paddingTop: '10px',
  paddingBottom: '20px',
});

const CircleIconGreen = styled(CircleIconMUI)({
  color: '#08D210',
  fontSize: '16px',
  paddingTop: '4px',
});

const CircleIconRed = styled(CircleIconMUI)({
  color: '#D20808',
  fontSize: '16px',
  paddingTop: '4px',
});

export {
  ExitIcon,
  InfoIcon,
  InfoButton,
  ReturnIcon,
  ScanIcon,
  TermsButton,
  CheckCircle,
  SearchIcon, 
  CircleIconGreen,
  CircleIconRed
};
