import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { DropZone } from '@measured/puck';

export const ContentBlock = {
  label: 'Content Block',
  fields: {
    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Text Only', value: 'text' },
        { label: 'Image Left', value: 'image-left' },
        { label: 'Image Right', value: 'image-right' },
        { label: 'Image Above', value: 'image-above' },
        { label: 'Image Below', value: 'image-below' },
      ],
    },
    imageWidth: {
      type: 'select',
      label: 'Image Width',
      options: [
        { label: '40%', value: 5 },
        { label: '50%', value: 6 },
        { label: '60%', value: 7 },
      ],
    },
    verticalAlign: {
      type: 'select',
      label: 'Vertical Alignment',
      options: [
        { label: 'Top', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'flex-end' },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Tight', value: 4 },
        { label: 'Normal', value: 6 },
        { label: 'Spacious', value: 8 },
      ],
    },

    // Content
    eyebrow: {
      type: 'text',
      label: 'Eyebrow Text',
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle',
    },
    body: {
      type: 'textarea',
      label: 'Body Text',
    },

    // Image
    image: {
      type: 'text',
      label: 'Image URL',
    },
    imageAlt: {
      type: 'text',
      label: 'Image Alt Text',
    },
    imageBorderRadius: {
      type: 'select',
      label: 'Image Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },

    // CTA
    showCTA: {
      type: 'radio',
      label: 'Show CTA Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    ctaText: {
      type: 'text',
      label: 'CTA Text',
    },
    ctaLink: {
      type: 'text',
      label: 'CTA Link',
    },
    ctaVariant: {
      type: 'select',
      label: 'CTA Style',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Text', value: 'text' },
      ],
    },
    ctaColor: {
      type: 'select',
      label: 'CTA Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },

    // Secondary CTA
    showSecondaryCTA: {
      type: 'radio',
      label: 'Show Secondary CTA',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    secondaryCTAText: {
      type: 'text',
      label: 'Secondary CTA Text',
    },
    secondaryCTALink: {
      type: 'text',
      label: 'Secondary CTA Link',
    },

    // Use DropZone
    useDropZone: {
      type: 'radio',
      label: 'Use DropZone for Extra Content',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    textAlign: {
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    eyebrowColor: {
      type: 'text',
      label: 'Eyebrow Color',
    },
    titleSize: {
      type: 'select',
      label: 'Title Size',
      options: [
        { label: 'Small (h5)', value: 'h5' },
        { label: 'Medium (h4)', value: 'h4' },
        { label: 'Large (h3)', value: 'h3' },
        { label: 'Extra Large (h2)', value: 'h2' },
      ],
    },
  },
  defaultProps: {
    layout: 'image-right',
    imageWidth: 6,
    verticalAlign: 'center',
    spacing: 6,
    eyebrow: 'About Us',
    title: 'Building the Future of Technology',
    subtitle: '',
    body: 'We are a team of passionate developers and designers dedicated to creating innovative solutions that help businesses grow. Our mission is to deliver exceptional products that make a real difference.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    imageAlt: 'Team working together',
    imageBorderRadius: 2,
    showCTA: true,
    ctaText: 'Learn More',
    ctaLink: '#',
    ctaVariant: 'contained',
    ctaColor: 'primary',
    showSecondaryCTA: false,
    secondaryCTAText: 'Contact Us',
    secondaryCTALink: '#',
    useDropZone: false,
    textAlign: 'left',
    eyebrowColor: '',
    titleSize: 'h3',
  },
  render: ({
    layout,
    imageWidth,
    verticalAlign,
    spacing,
    eyebrow,
    title,
    subtitle,
    body,
    image,
    imageAlt,
    imageBorderRadius,
    showCTA,
    ctaText,
    ctaLink,
    ctaVariant,
    ctaColor,
    showSecondaryCTA,
    secondaryCTAText,
    secondaryCTALink,
    useDropZone,
    textAlign,
    eyebrowColor,
    titleSize,
  }) => {
    const borderRadiusValue = imageBorderRadius * 4;
    const textWidth = 12 - imageWidth;

    const textContent = (
      <Box sx={{ textAlign }}>
        {eyebrow && (
          <Typography
            variant="overline"
            sx={{
              color: eyebrowColor || 'primary.main',
              fontWeight: 600,
              letterSpacing: 2,
              display: 'block',
              mb: 1,
            }}
          >
            {eyebrow}
          </Typography>
        )}

        <Typography variant={titleSize} fontWeight={700} gutterBottom>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}

        {body && (
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {body}
          </Typography>
        )}

        {useDropZone && (
          <Box sx={{ mb: 3 }}>
            <DropZone zone="content-extra" />
          </Box>
        )}

        {(showCTA || showSecondaryCTA) && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {showCTA && (
              <Button variant={ctaVariant} color={ctaColor} size="large" href={ctaLink}>
                {ctaText}
              </Button>
            )}
            {showSecondaryCTA && (
              <Button variant="outlined" color={ctaColor} size="large" href={secondaryCTALink}>
                {secondaryCTAText}
              </Button>
            )}
          </Box>
        )}
      </Box>
    );

    const imageContent = image && (
      <Box
        component="img"
        src={image}
        alt={imageAlt}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: `${borderRadiusValue}px`,
          objectFit: 'cover',
        }}
      />
    );

    if (layout === 'text') {
      return textContent;
    }

    if (layout === 'image-above' || layout === 'image-below') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          {layout === 'image-above' && imageContent}
          {textContent}
          {layout === 'image-below' && imageContent}
        </Box>
      );
    }

    return (
      <Grid container spacing={spacing} alignItems={verticalAlign}>
        <Grid
          item
          xs={12}
          md={layout === 'image-left' ? imageWidth : textWidth}
          order={{ xs: layout === 'image-left' ? 1 : 2, md: 1 }}
        >
          {layout === 'image-left' ? imageContent : textContent}
        </Grid>
        <Grid
          item
          xs={12}
          md={layout === 'image-left' ? textWidth : imageWidth}
          order={{ xs: layout === 'image-left' ? 2 : 1, md: 2 }}
        >
          {layout === 'image-left' ? textContent : imageContent}
        </Grid>
      </Grid>
    );
  },
};

export default ContentBlock;
