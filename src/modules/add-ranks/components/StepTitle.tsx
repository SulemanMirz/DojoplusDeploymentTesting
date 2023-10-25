import React from 'react';
import styled from 'styled-components';

import {
  TextWhite24CapitalizeBold,
  TextWhite14CapitalizeThin,
} from '../../../shared/components/texts';

const Container = styled.div`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const Title = styled(TextWhite24CapitalizeBold)`
  white-space: pre-wrap;
  font-weight: 600;
`;

const SubTitle = styled(TextWhite14CapitalizeThin)`
  white-space: pre-wrap;
  margin-top: 12px;
`;

type StepTitleProps = {
  title: string;
  subTitle?: string;
  style?: React.CSSProperties;
};

export const StepTitle: React.FC<StepTitleProps> = ({
  title,
  subTitle,
  style,
}) => (
  <Container
    style={{
      ...style,
    }}
  >
    <Title>{title}</Title>
    {subTitle && <SubTitle>{subTitle}</SubTitle>}
  </Container>
);
