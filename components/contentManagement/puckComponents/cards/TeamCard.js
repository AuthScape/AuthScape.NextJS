import React from 'react';
import { Box, Paper, Typography, Avatar, IconButton, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import {
  borderRadiusField,
  elevationField,
  textAlignField,
} from '../shared/fieldTypes';

const socialIcons = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  email: EmailIcon,
  github: GitHubIcon,
  website: LanguageIcon,
};

export const TeamCard = {
  label: 'Team Card',
  fields: {
    // Member info
    image: {
      type: 'text',
      label: 'Photo URL',
    },
    name: {
      type: 'text',
      label: 'Name',
    },
    role: {
      type: 'text',
      label: 'Role/Title',
    },
    bio: {
      type: 'textarea',
      label: 'Bio',
    },

    // Social links
    socialLinks: {
      type: 'array',
      label: 'Social Links',
      arrayFields: {
        platform: {
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Email', value: 'email' },
            { label: 'GitHub', value: 'github' },
            { label: 'Website', value: 'website' },
          ],
        },
        url: { type: 'text', label: 'URL' },
      },
      defaultItemProps: {
        platform: 'linkedin',
        url: '#',
      },
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Card with Image', value: 'card' },
        { label: 'Overlay on Image', value: 'overlay' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
    imageSize: {
      type: 'select',
      label: 'Image Size',
      options: [
        { label: 'Small (80px)', value: 80 },
        { label: 'Medium (120px)', value: 120 },
        { label: 'Large (160px)', value: 160 },
        { label: 'Full Width', value: 'full' },
      ],
    },
    align: textAlignField,

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    overlayColor: {
      type: 'text',
      label: 'Overlay Color (for overlay layout)',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Zoom Image', value: 'zoom' },
      ],
    },
  },
  defaultProps: {
    image: '',
    name: 'John Smith',
    role: 'CEO & Founder',
    bio: 'Passionate about building great products and leading amazing teams.',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
    ],
    layout: 'card',
    imageSize: 120,
    align: 'center',
    backgroundColor: '#ffffff',
    overlayColor: 'rgba(0,0,0,0.7)',
    elevation: 1,
    borderRadius: 2,
    hoverEffect: 'lift',
  },
  render: ({
    image,
    name,
    role,
    bio,
    socialLinks,
    layout,
    imageSize,
    align,
    backgroundColor,
    overlayColor,
    elevation,
    borderRadius,
    hoverEffect,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'lift':
          return {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
            },
          };
        case 'zoom':
          return {
            '& .team-image': {
              transition: 'transform 0.3s ease',
            },
            '&:hover .team-image': {
              transform: 'scale(1.05)',
            },
          };
        default:
          return {};
      }
    };

    // Horizontal layout
    if (layout === 'horizontal') {
      return (
        <Paper
          elevation={elevation}
          sx={{
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadiusValue}px`,
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            ...getHoverStyles(),
          }}
        >
          <Avatar
            src={image}
            alt={name}
            className="team-image"
            sx={{
              width: typeof imageSize === 'number' ? imageSize : 120,
              height: typeof imageSize === 'number' ? imageSize : 120,
              flexShrink: 0,
            }}
          >
            {!image && name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500, mb: 1 }}>
              {role}
            </Typography>
            {bio && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {bio}
              </Typography>
            )}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((link, index) => {
                const IconComponent = socialIcons[link.platform] || LanguageIcon;
                return (
                  <IconButton
                    key={index}
                    size="small"
                    href={link.platform === 'email' ? `mailto:${link.url}` : link.url}
                    target={link.platform !== 'email' ? '_blank' : undefined}
                    sx={{ color: 'text.secondary' }}
                  >
                    <IconComponent fontSize="small" />
                  </IconButton>
                );
              })}
            </Stack>
          </Box>
        </Paper>
      );
    }

    // Overlay layout
    if (layout === 'overlay') {
      return (
        <Paper
          elevation={elevation}
          sx={{
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '3/4',
            ...getHoverStyles(),
          }}
        >
          <Box
            className="team-image"
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundColor: image ? 'transparent' : 'grey.300',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              background: `linear-gradient(transparent, ${overlayColor})`,
              color: '#ffffff',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              {role}
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((link, index) => {
                const IconComponent = socialIcons[link.platform] || LanguageIcon;
                return (
                  <IconButton
                    key={index}
                    size="small"
                    href={link.platform === 'email' ? `mailto:${link.url}` : link.url}
                    target={link.platform !== 'email' ? '_blank' : undefined}
                    sx={{ color: '#ffffff' }}
                  >
                    <IconComponent fontSize="small" />
                  </IconButton>
                );
              })}
            </Stack>
          </Box>
        </Paper>
      );
    }

    // Standard card layout
    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          p: 4,
          textAlign: align,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
          ...getHoverStyles(),
        }}
      >
        {/* Image */}
        {imageSize === 'full' ? (
          <Box
            className="team-image"
            sx={{
              width: '100%',
              aspectRatio: '1',
              mb: 3,
              borderRadius: `${borderRadiusValue}px`,
              overflow: 'hidden',
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundColor: image ? 'transparent' : 'grey.300',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <Avatar
            src={image}
            alt={name}
            className="team-image"
            sx={{
              width: imageSize,
              height: imageSize,
              mb: 2,
              fontSize: imageSize / 3,
            }}
          >
            {!image && name.charAt(0)}
          </Avatar>
        )}

        {/* Info */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500, mb: 1 }}>
          {role}
        </Typography>
        {bio && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
            {bio}
          </Typography>
        )}

        {/* Social Links */}
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          {socialLinks.map((link, index) => {
            const IconComponent = socialIcons[link.platform] || LanguageIcon;
            return (
              <IconButton
                key={index}
                size="small"
                href={link.platform === 'email' ? `mailto:${link.url}` : link.url}
                target={link.platform !== 'email' ? '_blank' : undefined}
                sx={{ color: 'text.secondary' }}
              >
                <IconComponent fontSize="small" />
              </IconButton>
            );
          })}
        </Stack>
      </Paper>
    );
  },
};

export default TeamCard;
