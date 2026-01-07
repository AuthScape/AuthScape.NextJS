import React, { useState } from 'react';
import {
  Box,
  Tabs as MuiTabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import {
  borderRadiusField,
} from '../shared/fieldTypes';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export const Tabs = {
  label: 'Tabs',
  fields: {
    tabs: {
      type: 'array',
      label: 'Tabs',
      arrayFields: {
        label: { type: 'text', label: 'Tab Label' },
        content: { type: 'textarea', label: 'Tab Content' },
        icon: { type: 'text', label: 'Icon (Material Icon name)' },
      },
      defaultItemProps: {
        label: 'New Tab',
        content: 'Tab content goes here.',
        icon: '',
      },
    },

    // Layout
    variant: {
      type: 'select',
      label: 'Tab Style',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Fullwidth', value: 'fullWidth' },
        { label: 'Scrollable', value: 'scrollable' },
      ],
    },
    orientation: {
      type: 'select',
      label: 'Orientation',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    centered: {
      type: 'radio',
      label: 'Center Tabs (horizontal only)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    defaultTab: {
      type: 'number',
      label: 'Default Active Tab (0-based)',
    },

    // Styling
    tabStyle: {
      type: 'select',
      label: 'Tab Button Style',
      options: [
        { label: 'Underlined', value: 'underlined' },
        { label: 'Contained', value: 'contained' },
        { label: 'Pills', value: 'pills' },
      ],
    },
    indicatorColor: {
      type: 'select',
      label: 'Indicator Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIndicatorColor: {
      type: 'text',
      label: 'Custom Indicator Color',
    },
    tabColor: {
      type: 'select',
      label: 'Tab Text Color',
      options: [
        { label: 'Default', value: 'inherit' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    contentBackgroundColor: {
      type: 'text',
      label: 'Content Background Color',
    },
    borderRadius: borderRadiusField,

    // Content
    contentPadding: {
      type: 'select',
      label: 'Content Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small (16px)', value: 16 },
        { label: 'Medium (24px)', value: 24 },
        { label: 'Large (32px)', value: 32 },
      ],
    },
    minHeight: {
      type: 'number',
      label: 'Content Min Height (px)',
    },
  },
  defaultProps: {
    tabs: [
      { label: 'Overview', content: 'This is the overview content. You can add detailed information about your product or service here.', icon: '' },
      { label: 'Features', content: 'List your key features:\n\n• Feature 1: Description\n• Feature 2: Description\n• Feature 3: Description', icon: '' },
      { label: 'Pricing', content: 'Our pricing is simple and transparent. Choose the plan that works best for you.', icon: '' },
      { label: 'FAQ', content: 'Frequently asked questions will be answered here. This helps users find quick answers.', icon: '' },
    ],
    variant: 'standard',
    orientation: 'horizontal',
    centered: false,
    defaultTab: 0,
    tabStyle: 'underlined',
    indicatorColor: 'primary',
    customIndicatorColor: '',
    tabColor: 'inherit',
    backgroundColor: 'transparent',
    contentBackgroundColor: '#ffffff',
    borderRadius: 0,
    contentPadding: 24,
    minHeight: 200,
  },
  render: ({
    tabs,
    variant,
    orientation,
    centered,
    defaultTab,
    tabStyle,
    indicatorColor,
    customIndicatorColor,
    tabColor,
    backgroundColor,
    contentBackgroundColor,
    borderRadius,
    contentPadding,
    minHeight,
  }) => {
    const [value, setValue] = useState(defaultTab || 0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    const getTabStyles = () => {
      switch (tabStyle) {
        case 'contained':
          return {
            '& .MuiTab-root': {
              backgroundColor: 'action.hover',
              margin: '4px',
              borderRadius: 1,
              minHeight: 40,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          };
        case 'pills':
          return {
            '& .MuiTab-root': {
              margin: '4px 8px',
              borderRadius: '20px',
              minHeight: 36,
              padding: '6px 16px',
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.main',
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          };
        default:
          return {};
      }
    };

    const isVertical = orientation === 'vertical';

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: isVertical ? 'row' : 'column',
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
        }}
      >
        {/* Tabs */}
        <Box
          sx={{
            borderBottom: !isVertical && tabStyle === 'underlined' ? 1 : 0,
            borderRight: isVertical && tabStyle === 'underlined' ? 1 : 0,
            borderColor: 'divider',
          }}
        >
          <MuiTabs
            value={value}
            onChange={handleChange}
            variant={variant}
            orientation={orientation}
            centered={centered && !isVertical}
            textColor={tabColor}
            indicatorColor={indicatorColor === 'custom' ? undefined : indicatorColor}
            sx={{
              ...getTabStyles(),
              ...(indicatorColor === 'custom' && customIndicatorColor && {
                '& .MuiTabs-indicator': {
                  backgroundColor: customIndicatorColor,
                },
              }),
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={
                  tab.icon ? (
                    <Box
                      component="span"
                      className="material-icons"
                      sx={{ fontSize: 20 }}
                    >
                      {tab.icon}
                    </Box>
                  ) : undefined
                }
                iconPosition="start"
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
              />
            ))}
          </MuiTabs>
        </Box>

        {/* Tab Panels */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: contentBackgroundColor,
            minHeight: minHeight ? `${minHeight}px` : 'auto',
          }}
        >
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={value} index={index}>
              <Box sx={{ padding: `${contentPadding}px` }}>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.7,
                  }}
                >
                  {tab.content}
                </Typography>
              </Box>
            </TabPanel>
          ))}
        </Box>
      </Box>
    );
  },
};

export default Tabs;
