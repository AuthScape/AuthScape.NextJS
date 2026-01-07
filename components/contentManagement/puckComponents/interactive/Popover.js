import React, { useState } from 'react';
import { Box, Button, Popover as MuiPopover, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DropZone } from '@measured/puck';

export const Popover = {
  label: 'Popover',
  fields: {
    // Trigger
    triggerType: {
      type: 'select',
      label: 'Trigger Type',
      options: [
        { label: 'Button', value: 'button' },
        { label: 'Icon Button', value: 'icon' },
        { label: 'Text Link', value: 'text' },
      ],
    },
    triggerText: {
      type: 'text',
      label: 'Trigger Text',
    },
    triggerIcon: {
      type: 'select',
      label: 'Trigger Icon',
      options: [
        { label: 'More (3 dots)', value: 'more' },
        { label: 'Info', value: 'info' },
        { label: 'Expand', value: 'expand' },
      ],
    },
    triggerVariant: {
      type: 'select',
      label: 'Button Variant',
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
        { label: 'Inherit', value: 'inherit' },
      ],
    },

    // Content
    title: {
      type: 'text',
      label: 'Title (optional)',
    },
    content: {
      type: 'textarea',
      label: 'Content',
    },
    useDropZone: {
      type: 'radio',
      label: 'Use DropZone for Content',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Position
    anchorOriginVertical: {
      type: 'select',
      label: 'Anchor Vertical',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    anchorOriginHorizontal: {
      type: 'select',
      label: 'Anchor Horizontal',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    transformOriginVertical: {
      type: 'select',
      label: 'Transform Vertical',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    transformOriginHorizontal: {
      type: 'select',
      label: 'Transform Horizontal',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },

    // Styling
    width: {
      type: 'select',
      label: 'Width',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Small (200px)', value: 200 },
        { label: 'Medium (300px)', value: 300 },
        { label: 'Large (400px)', value: 400 },
      ],
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Elevation',
      options: [
        { label: 'Low', value: 2 },
        { label: 'Medium', value: 4 },
        { label: 'High', value: 8 },
      ],
    },
  },
  defaultProps: {
    triggerType: 'button',
    triggerText: 'Click me',
    triggerIcon: 'more',
    triggerVariant: 'outlined',
    triggerColor: 'primary',
    title: '',
    content: 'This is the popover content. Click outside to close.',
    useDropZone: false,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    width: 'auto',
    padding: 2,
    elevation: 4,
  },
  render: ({
    triggerType,
    triggerText,
    triggerIcon,
    triggerVariant,
    triggerColor,
    title,
    content,
    useDropZone,
    anchorOriginVertical,
    anchorOriginHorizontal,
    transformOriginVertical,
    transformOriginHorizontal,
    width,
    padding,
    elevation,
  }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const getIcon = () => {
      switch (triggerIcon) {
        case 'info':
          return <InfoIcon />;
        case 'expand':
          return <ExpandMoreIcon />;
        default:
          return <MoreVertIcon />;
      }
    };

    const renderTrigger = () => {
      if (triggerType === 'icon') {
        return (
          <IconButton onClick={handleClick} color={triggerColor}>
            {getIcon()}
          </IconButton>
        );
      }

      if (triggerType === 'text') {
        return (
          <Typography
            component="span"
            onClick={handleClick}
            sx={{
              cursor: 'pointer',
              color: `${triggerColor}.main`,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {triggerText}
          </Typography>
        );
      }

      return (
        <Button
          variant={triggerVariant}
          color={triggerColor}
          onClick={handleClick}
          endIcon={<ExpandMoreIcon sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />}
        >
          {triggerText}
        </Button>
      );
    };

    return (
      <>
        {renderTrigger()}
        <MuiPopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
          elevation={elevation}
          PaperProps={{
            sx: {
              width: width === 'auto' ? undefined : width,
              maxWidth: '90vw',
            },
          }}
        >
          <Box sx={{ p: padding }}>
            {title && (
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                {title}
              </Typography>
            )}
            {useDropZone ? (
              <DropZone zone="popover-content" />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            )}
          </Box>
        </MuiPopover>
      </>
    );
  },
};

export default Popover;
