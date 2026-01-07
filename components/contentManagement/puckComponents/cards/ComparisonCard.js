import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  borderRadiusField,
  elevationField,
} from '../shared/fieldTypes';

export const ComparisonCard = {
  label: 'Comparison Card',
  fields: {
    // Header
    title: {
      type: 'text',
      label: 'Title',
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle',
    },

    // Badge
    showBadge: {
      type: 'radio',
      label: 'Show Badge',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    badgeText: {
      type: 'text',
      label: 'Badge Text',
    },
    badgeColor: {
      type: 'select',
      label: 'Badge Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
      ],
    },

    // Features
    features: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        name: { type: 'text', label: 'Feature Name' },
        status: {
          type: 'select',
          label: 'Status',
          options: [
            { label: 'Included', value: 'included' },
            { label: 'Not Included', value: 'excluded' },
            { label: 'Limited/Partial', value: 'partial' },
          ],
        },
        note: { type: 'text', label: 'Note (optional)' },
      },
      defaultItemProps: {
        name: 'Feature name',
        status: 'included',
        note: '',
      },
    },

    // Styling
    highlighted: {
      type: 'radio',
      label: 'Highlighted',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    highlightColor: {
      type: 'text',
      label: 'Highlight Border Color',
    },
    headerBgColor: {
      type: 'text',
      label: 'Header Background Color',
    },
    headerTextColor: {
      type: 'select',
      label: 'Header Text Color',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Body Background Color',
    },
    iconStyle: {
      type: 'select',
      label: 'Icon Style',
      options: [
        { label: 'Colored', value: 'colored' },
        { label: 'Monochrome', value: 'mono' },
      ],
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
  },
  defaultProps: {
    title: 'Pro Plan',
    subtitle: 'For growing teams',
    showBadge: true,
    badgeText: 'Recommended',
    badgeColor: 'primary',
    features: [
      { name: 'Unlimited projects', status: 'included', note: '' },
      { name: 'Priority support', status: 'included', note: '24/7' },
      { name: 'Advanced analytics', status: 'included', note: '' },
      { name: 'Custom integrations', status: 'partial', note: 'Up to 5' },
      { name: 'White labeling', status: 'excluded', note: '' },
      { name: 'Dedicated account manager', status: 'excluded', note: '' },
    ],
    highlighted: true,
    highlightColor: '',
    headerBgColor: '',
    headerTextColor: 'dark',
    backgroundColor: '#ffffff',
    iconStyle: 'colored',
    elevation: 1,
    borderRadius: 2,
  },
  render: ({
    title,
    subtitle,
    showBadge,
    badgeText,
    badgeColor,
    features,
    highlighted,
    highlightColor,
    headerBgColor,
    headerTextColor,
    backgroundColor,
    iconStyle,
    elevation,
    borderRadius,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    const getStatusIcon = (status) => {
      const isColored = iconStyle === 'colored';

      switch (status) {
        case 'included':
          return (
            <CheckCircleIcon
              sx={{
                color: isColored ? 'success.main' : 'text.primary',
                fontSize: 22,
              }}
            />
          );
        case 'excluded':
          return (
            <CancelIcon
              sx={{
                color: isColored ? 'error.main' : 'text.disabled',
                fontSize: 22,
              }}
            />
          );
        case 'partial':
          return (
            <RemoveCircleOutlineIcon
              sx={{
                color: isColored ? 'warning.main' : 'text.secondary',
                fontSize: 22,
              }}
            />
          );
        default:
          return null;
      }
    };

    const getStatusTextColor = (status) => {
      switch (status) {
        case 'included':
          return 'text.primary';
        case 'excluded':
          return 'text.disabled';
        case 'partial':
          return 'text.secondary';
        default:
          return 'text.primary';
      }
    };

    return (
      <Paper
        elevation={highlighted ? elevation + 2 : elevation}
        sx={{
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: highlighted ? '2px solid' : '1px solid',
          borderColor: highlighted ? (highlightColor || 'primary.main') : 'divider',
          transform: highlighted ? 'scale(1.02)' : 'none',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: highlighted ? 'scale(1.04)' : 'scale(1.02)',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            backgroundColor: headerBgColor || (highlighted ? 'primary.main' : 'grey.100'),
            position: 'relative',
          }}
        >
          {/* Badge */}
          {showBadge && badgeText && (
            <Chip
              label={badgeText}
              color={badgeColor}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 600,
              }}
            />
          )}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: headerTextColor === 'light' || (highlighted && !headerBgColor) ? '#ffffff' : 'text.primary',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: headerTextColor === 'light' || (highlighted && !headerBgColor) ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Features List */}
        <Box
          sx={{
            backgroundColor: backgroundColor,
            flex: 1,
            p: 2,
          }}
        >
          <List dense disablePadding>
            {features.map((feature, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 1,
                  py: 1,
                  borderBottom: index < features.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {getStatusIcon(feature.status)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: getStatusTextColor(feature.status),
                          textDecoration: feature.status === 'excluded' ? 'line-through' : 'none',
                        }}
                      >
                        {feature.name}
                      </Typography>
                      {feature.note && (
                        <Chip
                          label={feature.note}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            backgroundColor: 'action.hover',
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    );
  },
};

export default ComparisonCard;
