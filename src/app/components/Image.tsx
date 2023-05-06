import styled from "styled-components";
import Image from "next/image";

const ImageLogoMaua = styled(Image)`
  width: 180px;
  padding-top: 24px;

  @media (max-width: 450px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  @media (max-width: 380px) {
    padding-top: 38px;
  }
`;

const ImageLogoNoteMaua = styled(Image)`
  width: 250px;
`;

export { ImageLogoMaua, ImageLogoNoteMaua };
