import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import the MarketplaceStyled component to avoid SSR issues
const MarketplaceStyled = dynamic(
  () => import('../../../marketplace/MarketplaceStyled').then(mod => mod.default || mod.MarketplaceStyled),
  {
    ssr: false,
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    )
  }
);

export const MarketplaceEmbed = {
  label: 'Marketplace',
  fields: {
    // Required Configuration
    platformId: {
      type: 'number',
      label: 'Platform ID',
    },
    oemCompanyId: {
      type: 'number',
      label: 'OEM Company ID (optional)',
    },

    // Display Options
    pageSize: {
      type: 'select',
      label: 'Products Per Page',
      options: [
        { label: '6', value: 6 },
        { label: '12', value: 12 },
        { label: '24', value: 24 },
        { label: '48', value: 48 },
      ],
    },
    cardGridSize: {
      type: 'select',
      label: 'Grid Columns',
      options: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
      ],
    },

    // Filter Options
    expandAllCategoriesByDefault: {
      type: 'radio',
      label: 'Expand All Filter Categories',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    maxHeightScrolling: {
      type: 'select',
      label: 'Filter Scroll Height',
      options: [
        { label: '200px', value: 200 },
        { label: '300px', value: 300 },
        { label: '400px', value: 400 },
        { label: '500px', value: 500 },
      ],
    },

    // Behavior
    smoothScrollEnable: {
      type: 'radio',
      label: 'Smooth Scroll on Page Change',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Customization
    searchPlaceholder: {
      type: 'text',
      label: 'Search Placeholder Text',
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    minHeight: {
      type: 'text',
      label: 'Minimum Height (e.g., 600px)',
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
      ],
    },
  },
  defaultProps: {
    platformId: 1,
    oemCompanyId: null,
    pageSize: 12,
    cardGridSize: 3,
    expandAllCategoriesByDefault: true,
    maxHeightScrolling: 300,
    smoothScrollEnable: true,
    searchPlaceholder: 'Search for products...',
    backgroundColor: '',
    minHeight: '600px',
    padding: 0,
  },
  render: ({
    platformId,
    oemCompanyId,
    pageSize,
    cardGridSize,
    expandAllCategoriesByDefault,
    maxHeightScrolling,
    smoothScrollEnable,
    searchPlaceholder,
    backgroundColor,
    minHeight,
    padding,
  }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Show placeholder in editor if no platformId
    if (!platformId) {
      return (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Marketplace Component
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please configure a Platform ID to display the marketplace
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          backgroundColor: backgroundColor || 'transparent',
          minHeight: minHeight || 'auto',
          p: padding,
          position: 'relative',
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <MarketplaceStyled
          platformId={platformId}
          oemCompanyId={oemCompanyId}
          pageSize={pageSize}
          cardGridSize={cardGridSize}
          expandAllCategoriesByDefault={expandAllCategoriesByDefault}
          maxHeightScrolling={maxHeightScrolling}
          smoothScrollEnable={smoothScrollEnable}
          searchPlaceholder={searchPlaceholder}
          setIsLoading={setIsLoading}
        />
      </Box>
    );
  },
};

export default MarketplaceEmbed;
