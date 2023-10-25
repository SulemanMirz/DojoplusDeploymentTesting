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
`;

type InformationItemProps = {
  label: string;
  value: string;
};

export const InformationItem: React.FC<InformationItemProps> = ({
  label,
  value,
}) => {
  return (
    <TableRow>
      <TableTag>
        <TextGray14CapitalizeThin>{label}</TextGray14CapitalizeThin>
      </TableTag>
      <TableData>
        <TextWhite14CapitalizeThin style={{ textTransform: 'none' }}>
          {value}
        </TextWhite14CapitalizeThin>
      </TableData>
    </TableRow>
  );
};
