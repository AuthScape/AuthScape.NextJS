import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import { useContentManagement } from './hooks/useContentManagement';

// Icons
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CssRoundedIcon from '@mui/icons-material/CssRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

// Dynamic imports for react-pro-sidebar
const Sidebar = dynamic(
  () => import('react-pro-sidebar').then((mod) => mod.Sidebar),
  { ssr: false }
);
const Menu = dynamic(
  () => import('react-pro-sidebar').then((mod) => mod.Menu),
  { ssr: false }
);
const MenuItem = dynamic(
  () => import('react-pro-sidebar').then((mod) => mod.MenuItem),
  { ssr: false }
);
const SubMenu = dynamic(
  () => import('react-pro-sidebar').then((mod) => mod.SubMenu),
  { ssr: false }
);

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#475569',
    },
    menu: {
      menuContent: '#f8fafc',
      icon: '#2196f3',
      hover: {
        backgroundColor: '#1976d2',
        color: '#ffffff',
      },
      disabled: {
        color: '#cbd5e1',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#1e1e1e',
      color: '#e0e0e0',
    },
    menu: {
      menuContent: '#1e1e1e',
      icon: '#42a5f5',
      hover: {
        backgroundColor: '#1976d2',
        color: '#ffffff',
      },
      disabled: {
        color: '#757575',
      },
    },
  },
};

const menuClasses = {
  root: 'ps-menu-root',
  menuItemRoot: 'ps-menuitem-root',
  subMenuRoot: 'ps-submenu-root',
  button: 'ps-menu-button',
  prefix: 'ps-menu-prefix',
  suffix: 'ps-menu-suffix',
  label: 'ps-menu-label',
  icon: 'ps-menu-icon',
  subMenuContent: 'ps-submenu-content',
  SubMenuExpandIcon: 'ps-submenu-expand-icon',
  disabled: 'ps-disabled',
  active: 'ps-active',
  open: 'ps-open',
};

export default function ContentSidebar({ toggled, setToggled, broken, setBroken }) {
  const { mode } = useTheme();
  const { activeSection, navigateTo, sidebarCollapsed, setSidebarCollapsed } = useContentManagement();

  const currentTheme = themes[mode] || themes.light;

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: currentTheme.menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: currentTheme.menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(currentTheme.menu.menuContent, 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: currentTheme.menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(currentTheme.menu.hover.backgroundColor, 1),
        color: currentTheme.menu.hover.color,
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
      },
      '&.ps-active': {
        backgroundColor: hexToRgba(currentTheme.menu.hover.backgroundColor, 1),
        color: currentTheme.menu.hover.color,
        borderRadius: '8px',
      },
      margin: '4px 8px',
      padding: '8px 12px',
      borderRadius: '8px',
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const contentItems = [
    { id: 'pages', label: 'Pages', icon: <ArticleRoundedIcon /> },
    { id: 'assets', label: 'Assets', icon: <ImageRoundedIcon /> },
    { id: 'routes', label: 'URL Routes', icon: <LinkRoundedIcon /> },
    { id: 'blocklist', label: 'Blocked Contacts', icon: <BlockRoundedIcon /> },
  ];

  const settingsItems = [
    { id: 'branding', label: 'App Icon & Colors', icon: <PaletteRoundedIcon /> },
    { id: 'typography', label: 'Typography', icon: <TextFieldsRoundedIcon /> },
    { id: 'css', label: 'Custom CSS', icon: <CssRoundedIcon /> },
    { id: 'scripts', label: 'Script Imports', icon: <CodeRoundedIcon /> },
  ];

  const handleItemClick = (sectionId) => {
    navigateTo(sectionId);
    if (broken) {
      setToggled(false);
    }
  };

  return (
    <Sidebar
      collapsed={sidebarCollapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      breakPoint="md"
      width="280px"
      backgroundColor={hexToRgba(currentTheme.sidebar.backgroundColor, 1)}
      rootStyles={{
        color: currentTheme.sidebar.color,
        borderRight: mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 2, pt: 3 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ opacity: sidebarCollapsed ? 0 : 1 }}
          >
            Content Management
          </Typography>
        </Box>

        {/* Content Section */}
        <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                opacity: sidebarCollapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                fontSize: 11,
                textTransform: 'uppercase',
              }}
            >
              Content
            </Typography>
          </Box>

          <Menu menuItemStyles={menuItemStyles}>
            {contentItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                active={activeSection === item.id}
                onClick={() => handleItemClick(item.id)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          <Divider sx={{ my: 2, mx: 2 }} />

          {/* Settings Section */}
          <Box sx={{ px: 2, pt: 1, pb: 1 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                opacity: sidebarCollapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                fontSize: 11,
                textTransform: 'uppercase',
              }}
            >
              Settings
            </Typography>
          </Box>

          <Menu menuItemStyles={menuItemStyles}>
            {settingsItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                active={activeSection === item.id}
                onClick={() => handleItemClick(item.id)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0' }}>
          <Typography
            variant="caption"
            sx={{ opacity: sidebarCollapsed ? 0 : 0.5 }}
          >
            v2.0 - Modernized UI
          </Typography>
        </Box>
      </Box>
    </Sidebar>
  );
}
