import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Toast = {
  label: 'Toast Notification',
  fields: {
    // Trigger
    triggerText: {
      type: 'text',
      label: 'Trigger Button Text',
    },
    triggerVariant: {
      type: 'select',
      label: 'Trigger Style',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Text', value: 'text' },
      ],
    },
    triggerColor: {
      type: 'select',
      label: 'Trigger Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },

    // Toast Content
    message: {
      type: 'textarea',
      label: 'Toast Message',
    },
    severity: {
      type: 'select',
      label: 'Type',
      options: [
        { label: 'Success', value: 'success' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Filled', value: 'filled' },
        { label: 'Outlined', value: 'outlined' },
      ],
    },

    // Position
    vertical: {
      type: 'select',
      label: 'Vertical Position',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    horizontal: {
      type: 'select',
      label: 'Horizontal Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },

    // Behavior
    duration: {
      type: 'select',
      label: 'Duration',
      options: [
        { label: '2 seconds', value: 2000 },
        { label: '4 seconds', value: 4000 },
        { label: '6 seconds', value: 6000 },
        { label: '10 seconds', value: 10000 },
        { label: 'Persistent', value: null },
      ],
    },
    showCloseButton: {
      type: 'radio',
      label: 'Show Close Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Action
    showAction: {
      type: 'radio',
      label: 'Show Action Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    actionText: {
      type: 'text',
      label: 'Action Text',
    },
    actionLink: {
      type: 'text',
      label: 'Action Link',
    },
  },
  defaultProps: {
    triggerText: 'Show Toast',
    triggerVariant: 'contained',
    triggerColor: 'primary',
    message: 'This is a toast notification!',
    severity: 'success',
    variant: 'filled',
    vertical: 'bottom',
    horizontal: 'center',
    duration: 4000,
    showCloseButton: true,
    showAction: false,
    actionText: 'Undo',
    actionLink: '',
  },
  render: ({
    triggerText,
    triggerVariant,
    triggerColor,
    message,
    severity,
    variant,
    vertical,
    horizontal,
    duration,
    showCloseButton,
    showAction,
    actionText,
    actionLink,
  }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleAction = () => {
      if (actionLink) {
        window.location.href = actionLink;
      }
      setOpen(false);
    };

    const action = (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {showAction && (
          <Button color="inherit" size="small" onClick={handleAction}>
            {actionText}
          </Button>
        )}
        {showCloseButton && (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    );

    return (
      <>
        <Button
          variant={triggerVariant}
          color={triggerColor}
          onClick={handleClick}
        >
          {triggerText}
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={duration}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={showCloseButton ? handleClose : undefined}
            severity={severity}
            variant={variant}
            action={showAction || showCloseButton ? action : undefined}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  },
};

export default Toast;
