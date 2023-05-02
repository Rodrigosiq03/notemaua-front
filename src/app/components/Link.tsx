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

const ReturnLink = styled(Link)`
    color: #545454;
    font-weight: 700;
    text-decoration: none;
`

export { LinkStyled, TextForLink, ReturnLink };