import { styled } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButtonMui from '@mui/material/IconButton';
import IIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const Search_Icon = styled(SearchIcon)({
  color: '#000000',
  fontSize: '24px',
});

const ScanIcon = styled(QrCodeScannerIcon)({
  color: '#000000',
  fontSize: '28px',
});

const ExitIcon = styled(ExitToAppIcon)({
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

const InfoButton = styled(IconButtonMui)({
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
  // color: '#00b300',
  // fontSize: '300px',
});

export {
  ExitIcon,
  InfoIcon,
  InfoButton,
  ReturnIcon,
  ScanIcon,
  TermsButton,
  CheckCircle,
  Search_Icon
};
