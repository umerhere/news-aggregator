import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Grid } from '@mui/material';
import { SearchBar } from '../SearchBar';
import { Link, useLocation } from 'react-router-dom';

interface NavBarProps {
  setSearchedValue: (value: string) => void;
}

interface StyledLinkProps {
  to: string;
  children: React.ReactNode;
}

const StyledLink = ({ to, children }: StyledLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Typography
      variant="h6"
      component="div"
      sx={{ textDecoration: 'none', fontWeight: isActive ? '800' : 'inherit' }}
    >
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
        {children}
      </Link>
    </Typography>
  );
};

const NavBar = ({ setSearchedValue }: NavBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ paddingRight: 0 }}>
          <Grid container alignItems="center">
            <Grid item>
              <StyledLink to="/">Home</StyledLink>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ mx: 1 }}>
                |
              </Typography>
            </Grid>
            <Grid item>
              <StyledLink to="/for-you">For You</StyledLink>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ mx: 1 }}>
                |
              </Typography>
            </Grid>
            <Grid item>
              <StyledLink to="/settings">Settings</StyledLink>
            </Grid>
          </Grid>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <SearchBar setSearchedValue={setSearchedValue} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
