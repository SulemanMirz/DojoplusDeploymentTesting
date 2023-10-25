/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import router from 'next/router';

import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { Container } from '../../../shared/components/layout/Container';

const FooterContainer = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  margin: 'auto',
  display: 'flex',
  paddingTop: '10px',
  backgroundColor: '#282828',
});

const ButtonWrapper = styled('div')({
  width: '77%',
  display: 'flex',
  justifyContent: 'space-around',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '36px',
});

type FooterProps = {
  step: number;
  onChange: (number: number) => void;
  disabled: boolean;
  onClickSkip: (number: number) => void;
  loading: boolean;
  handleAddRank?: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  step,
  onChange,
  disabled,
  onClickSkip,
  loading,
  handleAddRank,
}): JSX.Element => {
  const onClickNext = useCallback(() => {
    if (step === 6) {
      onChange(7);
      return;
    }
    if (step === 7) {
      if (handleAddRank) handleAddRank();
      router.back();
      return;
    }
    onChange(step + 1);
  }, [step, onChange, handleAddRank]);

  const onClickSkipButton = useCallback(() => {
    onClickSkip(step > 0 ? step + 1 : 1);
  }, [onClickSkip, step]);

  const { t } = useTranslation();
  const Next = t('Next');
  const Skip = t('Skip');
  const Save = t('Save');
  const Continue = t('continue');

  return (
    <FooterContainer>
      <Container notGutters>
        <ButtonContainer>
          {step !== 1 && step !== 6 && step !== 7 && (
            <ButtonWrapper>
              <Button
                fullWidth
                sx={{
                  height: 56,
                  width: '84%',
                  background: '#282828',
                  border: '1px solid #4F4F4F',
                }}
                color="secondary"
                variant="contained"
                onClick={onClickSkipButton}
              >
                {Skip}
              </Button>
            </ButtonWrapper>
          )}
          <ButtonWrapper>
            <LoadingButton
              loadingIndicator={<CircularProgress color="primary" size={20} />}
              loading={loading}
              disabled={disabled}
              variant="contained"
              fullWidth
              sx={{
                height: 56,
                width: step === 1 || step === 6 || step === 7 ? '100%' : '84%',
              }}
              color="primary"
              onClick={onClickNext}
            >
              {step === 6 ? Save : step === 7 ? Continue : Next}
            </LoadingButton>
          </ButtonWrapper>
        </ButtonContainer>
      </Container>
    </FooterContainer>
  );
};
