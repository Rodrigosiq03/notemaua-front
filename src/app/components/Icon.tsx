import { styled as styledMUI } from '@mui/system';
import styled from 'styled-components';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButtonMui from '@mui/material/IconButton';
import IIcon from '@mui/icons-material/Info';

const ExitIcon = styledMUI(ExitToAppIcon)({
  color: '#545454',
  paddingTop: '2px',
  paddingLeft: '4px',
  fontSize: '20px',
});

const InfoIcon = styledMUI(IIcon)({
  color: '#b4b4b4',
  fontSize: '20px',
  paddingTop: '2px',
});

const InfoButton = styledMUI(IconButtonMui)({
  width: '30px',
});

export { ExitIcon, InfoIcon, InfoButton };
