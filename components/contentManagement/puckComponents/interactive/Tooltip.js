import React from 'react';
import { Box, Tooltip as MuiTooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

export const Tooltip = {
  label: 'Tooltip',
  fields: {
    // Content
    tooltipText: {
      type: 'textarea',
      label: 'Tooltip Text',
    },
    triggerText: {
      type: 'text',
      label: 'Trigger Text (optional)',
    },

    // Trigger Style
    triggerType: {
      type: 'select',
      label: 'Trigger Type',
      options: [
        { label: 'Info Icon', value: 'info' },
        { label: 'Help Icon', value: 'help' },
        { label: 'Warning Icon', value: 'warning' },
        { label: 'Error Icon', value: 'error' },
        { label: 'Text Only', value: 'text' },
        { label: 'Icon + Text', value: 'both' },
      ],
    },
    iconSize: {
      type: 'select',
      label: 'Icon Size',
      options: [
        { label: 'Small', value: 16 },
        { label: 'Medium', value: 20 },
        { label: 'Large', value: 24 },
      ],
    },
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Text Secondary', value: 'text.secondary' },
        { label: 'Info', value: 'info.main' },
        { label: 'Warning', value: 'warning.main' },
        { label: 'Error', value: 'error.main' },
      ],
    },

    // Tooltip Styling
    placement: {
      type: 'select',
      label: 'Placement',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Top Start', value: 'top-start' },
        { label: 'Top End', value: 'top-end' },
        { label: 'Bottom Start', value: 'bottom-start' },
        { label: 'Bottom End', value: 'bottom-end' },
      ],
    },
    arrow: {
      type: 'radio',
      label: 'Show Arrow',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'Small (200px)', value: 200 },
        { label: 'Medium (300px)', value: 300 },
        { label: 'Large (400px)', value: 400 },
        { label: 'None', value: 'none' },
      ],
    },

    // Behavior
    trigger: {
      type: 'select',
      label: 'Trigger',
      options: [
        { label: 'Hover', value: 'hover' },
        { label: 'Click', value: 'click' },
      ],
    },
    enterDelay: {
      type: 'select',
      label: 'Enter Delay',
      options: [
        { label: 'None', value: 0 },
        { label: 'Short (200ms)', value: 200 },
        { label: 'Medium (500ms)', value: 500 },
      ],
    },

    // Text styling
    textUnderline: {
      type: 'radio',
      label: 'Underline Trigger Text',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    tooltipText: 'This is helpful information that appears on hover.',
    triggerText: 'Learn more',
    triggerType: 'info',
    iconSize: 20,
    iconColor: 'text.secondary',
    placement: 'top',
    arrow: true,
    maxWidth: 300,
    trigger: 'hover',
    enterDelay: 0,
    textUnderline: false,
  },
  render: ({
    tooltipText,
    triggerText,
    triggerType,
    iconSize,
    iconColor,
    placement,
    arrow,
    maxWidth,
    trigger,
    enterDelay,
    textUnderline,
  }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      if (trigger === 'click') {
        setOpen(!open);
      }
    };

    const handleClose = () => {
      if (trigger === 'click') {
        setOpen(false);
      }
    };

    const getIcon = () => {
      const iconProps = { sx: { fontSize: iconSize, color: iconColor } };
      switch (triggerType) {
        case 'help':
          return <HelpIcon {...iconProps} />;
        case 'warning':
          return <WarningIcon {...iconProps} />;
        case 'error':
          return <ErrorIcon {...iconProps} />;
        case 'info':
        default:
          return <InfoIcon {...iconProps} />;
      }
    };

    const renderTrigger = () => {
      if (triggerType === 'text') {
        return (
          <Typography
            component="span"
            variant="inherit"
            sx={{
              cursor: 'pointer',
              textDecoration: textUnderline ? 'underline dotted' : 'none',
              color: iconColor,
            }}
          >
            {triggerText}
          </Typography>
        );
      }

      if (triggerType === 'both') {
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
            }}
          >
            {getIcon()}
            <Typography
              component="span"
              variant="body2"
              sx={{
                textDecoration: textUnderline ? 'underline dotted' : 'none',
                color: iconColor,
              }}
            >
              {triggerText}
            </Typography>
          </Box>
        );
      }

      return (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {getIcon()}
        </Box>
      );
    };

    const tooltipProps = {
      title: tooltipText,
      placement,
      arrow,
      enterDelay,
      ...(maxWidth !== 'none' && {
        componentsProps: {
          tooltip: {
            sx: { maxWidth },
          },
        },
      }),
      ...(trigger === 'click' && {
        open,
        onClose: handleClose,
        disableFocusListener: true,
        disableHoverListener: true,
        disableTouchListener: true,
      }),
    };

    return (
      <MuiTooltip {...tooltipProps}>
        <Box component="span" onClick={handleClick}>
          {renderTrigger()}
        </Box>
      </MuiTooltip>
    );
  },
};

export default Tooltip;
