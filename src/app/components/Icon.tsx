import { styled } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButtonMui from '@mui/material/IconButton';
import IIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

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

export { ExitIcon, InfoIcon, InfoButton, ReturnIcon, ScanIcon };
