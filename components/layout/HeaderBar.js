import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemIcon,
  Switch,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationCenter from './NotificationCenter';
import { authService, useAppTheme } from 'authscape';
import { themeConfig } from '../ThemeConfig';

const HeaderBar = ({ currentUser, onMenuClick, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleTheme } = useAppTheme();
  const muiTheme = useMuiTheme();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await authService().logout();
    handleClose();
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    const nameParts = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`,
    };
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: mode === 'dark'
          ? themeConfig.dark.header.background
          : themeConfig.light.header.background,
        borderBottom: `1px solid ${mode === 'dark'
          ? themeConfig.dark.header.borderBottom
          : themeConfig.light.header.borderBottom}`,
        borderTop: `3px solid ${themeConfig.brand.primary}`,
        color: muiTheme.palette.text.primary,
        boxShadow: mode === 'dark'
          ? themeConfig.dark.header.shadowColor
          : themeConfig.light.header.shadowColor,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              '&:hover': {
                backgroundColor: mode === 'dark'
                  ? `rgba(139, 92, 246, 0.1)`
                  : `rgba(79, 70, 229, 0.08)`,
              },
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <NotificationCenter />

        <IconButton
          onClick={handleClick}
          sx={{
            ml: 1,
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? `rgba(139, 92, 246, 0.1)`
                : `rgba(79, 70, 229, 0.08)`,
            },
          }}
        >
          {currentUser && (
            <Avatar
              {...stringAvatar(`${currentUser.firstName} ${currentUser.lastName}`)}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              sx={{
                width: 40,
                height: 40,
                background: `linear-gradient(135deg, ${themeConfig.brand.primary} 0%, ${themeConfig.brand.secondary} 100%)`,
                border: '2px solid',
                borderColor: mode === 'dark'
                  ? `rgba(139, 92, 246, 0.3)`
                  : `rgba(79, 70, 229, 0.15)`,
                boxShadow: `0 2px 8px rgba(79, 70, 229, 0.2)`,
                fontWeight: 600,
              }}
            />
          )}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              minWidth: 260,
              borderRadius: '12px',
              border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb'}`,
              boxShadow: mode === 'dark'
                ? '0 10px 40px rgba(0, 0, 0, 0.5)'
                : '0 10px 40px rgba(0, 0, 0, 0.12)',
              backgroundColor: mode === 'dark' ? '#1a1a2e' : '#ffffff',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: mode === 'dark' ? '#1a1a2e' : '#ffffff',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                borderTop: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb'}`,
                borderLeft: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb'}`,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {currentUser && `${currentUser.firstName} ${currentUser.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
              {currentUser && currentUser.email}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb' }} />

          <MenuItem
            onClick={handleClose}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: mode === 'dark'
                  ? 'rgba(139, 92, 246, 0.15)'
                  : 'rgba(79, 70, 229, 0.06)',
              },
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" sx={{ color: themeConfig.brand.primary }} />
            </ListItemIcon>
            My Profile
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: mode === 'dark'
                  ? 'rgba(139, 92, 246, 0.15)'
                  : 'rgba(79, 70, 229, 0.06)',
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" sx={{ color: themeConfig.brand.secondary }} />
            </ListItemIcon>
            Settings
          </MenuItem>

          <Divider sx={{ borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb' }} />

          <MenuItem
            onClick={toggleTheme}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: '8px',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: mode === 'dark'
                  ? 'rgba(139, 92, 246, 0.15)'
                  : 'rgba(79, 70, 229, 0.06)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                {mode === 'light' ? (
                  <LightModeIcon fontSize="small" sx={{ color: themeConfig.status.warning }} />
                ) : (
                  <DarkModeIcon fontSize="small" sx={{ color: '#a5b4fc' }} />
                )}
              </ListItemIcon>
              <Typography>Dark Mode</Typography>
            </Box>
            <Switch
              checked={mode === 'dark'}
              size="small"
              onClick={(e) => e.stopPropagation()}
              onChange={toggleTheme}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: themeConfig.brand.secondary,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: themeConfig.brand.secondary,
                },
              }}
            />
          </MenuItem>

          <Divider sx={{ borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb' }} />

          <MenuItem
            onClick={handleLogout}
            sx={{
              mx: 1,
              my: 0.5,
              mb: 1,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: `rgba(239, 68, 68, 0.08)`,
                '& .MuiListItemIcon-root': {
                  color: themeConfig.status.error,
                },
                '& .MuiTypography-root': {
                  color: themeConfig.status.error,
                },
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: themeConfig.status.error }} />
            </ListItemIcon>
            <Typography sx={{ color: themeConfig.status.error }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
