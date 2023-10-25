import React from 'react';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '../../../shared/utils/ultils';
import { StepTitle } from '../components/StepTitle';
import { PrivateClassDivider } from '../components/PrivateClassDivider';

import {
  PrivateClassItem,
  PrivateClassList,
} from '../components/PrivateClassList';
import { StepContainer } from '../components/StepContainer';
import { PrivateClasses } from '../../../shared/models/user.model';
import { getUniqueClasses } from '../../../shared/utils/private-class-utils';

type StepProps = {
  schoolLogo: string;
  selectedPrivate: PrivateClasses[];
  setSelected: (value: number) => void;
  selected: number;
};

const Step2: React.FC<StepProps> = ({
  schoolLogo,
  selectedPrivate,
  setSelected,
  selected,
}): JSX.Element => {
  const { t } = useTranslation();
  const SelectAppointment = t('SelectAppointment');

  return (
    <StepContainer>
      <StepTitle title={SelectAppointment} />
      <PrivateClassDivider />
      <PrivateClassList>
        {selectedPrivate.map((value, i) => {
          if (getUniqueClasses(selectedPrivate, value, i)) return null;
          return value.active ? (
            <PrivateClassItem
              onSelect={setSelected}
              index={i}
              current={selected}
              src={schoolLogo || '/assets/logo/dojo.png'}
              name={value.className}
              location={`${formatPrice(value.classPrice, value.currency)} • ${
                value.duration
              } minutes`}
              id={String(value.id)}
              key={value.id}
              avatarReq={false}
            />
          ) : null;
        })}
      </PrivateClassList>
    </StepContainer>
  );
};

export default Step2;
