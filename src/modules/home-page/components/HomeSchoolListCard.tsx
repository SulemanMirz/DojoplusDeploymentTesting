import router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { School } from '../../../shared/models/school.model';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-bottom: 0.5px #f2f2f2 solid;
  cursor: pointer;
`;

const SchoolLogo = styled.img`
  border-radius: 40px;
  width: 80px;
  height: 80px;
`;

const SchoolNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 16px;
`;

const SchoolNameText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #080808;
`;

const SchoolLocationText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #646464;
`;

type PrivateClassItemProps = {
  handleModal: () => void;
  data: School;
  background?: string;
  schoolNameColor?: string;
  dividerColor?: string;
};

const SchoolListCard: React.FC<PrivateClassItemProps> = ({
  handleModal,
  data,
  background,
  schoolNameColor,
  dividerColor,
}) => {
  const logo = data.schoolLogo?.[0].url || '/assets/logo/dojo.png';
  return (
    <>
      <CardContainer
        style={{
          backgroundColor: background || '#ffffff',
          borderBottom: dividerColor
            ? `0.5px ${dividerColor} solid`
            : '0.5px #f2f2f2 solid',
        }}
        onClick={() => {
          router.push(`/school/${data?.slug}/info`);
          handleModal();
        }}
      >
        <SchoolLogo src={logo} />
        <SchoolNameContainer>
          <SchoolNameText
            style={{
              color: schoolNameColor || '#080808',
            }}
          >
            {data.schoolName || ''}
          </SchoolNameText>
          <SchoolLocationText>{data.address1 || ''}</SchoolLocationText>
        </SchoolNameContainer>
      </CardContainer>
    </>
  );
};
export default SchoolListCard;
