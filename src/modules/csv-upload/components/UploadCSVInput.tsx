import React from 'react';
import CSVReader, { CSVReaderProps } from 'react-csv-reader';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  width: '100%',
  overflow: 'hidden',
  height: 60,
});

interface UploadCSVInputProps extends CSVReaderProps {
  customLabel: string;
}

export const UploadCSVInput: React.FC<UploadCSVInputProps> = ({
  customLabel,
  disabled,
  ...rest
}) => {
  return (
    <Container>
      <style jsx global>{`
        .upload-input[type='file'] {
          box-sizing: border-box;
          display: inline-block;
          font-size: 14px;
          margin: 0;
          position: relative;
          overflow: hidden;
          width: 100%;
          -webkit-appearance: none;
          -webkit-box-sizing: border-box;
          z-index: 1;
        }
        .upload-input[type='file']:after {
          /* Mask the no file chosen label */
          background-color: #fff;
          content: '';
          display: block;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
        }
        .upload-input[type='file']::-webkit-file-upload-button {
          /* Style the button */
          font-family: Saira;
          background: ${disabled ? '#8c8c8c' : '#D21632'};
          width: 100%;
          height: 60px;
          color: #fcfcfc;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          padding: 16px;
          position: relative;
          border-radius: 2.5px;
          position: relative;
          z-index: 100;
          -webkit-appearance: none;
          border: none;
        }
      `}</style>
      <CSVReader
        {...rest}
        disabled={disabled}
        cssInputClass="upload-input"
        parserOptions={{ header: true }}
      />
    </Container>
  );
};
