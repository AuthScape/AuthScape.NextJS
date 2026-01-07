import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const iconMap = {
  verified: VerifiedIcon,
  security: SecurityIcon,
  shipping: LocalShippingIcon,
  support: SupportAgentIcon,
  payment: PaymentIcon,
  lock: LockIcon,
  thumbs_up: ThumbUpIcon,
  star: StarIcon,
  premium: WorkspacePremiumIcon,
  check: CheckCircleIcon,
};

export const TrustBadges = {
  label: 'Trust Badges',
  fields: {
    // Badges
    badges: {
      type: 'array',
      label: 'Badges',
      arrayFields: {
        icon: {
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Verified', value: 'verified' },
            { label: 'Security', value: 'security' },
            { label: 'Shipping', value: 'shipping' },
            { label: 'Support', value: 'support' },
            { label: 'Payment', value: 'payment' },
            { label: 'Lock', value: 'lock' },
            { label: 'Thumbs Up', value: 'thumbs_up' },
            { label: 'Star', value: 'star' },
            { label: 'Premium', value: 'premium' },
            { label: 'Check', value: 'check' },
          ],
        },
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
      },
      defaultItemProps: {
        icon: 'verified',
        title: 'Trust Badge',
        subtitle: 'Description',
      },
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Grid', value: 'grid' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    columns: {
      type: 'select',
      label: 'Columns (Grid)',
      options: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
        { label: '5 Columns', value: 5 },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Tight', value: 2 },
        { label: 'Normal', value: 3 },
        { label: 'Comfortable', value: 4 },
        { label: 'Spacious', value: 6 },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },

    // Badge Style
    badgeStyle: {
      type: 'select',
      label: 'Badge Style',
      options: [
        { label: 'Icon Only', value: 'icon' },
        { label: 'Icon + Title', value: 'icon_title' },
        { label: 'Full (Icon + Title + Subtitle)', value: 'full' },
        { label: 'Card', value: 'card' },
      ],
    },
    iconSize: {
      type: 'select',
      label: 'Icon Size',
      options: [
        { label: 'Small (24px)', value: 24 },
        { label: 'Medium (32px)', value: 32 },
        { label: 'Large (40px)', value: 40 },
        { label: 'Extra Large (48px)', value: 48 },
      ],
    },
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Success', value: 'success.main' },
        { label: 'Gold', value: '#d4af37' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIconColor: {
      type: 'text',
      label: 'Custom Icon Color',
    },
    showIconBg: {
      type: 'radio',
      label: 'Show Icon Background',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    iconBgColor: {
      type: 'text',
      label: 'Icon Background Color',
    },

    // Card Style
    backgroundColor: {
      type: 'text',
      label: 'Card Background Color',
    },
    elevation: {
      type: 'select',
      label: 'Card Elevation',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 4 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
  },
  defaultProps: {
    badges: [
      { icon: 'shipping', title: 'Free Shipping', subtitle: 'On orders over $50' },
      { icon: 'security', title: 'Secure Payment', subtitle: '100% protected' },
      { icon: 'support', title: '24/7 Support', subtitle: 'Always here to help' },
      { icon: 'verified', title: 'Money Back', subtitle: '30-day guarantee' },
    ],
    layout: 'horizontal',
    columns: 4,
    spacing: 3,
    align: 'center',
    badgeStyle: 'icon_title',
    iconSize: 32,
    iconColor: 'primary.main',
    customIconColor: '',
    showIconBg: false,
    iconBgColor: '',
    backgroundColor: '',
    elevation: 0,
    borderRadius: 2,
  },
  render: ({
    badges,
    layout,
    columns,
    spacing,
    align,
    badgeStyle,
    iconSize,
    iconColor,
    customIconColor,
    showIconBg,
    iconBgColor,
    backgroundColor,
    elevation,
    borderRadius,
  }) => {
    const finalIconColor = iconColor === 'custom' ? customIconColor : iconColor;
    const borderRadiusValue = borderRadius * 4;

    const renderBadge = (badge, index) => {
      const IconComponent = iconMap[badge.icon] || VerifiedIcon;

      const iconElement = (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(showIconBg && {
              width: iconSize + 16,
              height: iconSize + 16,
              borderRadius: '50%',
              backgroundColor: iconBgColor || 'primary.light',
            }),
          }}
        >
          <IconComponent
            sx={{
              fontSize: iconSize,
              color: finalIconColor,
            }}
          />
        </Box>
      );

      if (badgeStyle === 'icon') {
        return (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            {iconElement}
          </Box>
        );
      }

      if (badgeStyle === 'card') {
        return (
          <Paper
            key={index}
            elevation={elevation}
            sx={{
              p: 2,
              backgroundColor: backgroundColor || 'background.paper',
              borderRadius: `${borderRadiusValue}px`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {iconElement}
            <Typography variant="subtitle2" fontWeight={600}>
              {badge.title}
            </Typography>
            {badge.subtitle && (
              <Typography variant="caption" color="text.secondary">
                {badge.subtitle}
              </Typography>
            )}
          </Paper>
        );
      }

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: layout === 'horizontal' ? 'row' : 'column',
            alignItems: 'center',
            gap: 1,
            textAlign: layout === 'horizontal' ? 'left' : 'center',
          }}
        >
          {iconElement}
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                whiteSpace: layout === 'horizontal' ? 'nowrap' : 'normal',
              }}
            >
              {badge.title}
            </Typography>
            {badgeStyle === 'full' && badge.subtitle && (
              <Typography variant="caption" color="text.secondary">
                {badge.subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      );
    };

    const getContainerStyles = () => {
      if (layout === 'grid') {
        return {
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: `repeat(${Math.min(columns, 3)}, 1fr)`,
            md: `repeat(${columns}, 1fr)`,
          },
          gap: spacing,
        };
      }

      if (layout === 'vertical') {
        return {
          display: 'flex',
          flexDirection: 'column',
          alignItems: align,
          gap: spacing,
        };
      }

      return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align,
        alignItems: 'center',
        gap: spacing,
      };
    };

    return <Box sx={getContainerStyles()}>{badges.map(renderBadge)}</Box>;
  },
};

export default TrustBadges;
