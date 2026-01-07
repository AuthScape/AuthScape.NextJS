import React from 'react';
import { Box, Paper, Typography, Stack, Link, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import FaxIcon from '@mui/icons-material/Fax';

const iconMap = {
  location: LocationOnIcon,
  phone: PhoneIcon,
  email: EmailIcon,
  hours: AccessTimeIcon,
  website: LanguageIcon,
  fax: FaxIcon,
};

export const ContactInfo = {
  label: 'Contact Info',
  fields: {
    // Content
    title: {
      type: 'text',
      label: 'Title',
    },
    address: {
      type: 'textarea',
      label: 'Address',
    },
    phone: {
      type: 'text',
      label: 'Phone Number',
    },
    email: {
      type: 'text',
      label: 'Email Address',
    },
    website: {
      type: 'text',
      label: 'Website URL',
    },
    fax: {
      type: 'text',
      label: 'Fax Number',
    },
    businessHours: {
      type: 'array',
      label: 'Business Hours',
      arrayFields: {
        day: { type: 'text', label: 'Day(s)' },
        hours: { type: 'text', label: 'Hours' },
      },
      defaultItemProps: {
        day: 'Monday - Friday',
        hours: '9:00 AM - 5:00 PM',
      },
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Vertical List', value: 'vertical' },
        { label: 'Horizontal Grid', value: 'horizontal' },
        { label: 'Compact', value: 'compact' },
      ],
    },
    showIcons: {
      type: 'radio',
      label: 'Show Icons',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Text', value: 'text.primary' },
        { label: 'Grey', value: 'text.secondary' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'select',
      label: 'Background',
      options: [
        { label: 'None', value: 'transparent' },
        { label: 'White', value: '#ffffff' },
        { label: 'Light Grey', value: '#f5f5f5' },
        { label: 'Primary Light', value: 'primary.light' },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
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
    title: 'Contact Us',
    address: '123 Business Street\nSuite 100\nNew York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'contact@example.com',
    website: 'https://example.com',
    fax: '',
    businessHours: [
      { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    layout: 'vertical',
    showIcons: true,
    iconColor: 'primary.main',
    backgroundColor: 'transparent',
    elevation: 0,
    borderRadius: 2,
    padding: 3,
  },
  render: ({
    title,
    address,
    phone,
    email,
    website,
    fax,
    businessHours,
    layout,
    showIcons,
    iconColor,
    backgroundColor,
    elevation,
    borderRadius,
    padding,
  }) => {
    const borderRadiusValue = borderRadius * 4;

    const InfoItem = ({ icon, label, value, href, isMultiline }) => {
      if (!value) return null;
      const IconComponent = iconMap[icon];

      const content = (
        <Stack
          direction="row"
          spacing={2}
          alignItems={isMultiline ? 'flex-start' : 'center'}
          sx={{ py: layout === 'compact' ? 0.5 : 1 }}
        >
          {showIcons && IconComponent && (
            <Box sx={{ color: iconColor, flexShrink: 0, mt: isMultiline ? 0.5 : 0 }}>
              <IconComponent />
            </Box>
          )}
          <Box>
            {label && layout !== 'compact' && (
              <Typography variant="caption" color="text.secondary" display="block">
                {label}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{ whiteSpace: isMultiline ? 'pre-line' : 'normal' }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>
      );

      if (href) {
        return (
          <Link href={href} underline="hover" color="inherit">
            {content}
          </Link>
        );
      }

      return content;
    };

    const contactItems = [
      { icon: 'location', label: 'Address', value: address, isMultiline: true },
      { icon: 'phone', label: 'Phone', value: phone, href: `tel:${phone?.replace(/\D/g, '')}` },
      { icon: 'email', label: 'Email', value: email, href: `mailto:${email}` },
      { icon: 'website', label: 'Website', value: website, href: website },
      { icon: 'fax', label: 'Fax', value: fax },
    ].filter(item => item.value);

    const hasBackground = backgroundColor !== 'transparent';

    const Wrapper = hasBackground || elevation > 0 ? Paper : Box;
    const wrapperProps = hasBackground || elevation > 0
      ? { elevation, sx: { backgroundColor, borderRadius: `${borderRadiusValue}px`, p: padding } }
      : { sx: { p: padding } };

    return (
      <Wrapper {...wrapperProps}>
        {title && (
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {title}
          </Typography>
        )}

        {layout === 'horizontal' ? (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
            flexWrap="wrap"
          >
            {contactItems.map((item, index) => (
              <Box key={index} sx={{ flex: 1, minWidth: 200 }}>
                <InfoItem {...item} />
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack spacing={layout === 'compact' ? 0 : 1}>
            {contactItems.map((item, index) => (
              <InfoItem key={index} {...item} />
            ))}
          </Stack>
        )}

        {businessHours && businessHours.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              {showIcons && (
                <Box sx={{ color: iconColor, flexShrink: 0, mt: 0.5 }}>
                  <AccessTimeIcon />
                </Box>
              )}
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Business Hours
                </Typography>
                {businessHours.map((schedule, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                    sx={{ minWidth: 250 }}
                  >
                    <Typography variant="body2">{schedule.day}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {schedule.hours}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>
        )}
      </Wrapper>
    );
  },
};

export default ContactInfo;
