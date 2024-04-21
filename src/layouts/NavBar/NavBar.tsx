import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Grid } from '@mui/material';
import { SearchBar } from '../SearchBar'
import { Link } from "react-router-dom";

interface NavBarProps {
  setSearchedValue: (value: string) => void
  
}

const NavBar = ({setSearchedValue}: NavBarProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ paddingRight: 0 }}>
          
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6" component="div">
                <Link to="/">Home</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ mx: 1 }}>
                |
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div">
                <Link to="/for-you">For You</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ mx: 1 }}>
                |
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div">
                <Link to="/settings">Settings</Link>
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <SearchBar setSearchedValue={setSearchedValue} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
