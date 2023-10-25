import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components';
import ModalOverlay from '../modal-overlay';
import { Container } from '../../shared/components/layout/Container';
import { MainProfile } from '../../shared/components/layout/Main';
import { Section } from '../../shared/components/layout/Section';
import { TextField } from '../../shared/components/Input';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import { RefType } from '../../shared/components/Tosatify';

const InputContainer = styled.div`
  margin-inline: 33px;
  margin-top: 16px;
`;

const AddNameText = styled.span`
  margin-top: 6px;
  margin-left: 20px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #828282;
`;
const ArrowBackIcon = styled.img`
  width: 14px;
  height: 14px;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  background-color: '#282828';
  position: absolute;
  bottom: 20px;
`;

type SocialSiteModalProps = {
  open: boolean;
  title?: string;
  label?: string;
  belowTextLine?: string;
  onCancel?: () => void;
  successAlert?: RefType;
  errorAlert?: RefType;
  getProfileData?: (profileData) => void;
};

const SocialSiteModal: React.FC<SocialSiteModalProps> = ({
  open,
  title,
  onCancel,
  label,
  belowTextLine,
  successAlert,
  errorAlert,
  getProfileData,
}) => {
  const [idData, setIdData] = useState('');

  const { authUser, updateEmail } = useFireBaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateDb = async (): Promise<void> => {
    await axios
      .put('/api/User', {
        data: {
          id: authUser?.userInfo?.id,
          fields: {
            [title]: idData,
          },
        },
      })
      .then((res) => {
        setIsLoading(false);
        successAlert.call();
        setIdData('');
        getProfileData(res.data);
        onCancel();
      })
      .catch(() => {
        errorAlert.call();
        setIsLoading(false);
      });
  };

  const updateEmailInFirebase = async (): Promise<void> => {
    updateEmail(idData)
      .then(async () => {
        await updateDb();
      })
      .catch((err) => {
        if (err?.code === 'auth/requires-recent-login')
          setError(
            'Email can only be updated within 5 minutes after login. \n   Tip: You can re-login and update email here.',
          );
        else if (err?.code === 'auth/email-already-in-use')
          setError('This email is already in use.');
        else setError('Something went wrong, try again later.');
        setIsLoading(false);
        console.log(err?.code, 'failed to update Email');
      });
  };

  const submitData = async (): Promise<void> => {
    setIsLoading(true);
    if (title === 'Email') {
      if (idData === authUser.email) {
        setError('You are already using this email');
        setIsLoading(false);
        return;
      }
      updateEmailInFirebase();
    } else {
      await updateDb();
    }
  };

  return (
    <ModalOverlay
      title={title}
      open={open}
      isIconTrue={false}
      IconLeft={<ArrowBackIcon src="/assets/icons/back-arrow.svg" />}
      onIconLeftClick={onCancel}
      onCloseClick={onCancel}
    >
      <Section
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#282828',
          overflowY: 'scroll',
        }}
      >
        <InputContainer>
          <TextField
            value={idData}
            onChange={(value) => {
              setIdData(value);
            }}
            label={label}
            error={error}
          />
          {!error && <AddNameText>{belowTextLine}</AddNameText>}
        </InputContainer>
        <MainProfile>
          <Container notGutters isFlexGrow>
            <>
              <BtnContainer>
                <Button
                  onClick={() => {
                    onCancel();
                    setIdData('');
                  }}
                  variant="contained"
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
                  CANCEL
                </Button>
                <LoadingButton
                  loadingIndicator={
                    <CircularProgress color="primary" size={20} />
                  }
                  variant="contained"
                  loading={isLoading}
                  disabled={!idData}
                  type="submit"
                  sx={{
                    font: 'saira',
                    width: '144px',
                    height: '56px',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                  onClick={() => submitData()}
                >
                  SAVE
                </LoadingButton>
              </BtnContainer>
            </>
          </Container>
        </MainProfile>
      </Section>
    </ModalOverlay>
  );
};

export default SocialSiteModal;
