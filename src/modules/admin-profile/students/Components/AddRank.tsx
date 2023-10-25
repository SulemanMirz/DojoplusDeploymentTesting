import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Step1 from '../../../add-ranks/step/Step1';
import Step2 from '../../../add-ranks/step/Step2';
import Step4 from '../../../add-ranks/step/Step4';
import Step5 from '../../../add-ranks/step/Step5';
import Step6 from '../../../add-ranks/step/Step6';
import Step7 from '../../../add-ranks/step/Step7';
import { Footer } from '../../../add-ranks/components/Footer';
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_BELT_URL,
} from '../../../../shared/utils/ultils';
import { Plans } from '../../../../shared/models/school.model';
import { useFireBaseAuth } from '../../../../context/FirebaseContext';

type AddRankProps = {
  studentData?: Plans;
  handleAddRank?: () => void;
  getRanks: () => void;
};

export const AddRank: React.FC<AddRankProps> = ({
  studentData,
  handleAddRank,
  getRanks,
}) => {
  const { schoolInfo } = useFireBaseAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [selectedBelt, setSelectedBelt] = useState(null);
  const [allBelts, setAllBelts] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const [certificateImage, setCertificateImgae] = useState([]);
  const [moreRankImages, setMoreRankImages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [martialArtData, setMartialArtData] = useState();
  const [martialArtLoading, setMartialArtLoading] = useState(false);

  const ranksData = (): void => {
    setMartialArtLoading(true);
    axios('/api/Rank', {
      params: {
        params: 'MartialArts',
      },
    })
      .then((res) => {
        setMartialArtData(res.data);
        setMartialArtLoading(false);
      })
      .catch(() => {
        setMartialArtLoading(false);
      });
  };

  useEffect(() => {
    ranksData();
  }, []);

  useEffect(() => {
    if (step === 1 && selected !== null) {
      setDisabled(false);
      return;
    }
    if (step === 2 && selectedBelt !== null) {
      setDisabled(false);
      return;
    }
    if (step === 3 && selectedInstructor !== null) {
      setDisabled(false);
      return;
    }
    if (step === 4 && selectedDate !== null) {
      setDisabled(false);
      return;
    }
    if (step === 5 || step === 6) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [selected, selectedBelt, selectedInstructor, step, selectedDate]);

  useEffect(() => {
    setAllBelts(null);
  }, [selected, martialArtData]);

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
              username: studentData?.usernameFromProfile?.[0],
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
          schoolInfo?.slug
            ? axios('/api/Rank', {
              params: {
                slug: schoolInfo?.slug,
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
                  studentName: studentData?.displayNameFromProfile?.[0],
                  studentEmail: studentData?.emailFromProfile?.[0],
                  studentPhone: studentData?.phoneNumber || '',
                  studentImage:
                    studentData?.photoFromProfile?.[0]?.url ||
                    DEFAULT_AVATAR_URL,
                  beltImage:
                    selectedBelt?.rankImageBig?.[0]?.url || DEFAULT_BELT_URL,
                  certificateTitle: selected?.martialArt,
                  beltInfo: selectedBelt?.level,
                  schoolName: schoolInfo?.schoolName,
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
                handleAddRank();
                getRanks();
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
      studentData?.usernameFromProfile,
      studentData?.displayNameFromProfile,
      studentData?.emailFromProfile,
      studentData?.phoneNumber,
      studentData?.photoFromProfile,
      selectedInstructor?.username,
      selectedInstructor?.email,
      schoolInfo?.slug,
      schoolInfo?.schoolName,
      selectedDate,
      selectedBelt?.id,
      selectedBelt?.rankImageBig,
      selectedBelt?.level,
      certificateImage,
      moreRankImages,
      selected?.martialArt,
      handleAddRank,
      getRanks,
    ],
  );

  const onClickSkip = useCallback(
    (_step: number) => {
      if (step === 2) setSelectedBelt(null);
      if (step === 4) setSelectedInstructor(null);
      if (step === 5) setSelectedDate(null);
      setStep(_step);
    },
    [step],
  );

  return (
    <>
      {step === 1 && (
        <Step1
          isLoading={martialArtLoading}
          data={martialArtData}
          setSelected={setSelected}
          selected={selected}
          style={{
            marginTop: '0px',
          }}
        />
      )}
      {step === 2 && (
        <Step2
          setSelectedBelt={setSelectedBelt}
          selected={selected}
          selectedBelt={selectedBelt}
          allBelts={allBelts}
          setAllBelts={setAllBelts}
          style={{
            marginTop: '0px',
          }}
        />
      )}
      {step === 3 && (
        <Step4
          selectedSchool={schoolInfo}
          selectedInstructor={selectedInstructor}
          setSelectedInstructor={setSelectedInstructor}
          style={{
            marginTop: '65px',
          }}
          searchBarContainerStyle={{ position: 'absolute', top: 0 }}
        />
      )}
      {step === 4 && (
        <Step5 style={{ marginTop: '10px' }} setSelected={setSelectedDate} />
      )}
      {step === 5 && (
        <Step6
          setCertificate={setCertificateImgae}
          setMoreRankImages={setMoreRankImages}
          style={{ marginTop: '0px' }}
          containerStyle={{ height: 'calc(100vh - 150px)' }}
        />
      )}
      {step === 6 && <Step7 />}
      <Footer
        step={step}
        onChange={onChangeStep}
        disabled={disabled}
        onClickSkip={onClickSkip}
        loading={loading}
        handleAddRank={handleAddRank}
      />
    </>
  );
};
