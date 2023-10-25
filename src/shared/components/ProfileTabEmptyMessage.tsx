import React from 'react';
import styled from 'styled-components';
import { TextWhite18UppercaseRegular } from './texts';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Text = styled(TextWhite18UppercaseRegular)`
  color: #bfbfbf;
`;

type ProfileTabEmptyMessageProps  = {
  value: string;
}

export const ProfileTabEmptyMessage: React.FC<ProfileTabEmptyMessageProps> = ({
  value,
}) => (
  <Container>
    <Text>
      {value}
    </Text>
  </Container>
);
