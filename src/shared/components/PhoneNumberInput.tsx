import React, { useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styled from 'styled-components';

const Label = styled.label<{ isFocus: boolean; isFill: boolean }>`
  line-height: 1rem;
  color: #737373;
  position: absolute;
  left: 68px;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 1rem;
  transition: all 0.25s ease-in-out;
  font-size: ${({ isFocus, isFill }) =>
    isFill || isFocus ? '0.7rem' : '1rem'};
  font-weight: ${({ isFocus, isFill }) => (isFill || isFocus ? 300 : 400)};
  transform: ${({ isFocus, isFill }) =>
    isFill || isFocus ? 'translateY(-18px)' : 'translateY(-50%)'};
  pointer-events: none;
`;
const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 8px;
`;

const FormControl = styled.div<{
  isFocus: boolean;
  isError?: boolean;
  isFill?: boolean;
}>`
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  border: ${({ isError }) => {
    if (isError) {
      return '2.5px solid #d32f2f';
    }
    return '2px solid #3d3d3d';
  }};

  background-color: ${({ isFocus }) => (isFocus ? '#fff' : '#1b1b1b')};
  transition: all 0.1s ease-in;
  position: relative;
`;

const HelperText = styled.div`
  white-space: nowrap;
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: gray;
  font-weight: 500;
  margin: 0;
  padding-inline: 16px;
  padding-top: 5px;
`;

const Error = styled.p`
  font-weight: 500;
  font-size: 12px;
  padding-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #d32f2f;
`;

type PhoneNumberInputProps = {
  onChange: (e) => void;
  helperText: string;
  value: string;
  onCountryChange?: (country) => void;
};

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  helperText,
  onCountryChange,
}) => {
  const [isFocus, setFocus] = useState(false);
  const [validateNumber, setValidateNumber] = useState(false);

  const focus = Boolean(isFocus);
  const onFocus = (): void => {
    setFocus((state) => !state);
  };

  return (
    <>
      <Container>
        <FormControl
          onBlur={onFocus}
          onFocus={onFocus}
          isFocus={isFocus}
          isError={validateNumber}
          isFill={value?.length > 0}>
          <Label isFocus={focus} isFill={value?.length > 0} htmlFor="name">
            Phone Number
          </Label>

          <PhoneInput
            value={value}
            onChange={(number) => {
              onChange(number);
              setValidateNumber(!isPossiblePhoneNumber(value));
            }}
            defaultCountry="US"
            error={validateNumber}
            helperText="Enter Country Input"
            label="Phone Number"
            initialValueFormat="national"
            onCountryChange={onCountryChange}
          />
        </FormControl>
        {(validateNumber || helperText) &&
          (validateNumber ? (
            <Error>{validateNumber}</Error>
          ) : (
            <HelperText>{helperText || ''}</HelperText>
          ))}
      </Container>
    </>
  );
};

export default PhoneNumberInput;
