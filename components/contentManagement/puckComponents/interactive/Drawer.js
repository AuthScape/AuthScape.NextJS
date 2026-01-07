import React, { useState } from 'react';
import { Box, Button, Drawer as MuiDrawer, IconButton, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { DropZone } from '@measured/puck';

export const Drawer = {
  label: 'Drawer',
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

    // Drawer Content
    title: {
      type: 'text',
      label: 'Drawer Title',
    },
    content: {
      type: 'textarea',
      label: 'Content (or use DropZone)',
    },
    useDropZone: {
      type: 'radio',
      label: 'Use DropZone for Content',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Position & Size
    anchor: {
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    width: {
      type: 'select',
      label: 'Width (Left/Right)',
      options: [
        { label: 'Small (280px)', value: 280 },
        { label: 'Medium (360px)', value: 360 },
        { label: 'Large (450px)', value: 450 },
        { label: 'Extra Large (600px)', value: 600 },
      ],
    },
    height: {
      type: 'select',
      label: 'Height (Top/Bottom)',
      options: [
        { label: 'Small (200px)', value: 200 },
        { label: 'Medium (300px)', value: 300 },
        { label: 'Large (400px)', value: 400 },
        { label: 'Half Screen (50%)', value: '50vh' },
      ],
    },

    // Behavior
    showCloseButton: {
      type: 'radio',
      label: 'Show Close Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    closeOnBackdropClick: {
      type: 'radio',
      label: 'Close on Backdrop Click',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showBackdrop: {
      type: 'radio',
      label: 'Show Backdrop',
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
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
      ],
    },
  },
  defaultProps: {
    triggerType: 'button',
    triggerText: 'Open Drawer',
    triggerVariant: 'outlined',
    triggerColor: 'primary',
    title: 'Drawer Title',
    content: 'This is the drawer content. Add any content you like here.',
    useDropZone: false,
    anchor: 'right',
    width: 360,
    height: 300,
    showCloseButton: true,
    closeOnBackdropClick: true,
    showBackdrop: true,
    backgroundColor: '#ffffff',
    padding: 3,
  },
  render: ({
    triggerType,
    triggerText,
    triggerVariant,
    triggerColor,
    title,
    content,
    useDropZone,
    anchor,
    width,
    height,
    showCloseButton,
    closeOnBackdropClick,
    showBackdrop,
    backgroundColor,
    padding,
  }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isHorizontal = anchor === 'left' || anchor === 'right';

    const renderTrigger = () => {
      if (triggerType === 'icon') {
        return (
          <IconButton onClick={handleOpen} color={triggerColor}>
            <MenuIcon />
          </IconButton>
        );
      }

      if (triggerType === 'text') {
        return (
          <Typography
            component="span"
            onClick={handleOpen}
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
          onClick={handleOpen}
        >
          {triggerText}
        </Button>
      );
    };

    return (
      <>
        {renderTrigger()}

        <MuiDrawer
          anchor={anchor}
          open={open}
          onClose={closeOnBackdropClick ? handleClose : undefined}
          hideBackdrop={!showBackdrop}
          PaperProps={{
            sx: {
              width: isHorizontal ? width : '100%',
              height: isHorizontal ? '100%' : height,
              backgroundColor: backgroundColor,
            },
          }}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  minHeight: 56,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {title}
                </Typography>
                {showCloseButton && (
                  <IconButton onClick={handleClose} edge="end">
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
              <Divider />
            </>
          )}

          {/* Content */}
          <Box sx={{ p: padding, flex: 1, overflow: 'auto' }}>
            {useDropZone ? (
              <DropZone zone="drawer-content" />
            ) : (
              <Typography variant="body1" color="text.secondary">
                {content}
              </Typography>
            )}
          </Box>
        </MuiDrawer>
      </>
    );
  },
};

export default Drawer;
