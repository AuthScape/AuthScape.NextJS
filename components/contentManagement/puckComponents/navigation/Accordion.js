import React, { useState } from 'react';
import {
  Box,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  borderRadiusField,
  textColorField,
} from '../shared/fieldTypes';

export const Accordion = {
  label: 'Accordion',
  fields: {
    items: {
      type: 'array',
      label: 'Accordion Items',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        content: { type: 'textarea', label: 'Content' },
        defaultExpanded: {
          type: 'radio',
          label: 'Default Expanded',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultItemProps: {
        title: 'Accordion Item',
        content: 'This is the content for this accordion item.',
        defaultExpanded: false,
      },
    },

    // Behavior
    allowMultiple: {
      type: 'radio',
      label: 'Allow Multiple Open',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Default (Elevated)', value: 'elevation' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Flat', value: 'flat' },
      ],
    },
    borderRadius: borderRadiusField,
    spacing: {
      type: 'select',
      label: 'Spacing Between Items',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small (8px)', value: 8 },
        { label: 'Medium (16px)', value: 16 },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    headerBackgroundColor: {
      type: 'text',
      label: 'Header Background Color',
    },
    titleColor: textColorField,
    contentColor: {
      type: 'select',
      label: 'Content Text Color',
      options: [
        { label: 'Default', value: 'text.secondary' },
        { label: 'Primary', value: 'text.primary' },
        { label: 'White', value: '#ffffff' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customContentColor: {
      type: 'text',
      label: 'Custom Content Color',
    },

    // Icon
    iconPosition: {
      type: 'select',
      label: 'Expand Icon Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Default', value: 'inherit' },
        { label: 'Primary', value: 'primary.main' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIconColor: {
      type: 'text',
      label: 'Custom Icon Color',
    },
  },
  defaultProps: {
    items: [
      { title: 'What is your return policy?', content: 'We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return.', defaultExpanded: true },
      { title: 'How long does shipping take?', content: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International shipping times vary by location.', defaultExpanded: false },
      { title: 'Do you offer international shipping?', content: 'Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary based on your location.', defaultExpanded: false },
      { title: 'How can I track my order?', content: 'Once your order ships, you\'ll receive an email with a tracking number. You can use this number on our website or the carrier\'s site to track your package.', defaultExpanded: false },
    ],
    allowMultiple: false,
    variant: 'elevation',
    borderRadius: 1,
    spacing: 8,
    backgroundColor: '#ffffff',
    headerBackgroundColor: '',
    titleColor: 'text.primary',
    contentColor: 'text.secondary',
    customContentColor: '',
    iconPosition: 'right',
    iconColor: 'inherit',
    customIconColor: '',
  },
  render: ({
    items,
    allowMultiple,
    variant,
    borderRadius,
    spacing,
    backgroundColor,
    headerBackgroundColor,
    titleColor,
    contentColor,
    customContentColor,
    iconPosition,
    iconColor,
    customIconColor,
  }) => {
    const [expanded, setExpanded] = useState(() => {
      // Initialize with default expanded items
      if (allowMultiple) {
        return items.reduce((acc, item, index) => {
          if (item.defaultExpanded) acc.push(index);
          return acc;
        }, []);
      }
      const defaultIndex = items.findIndex((item) => item.defaultExpanded);
      return defaultIndex >= 0 ? defaultIndex : false;
    });

    const handleChange = (index) => (event, isExpanded) => {
      if (allowMultiple) {
        setExpanded((prev) =>
          isExpanded
            ? [...prev, index]
            : prev.filter((i) => i !== index)
        );
      } else {
        setExpanded(isExpanded ? index : false);
      }
    };

    const isExpanded = (index) => {
      if (allowMultiple) {
        return expanded.includes(index);
      }
      return expanded === index;
    };

    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const finalContentColor = contentColor === 'custom' ? customContentColor : contentColor;
    const finalIconColor = iconColor === 'custom' ? customIconColor : iconColor;

    const getVariantStyles = () => {
      switch (variant) {
        case 'outlined':
          return {
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
          };
        case 'flat':
          return {
            boxShadow: 'none',
            '&:before': { display: 'none' },
          };
        default:
          return {};
      }
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${spacing}px` }}>
        {items.map((item, index) => (
          <MuiAccordion
            key={index}
            expanded={isExpanded(index)}
            onChange={handleChange(index)}
            sx={{
              backgroundColor: backgroundColor,
              borderRadius: `${borderRadiusValue}px !important`,
              overflow: 'hidden',
              '&:before': variant !== 'flat' ? { display: 'none' } : undefined,
              ...getVariantStyles(),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: finalIconColor }} />}
              sx={{
                backgroundColor: headerBackgroundColor || 'transparent',
                flexDirection: iconPosition === 'left' ? 'row-reverse' : 'row',
                '& .MuiAccordionSummary-expandIconWrapper': {
                  marginLeft: iconPosition === 'left' ? 0 : 2,
                  marginRight: iconPosition === 'left' ? 2 : 0,
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: titleColor,
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                sx={{
                  color: finalContentColor,
                  lineHeight: 1.7,
                }}
              >
                {item.content}
              </Typography>
            </AccordionDetails>
          </MuiAccordion>
        ))}
      </Box>
    );
  },
};

export default Accordion;
