import React from 'react';
import styled from 'styled-components';
import { TextWhite14CapitalizeThin } from '../../../shared/components/texts';

export const Text = styled.div`
  min-height: 50px;
`;

type BiographyProps = {
  value?: string;
};

export const Biography: React.FC<BiographyProps> = ({ value }) => {
  return (
    <Text>
      <TextWhite14CapitalizeThin>
        {value || 'No biography written yet'}
      </TextWhite14CapitalizeThin>
    </Text>
  );
};

Biography.defaultProps = {
  value: 'No biography written yet',
};
