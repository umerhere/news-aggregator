import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (active: boolean) => ({
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: active ? 'bold' : 'normal',
    fontSize: active ? '1.2rem' : '1rem',
    marginRight: active ? 3 : 2,
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={linkStyle(isActive('/'))}
          >
            Home
          </Box>
          <Box
            component={RouterLink}
            to="/for-you"
            sx={linkStyle(isActive('/for-you'))}
          >
            For You
          </Box>
        </Typography>

        <IconButton color="inherit" onClick={handleAvatarClick}>
          <Avatar alt="Profile" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={RouterLink} to="/settings">Settings</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
