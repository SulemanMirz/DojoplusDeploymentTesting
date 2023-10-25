import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import React from 'react';

type ButtonProps = {
  sx?: { [key: string]: string | number };
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'medium' | 'small';
  fullWidth: boolean;
  text: string;
  onClick?: () => void;
};

const AppLoadingButton: React.FC<ButtonProps> = ({
  sx,
  loading,
  disabled,
  type,
  size,
  fullWidth,
  text,
  onClick,
}) => {
  return (
    <LoadingButton
      sx={{
        color: '#fcfcfc',
        '&.MuiLoadingButton-root.Mui-disabled': {
          backgroundColor: loading ? '#D21E32' : '#AA9B9D',
          color: !loading && '#fcfcfc',
        },
        ...sx,
      }}
      loading={loading}
      disabled={disabled}
      variant="contained"
      type={type}
      size={size}
      loadingIndicator={
        <CircularProgress style={{ color: '#FCFCFC' }} size={18} />
      }
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {text}
    </LoadingButton>
  );
};

export default AppLoadingButton;
