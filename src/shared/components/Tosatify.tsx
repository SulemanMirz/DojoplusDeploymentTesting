import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type RefType = {
  call: () => void;
};

type ToastifyProps = {
  message: string;
  type: AlertColor;
};

export const Toastify = forwardRef<RefType, ToastifyProps>(
  ({ message, type }, ref) => {
    const [isOpen, setOpen] = useState(false);

    const call = (): void => {
      setOpen(true);
    };

    const onClose = (): void => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      call,
    }));

    return (
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  },
);
