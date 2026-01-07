import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  showAction = true,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 4,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      {Icon && (
        <Box sx={{ mb: 2, color: 'text.secondary' }}>
          <Icon sx={{ fontSize: 64, opacity: 0.5 }} />
        </Box>
      )}

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 400 }}
        >
          {description}
        </Typography>
      )}

      {showAction && actionLabel && onAction && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
