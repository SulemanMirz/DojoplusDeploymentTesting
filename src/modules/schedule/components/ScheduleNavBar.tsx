import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useScrollTo } from 'react-use-window-scroll';

import { Container } from '../../../shared/components/layout/Container';

const ScheduleNavBarContainer = styled.div`
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
  width: 100%;
  background-color: #111111;
  position: fixed;
  top: 60px;
  z-index: 10;
`;

const List = styled.ul`
  width: 100%;
  margin: 0;
  padding: 10px 0 20px;
  list-style: none;
  display: flex;
  color: #d8d8d8;
  font-size: 14px;
  font-weight: 600;
  justify-content: space-between;
`;

const LinkStyled = styled.span`
  cursor: pointer;
  height: 36px;
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SpanStyled = styled.span`
  margin-left: 0.5px;
`;

type ScheduleNavBarProps = {
  style?: React.CSSProperties;
};

export const ScheduleNavBar: React.FC<ScheduleNavBarProps> = ({ style }) => {
  const [name, setName] = useState('');
  const scrollTo = useScrollTo();

  const scroll = (value: string): void => {
    if (document.getElementById(value) === null) return;
    setName(value);
    scrollTo({
      top: document.getElementById(value).offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const date = new Date();
    const weekdays = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    scroll(weekdays[date.getDay()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();
  const mon = t('mon');
  const tue = t('tue');
  const wed = t('wed');
  const thu = t('thu');
  const fri = t('fri');
  const sat = t('sat');
  const sun = t('sun');

  return (
    <ScheduleNavBarContainer
      style={{
        ...style,
      }}
    >
      <Container>
        <List>
          <li>
            <LinkStyled
              id="menu-item-monday"
              className={name === 'monday' ? 'nav-active' : ''}
              onClick={() => scroll('monday')}
            >
              <SpanStyled>{mon}</SpanStyled>
            </LinkStyled>
          </li>
          <li>
            <LinkStyled
              id="menu-item-tuesday"
              className={name === 'tuesday' ? 'nav-active' : ''}
              onClick={() => scroll('tuesday')}
            >
              <SpanStyled>{tue}</SpanStyled>
            </LinkStyled>
          </li>
          <li>
            <LinkStyled
              id="menu-item-wednesday"
              className={name === 'wednesday' ? 'nav-active' : ''}
              onClick={() => scroll('wednesday')}
            >
              <SpanStyled>{wed}</SpanStyled>
            </LinkStyled>
          </li>
          <li>
            <LinkStyled
              id="menu-item-thursday"
              className={name === 'thursday' ? 'nav-active' : ''}
              onClick={() => scroll('thursday')}
            >
              <SpanStyled>{thu}</SpanStyled>
            </LinkStyled>
          </li>
          <li>
            <LinkStyled
              id="menu-item-friday"
              className={name === 'friday' ? 'nav-active' : ''}
              onClick={() => scroll('friday')}
            >
              <SpanStyled>{fri}</SpanStyled>
            </LinkStyled>
          </li>
          <li>
            <LinkStyled
              id="menu-item-saturday"
              className={name === 'saturday' ? 'nav-active' : ''}
              onClick={() => scroll('saturday')}
            >
              <SpanStyled>{sat}</SpanStyled>
            </LinkStyled>
          </li>
          <li>
            <LinkStyled
              id="menu-item-sunday"
              className={name === 'sunday' ? 'nav-active' : ''}
              onClick={() => scroll('sunday')}
            >
              <SpanStyled>{sun}</SpanStyled>
            </LinkStyled>
          </li>
        </List>
      </Container>
    </ScheduleNavBarContainer>
  );
};
