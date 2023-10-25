import React from 'react';
import styled from 'styled-components';
import AlertMUI from '@mui/material/Alert';

const Alert = styled(AlertMUI)`
  margin-top: 24px;
`;

type EmptyViewAlertProps = {
  msg?: string;
};

export const EmptyViewAlert: React.FC<EmptyViewAlertProps> = ({ msg }) => {
  return (
    <Alert variant="filled" severity="error">
      {msg}
    </Alert>
  );
};

EmptyViewAlert.defaultProps = {
  msg: 'Profile not Found',
};
