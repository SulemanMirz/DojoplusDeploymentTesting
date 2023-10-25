import React, { useState, useRef } from 'react';

import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';

import { Toastify, RefType } from '../../shared/components/Tosatify';

const Register: React.FC = () => {
  const errorAlert = useRef<RefType>(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [recordId, setRecordId] = useState('');

  const onChangeStep = ({
    _step,
    emailParam,
    usernameParam,
    recordIdParam,
  }: {
    _step: number;
    emailParam: string | null | undefined;
    usernameParam: string | null | undefined;
    recordIdParam: string;
  }): void => {
    if (_step === 2) {
      setEmail(emailParam);
      setUsername(usernameParam);
      setRecordId(recordIdParam);
    }
    setStep(_step);
  };

  return (
    <>
      <Toastify
        ref={errorAlert}
        type="error"
        message="You have to select an option"
      />
      {step === 1 ? <Step1 onChangeStep={onChangeStep} /> : null}
      {step === 2 ? (
        <Step2 email={email} username={username} onChangeStep={onChangeStep} />
      ) : null}
      {step === 3 ? <Step3 emailParam={email} recordId={recordId} /> : null}
    </>
  );
};

export default Register;
