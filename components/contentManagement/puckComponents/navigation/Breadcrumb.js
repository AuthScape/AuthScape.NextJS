import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Breadcrumb = {
  label: 'Breadcrumb',
  fields: {
    // Items
    items: {
      type: 'array',
      label: 'Breadcrumb Items',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        link: { type: 'text', label: 'Link' },
      },
      defaultItemProps: {
        label: 'Page',
        link: '#',
      },
    },

    // Home
    showHome: {
      type: 'radio',
      label: 'Show Home Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    homeLink: {
      type: 'text',
      label: 'Home Link',
    },

    // Separator
    separator: {
      type: 'select',
      label: 'Separator',
      options: [
        { label: 'Arrow (>)', value: 'arrow' },
        { label: 'Chevron (›)', value: 'chevron' },
        { label: 'Slash (/)', value: 'slash' },
        { label: 'Dot (·)', value: 'dot' },
      ],
    },

    // Styling
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
      ],
    },
    color: {
      type: 'select',
      label: 'Link Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Text', value: 'text' },
        { label: 'Inherit', value: 'inherit' },
      ],
    },
    activeColor: {
      type: 'text',
      label: 'Active Item Color',
    },
    hoverUnderline: {
      type: 'radio',
      label: 'Underline on Hover',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    maxItems: {
      type: 'select',
      label: 'Max Visible Items',
      options: [
        { label: 'All', value: 0 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
      ],
    },
  },
  defaultProps: {
    items: [
      { label: 'Products', link: '/products' },
      { label: 'Electronics', link: '/products/electronics' },
      { label: 'Smartphones', link: '' },
    ],
    showHome: true,
    homeLink: '/',
    separator: 'arrow',
    size: 'medium',
    color: 'primary',
    activeColor: '',
    hoverUnderline: true,
    maxItems: 0,
  },
  render: ({
    items,
    showHome,
    homeLink,
    separator,
    size,
    color,
    activeColor,
    hoverUnderline,
    maxItems,
  }) => {
    const getSeparator = () => {
      switch (separator) {
        case 'chevron':
          return <ChevronRightIcon fontSize="small" />;
        case 'slash':
          return '/';
        case 'dot':
          return '·';
        default:
          return <NavigateNextIcon fontSize="small" />;
      }
    };

    const textVariant = size === 'small' ? 'body2' : 'body1';
    const iconSize = size === 'small' ? 16 : 20;

    const allItems = showHome
      ? [{ label: '', link: homeLink, isHome: true }, ...items]
      : items;

    return (
      <Breadcrumbs
        separator={getSeparator()}
        maxItems={maxItems > 0 ? maxItems : undefined}
        itemsAfterCollapse={maxItems > 0 ? 2 : undefined}
        itemsBeforeCollapse={maxItems > 0 ? 1 : undefined}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: size === 'small' ? 0.5 : 1,
            color: 'text.disabled',
          },
        }}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          if (item.isHome) {
            return (
              <Link
                key="home"
                href={item.link}
                color={color === 'text' ? 'text.secondary' : `${color}.main`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: hoverUnderline ? 'underline' : 'none',
                  },
                }}
              >
                <HomeIcon sx={{ fontSize: iconSize }} />
              </Link>
            );
          }

          if (isLast || !item.link) {
            return (
              <Typography
                key={index}
                variant={textVariant}
                sx={{
                  color: activeColor || 'text.primary',
                  fontWeight: isLast ? 500 : 400,
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              href={item.link}
              color={color === 'text' ? 'text.secondary' : `${color}.main`}
              variant={textVariant}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: hoverUnderline ? 'underline' : 'none',
                },
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  },
};

export default Breadcrumb;
