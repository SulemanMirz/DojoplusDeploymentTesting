import React from 'react';
import { styled, Dialog as DialogMUI } from '@mui/material';

export const StyledDialog = styled((props: any) => <DialogMUI {...props} />)(
  ({ height, width, alignItems, borderRadius, maxWidth }) => ({
    '&.MuiDialog-root .MuiDialog-container': {
      alignItems: alignItems || 'flex-end',
      '.MuiPaper-root': {
        ...(maxWidth && {
          maxWidth,
        }),
        background: '#282828',
        margin: 0,
        width: width || '100%',
        height: height || '80%',
        borderRadius: borderRadius || '8px 8px 0px 0px',
        overflow: 'hidden',
      },
    },
  }),
);
