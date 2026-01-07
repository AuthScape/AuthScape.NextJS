import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, Alert } from '@mui/material';
import {
  textAlignField,
  borderRadiusField,
} from '../shared/fieldTypes';

export const Newsletter = {
  label: 'Newsletter Signup',
  fields: {
    // Content
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    placeholder: {
      type: 'text',
      label: 'Input Placeholder',
    },
    buttonText: {
      type: 'text',
      label: 'Button Text',
    },
    successMessage: {
      type: 'text',
      label: 'Success Message',
    },
    privacyText: {
      type: 'text',
      label: 'Privacy Text (below input)',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Stacked (Input below text)', value: 'stacked' },
        { label: 'Inline (Input beside text)', value: 'inline' },
        { label: 'Card Style', value: 'card' },
      ],
    },
    align: textAlignField,
    inputLayout: {
      type: 'select',
      label: 'Input Layout',
      options: [
        { label: 'Button Below', value: 'vertical' },
        { label: 'Button Beside', value: 'horizontal' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'Dark', value: '#212121' },
        { label: 'Light', value: '#ffffff' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customTextColor: {
      type: 'text',
      label: 'Custom Text Color',
    },
    buttonColor: {
      type: 'select',
      label: 'Button Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Dark', value: 'dark' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customButtonColor: {
      type: 'text',
      label: 'Custom Button Color',
    },
    borderRadius: borderRadiusField,

    // Sizing
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'Narrow (400px)', value: '400px' },
        { label: 'Medium (500px)', value: '500px' },
        { label: 'Wide (600px)', value: '600px' },
        { label: 'Full', value: '100%' },
      ],
    },
    verticalPadding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { label: 'Small (24px)', value: 24 },
        { label: 'Medium (48px)', value: 48 },
        { label: 'Large (64px)', value: 64 },
        { label: 'Extra Large (80px)', value: 80 },
      ],
    },

    // API
    apiEndpoint: {
      type: 'text',
      label: 'API Endpoint (for form submission)',
    },
  },
  defaultProps: {
    title: 'Subscribe to Our Newsletter',
    description: 'Get the latest updates, tips, and exclusive content delivered to your inbox.',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe',
    successMessage: 'Thanks for subscribing! Check your email for confirmation.',
    privacyText: 'We respect your privacy. Unsubscribe at any time.',
    layout: 'stacked',
    align: 'center',
    inputLayout: 'horizontal',
    backgroundColor: '#f5f5f5',
    textColor: '#212121',
    customTextColor: '',
    buttonColor: 'primary',
    customButtonColor: '',
    borderRadius: 2,
    maxWidth: '500px',
    verticalPadding: 48,
    apiEndpoint: '',
  },
  render: ({
    title,
    description,
    placeholder,
    buttonText,
    successMessage,
    privacyText,
    layout,
    align,
    inputLayout,
    backgroundColor,
    textColor,
    customTextColor,
    buttonColor,
    customButtonColor,
    borderRadius,
    maxWidth,
    verticalPadding,
    apiEndpoint,
  }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const finalTextColor = textColor === 'custom' ? customTextColor : textColor;

    const getButtonStyles = () => {
      switch (buttonColor) {
        case 'dark':
          return {
            backgroundColor: '#212121',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#333333' },
          };
        case 'custom':
          return {
            backgroundColor: customButtonColor,
            color: '#ffffff',
            '&:hover': { backgroundColor: customButtonColor, opacity: 0.9 },
          };
        default:
          return {};
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      if (apiEndpoint) {
        try {
          await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
        } catch (err) {
          console.error('Newsletter signup error:', err);
        }
      }

      setSubmitted(true);
      setError('');
    };

    const formContent = (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: inputLayout === 'vertical' ? 'column' : { xs: 'column', sm: 'row' },
          gap: 2,
          width: '100%',
          maxWidth: maxWidth,
          margin: align === 'center' ? '0 auto' : 0,
        }}
      >
        <TextField
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          size="medium"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
              borderRadius: borderRadius,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color={buttonColor === 'primary' || buttonColor === 'secondary' ? buttonColor : 'primary'}
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            whiteSpace: 'nowrap',
            borderRadius: borderRadius,
            ...getButtonStyles(),
          }}
        >
          {buttonText}
        </Button>
      </Box>
    );

    const innerContent = (
      <Box
        sx={{
          textAlign: align,
          maxWidth: layout === 'inline' ? 'none' : maxWidth,
          margin: align === 'center' && layout !== 'inline' ? '0 auto' : 0,
        }}
      >
        {submitted ? (
          <Alert severity="success" sx={{ maxWidth: maxWidth, margin: align === 'center' ? '0 auto' : 0 }}>
            {successMessage}
          </Alert>
        ) : (
          <>
            {/* Title & Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: finalTextColor,
                  fontWeight: 600,
                  mb: description ? 1.5 : 0,
                }}
              >
                {title}
              </Typography>
              {description && (
                <Typography
                  variant="body1"
                  sx={{
                    color: finalTextColor,
                    opacity: 0.8,
                  }}
                >
                  {description}
                </Typography>
              )}
            </Box>

            {/* Form */}
            {error && (
              <Alert severity="error" sx={{ mb: 2, maxWidth: maxWidth, margin: align === 'center' ? '0 auto 16px' : '0 0 16px' }}>
                {error}
              </Alert>
            )}
            {formContent}

            {/* Privacy text */}
            {privacyText && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: finalTextColor,
                  opacity: 0.6,
                  mt: 2,
                }}
              >
                {privacyText}
              </Typography>
            )}
          </>
        )}
      </Box>
    );

    if (layout === 'card') {
      return (
        <Paper
          elevation={2}
          sx={{
            backgroundColor: backgroundColor,
            borderRadius: borderRadius * 2,
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          {innerContent}
        </Paper>
      );
    }

    return (
      <Box
        sx={{
          backgroundColor: backgroundColor,
          py: `${verticalPadding}px`,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="lg">
          {layout === 'inline' ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: finalTextColor,
                    fontWeight: 600,
                    mb: description ? 1 : 0,
                  }}
                >
                  {title}
                </Typography>
                {description && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: finalTextColor,
                      opacity: 0.8,
                    }}
                  >
                    {description}
                  </Typography>
                )}
              </Box>
              <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 'auto' } }}>
                {formContent}
              </Box>
            </Box>
          ) : (
            innerContent
          )}
        </Container>
      </Box>
    );
  },
};

export default Newsletter;
