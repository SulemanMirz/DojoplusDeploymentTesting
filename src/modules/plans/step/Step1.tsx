import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import CardPlan from '../components/CardPlan';
import { EmptyViewAlert } from '../../../shared/components/EmptyViewAlert';
import { PlansCategories } from '../../../shared/models/school.model';

export const Content = styled(Box)`
  padding-top: 2rem;
  padding-inline: 16px;
`;

type StepProps = {
  data: Array<PlansCategories>;
  setSelected: (selected: string) => void | undefined;
};

const Step1: React.FC<StepProps> = (props): JSX.Element => {
  const { data, setSelected } = props;

  if (data && data.length === 0) {
    return <EmptyViewAlert msg="Plans not found" />;
  }
  return (
    <>
      <Content>
        {data.map((value) => {
          return (
            <CardPlan
              name={value.name}
              description={value.notes}
              key={value.id}
              setSelected={setSelected}
              id={value.recordId}
            />
          );
        })}
      </Content>
    </>
  );
};
export default Step1;
