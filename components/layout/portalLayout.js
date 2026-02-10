import React, {useEffect, useState} from 'react';
import { Avatar, Box, Button, IconButton, Stack, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import {apiService, authService, StripeConnect, ReactDraft} from 'authscape';
import { useAppTheme } from '../../contexts/ThemeContext';

import {Menu as MMenu} from '@mui/material';
import {MenuItem as MMenuItem} from '@mui/material';
import dynamic from 'next/dynamic';
import HeaderBar from './HeaderBar';


import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import BrandingWatermarkRoundedIcon from '@mui/icons-material/BrandingWatermarkRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar';
import { themeConfig, getTheme } from '../ThemeConfig';


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



export default function PortalLayout({children, currentUser, pageProps}) {

  const router = useRouter()
  const { mode } = useAppTheme();
  const isMobile = useMediaQuery('(max-width:900px)');

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);



  const navigationLayout = {
    rtl: false,
    broken: false,
    theme: mode, // Uses the theme from context
    menu: [
      {
        title: "Dashboard",
        nav: [
          {name: "Dashboard", icon: <DashboardRoundedIcon/>, href: "/", disabled: true}
        ]
      },
      {
        title: "Communication",
        nav: [
          {name: "Inbox", icon: <InboxRoundedIcon/>, href: "/inbox", disabled: true},
          {name: "Chat", icon: <ChatRoundedIcon/>, href: "/chat", disabled: true}
        ]
      },
      {
        title: "User Management",
        nav: [
          {name: "Users", icon: <PeopleRoundedIcon/>, href: "/usermanagement/users", disabled: false},
          {name: "Companies", icon: <BusinessRoundedIcon/>, href: "/usermanagement/companies", disabled: false},
          {name: "Locations", icon: <LocationOnRoundedIcon/>, href: "/usermanagement/locations", disabled: false},
          {name: "CRM Integration", icon: <SyncRoundedIcon/>, href: "/usermanagement/crm", disabled: false},
          {name: "Examples", icon: <CodeRoundedIcon/>, href: "/usermanagement/sandbox", disabled: false},
        ]
      },
      {
        title: "Pages",
        nav: [
          {name: "Profile", icon: <AccountCircleRoundedIcon />, href: "/profile", disabled: true},
          {name: "Analytics", icon: <BarChartRoundedIcon/>, href: "/analytics", disabled: false},
          {name: "Kanban", icon: <ViewKanbanRoundedIcon/>, href: "/kanban", disabled: false},
          {name: "Error", icon: <ErrorRoundedIcon/>, href: "/404"},
          {name: "Mail", icon: <EmailRoundedIcon/>, href: "/mail", disabled: false},
        ]
      },
      {
        title: "Authentication",
        nav: [
          {name: "Login", icon: <LoginRoundedIcon />, href: "/login"},
          {name: "Register", icon: <PersonAddRoundedIcon/>, href: "/signup"},
          {name: "Invite User", icon: <GroupAddRoundedIcon/>, href: "/authentication/invite", disabled: false},
        ]
      },
      {
        title: "Components and Modals",
        nav: [
          {name: "Marketplace", icon: <StorefrontRoundedIcon />, subnav: [
            {name: "Default", href:"/marketplace", disabled: false },
            {name: "Styled Example", href:"/marketplace-example", disabled: false },
          ]},
          {name: "Spreadsheet", icon: <TableChartRoundedIcon/>, href: "/spreadsheet" , disabled: false},
          {name: "Tickets", icon: <ConfirmationNumberRoundedIcon/>, href: "/tickets" , disabled: false},
          {name: "Calendar", icon: <CalendarMonthRoundedIcon/>, href: "/calendar" , disabled: false},
          {name: "Toasts", icon: <NotificationsRoundedIcon/>, href: "/toasts" , disabled: false},
          {name: "Error Simulator", icon: <BugReportRoundedIcon/>, href: "/errorSimulator" , disabled: false},
          {name: "Notifications", icon: <NotificationsRoundedIcon/>, subnav: [
            {name: "Sandbox", href:"/notifications/sandbox" },
          ]},

          {name: "Mapping", icon: <MapRoundedIcon/>, subnav: [
            {name: "Upload", href:"/mapping" },
            {name: "Datasources", href:"/mapping/Datasources" },
          ]},

          {name: "Content Management", icon: <ArticleRoundedIcon/>, subnav: [
            {name: "Pages", href:"/contentManagement" },
            {name: "Example Page", href:"/contentManagement/1" },
          ]},

          {name: "Wallet", icon: <AccountBalanceWalletRoundedIcon/>, subnav: [
            {name: "Invoice", href:"/wallet/Invoice" },
            {name: "Store Credit", href:"/wallet/storeCredit", disabled: true },
          ]},

          {name: "Stripe", icon: <PaymentRoundedIcon/>, subnav: [
            {name: "Stripe Connect", href:"/stripe/stripeConnect", disabled: false },
            {name: "Stripe Payment Link", href:"/stripe/stripePaymentLink", disabled: true },
            {name: "Stripe Subscription", href:"/stripe/stripeSubscription", disabled: false },
            {name: "Stripe Pay", href:"/stripe/stripePay" },
            {name: "Add To Wallet", href:"/stripe/stripeAddPaymentToWallet" },
          ]},

          {name: "Color Picker", icon: <PaletteRoundedIcon/>, href: "/components/colorpicker" , disabled: false},
          {name: "Drop Zone", icon: <CloudUploadRoundedIcon/>, href: "/dropzone" , disabled: false},

          {name: "Enable Two Factor", icon: <SecurityRoundedIcon/>, href: "/enabletwofactor", disabled: true},
        ]
      },
      {
        title: "General",
        nav: [
          {name: "Private Label", icon: <BrandingWatermarkRoundedIcon />, subnav: [{name: "Manage", href:"/privateLabel", disabled: false }]},
          {name: "Charts", icon: <PieChartRoundedIcon />, subnav: [
            {name: "Dashboard Report", href:"/charts/dashboardReport", disabled: false },
            {name: "Text Report", href:"/charts/textReport", disabled: false },
            {name: "Table Report", href:"/charts/tableReport", disabled: false },
            {name: "Area Chart", href:"/charts/areaChart", disabled: false },
            {name: "Bar Chart", href:"/charts/barChart", disabled: false },
            {name: "Bubble Chart", href:"/charts/bubbleChart", disabled: false },
            {name: "Calendar Chart", href:"/charts/calendarChart", disabled: false },
            {name: "CandleStick Chart", href:"/charts/candleStickChart", disabled: false },
            {name: "Combo Chart", href:"/charts/comboChart", disabled: false },
            {name: "Donut Chart", href:"/charts/donutChart", disabled: false },
            {name: "Gantt Chart", href:"/charts/ganttChart", disabled: false },
            {name: "Gauge Chart", href:"/charts/gaugeChart", disabled: false },
            {name: "Geo Chart", href:"/charts/geoChart", disabled: false },
            {name: "Histogram Chart", href:"/charts/histogramChart", disabled: false },
            {name: "Line Chart", href:"/charts/lineChart", disabled: false },
            {name: "Org Chart", href:"/charts/orgChart", disabled: false },
            {name: "Pie Chart", href:"/charts/pieChart", disabled: false },
            {name: "Sankey Chart", href:"/charts/sankeyChart", disabled: false },
            {name: "Scatter Chart", href:"/charts/scatterChart", disabled: false },
            {name: "Stepped Area Chart", href:"/charts/steppedAreaChart", disabled: false },
            {name: "Timeline Chart", href:"/charts/timelineChart", disabled: false },
            {name: "Tree Map Chart", href:"/charts/treeMapChart", disabled: false },
            {name: "Waterfall Chart", href:"/charts/waterfallChart", disabled: false },
            {name: "Word Tree Chart", href:"/charts/wordTreeChart", disabled: false },
          ]},
          {name: "Maps", icon: <PublicRoundedIcon/>, href: "/maps", disabled: false},
          {name: "Themes", icon: <DarkModeRoundedIcon/>, href: "/themes", disabled: true},
        ]
      },
    ]
  }


  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

  // Get theme configuration based on current mode
  const currentTheme = getTheme(mode);

  // Theme configuration using centralized ThemeConfig
  // Edit ThemeConfig.js to customize colors for your brand
  const themes = {
    light: {
      sidebar: {
        backgroundColor: '#ffffff',
        backgroundGradient: themeConfig.light.sidebar.background,
        color: themeConfig.light.sidebar.textColor,
        borderColor: themeConfig.light.sidebar.borderColor,
        shadow: themeConfig.light.sidebar.shadowColor,
      },
      menu: {
        menuContent: '#f8fafc',
        icon: themeConfig.light.menu.iconColor,  // Neutral gray for light mode
        hover: {
          backgroundColor: themeConfig.light.menu.hoverBackground,
          color: themeConfig.light.menu.hoverColor,
        },
        active: {
          background: themeConfig.light.menu.activeBackground,
          color: themeConfig.light.menu.activeColor,
        },
        disabled: {
          color: themeConfig.light.menu.disabledColor,
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#1a1a2e',
        backgroundGradient: themeConfig.dark.sidebar.background,
        color: themeConfig.dark.sidebar.textColor,
        borderColor: themeConfig.dark.sidebar.borderColor,
        shadow: themeConfig.dark.sidebar.shadowColor,
      },
      menu: {
        menuContent: '#252542',
        icon: '#a5b4fc', // Light indigo for dark mode
        hover: {
          backgroundColor: themeConfig.dark.menu.hoverBackground,
          color: themeConfig.dark.menu.hoverColor,
        },
        active: {
          background: themeConfig.dark.menu.activeBackground,
          color: themeConfig.dark.menu.activeColor,
        },
        disabled: {
          color: themeConfig.dark.menu.disabledColor,
        },
      },
    },
  };

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 500,
    },
    icon: {
      color: themes[navigationLayout.theme].menu.icon,
      transition: 'all 0.2s ease',
      [`&.${menuClasses.disabled}`]: {
        color: themes[navigationLayout.theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: navigationLayout.theme === 'dark' ? '#6b7280' : '#9ca3af',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[navigationLayout.theme].menu.menuContent, navigationLayout.image != null && !collapsed ? 0.4 : 1)
          : 'transparent',
      borderRadius: '8px',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[navigationLayout.theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: themes[navigationLayout.theme].menu.hover.backgroundColor,
        color: themes[navigationLayout.theme].menu.hover.color,
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        '& .ps-menu-icon': {
          color: navigationLayout.theme === 'dark' ? '#ffffff' : '#1f2937',
        },
      },
      '&.ps-active': {
        background: themes[navigationLayout.theme].menu.active.background,
        color: themes[navigationLayout.theme].menu.active.color,
        borderRadius: '10px',
        boxShadow: navigationLayout.theme === 'dark'
          ? '0 4px 15px rgba(79, 70, 229, 0.25)'
          : '0 2px 8px rgba(0, 0, 0, 0.15)',
        '& .ps-menu-icon': {
          color: '#ffffff',
        },
      },
      margin: '4px 12px',
      padding: '10px 14px',
      borderRadius: '10px',
      transition: 'all 0.2s ease',
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : 500,
    }),
  };

  return (
    <>
    <div style={{ display: 'flex', height: '100%', direction: (navigationLayout.rtl != null && navigationLayout.rtl) ? 'rtl' : 'ltr' }}>
      
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image={navigationLayout.image}
        rtl={(navigationLayout.rtl != null && navigationLayout.rtl)}
        breakPoint="md"
        backgroundColor={themes[navigationLayout.theme].sidebar.backgroundColor}
        rootStyles={{
          color: themes[navigationLayout.theme].sidebar.color,
          background: themes[navigationLayout.theme].sidebar.backgroundGradient,
          borderRight: `1px solid ${themes[navigationLayout.theme].sidebar.borderColor}`,
          boxShadow: `1px 0 8px ${themes[navigationLayout.theme].sidebar.shadow}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

          <div style={{ flex: 1, marginBottom: '32px', overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Box sx={{paddingTop:2, paddingBottom:1}}>
                <Stack direction="row" spacing={2}>
                  <Image src={"/icons/icon-192x192.png"} alt='logo' width={50} height={50} />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', marginTop:14, fontSize:16 }}>
                    AuthScape
                  </Typography>
                </Stack>
              </Box>
            </div>

            {navigationLayout.menu.map((menu, index) => {

              return (
                <>
                <div key={index} style={{ padding: '0 24px', marginBottom: '8px', marginTop: '28px' }}>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    style={{
                      opacity: collapsed ? 0 : 1,
                      letterSpacing: '0.8px',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      color: navigationLayout.theme === 'dark' ? themeConfig.brand.secondary : '#6b7280',
                    }}>
                    {menu.title}
                  </Typography>
                </div>

                {menu.nav != null && menu.nav.map((menuItem, index) => {
                  return (

                    <Menu key={index} menuItemStyles={menuItemStyles}>

                      {menuItem.href != null &&
                      <MenuItem icon={menuItem.icon} disabled={menuItem.disabled} onClick={(e) => {
                        e.preventDefault();
                        if (menuItem.href != null)
                        {
                          router.push(menuItem.href);
                        }

                      }}>{menuItem.name}</MenuItem>
                      }

                      {menuItem.href == null &&
                      <SubMenu label={menuItem.name} icon={menuItem.icon} disabled={menuItem.disabled} onClick={(e) => {

                        e.preventDefault();
                        if (menuItem.href != null)
                        {
                          router.push(menuItem.href);
                        }

                      }}>
                        
                        {menuItem.subnav.map((nav, index) => {
                          return (
                            <MenuItem key={index} disabled={nav.disabled} onClick={(z) => {

                              z.preventDefault();
                              if (nav.href != null)
                              {
                                router.push(nav.href);
                              }

                            }}>{nav.name}</MenuItem>
                          )
                        })}
                      </SubMenu>
                        }

                    </Menu>

                  )
                })}

                </>
              )

            })}

          </div>
        </div>
      </Sidebar>

      <main style={{flex:1, overflowY: 'auto', height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <HeaderBar
          currentUser={currentUser}
          onMenuClick={() => setToggled(!toggled)}
          isMobile={isMobile}
        />

        <Box sx={{flex: 1, overflowY: 'auto'}}>
          <Box sx={{p: { xs: 1.5, sm: 2, md: 3 }}}>

{/* 
            OEM is {pageProps.oemCompanyId == 1 ? "enabled" : "disabled"}<br/>
            companyId: {pageProps.oemCompanyId}  */}


            {children}
          </Box>
        </Box>
      </main>
    </div>

    </>
  )
};