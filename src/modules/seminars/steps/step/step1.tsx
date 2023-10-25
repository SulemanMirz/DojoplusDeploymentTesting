import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LoadingButton from '@mui/lab/LoadingButton';
import { StepTitle } from '../../../private-class/components/StepTitle';
import { PrivateClassDivider } from '../../../private-class/components/PrivateClassDivider';
import {
  TextOffWhite14Regular,
  TextWhite18RegularBold,
} from '../../../../shared/components/texts';
import { formatPrice } from '../../../../shared/utils/ultils';
import BasicSelect from '../../../../shared/components/BasicSelect/BasicSelect';

const StepWrapper = styled.div`
  position: relative;
  height: 85vh;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  padding: 34px 18px;
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const SelectWrapper = styled.div`
  padding: 34px 18px;
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const PricingWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ListItemWrapper = styled.div`
  display: flex;
`;
type StepProps = {
  membersPrice: number | null | undefined;
  nonMembersPrice: number | null | undefined;
  currency: string | null | undefined;
  tickets: { members: number; nonMembers: number };
  onTicketChange: (name: string, value: number) => void;
  onChangeStep: (_step: number) => void;
};

const Step1: React.FC<StepProps> = ({
  membersPrice,
  nonMembersPrice,
  currency,
  onTicketChange,
  tickets,
  onChangeStep,
}): JSX.Element => {
  const { t } = useTranslation();
  const textMembers = t('members');
  const textNonMembers = t('nonMembers');
  const TicketsSelection = t('ticketsSelection');
  const Checkout = t('checkout');

  return (
    <StepWrapper>
      <StepTitle title={TicketsSelection} />
      <PrivateClassDivider />
      <ListWrapper>
        <ListItemWrapper>
          <ItemWrapper>
            <TextWhite18RegularBold>{textMembers}</TextWhite18RegularBold>
            <PricingWrapper>
              <TextWhite18RegularBold>
                {formatPrice(membersPrice, currency)}
              </TextWhite18RegularBold>
              <TextOffWhite14Regular>+ Service Fee</TextOffWhite14Regular>
            </PricingWrapper>
          </ItemWrapper>

          <SelectWrapper>
            <BasicSelect
              value={tickets.members}
              options={[0, 1, 2, 3, 4, 5]}
              onChange={(value: string) =>
                onTicketChange('members', parseInt(value))
              }
            />
          </SelectWrapper>
        </ListItemWrapper>
        <PrivateClassDivider variant="inset" />

        <ListItemWrapper>
          <ItemWrapper>
            <TextWhite18RegularBold>{textNonMembers}</TextWhite18RegularBold>
            <PricingWrapper>
              <TextWhite18RegularBold>
                {formatPrice(nonMembersPrice, currency)}
              </TextWhite18RegularBold>
              <TextOffWhite14Regular>+ Service Fee</TextOffWhite14Regular>
            </PricingWrapper>
          </ItemWrapper>
          <SelectWrapper>
            <BasicSelect
              value={tickets.nonMembers}
              options={[0, 1, 2, 3, 4, 5]}
              onChange={(value: string) =>
                onTicketChange('nonMembers', parseInt(value))
              }
            />
          </SelectWrapper>
        </ListItemWrapper>
        <PrivateClassDivider variant="inset" />
      </ListWrapper>
      <ButtonContainer>
        <LoadingButton
          size="large"
          variant="contained"
          style={{ height: 56, width: '80%' }}
          disabled={!(tickets.members || tickets.nonMembers)}
          onClick={() => onChangeStep(2)}
        >
          {Checkout}
        </LoadingButton>
      </ButtonContainer>
    </StepWrapper>
  );
};

export default Step1;
