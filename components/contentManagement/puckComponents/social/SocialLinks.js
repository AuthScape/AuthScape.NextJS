import React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const platformIcons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  github: GitHubIcon,
  pinterest: PinterestIcon,
  reddit: RedditIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
};

const platformColors = {
  facebook: '#1877f2',
  twitter: '#1da1f2',
  instagram: '#e4405f',
  linkedin: '#0a66c2',
  youtube: '#ff0000',
  github: '#333333',
  pinterest: '#bd081c',
  reddit: '#ff4500',
  telegram: '#0088cc',
  whatsapp: '#25d366',
};

export const SocialLinks = {
  label: 'Social Links',
  fields: {
    // Links
    links: {
      type: 'array',
      label: 'Social Links',
      arrayFields: {
        platform: {
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'GitHub', value: 'github' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Reddit', value: 'reddit' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        url: { type: 'text', label: 'URL' },
      },
      defaultItemProps: {
        platform: 'facebook',
        url: '#',
      },
    },

    // Styling
    style: {
      type: 'select',
      label: 'Style',
      options: [
        { label: 'Icon Only', value: 'icon' },
        { label: 'Circle Background', value: 'circle' },
        { label: 'Square Background', value: 'square' },
        { label: 'Rounded Square', value: 'rounded' },
        { label: 'Outlined Circle', value: 'outlined_circle' },
        { label: 'Outlined Square', value: 'outlined_square' },
      ],
    },
    colorMode: {
      type: 'select',
      label: 'Color Mode',
      options: [
        { label: 'Brand Colors', value: 'brand' },
        { label: 'Primary', value: 'primary' },
        { label: 'Monochrome', value: 'mono' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customColor: {
      type: 'text',
      label: 'Custom Color',
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Tight', value: 0.5 },
        { label: 'Normal', value: 1 },
        { label: 'Comfortable', value: 1.5 },
        { label: 'Spacious', value: 2 },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Scale', value: 'scale' },
        { label: 'Lift', value: 'lift' },
        { label: 'Color Change', value: 'color' },
      ],
    },
    openInNewTab: {
      type: 'radio',
      label: 'Open in New Tab',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    links: [
      { platform: 'facebook', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'linkedin', url: '#' },
    ],
    style: 'icon',
    colorMode: 'brand',
    customColor: '',
    size: 'medium',
    spacing: 1,
    align: 'center',
    hoverEffect: 'scale',
    openInNewTab: true,
  },
  render: ({
    links,
    style,
    colorMode,
    customColor,
    size,
    spacing,
    align,
    hoverEffect,
    openInNewTab,
  }) => {
    const getSizes = () => {
      switch (size) {
        case 'small':
          return { icon: 20, button: 32 };
        case 'large':
          return { icon: 28, button: 48 };
        default:
          return { icon: 24, button: 40 };
      }
    };

    const sizes = getSizes();

    const getColor = (platform) => {
      switch (colorMode) {
        case 'brand':
          return platformColors[platform] || 'text.primary';
        case 'primary':
          return 'primary.main';
        case 'mono':
          return 'text.primary';
        case 'custom':
          return customColor || 'text.primary';
        default:
          return platformColors[platform];
      }
    };

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'scale':
          return {
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.15)' },
          };
        case 'lift':
          return {
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: 2 },
          };
        case 'color':
          return {
            transition: 'opacity 0.2s ease',
            '&:hover': { opacity: 0.7 },
          };
        default:
          return {};
      }
    };

    const getButtonStyles = (platform) => {
      const color = getColor(platform);
      const base = {
        width: sizes.button,
        height: sizes.button,
        ...getHoverStyles(),
      };

      switch (style) {
        case 'circle':
          return {
            ...base,
            backgroundColor: color,
            color: '#ffffff',
            borderRadius: '50%',
            '&:hover': { ...getHoverStyles()['&:hover'], backgroundColor: color },
          };
        case 'square':
          return {
            ...base,
            backgroundColor: color,
            color: '#ffffff',
            borderRadius: 0,
            '&:hover': { ...getHoverStyles()['&:hover'], backgroundColor: color },
          };
        case 'rounded':
          return {
            ...base,
            backgroundColor: color,
            color: '#ffffff',
            borderRadius: 1,
            '&:hover': { ...getHoverStyles()['&:hover'], backgroundColor: color },
          };
        case 'outlined_circle':
          return {
            ...base,
            border: '2px solid',
            borderColor: color,
            color: color,
            borderRadius: '50%',
          };
        case 'outlined_square':
          return {
            ...base,
            border: '2px solid',
            borderColor: color,
            color: color,
            borderRadius: 1,
          };
        default:
          return {
            ...base,
            color: color,
          };
      }
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align,
          gap: spacing,
        }}
      >
        {links.map((link, index) => {
          const IconComponent = platformIcons[link.platform] || FacebookIcon;

          return (
            <IconButton
              key={index}
              component={Link}
              href={link.url}
              target={openInNewTab ? '_blank' : undefined}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              aria-label={link.platform}
              sx={getButtonStyles(link.platform)}
            >
              <IconComponent sx={{ fontSize: sizes.icon }} />
            </IconButton>
          );
        })}
      </Box>
    );
  },
};

export default SocialLinks;
