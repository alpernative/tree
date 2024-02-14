import styled from '@emotion/styled';
import Image from 'next/image';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 25px;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const StyledTreeText = styled.span`
  color: #255ce8;
  padding-left: 8px;
`;

export default {
  logo: (
    <StyledLogo>
      <StyledImage src="/logo.png" width={40} height={40} />
      <span>Alper Native</span>
      <StyledTreeText>Tree</StyledTreeText>
    </StyledLogo>
  ),
  docsRepositoryBase: 'https://github.com/alpernative/tree/tree/master/website',
  project: {
    link: 'https://github.com/alpernative/tree',
  },
  // ... other theme options
};
