import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import Step4 from './step/Step4';
import Step5 from './step/Step5';
import Step6 from './step/Step6';
import Step7 from './step/Step7';
import { Footer } from './components/Footer';
import { AddRankLayout } from './components/AddRankLayout';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_BELT_URL,
} from '../../shared/utils/ultils';
import { PrivateClasses, User } from '../../shared/models/user.model';
import { SchoolSchedules } from '../../shared/models/school.model';

type AddRankProps = {
  data: {
    classesList: PrivateClasses[];
    schoolsList: SchoolSchedules[];
    profile: User;
  };
};

export const AddRank: React.FC<AddRankProps> = ({ data }) => {
  const router = useRouter();
  const { authUser } = useFirebaseAuth();
  const userInfo = authUser?.userInfo;
  const { username } = router.query;
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [selectedBelt, setSelectedBelt] = useState(null);
  const [allBelts, setAllBelts] = useState(null);
  const [allSchools, setAllSchools] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const [certificateImage, setCertificateImgae] = useState([]);
  const [moreRankImages, setMoreRankImages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState('');

  const { t } = useTranslation();
  const SelectMartailArtsText = t('SelectMartailArts');
  const SelectRankText = t('SelectRank');
  const SelectSchoolText = t('SelectSchool');
  const SelectMasterText = t('SelectMaster');
  const SelectdateText = t('Selectdate');
  const UploadCertificateText = t('UploadCertificate');

  useEffect(() => {
    if (step === 1 && selected !== null) {
      setDisabled(false);
      return;
    }
    if (step === 2 && selectedBelt !== null) {
      setDisabled(false);
      return;
    }
    if (step === 3 && selectedSchool !== null) {
      setDisabled(false);
      return;
    }
    if (step === 4 && selectedInstructor !== null) {
      setDisabled(false);
      return;
    }
    if (step === 5 && selectedDate !== null) {
      setDisabled(false);
      return;
    }
    if (step === 6 || step === 7) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [
    selected,
    selectedBelt,
    selectedSchool,
    selectedInstructor,
    step,
    selectedDate,
  ]);

  useEffect(() => {
    if (step === 1) {
      setTitle(SelectMartailArtsText);
      return;
    }
    if (step === 2) {
      setTitle(SelectRankText);
      return;
    }
    if (step === 3) {
      setTitle(SelectSchoolText);
      return;
    }
    if (step === 4) {
      setTitle(SelectMasterText);
      return;
    }
    if (step === 5) {
      setTitle(SelectdateText);
      return;
    }
    if (step === 6) {
      setTitle(UploadCertificateText);
      return;
    }
    if (step === 7) {
      setTitle('Add Rank Procedure Completed!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, SelectMartailArtsText]);

  useEffect(() => {
    setAllBelts(null);
    setAllSchools(null);
  }, [selected, data]);

  const onChangeStep = useCallback(
    (_step: number) => {
      if (_step === 7) {
        const requests = [];
        let usernameId;
        let masterId;
        let schoolId;

        setLoading(true);
        requests.push(
          axios('/api/Rank', {
            params: {
              username: userInfo?.username,
              getUser: true,
            },
          }),
        );
        requests.push(
          selectedInstructor?.username
            ? axios('/api/Rank', {
              params: {
                username: selectedInstructor?.username,
                getUser: true,
              },
            })
            : new Promise((res) => res([])),
        );
        requests.push(
          selectedSchool?.slug
            ? axios('/api/Rank', {
              params: {
                slug: selectedSchool?.slug,
              },
            })
            : new Promise((res) => res([])),
        );

        Promise.all(requests)
          .then((res) => {
            usernameId = res[0]?.data?.[0]?.id;
            masterId = res[1]?.data?.[0]?.id;
            schoolId = res[2]?.data?.[0]?.id;
            axios
              .post('/api/Rank', {
                rankData: {
                  Username: [usernameId],
                  ...(selectedDate && {
                    Graduated: selectedDate.toISOString().split('T')[0],
                  }),
                  ...(selectedBelt?.id && { Rank: [selectedBelt?.id] }),
                  ...(schoolId && { School: [schoolId] }),
                  Certificate: certificateImage,
                  Photos: moreRankImages,
                  ...(masterId && { Master: [masterId] }),
                },
                templateModel: {
                  notificationInfo: 'Check a student\'s certificate.',
                  studentName: userInfo?.displayName,
                  studentEmail: userInfo?.email,
                  studentPhone: userInfo?.phone || '',
                  studentImage: userInfo?.photo?.[0]?.url || DEFAULT_AVATAR_URL,
                  beltImage:
                    selectedBelt?.rankImageBig?.[0]?.url || DEFAULT_BELT_URL,
                  certificateTitle: selected?.martialArt,
                  beltInfo: selectedBelt?.level,
                  schoolName: selectedSchool?.schoolName,
                  certificateDate:
                    selectedDate?.toLocaleDateString('en-us', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }) || '',
                  baseUrl: window?.location?.origin,
                },
                masterEmail: selectedInstructor?.email,
              })
              .then(() => {
                setLoading(false);
                setStep(_step);
              })
              .catch((e) => {
                setLoading(false);
                console.log(e, 'err post');
              });
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
          });
        return;
      }
      setStep(_step);
    },
    [
      certificateImage,
      moreRankImages,
      selected?.martialArt,
      selectedBelt?.id,
      selectedBelt?.level,
      selectedBelt?.rankImageBig,
      selectedDate,
      selectedInstructor?.email,
      selectedInstructor?.username,
      selectedSchool?.schoolName,
      selectedSchool?.slug,
      userInfo?.displayName,
      userInfo?.email,
      userInfo?.phone,
      userInfo?.photo,
      userInfo?.username,
    ],
  );

  const onClickSkip = useCallback(
    (_step: number) => {
      if (step === 2) setSelectedBelt(null);
      if (step === 3) setSelectedSchool(null);
      if (step === 4) setSelectedInstructor(null);
      if (step === 5) setSelectedDate(null);
      setStep(_step);
    },
    [step],
  );

  const onCloseModal = useCallback(() => {
    router.push(`/${username}/`);
  }, [username, router]);

  return (
    <AddRankLayout title={title} onPressBack={onCloseModal}>
      {step === 1 && (
        <Step1 data={data} setSelected={setSelected} selected={selected} />
      )}
      {step === 2 && (
        <Step2
          setSelectedBelt={setSelectedBelt}
          selected={selected}
          selectedBelt={selectedBelt}
          allBelts={allBelts}
          setAllBelts={setAllBelts}
        />
      )}
      {step === 3 && (
        <Step3
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
          martialArts={selected?.martialArt}
          allSchools={allSchools}
          setAllSchools={setAllSchools}
        />
      )}
      {step === 4 && (
        <Step4
          selectedSchool={selectedSchool}
          selectedInstructor={selectedInstructor}
          setSelectedInstructor={setSelectedInstructor}
        />
      )}
      {step === 5 && <Step5 setSelected={setSelectedDate} />}
      {step === 6 && (
        <Step6
          setCertificate={setCertificateImgae}
          setMoreRankImages={setMoreRankImages}
        />
      )}
      {step === 7 && <Step7 />}
      <Footer
        step={step}
        onChange={onChangeStep}
        disabled={disabled}
        onClickSkip={onClickSkip}
        loading={loading}
      />
    </AddRankLayout>
  );
};
