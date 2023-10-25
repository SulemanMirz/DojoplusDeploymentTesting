import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const NamePlan = styled.h3`
  margin: 0 auto 4px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`;

const Text = styled.h3`
  margin: 0 auto 4px;
  font-weight: 600;
  font-size: 14px;
`;

const StyleDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Price = styled.span`
  color: #ff595f;
  opacity: 1;
  text-decoration: line-through;
  font-size: 14px;
  line-height: 22.04px;
  font-weight: 600;
  margin-left: 2px;
`;

type OfferProps = {
  recommended: boolean;
};

const Offer = styled.span<OfferProps>`
  color: ${(props) => (props.recommended ? '#d4fe44' : '#828282')};
  opacity: 1;
  font-size: 24px;
  font-weight: 600;
`;

const WrapperCard = styled.div<OfferProps>`
  margin-bottom: 16px;
  position: relative;
  background: ${(props) =>
    props.recommended ? 'rgba(212, 254, 68, 0.1)' : 'transparent'};
  border-radius: 4px;
  border: ${(props) =>
    props.recommended
      ? '2px solid rgba(212, 254, 68, 0.1)'
      : '2px solid #828282'};
`;

const Recommended = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;

  position: absolute;
  width: 93px;
  height: 18px;
  left: 15px;
  top: -9px;

  background: #d4fe44;
  border-radius: 4px;
  color: #000;
  font-weight: 700;
`;

type PlanProps = {
  name: string;
  price: string;
  offer: string;
  recommended?: boolean;
};

export const PlanCard: React.FC<PlanProps> = ({
  name,
  price,
  offer,
  recommended = false,
}) => {
  return (
    <>
      <WrapperCard recommended={recommended}>
        <Card>
          {recommended ? <Recommended>Recommended</Recommended> : null}
          <NamePlan>{name}</NamePlan>
          <StyleDiv>
            <Text>was</Text>
            <Price>{price}</Price>
          </StyleDiv>
          <StyleDiv>
            <Offer recommended={recommended}>{offer}*</Offer>
          </StyleDiv>
        </Card>
      </WrapperCard>
    </>
  );
};

PlanCard.defaultProps = {
  recommended: false,
};
