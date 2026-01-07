import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DropZone } from '@measured/puck';

export const Modal = {
  label: 'Modal',
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
    triggerSize: {
      type: 'select',
      label: 'Trigger Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },

    // Modal Content
    title: {
      type: 'text',
      label: 'Modal Title',
    },
    showTitle: {
      type: 'radio',
      label: 'Show Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    content: {
      type: 'textarea',
      label: 'Modal Content (or use DropZone)',
    },
    useDropZone: {
      type: 'radio',
      label: 'Use DropZone for Content',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Actions
    showActions: {
      type: 'radio',
      label: 'Show Action Buttons',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    primaryActionText: {
      type: 'text',
      label: 'Primary Action Text',
    },
    secondaryActionText: {
      type: 'text',
      label: 'Secondary Action Text',
    },
    primaryActionLink: {
      type: 'text',
      label: 'Primary Action Link',
    },

    // Styling
    size: {
      type: 'select',
      label: 'Modal Size',
      options: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full Width', value: 'xl' },
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
    closeOnBackdropClick: {
      type: 'radio',
      label: 'Close on Backdrop Click',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    triggerText: 'Open Modal',
    triggerVariant: 'contained',
    triggerColor: 'primary',
    triggerSize: 'medium',
    title: 'Modal Title',
    showTitle: true,
    content: 'This is the modal content. You can add any text or use the DropZone to add components.',
    useDropZone: false,
    showActions: true,
    primaryActionText: 'Confirm',
    secondaryActionText: 'Cancel',
    primaryActionLink: '',
    size: 'sm',
    showCloseButton: true,
    closeOnBackdropClick: true,
  },
  render: ({
    triggerText,
    triggerVariant,
    triggerColor,
    triggerSize,
    title,
    showTitle,
    content,
    useDropZone,
    showActions,
    primaryActionText,
    secondaryActionText,
    primaryActionLink,
    size,
    showCloseButton,
    closeOnBackdropClick,
  }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePrimaryAction = () => {
      if (primaryActionLink) {
        window.location.href = primaryActionLink;
      }
      handleClose();
    };

    return (
      <>
        <Button
          variant={triggerVariant}
          color={triggerColor}
          size={triggerSize}
          onClick={handleOpen}
        >
          {triggerText}
        </Button>

        <Dialog
          open={open}
          onClose={closeOnBackdropClick ? handleClose : undefined}
          maxWidth={size}
          fullWidth
        >
          {showTitle && (
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pr: showCloseButton ? 6 : 2,
              }}
            >
              {title}
              {showCloseButton && (
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </DialogTitle>
          )}

          <DialogContent dividers={showTitle}>
            {useDropZone ? (
              <DropZone zone="modal-content" />
            ) : (
              <Typography variant="body1">{content}</Typography>
            )}
          </DialogContent>

          {showActions && (
            <DialogActions>
              {secondaryActionText && (
                <Button onClick={handleClose} color="inherit">
                  {secondaryActionText}
                </Button>
              )}
              {primaryActionText && (
                <Button
                  onClick={handlePrimaryAction}
                  variant="contained"
                  color={triggerColor}
                >
                  {primaryActionText}
                </Button>
              )}
            </DialogActions>
          )}
        </Dialog>
      </>
    );
  },
};

export default Modal;
