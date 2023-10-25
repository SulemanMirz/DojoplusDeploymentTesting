import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Link from 'next/link';
import { Container } from '../../../shared/components/layout/Container';

const FooterContainer = styled('div')({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  margin: 'auto',
  display: 'flex',
  backgroundColor: '#111111',
  zIndex: 10,
  boxShadow: '0px 3px 0px rgba(24, 24, 24, 0.35)',
  padding: '18px',
});

const ButtonWrapper = styled('div')({
  width: '50%',
  display: 'flex',
  alignItems: 'center',
});

const ButtonContainer = styled('div')({
  display: 'flex',
});

type FooterProps = {
  price: string;
  nextRoute: string;
};

export const BottomNavigation: React.FC<FooterProps> = ({
  price,
  nextRoute,
}): JSX.Element => {
  console.log(nextRoute);

  const { t } = useTranslation();
  const textTicket = t('ticket');

  return (
    <FooterContainer>
      <Container notGutters>
        <ButtonContainer>
          <ButtonWrapper>{price}</ButtonWrapper>
          <ButtonWrapper>
            <Link href={nextRoute}>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: 40 }}
                color="primary"
                startIcon={<img src="/assets/icons/ticket.svg" alt="icon" />}
              >
                {textTicket}
              </Button>
            </Link>
          </ButtonWrapper>
        </ButtonContainer>
      </Container>
    </FooterContainer>
  );
};
