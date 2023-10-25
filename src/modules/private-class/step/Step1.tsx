import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  PrivateClassItem,
  PrivateClassList,
} from '../components/PrivateClassList';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';
import { PrivateClassDivider } from '../components/PrivateClassDivider';
import { SchoolSchedules } from '../../../shared/models/school.model';

type StepProps = {
  data: SchoolSchedules[];
  setSelected: (value: number) => void;
  selected: number;
};

const Step1: React.FC<StepProps> = ({
  data,
  setSelected,
  selected,
}): JSX.Element => {
  const [images, setImages] = useState<Record<string, string>>({});

  const { t } = useTranslation();
  const SelectLocation = t('SelectLocation');

  useEffect(() => {
    if (data) {
      setImages(() => {
        const temp = {};
        data.forEach((e) => {
          if (e.schoolLogo && e.schoolLogo[0]?.url) {
            Object.assign(temp, {
              [e.id]: e.schoolLogo[0]?.url,
            });
          }
        });
        return temp;
      });
    }
  }, [data]);

  return (
    <StepContainer>
      <StepTitle title={SelectLocation} />
      <PrivateClassDivider />
      <PrivateClassList>
        {data.map((value, i) => (
          <PrivateClassItem
            onSelect={setSelected}
            index={i}
            current={selected}
            src={images[value.id] || '/assets/logo/dojo.png'}
            name={value.schoolName}
            location={`${value.city} , ${value.state}`}
            id={value.id}
            key={value.id}
          />
        ))}
      </PrivateClassList>
    </StepContainer>
  );
};

export default Step1;
