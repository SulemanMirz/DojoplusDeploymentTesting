/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { COLOR_BUTTON_RED, COLOR_LETTERS_WHITE } from '../styles/colors';

export const StripeFiledContainer = styled.div<{
  isFocus: boolean;
}>`
  margin-top: 20px;
  padding: 16px;
  border: 2px solid #3d3d3d;
  border-radius: 0.375rem;
  background-color: ${({ isFocus }) => (isFocus ? '#fff' : '#1b1b1b')};
  color: ${COLOR_LETTERS_WHITE};
  max-height: 60px;
`;

export const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#737373',
      color: '#737373',
      fontSize: '16px',
      fontFamily: 'Saira, Helvetica Neue, sans-serif',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#737373',
      },
      border: '2px solid #3d3d3d',
    },
    invalid: {
      iconColor: COLOR_BUTTON_RED,
      color: COLOR_BUTTON_RED,
    },
  },
};
