import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 38px;
`;

const Title = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;

const IconsContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;
const RectangleBox = styled.div`
  box-sizing: border-box;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #4f4f4f;
`;

const IconDescription = styled.div`
  margin-top: 6px;
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
`;
const IconTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const Icons = styled.img``;

interface AmenitiesProps {
  data: string[] | undefined | null;
}

const Amenities: React.FC<AmenitiesProps> = ({ data }) => {
  return (
    <Container>
      <Title>Amenitiess</Title>
      <IconsContainer>
        {data?.map((amenity) => (
          <IconTitleContainer>
            <RectangleBox>
              <Icons src={`/assets/icons/${amenity.toLowerCase()}.svg`} />
            </RectangleBox>
            <IconDescription>{amenity}</IconDescription>
          </IconTitleContainer>
        ))}
      </IconsContainer>
    </Container>
  );
};

export default Amenities;
