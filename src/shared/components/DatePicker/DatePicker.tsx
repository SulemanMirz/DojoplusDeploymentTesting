import React from 'react';
import MUITextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { TextGray14CapitalizeRegular } from '../texts';

const HelperText = styled(TextGray14CapitalizeRegular)`
  padding-left: 1rem;
  text-transform: none;
`;

const Error = styled.p`
  font-weight: 500;
  font-size: 12px;
  padding-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #d32f2f;
`;

type DatePickerProps = {
  error: string;
  onChange: (e: Dayjs) => void;
  helperText: string | '';
  value: string;
  label: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  error,
  onChange,
  helperText,
  value,
  label,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label={label}
          InputProps={{
            sx: {
              border: error?.length
                ? '2px solid #d32f2f '
                : '2px solid #3d3d3d',
              borderRadius: '6px',
              backgroundColor: '#1B1B1B !important',
            },
          }}
          DialogProps={{
            sx: {
              '& .MuiPickersDay-root': {
                backgroundColor: '#3C3C3C',
                color: '#ffffff',
              },
            },
            PaperProps: {
              sx: {
                backgroundColor: '#282828 !important',
              },
            },
          }}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <MUITextField
              variant="filled"
              InputLabelProps={{
                sx: {
                  color: '#e1ffff4d !important',
                },
              }}
              sx={{
                width: '100%',
                marginTop: '13px',
              }}
              {...params}
              error={Boolean(error)}
            />
          )}
        />
        {(error || helperText) &&
          (error ? (
            <Error>{error}</Error>
          ) : (
            <HelperText>{helperText || ''}</HelperText>
          ))}
      </LocalizationProvider>
    </>
  );
};

export default DatePicker;
