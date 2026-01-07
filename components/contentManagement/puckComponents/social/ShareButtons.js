import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

const platformConfig = {
  facebook: {
    icon: FacebookIcon,
    color: '#1877f2',
    label: 'Facebook',
    getUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  twitter: {
    icon: TwitterIcon,
    color: '#1da1f2',
    label: 'Twitter',
    getUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  linkedin: {
    icon: LinkedInIcon,
    color: '#0a66c2',
    label: 'LinkedIn',
    getUrl: (url, title) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  pinterest: {
    icon: PinterestIcon,
    color: '#bd081c',
    label: 'Pinterest',
    getUrl: (url, title) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  reddit: {
    icon: RedditIcon,
    color: '#ff4500',
    label: 'Reddit',
    getUrl: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  email: {
    icon: EmailIcon,
    color: '#666666',
    label: 'Email',
    getUrl: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  whatsapp: {
    icon: WhatsAppIcon,
    color: '#25d366',
    label: 'WhatsApp',
    getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  },
  telegram: {
    icon: TelegramIcon,
    color: '#0088cc',
    label: 'Telegram',
    getUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  copy: {
    icon: LinkIcon,
    color: '#666666',
    label: 'Copy Link',
    getUrl: () => null,
  },
};

export const ShareButtons = {
  label: 'Share Buttons',
  fields: {
    // Content
    url: {
      type: 'text',
      label: 'URL to Share (leave empty for current page)',
    },
    title: {
      type: 'text',
      label: 'Title/Text',
    },

    // Platforms
    platforms: {
      type: 'array',
      label: 'Platforms',
      arrayFields: {
        platform: {
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Reddit', value: 'reddit' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Email', value: 'email' },
            { label: 'Copy Link', value: 'copy' },
          ],
        },
      },
      defaultItemProps: {
        platform: 'facebook',
      },
    },

    // Display
    showLabel: {
      type: 'radio',
      label: 'Show Labels',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showTitle: {
      type: 'radio',
      label: 'Show "Share" Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    titleText: {
      type: 'text',
      label: 'Title Text',
    },

    // Styling
    style: {
      type: 'select',
      label: 'Button Style',
      options: [
        { label: 'Icon Only', value: 'icon' },
        { label: 'Filled', value: 'filled' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Rounded', value: 'rounded' },
      ],
    },
    colorMode: {
      type: 'select',
      label: 'Color Mode',
      options: [
        { label: 'Brand Colors', value: 'brand' },
        { label: 'Primary', value: 'primary' },
        { label: 'Monochrome', value: 'mono' },
      ],
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
        { label: 'Tight', value: 1 },
        { label: 'Normal', value: 2 },
        { label: 'Spacious', value: 3 },
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
  },
  defaultProps: {
    url: '',
    title: 'Check this out!',
    platforms: [
      { platform: 'facebook' },
      { platform: 'twitter' },
      { platform: 'linkedin' },
      { platform: 'email' },
      { platform: 'copy' },
    ],
    showLabel: false,
    showTitle: true,
    titleText: 'Share:',
    style: 'icon',
    colorMode: 'brand',
    size: 'medium',
    spacing: 1,
    align: 'flex-start',
  },
  render: ({
    url,
    title,
    platforms,
    showLabel,
    showTitle,
    titleText,
    style,
    colorMode,
    size,
    spacing,
    align,
  }) => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    const handleShare = (platform) => {
      const config = platformConfig[platform];
      if (!config) return;

      if (platform === 'copy') {
        navigator.clipboard?.writeText(shareUrl);
        return;
      }

      const shareLink = config.getUrl(shareUrl, title);
      if (shareLink) {
        window.open(shareLink, '_blank', 'width=600,height=400');
      }
    };

    const getColor = (platform) => {
      const config = platformConfig[platform];
      switch (colorMode) {
        case 'brand':
          return config?.color || 'text.primary';
        case 'primary':
          return 'primary.main';
        case 'mono':
          return 'text.primary';
        default:
          return config?.color;
      }
    };

    const getSizes = () => {
      switch (size) {
        case 'small':
          return { icon: 18, button: 32 };
        case 'large':
          return { icon: 26, button: 48 };
        default:
          return { icon: 22, button: 40 };
      }
    };

    const sizes = getSizes();

    const renderButton = (platform, index) => {
      const config = platformConfig[platform];
      if (!config) return null;

      const IconComponent = config.icon;
      const color = getColor(platform);

      if (style === 'icon') {
        return (
          <IconButton
            key={index}
            onClick={() => handleShare(platform)}
            aria-label={`Share on ${config.label}`}
            size={size}
            sx={{
              color: color,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <IconComponent sx={{ fontSize: sizes.icon }} />
          </IconButton>
        );
      }

      const buttonSx = {
        minWidth: showLabel ? 'auto' : sizes.button,
        height: sizes.button,
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'scale(1.05)' },
      };

      if (style === 'filled') {
        return (
          <Button
            key={index}
            variant="contained"
            size={size}
            onClick={() => handleShare(platform)}
            startIcon={showLabel ? <IconComponent /> : undefined}
            sx={{
              ...buttonSx,
              backgroundColor: color,
              '&:hover': { ...buttonSx['&:hover'], backgroundColor: color, opacity: 0.9 },
            }}
          >
            {showLabel ? config.label : <IconComponent sx={{ fontSize: sizes.icon }} />}
          </Button>
        );
      }

      if (style === 'outlined') {
        return (
          <Button
            key={index}
            variant="outlined"
            size={size}
            onClick={() => handleShare(platform)}
            startIcon={showLabel ? <IconComponent /> : undefined}
            sx={{
              ...buttonSx,
              borderColor: color,
              color: color,
              '&:hover': { ...buttonSx['&:hover'], borderColor: color },
            }}
          >
            {showLabel ? config.label : <IconComponent sx={{ fontSize: sizes.icon }} />}
          </Button>
        );
      }

      // Rounded style
      return (
        <Button
          key={index}
          variant="contained"
          size={size}
          onClick={() => handleShare(platform)}
          startIcon={showLabel ? <IconComponent /> : undefined}
          sx={{
            ...buttonSx,
            backgroundColor: color,
            borderRadius: 50,
            '&:hover': { ...buttonSx['&:hover'], backgroundColor: color, opacity: 0.9 },
          }}
        >
          {showLabel ? config.label : <IconComponent sx={{ fontSize: sizes.icon }} />}
        </Button>
      );
    };

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: align,
          gap: spacing,
        }}
      >
        {showTitle && titleText && (
          <Typography
            variant="body2"
            fontWeight={500}
            color="text.secondary"
            sx={{ mr: 1 }}
          >
            {titleText}
          </Typography>
        )}
        {platforms.map((p, index) => renderButton(p.platform, index))}
      </Box>
    );
  },
};

export default ShareButtons;
