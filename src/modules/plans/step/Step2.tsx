import * as React from 'react';
import CardPlanDetail from '../components/CardPlanDetail';
import { formatPrice } from '../../../shared/utils/ultils';
import { Product } from '../../../shared/models/school.model';
import { Content } from './Step1';

type StepProps = {
  planes: Product[];
  onSelect: (planId: string) => void;
};

const Step2: React.FC<StepProps> = ({ planes, onSelect }): JSX.Element => {
  return (
    <>
      <Content>
        {planes?.map((value, i) => {
          return (
            <CardPlanDetail
              data={value}
              key={value.planName}
              id={value.recordId}
              index={i}
              name={value.planName}
              amount={formatPrice(value.price, value.currency)}
              term={`/ ${value.frequency}`}
              description={`Setup Fee: ${formatPrice(value.setupFee, value.currency)}`}
              onClick={onSelect}
            />
          );
        })}
      </Content>
    </>
  );
};

export default Step2;
