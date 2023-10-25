import LoadingButton from '@mui/lab/LoadingButton';
import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  TextWhite16Regular,
  TextWhite24Normal600,
} from '../../shared/components/texts';
import ModalOverlay from '../modal-overlay';

const Footer = styled.div`
  background: #282828;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 30px 0px 30px 0px;
`;

type ActionConfirmationModalProps = {
  open: boolean;
  title?: string;
  msg: string;
  height?: string | number;
  width?: string | number;
  loading?: boolean;
  alignItems?: string;
  borderRadius?: string;
  onCloseClick?: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
};

const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  open,
  msg,
  title,
  height,
  width,
  loading,
  alignItems,
  borderRadius,
  onCloseClick,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const Yes = t('Yes');
  const No = t('No');

  return (
    <ModalOverlay
      width={width || '90%'}
      title={title}
      onCloseClick={onCloseClick}
      open={open}
      height={height || 'auto'}
      isHeaderHidden
      alignItems={alignItems || 'flex-center'}
      borderRadius={borderRadius || '0px'}
    >
      <TextWhite24Normal600
        style={{
          margin: '45px 32px 0px',
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title || 'Delete Confirmation'}
      </TextWhite24Normal600>
      <TextWhite16Regular
        style={{
          margin: '39px 32px 0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 400,
          fontStyle: 'normal',
          textAlign: 'center',
        }}
      >
        {msg}
      </TextWhite16Regular>
      <Footer>
        <LoadingButton
          onClick={onConfirm}
          variant="contained"
          color="secondary"
          loading={loading}
          loadingIndicator={<CircularProgress color="primary" size={20} />}
          sx={{
            backgroundColor: '#333333',
            width: '42%',
            height: '40px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {Yes}
        </LoadingButton>
        <Button
          onClick={onCancel}
          color="primary"
          variant="contained"
          sx={{
            width: '42%',
            height: '40px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {No}
        </Button>
      </Footer>
    </ModalOverlay>
  );
};

export default ActionConfirmationModal;
