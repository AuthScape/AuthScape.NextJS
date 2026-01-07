import React, {useEffect, useState} from 'react';
import { Avatar, Box, Button, IconButton, Stack, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import {apiService, authService, StripeConnect, ReactDraft} from 'authscape';

import {Menu as MMenu} from '@mui/material';
import {MenuItem as MMenuItem} from '@mui/material';
import dynamic from 'next/dynamic';
import { useTheme } from '../../contexts/ThemeContext';
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
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar';


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
  const { mode } = useTheme();
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
          {name: "Examples", icon: <CodeRoundedIcon/>, href: "/usermanagement/sandbox", disabled: false},
        ]
      },
      {
        title: "Pages",
        nav: [
          {name: "Profile", icon: <AccountCircleRoundedIcon />, href: "/profile", disabled: true},
          {name: "Analytics", icon: <BarChartRoundedIcon/>, href: "/analytics", disabled: false},
          {name: "Kanban", icon: <ViewKanbanRoundedIcon/>, href: "/kanban", disabled: false},
          {name: "FAQ", icon: <HelpRoundedIcon/>, href: "/faq", disabled: false},

          {name: "Pricing", icon: <AttachMoneyRoundedIcon/>, subnav: [
            {name: "Plans", href:"/pricing/plans" },
            {name: "Products", href:"/pricing/product" },
          ]},

          {name: "Error", icon: <ErrorRoundedIcon/>, href: "/404"},
          {name: "Coming Soon", icon: <AccessTimeRoundedIcon/>, href: "/comingsoon", disabled: true},
          {name: "Not Authorized", icon: <BlockRoundedIcon/>, href: "/NA", disabled: true},

          {name: "Products", icon: <InventoryRoundedIcon/>, href: "/products", disabled: true},
          {name: "Mail", icon: <EmailRoundedIcon/>, href: "/mail", disabled: false},
        ]
      },
      {
        title: "Authentication",
        nav: [
          {name: "Login", icon: <LoginRoundedIcon />, href: "/login"},
          {name: "Register", icon: <PersonAddRoundedIcon/>, href: "/signup"},
          {name: "Verify Email", icon: <VerifiedRoundedIcon/>, href: "/verify", disabled: true},
          {name: "Reset Password", icon: <LockResetRoundedIcon/>, href: "/resetpassword", disabled: true},
          {name: "Forgot Password", icon: <LockRoundedIcon/>, href: "/forgotpassword", disabled: true},
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
          {name: "Pricing", icon: <AttachMoneyRoundedIcon />, href: "/pricing", disabled: true},
          {name: "Spreadsheet", icon: <TableChartRoundedIcon/>, href: "/spreadsheet" , disabled: false},
          {name: "Tickets", icon: <ConfirmationNumberRoundedIcon/>, href: "/tickets" , disabled: false},
          {name: "Calendar", icon: <CalendarMonthRoundedIcon/>, href: "/calendar" , disabled: false},
          {name: "Toasts", icon: <NotificationsRoundedIcon/>, href: "/toasts" , disabled: false},

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

          {name: "Add New Address", icon: <LocationOnRoundedIcon/>, href: "/address" , disabled: true},
          {name: "Refer and Earn", icon: <AttachMoneyRoundedIcon/>, href: "/refer", disabled: true},
          {name: "Edit User", icon: <AccountCircleRoundedIcon/>, href: "/profile", disabled: true},
          {name: "Enable One Time Password", icon: <LockRoundedIcon/>, href: "/otp", disabled: true},
          {name: "Enable Two Factor", icon: <SecurityRoundedIcon/>, href: "/enabletwofactor", disabled: true},
        ]
      },
      {
        title: "General",
        nav: [
          {name: "Private Label", icon: <BrandingWatermarkRoundedIcon />, subnav: [{name: "Manage", href:"/privateLabel", disabled: false }]},
          {name: "Charts", icon: <PieChartRoundedIcon />, subnav: [
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
          {name: "Components", icon: <ExtensionRoundedIcon/>, href:"/components", disabled: true},
          {name: "E-commerce", icon: <ShoppingCartRoundedIcon/>, href:"/ecommerce", disabled: true},
          {name: "Calendar", icon: <CalendarMonthRoundedIcon/>, href: "/calendar", disabled: true},
          {name: "Invoice", icon: <ArticleRoundedIcon/>, href: "/invoices", disabled: true},
          {name: "Support", icon: <SupportRoundedIcon/>, href: "/support", disabled: true}
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

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[navigationLayout.theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[navigationLayout.theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[navigationLayout.theme].menu.menuContent, navigationLayout.image != null && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[navigationLayout.theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[navigationLayout.theme].menu.hover.backgroundColor, navigationLayout.image != null ? 0.8 : 1),
        color: themes[navigationLayout.theme].menu.hover.color,
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
      },
      '&.ps-active': {
        backgroundColor: hexToRgba(themes[navigationLayout.theme].menu.hover.backgroundColor, 1),
        color: themes[navigationLayout.theme].menu.hover.color,
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
        backgroundColor={hexToRgba(themes[navigationLayout.theme].sidebar.backgroundColor, navigationLayout.image != null ? 0.9 : 1)}
        rootStyles={{
          color: themes[navigationLayout.theme].sidebar.color,
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
                <div key={index} style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', fontSize:12 }}>
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