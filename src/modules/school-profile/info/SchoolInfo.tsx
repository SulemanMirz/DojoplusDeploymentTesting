import styled from 'styled-components';
import React, { useRef } from 'react';
import RatingCard from '../../../shared/components/RatingCard';
import Amenities from './Amenities';
import LocationCard from './LocationCard';
import PlansCategory from './PlansCategory';
import ScheduleProfileCard from './ScheduleProfileCard';
import UserAvatarSection from './UserAvatarSection';
import {
  Plans,
  PlanSubscriber,
  Schedule,
  School,
  SchoolRating,
} from '../../../shared/models/school.model';
import { RefType, Toastify } from '../../../shared/components/Tosatify';

const BodySection = styled.div`
  background-color: #282828;
  height: 100%;
  padding: 20px;
  margin-bottom: 97px;
`;

const Divider = styled.div`
  margin-top: 38px;
  background-color: #d9d9d9;
  height: 1px;
`;

const RatingCardContainer = styled.div`
  margin-top: 34px;
`;

const PhoneContainer = styled.div`
  margin-top: 34px;
`;
const PhoneTitle = styled.div`
  font-family: 'Saira';
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
`;
const PhoneCategories = styled.div`
  display: flex;
  margin-top: 15px;
`;
const PhoneNumberData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.img``;
const Number = styled.a`
  margin-left: 9px;
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  min-width: 110px;
`;
const CopyData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
`;
const CopyName = styled.div`
  margin-left: 9px;
  font-family: Saira;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0em;
`;

const ReviewTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
`;

type SchoolInfoProps = {
  data: School;
  plansData: Plans[];
  scheduleData: { classData: Schedule[]; zoneTime: Date };
  plansMembers: PlanSubscriber[];
  reviewData: SchoolRating[];
};

const SchoolInfo: React.FC<SchoolInfoProps> = ({
  data,
  plansData,
  scheduleData,
  plansMembers,
  reviewData,
}) => {
  const successAlert = useRef<RefType>(null);
  return (
    <BodySection>
      <Toastify
        ref={successAlert}
        message="Number copied to clipboard!"
        type="success"
      />
      <UserAvatarSection data={data} plansMembers={plansMembers} />
      <LocationCard data={data} />
      {data?.phone && (
        <PhoneContainer>
          <PhoneTitle>Phone</PhoneTitle>
          <PhoneCategories>
            <PhoneNumberData>
              <Icon src="/assets/icons/call.svg" />
              <Number href={`tel:${data?.phone}`}>{data?.phone}</Number>
            </PhoneNumberData>
            <CopyData
              onClick={() =>
                navigator.clipboard
                  .writeText(data?.phone)
                  .then(() => successAlert.current.call())
              }
            >
              <Icon src="/assets/icons/copy.svg" />
              <CopyName>Copy</CopyName>
            </CopyData>
          </PhoneCategories>
        </PhoneContainer>
      )}
      <ScheduleProfileCard scheduleData={scheduleData} />
      <PlansCategory plansData={plansData} />
      {data?.amenities?.length && <Amenities data={data?.amenities} />}
      <Divider />
      <RatingCardContainer>
        <ReviewTitle>Reviews</ReviewTitle>
        <RatingCard reviewData={reviewData} />
      </RatingCardContainer>
    </BodySection>
  );
};

export default SchoolInfo;
