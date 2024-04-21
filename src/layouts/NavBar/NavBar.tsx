import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavBarDrawer from '../NavBarDrawer/NavBarDrawer';
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
        <Toolbar sx={{ justifyContent: 'space-between',  paddingRight: 0 }}>
          {/* Left side */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu" 
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          
          {/* Center */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
            <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="div">
              |
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 1 }}>
            <Link to="/for-you">For You</Link>
            </Typography>
            <Typography variant="h6" component="div">
              |
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 1 }}>
            <Link to="/settings">Settings</Link>
            </Typography>
            <NavBarDrawer open={open} toggleDrawer={toggleDrawer} />
          </Box>
          
          {/* Right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <NavBarDrawer open={open} toggleDrawer={toggleDrawer} />
            <SearchBar setSearchedValue={setSearchedValue} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
