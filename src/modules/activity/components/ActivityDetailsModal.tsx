import React from 'react';
import Head from 'next/head';
import { Button } from '@mui/material';

import { Section } from '../../../shared/components/layout/Section';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import {
  Avatar,
  AvatarConatiner,
  Item,
  Svg,
} from '../../check-ins/components/checkin.styled';
import UserAvatar from '../../userAvatar';
import { wideButtonStyles } from '../../../shared/styles/Button-style';
import {
  ButtonText,
  ClassText,
  MartialArtsText,
  MasterNameText,
  PairContainer,
  RedBar,
  ScheduleTime,
  SchoolNameText,
  TextTime,
} from './styled.activty';
import { Textarea } from '../../../shared/components/Input';
import UploadMedia from '../../../shared/components/UploadMedia';
import { CheckIns } from '../../../shared/models/CheckIns';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setNotes,
  useActivityNotes,
  useActivityImages,
  setActivityImages,
  useActivityVideos,
  setActivityVideos,
} from '../../../redux/slices/checkInsSlice';
import { updateCheckIns } from '../../../redux/thunk/checkIns';

type PickClassProps = {
  data: CheckIns;
  title?: string;
  handleModal: () => void;
};

export const ActivityDetailsModal: React.FC<PickClassProps> = ({
  data,
  title,
  handleModal,
}) => {
  const dispatch = useAppDispatch();
  const noteText = useActivityNotes(data?.id);
  const imagesArray = useActivityImages(data?.id);
  const schoolLogo = data?.schoolDetails?.schoolLogo?.[0]?.url;
  const defaultSchoolLogo = '/assets/logo/dojo.png';
  const classDuration = parseInt(data.classDurationFromClassId) / 60;
  const date = new Date(data.createdTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const videosArray = useActivityVideos(data?.id);

  const handleUpdate: () => void = () => {
    if (
      noteText !== data?.notes ||
      (imagesArray && imagesArray !== data?.images) ||
      (videosArray && videosArray !== data?.videos)
    ) {
      dispatch(
        updateCheckIns({ id: data?.id, noteText, imagesArray, videosArray }),
      );
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Section style={{ overflowY: 'scroll' }}>
        <MainProfile>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 46,
            }}
            notGutters
            isFlexGrow
          >
            <PairContainer>
              <AvatarConatiner>
                <Avatar
                  variant="circular"
                  src={schoolLogo || defaultSchoolLogo}
                />
              </AvatarConatiner>
              <SchoolNameText>{data?.schoolLinkFromClassId}</SchoolNameText>
            </PairContainer>
            <RedBar />
            <PairContainer>
              <ClassText>{data?.classNameFromClassName?.[0]}</ClassText>
              <MartialArtsText>
                {data?.martialArtsLinkFromClassId?.[0]}
              </MartialArtsText>
            </PairContainer>
            <ScheduleTime>
              <Item>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </Svg>
                <TextTime>
                  {classDuration}
                  {' min  '}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.3335 1.99935H13.0002C13.177 1.99935 13.3465 2.06959 13.4716 2.19461C13.5966 2.31964 13.6668 2.4892 13.6668 2.66602V13.3327C13.6668 13.5095 13.5966 13.6791 13.4716 13.8041C13.3465 13.9291 13.177 13.9993 13.0002 13.9993H1.00016C0.823352 13.9993 0.653782 13.9291 0.528758 13.8041C0.403734 13.6791 0.333496 13.5095 0.333496 13.3327V2.66602C0.333496 2.4892 0.403734 2.31964 0.528758 2.19461C0.653782 2.06959 0.823352 1.99935 1.00016 1.99935H3.66683V0.666016H5.00016V1.99935H9.00016V0.666016H10.3335V1.99935ZM9.00016 3.33268H5.00016V4.66602H3.66683V3.33268H1.66683V5.99935H12.3335V3.33268H10.3335V4.66602H9.00016V3.33268ZM12.3335 7.33268H1.66683V12.666H12.3335V7.33268Z"
                      fill="#828282"
                    />
                  </svg>
                  {'  '}
                  {date}
                </TextTime>
              </Item>
            </ScheduleTime>
            <PairContainer style={{ marginBottom: 0 }}>
              <UserAvatar
                username={data.instructorLinkFromClassId?.[0]}
                avatarDimension={64}
              />
              <MasterNameText>
                {data?.instructorLookupFromClassId?.[0]}
              </MasterNameText>
            </PairContainer>
            <PairContainer style={{ width: '90%', marginTop: 0 }}>
              <Textarea
                helperText="Enter Notes"
                label="Notes"
                type="text"
                onChange={(txt) =>
                  dispatch(setNotes({ id: data.id, notes: txt }))
                }
                placeholder="Enter Notes..."
              />
            </PairContainer>
            <PairContainer
              style={{
                width: '95%',
                overflowX: 'hidden',
                alignItems: 'flex-start',
              }}
            >
              <UploadMedia
                videos={videosArray}
                images={imagesArray}
                setUrls={(images) => {
                  dispatch(
                    setActivityImages({
                      id: data?.id,
                      images: [...imagesArray, ...images],
                    }),
                  );
                }}
                setUrlsVideos={(videos) => {
                  dispatch(
                    setActivityVideos({
                      id: data?.id,
                      videos: [...videosArray, ...videos],
                    }),
                  );
                }}
              />
            </PairContainer>
            <Button
              sx={wideButtonStyles}
              variant="contained"
              onClick={() => {
                handleModal();
                handleUpdate();
              }}
            >
              <ButtonText>Done</ButtonText>
            </Button>
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};
