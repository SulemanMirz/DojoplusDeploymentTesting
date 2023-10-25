import { LinearProgress, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SchoolRating } from '../models/school.model';

const ProgressBar = styled(LinearProgress)(() => ({
  marginBlock: '8px',
  minWidth: '196px',
  backgroundColor: '#6E5055 !important',
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#D4FE44; !important',
  },
}));

const Container = styled.div``;

const ReviewCount = styled.div`
  font-family: 'Saira';

  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 600;
  font-size: 39px;
`;
const StarContainer = styled.div`
  margin-top: 10px;
`;
const ReviewSection = styled.div`
  margin-top: 30px;
`;
const ProgressContainer = styled.div`
  width: 100%;
  margin: 30px 24px 0px 28px;
`;

const ReviewMainSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type RatingCardProps = {
  reviewData: SchoolRating[];
};

const RatingCard: React.FC<RatingCardProps> = ({ reviewData }) => {
  const [totalCount, setTotalCount] = useState(0);
  const reviewAll = (): number =>
    reviewData?.reduce((total, dataReview) => {
      return total + dataReview?.rating;
    }, 0);

  useEffect(() => {
    setTotalCount(reviewAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewData]);
  const rating = parseFloat((totalCount / reviewData?.length).toFixed(1));

  return (
    <Container>
      <ReviewMainSection>
        <ReviewSection>
          <ReviewCount>{rating || 0}</ReviewCount>
          <StarContainer>
            <Rating
              name="read-only"
              value={rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{
                '.MuiSvgIcon-root': {
                  fill: 'white !important',
                },
              }}
            />
          </StarContainer>
        </ReviewSection>
        <ProgressContainer>
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 5).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 4).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 3).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 2).length /
                reviewData?.length) *
                100 || 0
            }
          />
          <ProgressBar
            variant="determinate"
            value={
              (reviewData?.filter((rev) => rev.rating === 1).length /
                reviewData?.length) *
                100 || 0
            }
          />
        </ProgressContainer>
      </ReviewMainSection>
    </Container>
  );
};

export default RatingCard;
