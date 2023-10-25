import React from 'react';
import styled from 'styled-components';

const FixedContainer = styled.div`
  z-index: 100;
  width: 100%;
  display: flex;
  height: 99px;
  flex: -1;
  justify-content: center;
  align-items: center;
  padding: 44px 0px 0px;
  position: fixed;
  top: -0.5px;
  left: 0px;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
`;

const Image = styled.img`
  width: 100px;
  max-height: 100%;
  object-fit: contain;
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

const IconWrapperRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  position: absolute;
  right: 8px;
  cursor: pointer;
`;
const IconWrapperRight2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  position: absolute;
  right: 56px;
  cursor: pointer;
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
  IconRight?: React.ReactNode;
  IconRight2?: React.ReactNode;
  title?: string;
  onIconLeftCLick?: () => void;
  onIconRightClick?: () => void;
  onIconRight2Click?: () => void;
  backgroundColor?: string;
  headerContent?: React.ReactNode;
  titleShow?: boolean;
}

const HeaderDojo: React.FC<HeaderDojoProps> = ({
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
  titleShow = true,
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
      {titleShow && !title && <Image src="/assets/logo/dojo_plus_Logo.png" />}
    </FixedContainer>
  );
};

export default HeaderDojo;
