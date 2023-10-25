import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

const paperStyles = {
  backgroundColor: '#000',
  padding: '1rem',
  borderRadius: 2.5,
};

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const Text = styled(Typography)({
  marginTop: 16,
});

type ModalLoadingProps = {
  isLoading?: boolean;
};

export const ModalLoading: React.FC<ModalLoadingProps> = ({ isLoading }) => {
  return (
    <Dialog PaperProps={{ style: paperStyles }} open={isLoading}>
      <Container>
        <CircularProgress size={60} />
        <Text variant="overline" display="block">
          Uploading Data
        </Text>
      </Container>
    </Dialog>
  );
};
