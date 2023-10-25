import React from 'react';
import styled from 'styled-components';
import ContainerMUI from '@mui/material/Container';

const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 9;
`;

const FixedContainer = styled.div`
  width: 100%;
  background-color: #282828;
  top: 0px;
  z-index: 10;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
  border-radius: 8px 8px 0px 0px;
`;

const Wrapper = styled(ContainerMUI)`
  padding: 8px 0;
  display: flex !important;
  align-items: center !important;
  height: 51px;
`;

const Item = styled.h1`
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 15px 0 0;
  cursor: pointer;
  text-decoration: 'none';
`;

const CloseIcon = styled.img`
  height: 44px;
  width: 44px;
  padding: 15.63px;
  position: absolute;
  right: 8px;
  cursor: pointer;
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

const RightIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  position: absolute;
  right: 8px;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const HeaderModal: React.FC<{
  title?: string;
  onClick?: () => void;
  onIconLeftClick?: () => void;
  onIconRightClick?: () => void;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  isIconTrue?: boolean;
  headerStyle?: React.CSSProperties;
}> = ({
  title,
  onClick,
  onIconLeftClick,
  onIconRightClick,
  IconLeft,
  IconRight,
  isIconTrue = true,
  headerStyle,
}) => {
  return (
    <>
      <Container id="scroll-dialog-title">
        <FixedContainer
          style={{
            ...headerStyle,
          }}
        >
          <Wrapper maxWidth="md">
            <TitleWrapper>
              <Item>{title || ''}</Item>
            </TitleWrapper>
            {IconLeft && (
              <IconWrapper onClick={onIconLeftClick}>{IconLeft}</IconWrapper>
            )}
            {IconRight && (
              <RightIconWrapper onClick={onIconRightClick}>
                {IconRight}
              </RightIconWrapper>
            )}
            {isIconTrue && !IconRight && (
              <CloseIcon src="/assets/icons/close.svg" onClick={onClick} />
            )}
          </Wrapper>
        </FixedContainer>
      </Container>
    </>
  );
};
