import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import styled from 'styled-components';
import { TextGray14CapitalizeRegular } from '../texts';

const MenuProps = {
  PaperProps: {
    style: {
      backgroundColor: 'black',
      color: 'white',
    },
  },
};

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

interface BasicSelectViewProps {
  label?: string | null | undefined;
  value: string | number;
  onChange: (value: string | number) => void;
  options: (number | string)[];
  width?: number | string;
  backgroundColor?: string;
  helperText?: string;
  error?: string;
}

const BasicSelect: React.FC<BasicSelectViewProps> = ({
  label,
  value,
  onChange,
  options,
  width,
  backgroundColor,
  helperText,
  error,
}) => {
  const handleChange = (event: SelectChangeEvent): void => {
    onChange(event.target.value as string);
  };

  const [isFocus, setIsFocus] = useState(true);
  return (
    <FormControl
      className={error?.length ? 'errorFilledMUISelect' : 'borderdMUISelect'}
      variant="filled"
      sx={{
        width: width || 80,
        borderRadius: '6px',
      }}
    >
      <InputLabel id="my-label" style={{ color: '#737373' }}>
        {label}
      </InputLabel>
      <Select
        labelId="my-label"
        id="my-simple-select"
        variant="filled"
        value={value}
        onFocus={() => setIsFocus(false)}
        onBlur={() => setIsFocus(true)}
        sx={{
          backgroundColor,
          borderRadius: '6px',
          '.MuiSvgIcon-root': {
            fill: '#737373 !important',
          },

          '.MuiSelect-filled': {
            backgroundColor: isFocus ? '#1B1B1B' : '#ffffff',
            borderRadius: '6px ',
            border: isFocus
              ? `2px solid ${error ? '#d32f2f' : '#3d3d3d'} `
              : '2px solid white !important',
            color: isFocus ? '#FFFFFF !important' : 'black !important',
          },
        }}
        label={label || ''}
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {options?.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
      {(error || helperText) &&
        (error?.length ? (
          <Error>{error}</Error>
        ) : (
          <HelperText>{helperText || ''}</HelperText>
        ))}
    </FormControl>
  );
};

export default BasicSelect;
