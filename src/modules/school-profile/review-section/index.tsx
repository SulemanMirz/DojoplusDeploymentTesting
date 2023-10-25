import { Rating } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import dayjs from 'dayjs';
import RatingCard from '../../../shared/components/RatingCard';
import ModalOverlay from '../../modal-overlay';
import UserAvatar from '../../userAvatar';
import AddReviewModal from './components/AddReviewModal';
import { SchoolRating } from '../../../shared/models/school.model';
import { useAppDispatch } from '../../../redux/hooks';
import { setReviewData } from '../../../redux/slices/reviewSlice';

const Container = styled.div`
  margin: 0px 20px;
  margin-bottom: 100px;
  overflow-y: scroll;
`;
const ReviewCommentCard = styled.div`
  margin-top: 56px;
`;
const AvatarRatingContainer = styled.div`
  display: flex;
`;

const UserNameSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 6px;
`;

const UserName = styled.span`
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;

const DateText = styled.span`
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`;

const MainSection = styled.div`
  margin-bottom: 36px;
`;

const DescriptionContainer = styled.div`
  margin-top: 12px;
`;
const Description = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #fcfcfc;
`;

const PlanButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  background: #d21632;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  cursor: pointer;
  margin-top: 120px;
`;

const PlanButtonContent = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcfcfc;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
`;

type ReviewSectionProps = {
  reviewData: SchoolRating[];
  recordId: string;
};

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviewData = [],
  recordId,
}) => {
  const [reviewVisible, setReviewVisible] = useState(false);
  const handleReviewModal = (): void => {
    setReviewVisible(!reviewVisible);
  };

  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const { schoolId } = query;

  const getReviewData = async (): Promise<void> => {
    try {
      const response = await axios('/api/Schools/reviews', {
        params: {
          slug: schoolId,
        },
      });
      dispatch(
        setReviewData({
          slug: schoolId as string,
          data: response.data,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <RatingCard reviewData={reviewData} />
      <ReviewCommentCard>
        {[...reviewData]
          .sort((a, b) => {
            return +new Date(a.createdTime) - +new Date(b.createdTime);
          })
          .map((data) => {
            const dateFormat = dayjs(data.createdTime).format('DD/MM/YYYY');
            return (
              <MainSection>
                <AvatarRatingContainer>
                  <UserAvatar
                    avatarDimension={40}
                    beltHeight={5}
                    username={data?.displayNameFromUser?.[0]}
                  />
                  <UserNameSection>
                    <UserName>{data?.fullNameFromUser?.[0]}</UserName>
                    <DateText>{dateFormat}</DateText>
                    <Rating
                      sx={{
                        '.MuiSvgIcon-root': {
                          width: '8px !important',
                          height: '8px !important',
                          fill: 'white !important',
                        },
                      }}
                      name="read-only"
                      value={data?.rating}
                      readOnly
                    />
                  </UserNameSection>
                </AvatarRatingContainer>
                <DescriptionContainer>
                  <Description>{data?.comment}</Description>
                </DescriptionContainer>
              </MainSection>
            );
          })}
      </ReviewCommentCard>
      <PlanButtonWrapper
        onClick={() => {
          handleReviewModal();
        }}
      >
        <PlanButtonContent>write a review</PlanButtonContent>
      </PlanButtonWrapper>
      <ModalOverlay
        title="Add review"
        open={reviewVisible}
        onCloseClick={handleReviewModal}
        height="70%"
      >
        <AddReviewModal
          recordId={recordId}
          onSuccess={() => getReviewData()}
          handleReviewModal={handleReviewModal}
        />
      </ModalOverlay>
    </Container>
  );
};

export default ReviewSection;
