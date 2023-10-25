import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileAvatar } from '../../../../shared/components/ProfileAvatar';
import PaymentSection from '../PaymentSection';
import RanksSection from '../RanksSection';
import CheckInsSection from '../CheckInsSection';
import AchievementSection from '../AchievementSection';
import DocumentsSection from '../DocumentsSection';
import { orderRanks } from '../../../../shared/utils/ranks-utils';
import { IRank } from '../../../../shared/models/Rank.model';
import PlansSection from '../PlansSection';
import { Plans } from '../../../../shared/models/school.model';

const Container = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  padding-inline: 16px;
`;

const AvatarContainer = styled.div`
  height: 155px;
  background-color: #111111;
  width: 100%;
  align-items: center;
  padding-top: 17px;
`;

const PaymentContainer = styled.div``;
const PlansWrapper = styled.div``;

const DocumentContainer = styled.div``;
const CheckInsContainer = styled.div``;
const AchievementContainer = styled.div``;
const RankContainer = styled.div``;

type StudentsDetailModalProps = {
  studentData?: Plans;
};

const StudentsDetailModal: React.FC<StudentsDetailModalProps> = ({
  studentData,
}) => {
  const [checkInsStudentData, setCheckInsStudentData] = useState([]);
  const [achievementData, setAchievementData] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [ranks, setRanks] = useState();
  const [isAchievementLoading, setIsAchievementLoading] = useState(false);
  const [isCheckInsLoading, setIsCheckInsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isRanksLoading, setIsRanksLoading] = useState(false);
  const [beltInfo, setBeltInfo] = useState<IRank>();

  const username = studentData?.usernameFromProfile?.[0];
  const schoolSlug = studentData?.schoolSlugFromPlan?.[0];

  const getCheckInsData = (): void => {
    setIsCheckInsLoading(true);
    axios('/api/Activity', {
      params: {
        username,
        schoolSlug,
      },
    })
      .then((res) => {
        setCheckInsStudentData(res.data);
        setIsCheckInsLoading(false);
      })
      .catch((e) => {
        setIsCheckInsLoading(false);
        console.log(e, 'e');
      });
  };

  const getAchievement = (): void => {
    setIsAchievementLoading(true);
    axios('/api/Achievement', {
      params: {
        username,
      },
    })
      .then((res) => {
        setAchievementData(res.data);
        setIsAchievementLoading(false);
      })
      .catch((e) => {
        setIsAchievementLoading(false);
        console.log(e, 'e');
      });
  };

  const getPaymentHistory = (): void => {
    setIsPaymentLoading(true);
    axios('/api/Payment', {
      params: {
        username,
        schoolSlug,
      },
    })
      .then((res) => {
        setPaymentHistory(res.data);
        setIsPaymentLoading(false);
      })
      .catch((e) => {
        setIsPaymentLoading(false);
        console.log(e, 'e');
      });
  };

  const getRanks = (): void => {
    setIsRanksLoading(true);
    if (username) {
      const requests = [];
      requests.push(
        axios('/api/Rank', {
          params: {
            username,
          },
        }).then((res) => {
          const formatedRes = res.data.map((rank) =>
            _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
          );
          setRanks(formatedRes);
          setBeltInfo(orderRanks(formatedRes as IRank[]).slice(0, 1)?.[0]);
          setIsRanksLoading(false);
        }),
      );

      Promise.all(requests);
    }
  };

  useEffect(() => {
    getCheckInsData();
    getAchievement();
    getPaymentHistory();
    getRanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData]);

  const belt = beltInfo?.rankImageW375H24FromMartialArtsRanks
    ? beltInfo?.rankImageW375H24FromMartialArtsRanks[0]?.url
    : '';

  return (
    <Container>
      <AvatarContainer>
        <ProfileAvatar
          src={studentData?.photoFromProfile?.[0]?.url}
          beltSrc={belt || null}
        />
      </AvatarContainer>
      <Wrapper>
        <PlansWrapper>
          <PlansSection
            plansData={paymentHistory}
            isPlansLoading={isPaymentLoading}
          />
        </PlansWrapper>
        <PaymentContainer>
          <PaymentSection
            paymentHistory={paymentHistory}
            isPaymentLoading={isPaymentLoading}
          />
        </PaymentContainer>

        <RankContainer>
          <RanksSection
            ranks={ranks}
            isRanksLoading={isRanksLoading}
            studentData={studentData}
            getRanks={getRanks}
          />
        </RankContainer>

        <CheckInsContainer>
          <CheckInsSection
            checkInsStudentData={checkInsStudentData}
            isCheckInsLoading={isCheckInsLoading}
          />
        </CheckInsContainer>

        <AchievementContainer>
          <AchievementSection
            isAchievementLoading={isAchievementLoading}
            achievementData={achievementData}
            studentData={studentData}
            getAchievement={getAchievement}
          />
        </AchievementContainer>
        <DocumentContainer>
          <DocumentsSection />
        </DocumentContainer>
      </Wrapper>
    </Container>
  );
};

export default StudentsDetailModal;
