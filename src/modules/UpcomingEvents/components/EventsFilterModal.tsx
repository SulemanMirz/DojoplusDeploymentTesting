/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Section } from '../../../shared/components/layout/Section';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { TextWhite16Regular } from '../../../shared/components/texts';
import ModalOverlay from '../../modal-overlay';

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
  cursor: pointer;
`;

const FilterSection = styled.div`
  margin: 30px 16px 4px 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #4f4f4f;
`;

const SelectionHeading = styled(TextWhite16Regular)`
  margin-left: 8px;
`;

const CheckBoxText = styled.span<{ selected }>`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ selected }) => (selected ? '#FCFCFC' : '#bdbdbd')};
`;

const CheckBoxEmpty = styled.span`
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 1px solid #4f4f4f;
  border-radius: 2px;
`;

const CheckBoxSelected = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px;
  width: 16px;
  height: 16px;
  background: #7062ff;
  border-radius: 2px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const CheckBoxTic = styled.img`
  height: 12px;
  width: 12px;
`;

export interface FilterData {
  name: string;
  selected: boolean;
}

type EventsFilterModalProps = {
  handleModal: () => void;
  // martialArts?: FilterData[] | null | undefined;
  // eventTypes?: FilterData[] | null | undefined;
  locations?: FilterData[] | null | undefined;
  open: boolean;
  handleApply: (
    martial: FilterData[],
    type: FilterData[],
    locationParam: FilterData[],
  ) => void;
};

export const EventsFilterModal: React.FC<EventsFilterModalProps> = ({
  handleModal,
  // martialArts,
  // eventTypes,
  locations,
  handleApply,
  open,
}) => {
  // const [martialArt, setMartialArt] = useState(
  //   JSON.parse(JSON.stringify(martialArts)),
  // );
  // const [eventType, setEventType] = useState(
  //   JSON.parse(JSON.stringify(eventTypes)),
  // );
  const [location, setLocation] = useState(
    JSON.parse(JSON.stringify(locations)),
  );

  // console.log(location, locations, 'locations');

  // const updateSelected: (index: number) => void = (index) => {
  //   const newArr = [...martialArt];
  //   newArr[index].selected = !martialArt[index].selected;
  //   setMartialArt(newArr);
  // };

  useEffect(() => {
    setLocation(locations);
  }, [locations]);

  // const updateSelectedEvent: (index: number) => void = (index) => {
  //   const newArr = [...eventType];
  //   newArr[index].selected = !eventType[index].selected;
  //   setEventType(newArr);
  // };

  const updateSelectedLocation: (index: number) => void = (index) => {
    const newArr = [...location];
    newArr[index].selected = !location[index].selected;
    setLocation(newArr);
  };

  const handleClear: () => void = () => {
    // const martial = martialArt.map((el) => {
    //   return { ...el, selected: false };
    // });
    // const type = eventType.map((el) => {
    //   return { ...el, selected: false };
    // });
    const locationParam = location.map((el) => {
      return { ...el, selected: false };
    });

    // setMartialArt(martial);
    // setEventType(type);
    setLocation(locationParam);
    handleApply([], [], locationParam);
  };

  return (
    <ModalOverlay
      onCloseClick={handleModal}
      open={open}
      title="More Filters"
      height="calc( 100vh - 50px )">
      <Section
        style={{
          width: '100%',
          backgroundColor: '#282828',
          overflowY: 'scroll',
        }}>
        <MainProfile>
          <Container style={{ padding: '10px 0px 36px' }} notGutters isFlexGrow>
            {/* <FilterSection>
              <SelectionHeading>Martial Arts</SelectionHeading>
              {martialArt.map((val, idx) => (
                <SelectionContainer
                  key={idx}
                  onClick={() => {
                    updateSelected(idx);
                  }}>
                  <CheckBoxText selected={val.selected}>
                    {val.name}
                  </CheckBoxText>
                  {val.selected ? (
                    <CheckBoxSelected>
                      <CheckBoxTic src="/assets/icons/tic.svg" />
                    </CheckBoxSelected>
                  ) : (
                    <CheckBoxEmpty />
                  )}
                </SelectionContainer>
              ))}
            </FilterSection>
            {eventType && (
              <FilterSection>
                <SelectionHeading>Types</SelectionHeading>
                {eventType.map((val, idx) => (
                  <SelectionContainer
                    key={idx}
                    onClick={() => {
                      updateSelectedEvent(idx);
                    }}>
                    <CheckBoxText selected={val.selected}>
                      {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                    </CheckBoxText>
                    {val.selected ? (
                      <CheckBoxSelected>
                        <CheckBoxTic src="/assets/icons/tic.svg" />
                      </CheckBoxSelected>
                    ) : (
                      <CheckBoxEmpty />
                    )}
                  </SelectionContainer>
                ))}
              </FilterSection>
            )} */}
            {location && (
              <FilterSection>
                <SelectionHeading>Locations</SelectionHeading>
                {location.map((val, idx) => (
                  <SelectionContainer
                    key={idx}
                    onClick={() => {
                      updateSelectedLocation(idx);
                    }}>
                    <CheckBoxText selected={val.selected}>
                      {val.name}
                    </CheckBoxText>
                    {val.selected ? (
                      <CheckBoxSelected>
                        <CheckBoxTic src="/assets/icons/tic.svg" />
                      </CheckBoxSelected>
                    ) : (
                      <CheckBoxEmpty />
                    )}
                  </SelectionContainer>
                ))}
              </FilterSection>
            )}
            <ButtonsContainer>
              <Button
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  marginTop: 40,
                  width: 144,
                  height: 53,
                  backgroundColor: 'transparent',
                }}
                onClick={handleClear}
                variant="contained">
                Clear
              </Button>
              <Button
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  marginTop: 40,
                  width: 144,
                  height: 53,
                }}
                onClick={() => handleApply([], [], location)}
                variant="contained">
                Apply
              </Button>
            </ButtonsContainer>
          </Container>
        </MainProfile>
      </Section>
    </ModalOverlay>
  );
};
