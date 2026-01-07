import React, { useState } from 'react';
import { Alert as MuiAlert, AlertTitle, Button, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Alert = {
  label: 'Alert',
  fields: {
    // Content
    title: {
      type: 'text',
      label: 'Title (optional)',
    },
    message: {
      type: 'textarea',
      label: 'Message',
    },

    // Type
    severity: {
      type: 'select',
      label: 'Severity',
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

    // Icon
    showIcon: {
      type: 'radio',
      label: 'Show Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    customIcon: {
      type: 'text',
      label: 'Custom Icon (Material Icon name)',
    },

    // Actions
    dismissible: {
      type: 'radio',
      label: 'Dismissible',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
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
      label: 'Action Button Text',
    },
    actionLink: {
      type: 'text',
      label: 'Action Link',
    },

    // Styling
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
    fullWidth: {
      type: 'radio',
      label: 'Full Width',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    title: '',
    message: 'This is an alert message with important information.',
    severity: 'info',
    variant: 'standard',
    showIcon: true,
    customIcon: '',
    dismissible: true,
    showAction: false,
    actionText: 'Learn More',
    actionLink: '#',
    borderRadius: 1,
    fullWidth: true,
  },
  render: ({
    title,
    message,
    severity,
    variant,
    showIcon,
    customIcon,
    dismissible,
    showAction,
    actionText,
    actionLink,
    borderRadius,
    fullWidth,
  }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    const handleAction = () => {
      if (actionLink) {
        window.location.href = actionLink;
      }
    };

    const borderRadiusValue = borderRadius * 4;

    const iconProp = customIcon
      ? {
          icon: (
            <span className="material-icons" style={{ fontSize: 22 }}>
              {customIcon}
            </span>
          ),
        }
      : showIcon
      ? {}
      : { icon: false };

    return (
      <Collapse in={open}>
        <MuiAlert
          severity={severity}
          variant={variant}
          {...iconProp}
          sx={{
            width: fullWidth ? '100%' : 'auto',
            borderRadius: `${borderRadiusValue}px`,
            alignItems: 'flex-start',
          }}
          action={
            <>
              {showAction && (
                <Button color="inherit" size="small" onClick={handleAction}>
                  {actionText}
                </Button>
              )}
              {dismissible && (
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            </>
          }
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </MuiAlert>
      </Collapse>
    );
  },
};

export default Alert;
