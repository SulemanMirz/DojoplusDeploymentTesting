import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { TabPanel } from './components/TabPanel';
// import { SChoolUploadCSV } from './components/SchoolUploadCSV';

const a11yProps = (index: number): Record<string, string> => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const CSVUploadView: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="School CSV" {...a11yProps(0)} />
          <Tab label="Schedule CSV" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        <SChoolUploadCSV />
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
};
