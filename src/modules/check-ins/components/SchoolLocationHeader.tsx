import React from 'react';
import styled from 'styled-components';
import ContainerMUI from '@mui/material/Container';

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const FixedContainer = styled.div`
  width: 100%;
  background-color: #282828;
  position: fixed;
  top: 0px;
  z-index: 10;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
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
  height: 12.73px;
  width: 12.73px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SchoolLocationHeader: React.FC<{
  title?: string;
  onClick: () => void;
}> = ({ title, onClick }) => {
  return (
    <>
      <Container>
        <FixedContainer>
          <Wrapper maxWidth="md">
            <TitleWrapper>
              <Item>{title || ''}</Item>
            </TitleWrapper>
            <CloseIcon src="/assets/icons/close.svg" onClick={onClick} />
          </Wrapper>
        </FixedContainer>
      </Container>
    </>
  );
};
