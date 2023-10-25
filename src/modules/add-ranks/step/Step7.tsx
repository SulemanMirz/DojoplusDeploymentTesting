import React from 'react';
// import { useTranslation } from 'react-i18next';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';

const Step7: React.FC = (): JSX.Element => {
  //   const { t } = useTranslation();
  //   const ChooseYourPath = t('ChooseYourPath');

  return (
    <StepContainer>
      <StepTitle
        title="Your Rank has been sent for verification."
        subTitle='Press "continue" to return to your profile.'
      />
    </StepContainer>
  );
};

export default Step7;
