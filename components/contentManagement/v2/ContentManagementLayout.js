import React, { useState } from 'react';
import { Box, IconButton, Snackbar, Alert, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ContentManagementProvider, useContentManagement } from './hooks/useContentManagement';
import ContentSidebar from './ContentSidebar';
import ContentBreadcrumb from './shared/ContentBreadcrumb';
import { useAppTheme } from 'authscape';

// Content sections
import PagesSection from './pages/PagesSection';
import AssetsSection from './assets/AssetsSection';
import UrlRoutesSection from './routes/UrlRoutesSection';
import BlockedContactsSection from './blocklist/BlockedContactsSection';
import BrandingSection from './settings/BrandingSection';
import TypographySection from './settings/TypographySection';
import CustomCSSSection from './settings/CustomCSSSection';
import ScriptImportsSection from './settings/ScriptImportsSection';

function ContentManagementContent() {
  const { mode } = useAppTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const {
    activeSection,
    notification,
    clearNotification,
  } = useContentManagement();

  const renderSection = () => {
    switch (activeSection) {
      case 'pages':
        return <PagesSection />;
      case 'assets':
        return <AssetsSection />;
      case 'routes':
        return <UrlRoutesSection />;
      case 'blocklist':
        return <BlockedContactsSection />;
      case 'branding':
        return <BrandingSection />;
      case 'typography':
        return <TypographySection />;
      case 'css':
        return <CustomCSSSection />;
      case 'scripts':
        return <ScriptImportsSection />;
      default:
        return <PagesSection />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      {/* Sidebar */}
      <ContentSidebar
        toggled={toggled}
        setToggled={setToggled}
        broken={broken}
        setBroken={setBroken}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          backgroundColor: mode === 'dark' ? '#121212' : '#f5f5f5',
        }}
      >
        {/* Mobile menu button */}
        {broken && (
          <Box sx={{ p: 1 }}>
            <IconButton onClick={() => setToggled(!toggled)}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
          <ContentBreadcrumb />
          {renderSection()}
        </Box>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={5000}
        onClose={clearNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {notification && (
          <Alert
            onClose={clearNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}

export default function ContentManagementLayout({
  config,
  minHeight,
  configLoad,
  oemCompanyId,
  notification,
}) {
  return (
    <ContentManagementProvider
      oemCompanyId={oemCompanyId}
      config={config}
      configLoad={configLoad}
    >
      <ContentManagementContent />
    </ContentManagementProvider>
  );
}
