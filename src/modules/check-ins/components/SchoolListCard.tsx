import React from 'react';
import styled from 'styled-components';

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
  onSelect?: (school: any) => void;
  handleModal: () => void;
  data: any;
  backroundColor?: string;
  schoolNameColor?: string;
  dividerColor?: string;
};

const SchoolListCard: React.FC<PrivateClassItemProps> = ({
  onSelect,
  handleModal,
  data,
  backroundColor,
  schoolNameColor,
  dividerColor,
}) => {
  const logo = data.schoolLogo?.[0].url || '/assets/logo/dojo.png';
  return (
    <>
      <CardContainer
        style={{
          backgroundColor: backroundColor || '#ffffff',
          borderBottom: dividerColor
            ? `0.5px ${dividerColor} solid`
            : '0.5px #f2f2f2 solid',
        }}
        onClick={() => {
          onSelect(data);
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
