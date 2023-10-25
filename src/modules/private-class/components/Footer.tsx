import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { Container } from '../../../shared/components/layout/Container';

const FooterContainer = styled('div')({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  margin: 'auto',
  display: 'flex',
});

const ButtonWrapper = styled('div')({
  width: '50%',
});

const ButtonContainer = styled('div')({
  display: 'flex',
});

type FooterProps = {
  step: number;
  onChange: (number: number) => void;
  onClickBack: (number: number) => void;
};

export const Footer: React.FC<FooterProps> = ({
  step,
  onChange,
  onClickBack,
}): JSX.Element => {
  const router = useRouter();
  const onClickNext = useCallback(() => {
    onChange(step + 1);
  }, [step, onChange]);

  const onClickBackButton = useCallback(() => {
    if (step === 1) router.back();
    onClickBack(step > 0 ? step - 1 : 1);
  }, [router, onClickBack, step]);

  const { t } = useTranslation();
  const Next = t('Next');
  const Back = t('Back');

  return (
    <FooterContainer>
      <Container notGutters>
        <ButtonContainer>
          <ButtonWrapper>
            <Button
              fullWidth
              sx={{ height: 60 }}
              color="secondary"
              variant="contained"
              onClick={onClickBackButton}
            >
              {Back}
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              fullWidth
              sx={{ height: 60 }}
              color="primary"
              variant="contained"
              onClick={onClickNext}
            >
              {Next}
            </Button>
          </ButtonWrapper>
        </ButtonContainer>
      </Container>
    </FooterContainer>
  );
};
