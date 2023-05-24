import styled from 'styled-components';
import Link from 'next/link';

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #1669b6;
  font-weight: 700;
`;

const TextForLink = styled.p`
  margin: 0;
  padding-right: 8px;
  font-weight: 700;
`;

const ReturnLink = styled(Link)`
  color: #545454;
  font-weight: 700;
  text-decoration: none;
  padding-bottom: 10px;
`;

export { LinkStyled, TextForLink, ReturnLink };
