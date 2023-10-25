import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import DonutGradient from '../../shared/components/DonutGradient';
import ProfileCard from '../../shared/components/ProfileCard';
import {
  TextGray10UppercaseRegular,
  TextWhite16UppercaseRegular,
  TextWhite18Regular400,
  TextWhite18UppercaseRegular,
  TextWhite24Capitalize600,
} from '../../shared/components/texts';
import { Plans } from '../../shared/models/school.model';
import { wideButtonStyles2 } from '../../shared/styles/Button-style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 21px;
  overflow-y: scroll;
`;

const SectionTitle = styled(TextWhite24Capitalize600)`
  margin-bottom: 22px;
  margin-top: 52px;
`;

const Details = styled(TextWhite18Regular400)`
  margin: 6px 0px 22px;
`;

const ButtonWrapper = styled.div`
  margin: 123px 0px 97px;
`;

const Divider = styled.div`
  width: 100%;
  min-height: 1px;
  background: #404040;
`;

const DonutContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const NoSubscribersContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;

const Text = styled(TextWhite18UppercaseRegular)`
  color: #bfbfbf;
`;

type PlanDetailsModalProps = {
  plan: Plans;
  handleEditModal: () => void;
  handleDetailsModal: () => void;
};

const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({
  plan,
  handleEditModal,
  handleDetailsModal,
}) => {
  const { t } = useTranslation();
  const PlanInfo = t('PlanInfo');
  const PlanTitle = t('PlanTitle');
  const PlanDescription = t('PlanDescription');
  const Category = t('Category');
  const Pricing = t('Pricing');
  const SetupFee = t('SetupFee');
  const Type = t('Type');
  const Amount = t('Amount');
  const Interval = t('Interval');
  const Subscriptions = t('Subscriptions');
  const NoSubscriptionShow = t('NoSubscriptionShow');
  const EditPlan = t('EditPlan');
  return (
    <Container>
      <DonutContainer>
        <DonutGradient
          data={
            plan?.subscribers?.length
              ? [
                {
                  value:
                      plan?.subscribers?.length - (plan?.overdue?.length || 0),
                  color: 'url(#colorUv)',
                },
                { value: plan?.overdue?.length || 0, color: '#484847' },
              ]
              : [{ value: 1, color: '#484847' }]
          }
          graphRadius={67}
          viewSize={135}
          label={
            '$' +
            `${
              (parseInt(String(plan?.setupFee)) || 1) *
              (parseInt(String(plan?.price)) || 1) *
              plan?.subscribers?.length
            }.00`
          }
        />
      </DonutContainer>
      <SectionTitle>{PlanInfo}</SectionTitle>
      <>
        <TextGray10UppercaseRegular>{PlanTitle}</TextGray10UppercaseRegular>
        <Details>{plan?.planName}</Details>
        <TextGray10UppercaseRegular>
          {PlanDescription}
        </TextGray10UppercaseRegular>
        <Details>{plan?.planDescription}</Details>
        <TextGray10UppercaseRegular>{Category}</TextGray10UppercaseRegular>
        <Details>{plan?.nameFromCategory}</Details>
      </>
      <>
        <SectionTitle>{Pricing}</SectionTitle>
        <TextGray10UppercaseRegular>{SetupFee}</TextGray10UppercaseRegular>
        <Details>{`${plan?.setupFee || 0}`}</Details>
        <TextGray10UppercaseRegular>{Type}</TextGray10UppercaseRegular>
        <Details>{plan?.type}</Details>
        <TextGray10UppercaseRegular>{Amount}</TextGray10UppercaseRegular>
        <Details>{plan?.price}</Details>
        <TextGray10UppercaseRegular>{Interval}</TextGray10UppercaseRegular>
        <Details>{plan?.frequency}</Details>
      </>
      <>
        <SectionTitle>{Subscriptions}</SectionTitle>

        {plan?.subscribers?.length === 0 && (
          <NoSubscribersContainer>
            <Text>{NoSubscriptionShow}</Text>
          </NoSubscribersContainer>
        )}
        {plan?.subscribers?.map((subscriber) => (
          <ProfileCard
            username={subscriber.usernameFromProfile?.[0]}
            name={subscriber.displayNameFromProfile}
          />
        ))}
        <Divider />
      </>
      <ButtonWrapper>
        <Button
          sx={wideButtonStyles2}
          variant="contained"
          onClick={() => {
            handleEditModal();
            handleDetailsModal();
          }}
        >
          <TextWhite16UppercaseRegular>{EditPlan}</TextWhite16UppercaseRegular>
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default PlanDetailsModal;
