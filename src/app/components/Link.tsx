import styled from 'styled-components';
import Link from 'next/link';

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: #1669b6;
 

`;

const TextForLink = styled.p`
    margin: 0;
    padding-right: 8px;
`;

export { LinkStyled, TextForLink };