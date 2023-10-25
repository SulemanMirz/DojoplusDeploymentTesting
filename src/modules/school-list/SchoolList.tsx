import React from 'react';
import { useRouter } from 'next/router';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import { School } from '../../shared/types/generated';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

type SchoolListType = {
  schoolData: [{ schoolName: string; slug: string }];
};

export const SchoolList: React.FC<SchoolListType> = ({ schoolData }) => {
  const router = useRouter();

  const count = schoolData?.length || 0;

  const renderRow = (
    props: ListChildComponentProps<School>,
  ): React.ReactElement => {
    const { index, style } = props;

    return (
      <ListItem
        onClick={() => {
          if (schoolData[index]?.slug) {
            router.push(`/school/${schoolData[index]?.slug}/info`);
          }
        }}
        style={style}
        key={index}
        disablePadding
      >
        <ListItemButton>
          <ListItemText
            primary={`${index} -- ${
              schoolData[index]?.schoolName || 'This school has no name'
            }`}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          width={width}
          height={height}
          itemSize={46}
          itemCount={count}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
