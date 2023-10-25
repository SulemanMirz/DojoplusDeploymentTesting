import React from 'react';
import styled from 'styled-components';
import ContainerMUI from '@mui/material/Container';

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Spacer = styled.div`
  padding-top: 60px;
`;

const FixedContainer = styled.div`
  width: 100%;
  background-color: #111111;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
`;

const Wrapper = styled(ContainerMUI)`
  padding: 8px 0;
  display: flex !important;
  align-items: center !important;
  height: 60px;
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

const Svg = styled.svg``;

const SvgWrapper = styled.div`
  display: flex;
  padding: 10px 10px 10px 5px;
  align-items: center;
  justify-content: center;
`;

type SchoolHeaderProps = {
  title: string;
  onClickBack: () => void;
};

export const SeminarHeader: React.FC<SchoolHeaderProps> = ({
  title,
  onClickBack,
}) => {
  return (
    <>
      <Spacer />
      <Container>
        <FixedContainer>
          <Wrapper maxWidth="md">
            <SvgWrapper onClick={onClickBack}>
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.828 7.00017H16V9.00017H3.828L9.192 14.3642L7.778 15.7782L0 8.00017L7.778 0.222168L9.192 1.63617L3.828 7.00017Z"
                  fill="#FCFCFC"
                />
              </Svg>
            </SvgWrapper>

            <Item>{title}</Item>
          </Wrapper>
        </FixedContainer>
      </Container>
    </>
  );
};
