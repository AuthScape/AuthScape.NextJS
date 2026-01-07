import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useContentManagement } from '../hooks/useContentManagement';

export default function ContentBreadcrumb() {
  const { getBreadcrumbs, navigateTo, setSelectedPage, closeVisualBuilder, isVisualBuilderOpen } = useContentManagement();

  const breadcrumbs = getBreadcrumbs();

  const handleClick = (crumb, index) => {
    if (!crumb.path) return;

    // If clicking on section while in visual builder, close it first
    if (isVisualBuilderOpen) {
      closeVisualBuilder();
    }

    // If clicking on a section, navigate to it
    if (index === 1) {
      navigateTo(crumb.path);
      setSelectedPage(null);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isClickable = crumb.path && !isLast;

          if (isLast) {
            return (
              <Typography
                key={index}
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                {crumb.label}
              </Typography>
            );
          }

          return isClickable ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              sx={{ cursor: 'pointer' }}
              onClick={() => handleClick(crumb, index)}
            >
              {crumb.label}
            </Link>
          ) : (
            <Typography key={index} color="text.secondary">
              {crumb.label}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
