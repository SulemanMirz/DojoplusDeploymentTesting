import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import Step1 from './step/step1';
import Step2 from './step/step2';

import { ProgressBar } from '../../private-class/components/ProgressBar';
import { SeminarLayout } from '../components/SeminarLayout';
import { Toastify, RefType } from '../../../shared/components/Tosatify';
import { Seminar } from '../../../shared/models/Seminar.model';

type SeminarsProps = {
  data: Seminar;
};

export const Checkout: React.FC<SeminarsProps> = ({ data }) => {
  const router = useRouter();
  const { username } = router.query;
  const errorAlert = useRef<RefType>(null);
  const [step, setStep] = useState(1);
  const [tickets, setTickets] = useState({
    members: 0,
    nonMembers: 0,
  });

  const formatedDate = data?.startDate
    ? dayjs(data.startDate).format('dddd, MMMM D, YYYY')
    : '';
  const formatedStartTime = data?.startDate
    ? dayjs(data.startDate).format('hh:mm')
    : '';
  const formatedEndTime = data?.endDate
    ? dayjs(data.endDate).format('hh:mm')
    : '';

  const onTicketChange = (name, value): void => {
    setTickets((prevVal) => ({ ...prevVal, [name]: value }));
  };
  const onChangeStep = useCallback(
    (_step: number) => {
      if (step === 2 && (tickets.members === 0 || tickets.nonMembers === 0)) {
        errorAlert.current.call();
        return;
      }
      setStep(_step);
    },
    [step, tickets],
  );

  const onCloseModal = useCallback(() => {
    router.push(`/${username}/seminars`);
  }, [router, username]);

  return (
    <SeminarLayout onPressBack={onCloseModal} title={data.eventTitle}>
      <Toastify
        ref={errorAlert}
        type="error"
        message="You have to select an option"
      />
      <ProgressBar step={step * 3.3 * 10} />
      {step === 1 ? (
        <Step1
          membersPrice={data.priceMembers}
          nonMembersPrice={data.priceNonMembers}
          currency={data.currency}
          tickets={tickets}
          onTicketChange={onTicketChange}
          onChangeStep={onChangeStep}
        />
      ) : null}
      {step === 2 ? (
        <Step2
          date={formatedDate}
          time={`${formatedStartTime || ''} → ${formatedEndTime || ''}`}
          address={data?.address ? data?.address?.split('\\n').join(' ') : ''}
          data={data}
          tickets={tickets}
        />
      ) : null}
    </SeminarLayout>
  );
};
