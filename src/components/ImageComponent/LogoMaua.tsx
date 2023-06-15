import { ImageLogoMaua } from '../Image';
import logoMaua from 'public/images/logoMaua.svg';

export default function ImageComponentMaua({
  style,
}: {
  style?: React.CSSProperties;
}) {
  return <ImageLogoMaua style={style} src={logoMaua} alt="logo_maua" />;
}
