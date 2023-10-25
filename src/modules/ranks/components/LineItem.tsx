import React from 'react';
import {
  TextGray10UppercaseRegular,
  TextWhite14Regular,
} from '../../../shared/components/texts';
import { TextContainer } from './ranks-styled';

const LineItem: React.FC<{ text1: string; text2: string; style?: any }> = ({
  text1,
  text2,
  style,
}) => {
  return (
    <TextContainer {...(style && { style })}>
      <TextGray10UppercaseRegular>{text1}</TextGray10UppercaseRegular>
      <TextWhite14Regular>{text2}</TextWhite14Regular>
    </TextContainer>
  );
};

export default LineItem;
