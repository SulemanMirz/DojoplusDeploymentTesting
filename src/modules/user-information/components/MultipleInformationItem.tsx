import React from 'react';
import styled from 'styled-components';
import {
  TextGray14CapitalizeThin,
  TextWhite14CapitalizeThin,
} from '../../../shared/components/texts';

export const TableRow = styled.div`
  display: flex;
`;

export const TableTag = styled.p`
  width: 120px;
  margin-block: 5px;
`;

export const TableData = styled.p`
  margin-block: 5px;
  display: flex;
  flex-direction: column;
`;

type MultipleInformationItemProps = {
  label: string;
  value: string[];
};

export const MultipleInformationItem: React.FC<MultipleInformationItemProps> =
  ({ label, value }) => {
    return (
      <TableRow>
        <TableTag>
          <TextGray14CapitalizeThin>{label}</TextGray14CapitalizeThin>
        </TableTag>
        <TableData>
          {value.map((val) => (
            <TextWhite14CapitalizeThin style={{ textTransform: 'none' }}>
              {val}
            </TextWhite14CapitalizeThin>
          ))}
        </TableData>
      </TableRow>
    );
  };
