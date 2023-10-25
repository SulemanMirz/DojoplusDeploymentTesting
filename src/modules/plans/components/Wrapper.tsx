import React, { useState, useMemo, useCallback } from 'react';
import Step1 from '../step/Step1';
import Step2 from '../step/Step2';
import Step3 from '../step/Step3';
import { Product, SchoolSchedules } from '../../../shared/models/school.model';

interface Plans extends SchoolSchedules {
  plans: Product[];
}

interface WrapperProps {
  data: Plans;
}

const Wrapper: React.FC<WrapperProps> = ({ data }): JSX.Element => {
  const currentPlans = useMemo(() => data?.plans || [], [data]);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('');
  const [productSelected, setProductSelected] = useState<Product>();

  const onSelectPlanCategory = useCallback((id: string) => {
    setSelected(id);
    setStep(2);
  }, []);

  const onSelectPlan = useCallback(
    (planId: string) => {
      const selectedPlan = currentPlans.find(
        (plan) => plan.recordId === planId,
      );
      if (selectedPlan) {
        setProductSelected(selectedPlan as Product);
        setStep(3);
      }
    },
    [currentPlans],
  );

  return (
    <>
      {step === 1 ? (
        <Step1 data={data.plansCategories} setSelected={onSelectPlanCategory} />
      ) : null}
      {step === 2 ? (
        <Step2
          planes={data.plans.filter(
            (plan) => plan.category?.recordId === selected,
          )}
          onSelect={onSelectPlan}
        />
      ) : null}
      {step === 3 ? (
        <Step3 plan={productSelected} school={data as SchoolSchedules} />
      ) : null}
    </>
  );
};

export default Wrapper;
