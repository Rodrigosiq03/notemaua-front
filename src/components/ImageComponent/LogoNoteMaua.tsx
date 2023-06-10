import { ImageLogoNoteMaua } from '../Image';
import logoNoteMaua from 'public/images/logoNoteMaua.svg';

export default function ImageComponentNoteMaua({
  style,
}: {
  style?: React.CSSProperties;
}) {
  return <ImageLogoNoteMaua style={style} src={logoNoteMaua} alt="logo_maua" />;
}
