import React from 'react';
import styled from 'styled-components';

import {
  TextWhite24CapitalizeBold,
  TextWhite14CapitalizeRegular,
} from '../../../shared/components/texts';

const Container = styled.div`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled(TextWhite24CapitalizeBold)`
  white-space: pre-wrap;
`;

const SubTitle = styled(TextWhite14CapitalizeRegular)`
  white-space: pre-wrap;
  margin-top: 12px;
`;

type StepTitleProps = {
  title: string;
  subTitle?: string;
};

export const StepTitle: React.FC<StepTitleProps> = ({ title, subTitle }) => (
  <Container>
    <Title>{title}</Title>
    {subTitle && <SubTitle>{title}</SubTitle>}
  </Container>
);
