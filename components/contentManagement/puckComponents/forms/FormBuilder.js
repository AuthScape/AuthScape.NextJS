import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { DropZone } from '@measured/puck';

export const FormBuilder = {
  label: 'Form Builder',
  fields: {
    // Form Settings
    formTitle: {
      type: 'text',
      label: 'Form Title',
    },
    formDescription: {
      type: 'textarea',
      label: 'Form Description',
    },
    showTitle: {
      type: 'radio',
      label: 'Show Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Submission
    submitEndpoint: {
      type: 'text',
      label: 'Submit Endpoint URL',
    },
    submitMethod: {
      type: 'select',
      label: 'Submit Method',
      options: [
        { label: 'POST', value: 'POST' },
        { label: 'GET', value: 'GET' },
      ],
    },
    successMessage: {
      type: 'text',
      label: 'Success Message',
    },
    errorMessage: {
      type: 'text',
      label: 'Error Message',
    },
    redirectUrl: {
      type: 'text',
      label: 'Redirect URL (after success)',
    },

    // Submit Button
    submitButtonText: {
      type: 'text',
      label: 'Submit Button Text',
    },
    submitButtonVariant: {
      type: 'select',
      label: 'Submit Button Style',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Text', value: 'text' },
      ],
    },
    submitButtonColor: {
      type: 'select',
      label: 'Submit Button Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
      ],
    },
    submitButtonFullWidth: {
      type: 'radio',
      label: 'Full Width Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    buttonAlign: {
      type: 'select',
      label: 'Button Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },

    // Reset Button
    showResetButton: {
      type: 'radio',
      label: 'Show Reset Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    resetButtonText: {
      type: 'text',
      label: 'Reset Button Text',
    },

    // Styling
    showCard: {
      type: 'radio',
      label: 'Show Card Background',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
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
    spacing: {
      type: 'select',
      label: 'Field Spacing',
      options: [
        { label: 'Tight', value: 2 },
        { label: 'Normal', value: 3 },
        { label: 'Comfortable', value: 4 },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Card Elevation',
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
  },
  defaultProps: {
    formTitle: 'Contact Us',
    formDescription: "Fill out the form below and we'll get back to you.",
    showTitle: true,
    submitEndpoint: '/api/contact',
    submitMethod: 'POST',
    successMessage: 'Thank you! Your submission has been received.',
    errorMessage: 'Oops! Something went wrong. Please try again.',
    redirectUrl: '',
    submitButtonText: 'Submit',
    submitButtonVariant: 'contained',
    submitButtonColor: 'primary',
    submitButtonFullWidth: false,
    buttonAlign: 'flex-start',
    showResetButton: false,
    resetButtonText: 'Reset',
    showCard: true,
    padding: 3,
    spacing: 3,
    elevation: 1,
    borderRadius: 2,
  },
  render: ({
    formTitle,
    formDescription,
    showTitle,
    submitEndpoint,
    submitMethod,
    successMessage,
    errorMessage,
    redirectUrl,
    submitButtonText,
    submitButtonVariant,
    submitButtonColor,
    submitButtonFullWidth,
    buttonAlign,
    showResetButton,
    resetButtonText,
    showCard,
    padding,
    spacing,
    elevation,
    borderRadius,
  }) => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus('loading');

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(submitEndpoint, {
          method: submitMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setStatus('success');
          setMessage(successMessage);
          e.target.reset();

          if (redirectUrl) {
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 2000);
          }
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage(errorMessage);
      }
    };

    const handleReset = () => {
      setStatus('idle');
      setMessage('');
    };

    const borderRadiusValue = borderRadius * 4;

    const formContent = (
      <Box
        component="form"
        onSubmit={handleSubmit}
        onReset={handleReset}
        sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}
      >
        {/* Title */}
        {showTitle && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {formTitle}
            </Typography>
            {formDescription && (
              <Typography variant="body2" color="text.secondary">
                {formDescription}
              </Typography>
            )}
          </Box>
        )}

        {/* Status Messages */}
        {status === 'success' && (
          <Alert severity="success" onClose={() => setStatus('idle')}>
            {message}
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" onClose={() => setStatus('idle')}>
            {message}
          </Alert>
        )}

        {/* Form Fields (DropZone) */}
        <DropZone zone="form-fields" />

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: buttonAlign,
            flexDirection: submitButtonFullWidth ? 'column' : 'row',
            mt: 1,
          }}
        >
          <Button
            type="submit"
            variant={submitButtonVariant}
            color={submitButtonColor}
            size="large"
            fullWidth={submitButtonFullWidth}
            disabled={status === 'loading'}
            startIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : undefined}
          >
            {status === 'loading' ? 'Submitting...' : submitButtonText}
          </Button>

          {showResetButton && (
            <Button
              type="reset"
              variant="outlined"
              size="large"
              fullWidth={submitButtonFullWidth}
              disabled={status === 'loading'}
            >
              {resetButtonText}
            </Button>
          )}
        </Box>
      </Box>
    );

    if (showCard) {
      return (
        <Paper
          elevation={elevation}
          sx={{
            p: padding,
            borderRadius: `${borderRadiusValue}px`,
          }}
        >
          {formContent}
        </Paper>
      );
    }

    return formContent;
  },
};

export default FormBuilder;
