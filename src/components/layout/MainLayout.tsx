import React from 'react';
import { Box } from '@mui/material';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box sx={{ paddingTop: '0px' }}>
      {children}
    </Box>
  );
};

export default Layout;
