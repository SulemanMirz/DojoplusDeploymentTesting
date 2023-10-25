import React from 'react';
import styled from 'styled-components';

const FixedContainer = styled.div`
  z-index: 100;
  width: 100%;
  display: flex;
  height: 104px;
  @media screen and (max-width: 768px) {
    height: 52px;
  }
  flex: -1;
  justify-content: center;
  align-items: center;
  padding: 44px 0px;
  position: fixed;
  top: -0.5px;
  left: 0px;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  position: absolute;
  left: 8px;
  cursor: pointer;
`;

const IconWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  position: absolute;
  left: 140px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    left: 100px;
  }
`;

const IconWrapperRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 230px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    right: 100px;
  }
`;
const IconWrapperRight2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 56px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    right: 10px;
  }
`;

const TitleText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  text-align: center;
  color: #fcfcfc;
`;
const HeaderData = styled.div`
  width: 100%;
  padding-inline: 52px;
`;

interface HeaderDojoProps {
  style?: React.CSSProperties;
  IconLeft?: React.ReactNode;
  IconLeft2?: React.ReactNode;
  IconRight?: React.ReactNode;
  IconRight2?: React.ReactNode;
  title?: string;
  onIconLeftCLick?: () => void;
  onIconRightClick?: () => void;
  onIconRight2Click?: () => void;
  backgroundColor?: string;
  headerContent?: React.ReactNode;
}

const CertificateHeader: React.FC<HeaderDojoProps> = ({
  IconLeft,
  IconRight,
  IconRight2,
  title,
  onIconLeftCLick,
  onIconRightClick,
  onIconRight2Click,
  backgroundColor,
  style,
  headerContent,
  IconLeft2,
}) => {
  return (
    <FixedContainer
      style={{
        backgroundColor: backgroundColor || '#111111',
        ...style,
      }}
    >
      {IconLeft && (
        <IconWrapper onClick={onIconLeftCLick}>{IconLeft}</IconWrapper>
      )}
      {IconLeft2 && (
        <IconWrapper2 onClick={onIconLeftCLick}>{IconLeft2}</IconWrapper2>
      )}
      {IconRight && (
        <IconWrapperRight onClick={onIconRightClick}>
          {IconRight}
        </IconWrapperRight>
      )}
      {IconRight2 && (
        <IconWrapperRight2 onClick={onIconRight2Click}>
          {IconRight2}
        </IconWrapperRight2>
      )}
      {headerContent && <HeaderData>{headerContent}</HeaderData>}

      {title && <TitleText>{title}</TitleText>}
    </FixedContainer>
  );
};

export default CertificateHeader;
