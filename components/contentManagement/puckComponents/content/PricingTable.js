import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid2,
  Chip,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

export const PricingTable = {
  label: 'Pricing Table',
  fields: {
    // Plans
    plans: {
      type: 'array',
      label: 'Pricing Plans',
      arrayFields: {
        name: { type: 'text', label: 'Plan Name' },
        price: { type: 'text', label: 'Monthly Price' },
        yearlyPrice: { type: 'text', label: 'Yearly Price' },
        period: { type: 'text', label: 'Period Label' },
        description: { type: 'textarea', label: 'Description' },
        features: { type: 'textarea', label: 'Features (one per line, prefix with - for excluded)' },
        ctaText: { type: 'text', label: 'CTA Button Text' },
        ctaLink: { type: 'text', label: 'CTA Button Link' },
        highlighted: { type: 'radio', label: 'Highlighted', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        badge: { type: 'text', label: 'Badge Text' },
      },
      defaultItemProps: {
        name: 'Pro',
        price: '$29',
        yearlyPrice: '$290',
        period: '/month',
        description: 'Perfect for growing businesses',
        features: 'Unlimited users\nAdvanced analytics\n24/7 support\n-Custom integrations',
        ctaText: 'Get Started',
        ctaLink: '#',
        highlighted: false,
        badge: '',
      },
    },

    // Billing Toggle
    showToggle: {
      type: 'radio',
      label: 'Show Monthly/Yearly Toggle',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    yearlyDiscount: {
      type: 'number',
      label: 'Yearly Discount %',
    },
    monthlyLabel: {
      type: 'text',
      label: 'Monthly Label',
    },
    yearlyLabel: {
      type: 'text',
      label: 'Yearly Label',
    },

    // Layout
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
      ],
    },
    equalHeight: {
      type: 'radio',
      label: 'Equal Height Cards',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    cardBackgroundColor: {
      type: 'text',
      label: 'Card Background Color',
    },
    highlightColor: {
      type: 'text',
      label: 'Highlight Color',
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
    elevation: {
      type: 'select',
      label: 'Card Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
      ],
    },
    padding: {
      type: 'select',
      label: 'Container Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 4 },
        { label: 'Large', value: 6 },
      ],
    },
  },
  defaultProps: {
    plans: [
      {
        name: 'Starter',
        price: '$9',
        yearlyPrice: '$90',
        period: '/month',
        description: 'Perfect for individuals',
        features: '1 user\n5GB storage\nBasic analytics\nEmail support\n-Priority support\n-Custom domain',
        ctaText: 'Start Free Trial',
        ctaLink: '#',
        highlighted: false,
        badge: '',
      },
      {
        name: 'Professional',
        price: '$29',
        yearlyPrice: '$290',
        period: '/month',
        description: 'Great for small teams',
        features: '5 users\n50GB storage\nAdvanced analytics\nPriority support\nCustom domain\n-White labeling',
        ctaText: 'Get Started',
        ctaLink: '#',
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: '$99',
        yearlyPrice: '$990',
        period: '/month',
        description: 'For large organizations',
        features: 'Unlimited users\n500GB storage\nCustom analytics\n24/7 support\nCustom domain\nWhite labeling',
        ctaText: 'Contact Sales',
        ctaLink: '#',
        highlighted: false,
        badge: '',
      },
    ],
    showToggle: true,
    yearlyDiscount: 20,
    monthlyLabel: 'Monthly',
    yearlyLabel: 'Yearly',
    columns: 3,
    equalHeight: true,
    backgroundColor: '',
    cardBackgroundColor: '#ffffff',
    highlightColor: '',
    borderRadius: 2,
    elevation: 2,
    spacing: 3,
    padding: 4,
  },
  render: ({
    plans,
    showToggle,
    yearlyDiscount,
    monthlyLabel,
    yearlyLabel,
    columns,
    equalHeight,
    backgroundColor,
    cardBackgroundColor,
    highlightColor,
    borderRadius,
    elevation,
    spacing,
    padding,
  }) => {
    const [isYearly, setIsYearly] = useState(false);

    const parseFeatures = (featuresString) => {
      if (!featuresString) return [];
      return featuresString.split('\n').map(feature => ({
        text: feature.replace(/^-/, '').trim(),
        included: !feature.startsWith('-'),
      }));
    };

    const borderRadiusValue = borderRadius * 4;

    return (
      <Box sx={{ backgroundColor: backgroundColor || 'transparent', p: padding }}>
        {/* Billing Toggle */}
        {showToggle && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: !isYearly ? 600 : 400,
                color: !isYearly ? 'text.primary' : 'text.secondary',
              }}
            >
              {monthlyLabel}
            </Typography>
            <Switch
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
              sx={{ mx: 1 }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: isYearly ? 600 : 400,
                color: isYearly ? 'text.primary' : 'text.secondary',
              }}
            >
              {yearlyLabel}
            </Typography>
            {yearlyDiscount > 0 && (
              <Chip
                label={`Save ${yearlyDiscount}%`}
                size="small"
                color="success"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
        )}

        {/* Pricing Cards */}
        <Grid2 container spacing={spacing} sx={{ alignItems: equalHeight ? 'stretch' : 'flex-start' }}>
          {plans.map((plan, index) => {
            const features = parseFeatures(plan.features);
            const displayPrice = isYearly ? plan.yearlyPrice : plan.price;
            const isHighlighted = plan.highlighted;

            return (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 12 / columns }}>
                <Paper
                  elevation={isHighlighted ? elevation + 2 : elevation}
                  sx={{
                    backgroundColor: cardBackgroundColor,
                    borderRadius: `${borderRadiusValue}px`,
                    overflow: 'hidden',
                    height: equalHeight ? '100%' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: isHighlighted ? '2px solid' : '1px solid',
                    borderColor: isHighlighted ? (highlightColor || 'primary.main') : 'divider',
                    transform: isHighlighted ? 'scale(1.02)' : 'none',
                    zIndex: isHighlighted ? 1 : 0,
                  }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <Box
                      sx={{
                        backgroundColor: highlightColor || 'primary.main',
                        color: '#ffffff',
                        py: 0.5,
                        px: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="caption" fontWeight={600}>
                        {plan.badge}
                      </Typography>
                    </Box>
                  )}

                  {/* Header */}
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {plan.name}
                    </Typography>
                    {plan.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {plan.description}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{ color: isHighlighted ? (highlightColor || 'primary.main') : 'text.primary' }}
                      >
                        {displayPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {plan.period}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Features */}
                  <Box sx={{ p: 3, flex: 1 }}>
                    <List dense disablePadding>
                      {features.map((feature, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {feature.included ? (
                              <CheckIcon fontSize="small" sx={{ color: 'success.main' }} />
                            ) : (
                              <CloseIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  color: feature.included ? 'text.primary' : 'text.disabled',
                                  textDecoration: feature.included ? 'none' : 'line-through',
                                }}
                              >
                                {feature.text}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* CTA */}
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant={isHighlighted ? 'contained' : 'outlined'}
                      fullWidth
                      size="large"
                      href={plan.ctaLink}
                      sx={{
                        backgroundColor: isHighlighted ? (highlightColor || undefined) : undefined,
                        borderColor: isHighlighted ? (highlightColor || undefined) : undefined,
                        '&:hover': {
                          backgroundColor: isHighlighted ? (highlightColor || undefined) : undefined,
                        },
                      }}
                    >
                      {plan.ctaText}
                    </Button>
                  </Box>
                </Paper>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    );
  },
};

export default PricingTable;
