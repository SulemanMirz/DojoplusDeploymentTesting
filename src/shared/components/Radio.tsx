import React, { useEffect, useState } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TextWhite16CapitalizeThin } from './texts';

interface RadioButtonGroupProps {
  values: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  values,
  selectedValue,
  onChange,
}) => {
  const [state, setState] = useState(selectedValue);

  useEffect(() => {
    setState(selectedValue);
  }, [selectedValue]);

  return (
    <RadioGroup
      sx={{ display: 'flex', justifyContent: 'space-around' }}
      value={state}
      row
    >
      {values?.map((val) => {
        const selected = state === val;
        return (
          <Button
            color="secondary"
            variant="contained"
            sx={{
              background: selected ? '#333' : 'transparent',
              border: selected ? 'none' : '1px solid #4F4F4F',
              borderRadius: '4px',
              width: '48%',
              padding: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              '&.MuiButton-root:hover': {
                boxShadow: 'none !important',
              },
            }}
            key={val}
            onClick={() => {
              setState(val);
              onChange(val);
            }}
          >
            <FormControlLabel
              value={val}
              control={<Radio />}
              label={
                <TextWhite16CapitalizeThin
                  style={{
                    color: selected ? '#fcfcfc' : '#bdbdbd',
                    margin: 0,
                  }}
                >
                  {val}
                </TextWhite16CapitalizeThin>
              }
              labelPlacement="end"
              sx={{
                fontSize: '16px',
                marginRight: '6px',
                '& svg': {
                  color: selected ? '#fcfcfc' : '#4f4f4f',
                  height: '18px',
                  width: '18px',
                },
              }}
            />
          </Button>
        );
      })}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
