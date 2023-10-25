import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TextGray14CapitalizeRegular } from './texts';

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
  padding-left: 1rem;
  padding-right: 1rem;
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

const Label = styled.label<{ isFocus: boolean }>`
  line-height: 1rem;
  color: #737373;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 1rem;
  transition: all 0.25s ease-in-out;
  font-size: ${({ isFocus }) => (isFocus ? '0.7rem' : '1rem')};
  font-weight: ${({ isFocus }) => (isFocus ? 300 : 400)};
  transform: ${({ isFocus }) =>
    isFocus ? 'translateY(-18px)' : 'translateY(-50%)'};
  pointer-events: none;
`;

const HelperText = styled(TextGray14CapitalizeRegular)(`
padding-inline: 1rem;
text-transform: none;
`);

const LabelArea = styled.label<{ isFocus: boolean }>`
  line-height: 1rem;
  color: #737373;
  position: absolute;
  top: 0;
  transition: all 0.25s ease-in-out;
  font-size: ${({ isFocus }) => (isFocus ? '0.7rem' : '1rem')};
  font-weight: ${({ isFocus }) => (isFocus ? 300 : 400)};
  transform: ${({ isFocus }) =>
    isFocus ? 'translateY(6px)' : 'translateY(1.2rem)'};
  pointer-events: none;
`;

const TextareaContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 10px;
`;

const Input = styled.input<{ isFocus: boolean }>`
  width: 100%;
  background-color: transparent;
  border: none;
  appearance: none;
  outline: none;
  color: ${({ isFocus }) =>
    isFocus ? 'rgba(60, 60, 60, 1)' : 'rgba(200, 200, 200, 1)'};
  font-family: inherit;
  font-size: 16px;
  box-sizing: content-box;
  padding-top: 25px;
  padding-bottom: 8px;
  padding-left: 0;
  &::placeholder {
    color: #bfbfbf;
    opacity: 0.6;
  }
`;

const TextareaInput = styled.textarea<{ isFocus: boolean }>`
  width: 100%;
  background-color: transparent;
  color: ${({ isFocus }) =>
    isFocus ? 'rgba(60, 60, 60, 1)' : 'rgba(200, 200, 200, 1)'};
  border: none;
  appearance: none;
  outline: none;
  /* color: #3c3c3c; */
  font-family: inherit;
  font-size: 16px;
  box-sizing: content-box;
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

type TextFieldProps = {
  error?: string;
  label?: string;
  value?: string;
  name?: string;
  onChange?: (event: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  helperText?: string;
  type?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  error,
  label,
  value,
  name,
  placeholder,
  onChange,
  onBlur,
  helperText,
  type,
}) => {
  const [isFocus, setFocus] = useState(false);
  const focus = Boolean(isFocus || value?.length);

  const onFocus = (): void => {
    setFocus((state) => !state);
  };

  const onInnerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event.target.value);
  };

  return (
    <Container>
      <FormControl
        onBlur={onFocus}
        onFocus={onFocus}
        isFill={value?.length > 0}
        isFocus={isFocus}
        isError={Boolean(error?.length)}>
        {label && (
          <Label isFocus={focus || placeholder?.length > 0} htmlFor="name">
            {label}
          </Label>
        )}
        <Input
          onBlur={onBlur}
          isFocus={isFocus}
          name={name}
          onChange={onInnerChange}
          value={value}
          type={type || 'text'}
          placeholder={placeholder}
        />
      </FormControl>
      {(error || helperText) &&
        (error?.length ? (
          <Error>{error}</Error>
        ) : (
          <HelperText>{helperText || ''}</HelperText>
        ))}
    </Container>
  );
};

export const Textarea: React.FC<TextFieldProps> = ({
  error,
  label,
  placeholder,
  onChange,
  name,
  onBlur,
  ...props
}) => {
  const [isFocus, setFocus] = useState(false);
  const focus = Boolean(isFocus || props.value?.length);

  const onFocus = (): void => {
    setFocus((state) => !state);
  };

  const onInnerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    onChange?.(event.target.value);
  };

  return (
    <Container>
      <FormControl
        onBlur={onFocus}
        onFocus={onFocus}
        isFocus={isFocus}
        isError={Boolean(error?.length)}>
        {label && (
          <LabelArea isFocus={focus || placeholder?.length > 0} htmlFor="name">
            {label}
          </LabelArea>
        )}
        <TextareaContainer>
          <TextareaInput
            name={name}
            onBlur={onBlur}
            onChange={onInnerChange}
            {...props}
            autoComplete="off"
            isFocus={isFocus}
          />
        </TextareaContainer>
      </FormControl>
      {(error || props.helperText) &&
        (error?.length ? (
          <Error>{error}</Error>
        ) : (
          <HelperText>{props.helperText || ''}</HelperText>
        ))}
    </Container>
  );
};
