import LoadingButton from '@mui/lab/LoadingButton';
import { Button, CircularProgress, Rating } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFireBaseAuth } from '../../../../context/FirebaseContext';
import { Textarea } from '../../../../shared/components/Input';

const Container = styled.div`
  padding-inline: 18px;
`;

const ReviewSection = styled.div`
  padding-left: 7px;
  padding-bottom: 4px;
`;

const ReviewDescription = styled.div`
  margin-top: 24px;
`;
const StarRating = styled.div`
  margin-top: 15px;
`;

const TextAreaContainer = styled.div``;

const Counter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 18.9444px;
  line-height: 32px;
  color: #828282;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  background-color: '#282828';
  position: absolute;
  bottom: 20px;
  left: 0;
`;

type AddReviewModalProps = {
  recordId: string;
  handleReviewModal: () => void;
  onSuccess: () => void;
};

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  recordId,
  handleReviewModal,
  onSuccess,
}) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useFireBaseAuth();

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    await axios
      .post(
        '/api/Schools/reviews',
        {
          School: [recordId],
          Comment: comment,
          Rating: value,
        },
        {
          params: {
            username: authUser.userInfo.username,
          },
        },
      )
      .then(() => {
        setIsLoading(false);
        setComment('');
        handleReviewModal();
        onSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  };

  return (
    <Container>
      <ReviewSection>
        <ReviewDescription>Write a review. </ReviewDescription>
        <StarRating>
          <Rating
            sx={{
              '.MuiSvgIcon-root': {
                fill: 'white !important',
              },
            }}
            name="simple-controlled"
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
          />
        </StarRating>
      </ReviewSection>
      <TextAreaContainer>
        <Textarea value={comment} onChange={setComment} label="Comment" />
        <Counter>{comment?.length || 0} / 2000</Counter>
      </TextAreaContainer>
      <BtnContainer>
        <Button
          variant="contained"
          onClick={() => setComment('')}
          sx={{
            font: 'saira',
            backgroundColor: '#333333',
            width: '144px',
            height: '56px',
            fontSize: '16px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#333333',
              color: '#fff',
            },
          }}
        >
          CLEAR ALL
        </Button>
        <LoadingButton
          loadingIndicator={<CircularProgress color="primary" size={20} />}
          type="submit"
          variant="contained"
          loading={isLoading}
          disabled={!value || !comment}
          sx={{
            font: 'saira',
            width: '144px',
            height: '56px',
            fontSize: '16px',
            fontWeight: 600,
          }}
          onClick={() => handleSubmit()}
        >
          COMMENT
        </LoadingButton>
      </BtnContainer>
    </Container>
  );
};

export default AddReviewModal;
