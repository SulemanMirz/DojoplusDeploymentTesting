import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import Step4 from './step/Step4';
import Step5 from './step/Step5';
import { ProgressBar } from './components/ProgressBar';
import { Footer } from './components/Footer';
import { PrivateClassLayout } from './components/PrivateClassLayout';
import { Toastify, RefType } from '../../shared/components/Tosatify';
import { PrivateClasses, User } from '../../shared/models/user.model';
import { SchoolSchedules } from '../../shared/models/school.model';
import { Days } from '../../shared/constants';
import {
  getSameClasseswithExistingDay,
  getSameClasseswithExistingSlot,
} from '../../shared/utils/private-class-utils';

type PrivateClassProps = {
  data: {
    classesList: PrivateClasses[];
    schoolsList: SchoolSchedules[];
    profile: User;
  };
};

export const PrivateClass: React.FC<PrivateClassProps> = ({ data }) => {
  const router = useRouter();
  const { username } = router.query;
  const errorAlert = useRef<RefType>(null);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [selectedPrivate, setSelectedPrivate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (data.schoolsList[selected])
      setSelectedPrivate(
        data.classesList.filter(
          (list) =>
            data.schoolsList[selected]?.schoolName ===
            list.schoolNameFromSchool[0],
        ),
      );
  }, [data.classesList, data.schoolsList, selected]);

  useEffect(() => {
    if (selectedPrivate && selectedPrivate[selectedPlan]) {
      setPlan(selectedPrivate[selectedPlan]);
    }
  }, [selectedPlan, selectedPrivate]);

  const onChangeStep = useCallback(
    (_step: number) => {
      if (step === 1 && selected === null) {
        errorAlert.current.call();
        return;
      }
      if (step === 2 && selectedPlan === null) {
        errorAlert.current.call();
        return;
      }
      if (step === 3 && selectedDate === null) {
        errorAlert.current.call();
        return;
      }
      if (
        step === 4 &&
        (selectedTime === null || selectedTime === 'Invalid date')
      ) {
        errorAlert.current.call();
        return;
      }
      setStep(_step);
    },
    [step, selected, selectedPlan, selectedDate, selectedTime],
  );

  const onClickBack = useCallback((_step: number) => {
    setStep(_step);
  }, []);

  const onCloseModal = useCallback(() => {
    router.push(`/${username}/`);
  }, [username, router]);

  return (
    <PrivateClassLayout onPressBack={onCloseModal}>
      <Toastify
        ref={errorAlert}
        type="error"
        message="You have to select an option"
      />
      <ProgressBar step={step * 1.8 * 10} />
      {step === 1 ? (
        <Step1
          data={data.schoolsList}
          setSelected={setSelected}
          selected={selected}
        />
      ) : null}
      {step === 2 ? (
        <Step2
          schoolLogo={
            data.schoolsList[selected]?.schoolLogo
              ? data.schoolsList[selected]?.schoolLogo[0]?.url
              : ''
          }
          selectedPrivate={selectedPrivate}
          setSelected={setSelectedPlan}
          selected={selectedPlan}
        />
      ) : null}
      {step === 3 ? (
        <Step3
          data={plan}
          classes={selectedPrivate}
          setSelected={setSelectedDate}
        />
      ) : null}
      {step === 4 ? (
        <Step4
          date={selectedDate}
          setSelected={setSelectedTime}
          timeZone="Eastern Time Zone (EDT)"
          data={plan}
          classes={getSameClasseswithExistingDay(
            selectedPrivate,
            plan,
            Days[dayjs(selectedDate).get('d')],
          )}
        />
      ) : null}
      {step === 5 ? (
        <Step5
          data={getSameClasseswithExistingSlot(
            selectedPrivate,
            plan,
            Days[dayjs(selectedDate).get('d')],
            parseInt(dayjs(selectedTime).format('HH')) * 3600,
          )}
          instructor={data.profile}
          address={data.schoolsList[selected]?.address1}
          city={data.schoolsList[selected]?.city}
          state={data.schoolsList[selected]?.state}
          selectedTime={selectedTime}
        />
      ) : null}
      {step !== 5 && (
        <Footer step={step} onChange={onChangeStep} onClickBack={onClickBack} />
      )}
    </PrivateClassLayout>
  );
};
