import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  position: fixed;
  right: 12px;
`;

const Alphabet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AlphabetLetter = styled.div<{ isActive }>`
  font-size: 12px;
  text-align: center;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? '#7062FF' : '#282828')};
  font-weight: ${({ isActive }) => (isActive ? '400' : '300')};
`;

type AlphabetListProps = {
  handleLetterClick?: (letter) => void;
  activeLetter?: string;
};

const AlphabetList: React.FC<AlphabetListProps> = ({
  handleLetterClick,
  activeLetter,
}) => {
  return (
    <Container>
      <Alphabet>
        {Array.from({ length: 26 }, (_, i) => i + 65).map((charCode) => {
          const letter = String.fromCharCode(charCode);
          const isActive = letter === activeLetter;

          return (
            <AlphabetLetter
              key={letter}
              isActive={isActive}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </AlphabetLetter>
          );
        })}
      </Alphabet>
    </Container>
  );
};

export default AlphabetList;
