import React, { useState } from 'react';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  borderRadiusField,
} from '../shared/fieldTypes';

export const Gallery = {
  label: 'Gallery',
  fields: {
    // Images
    images: {
      type: 'array',
      label: 'Images',
      arrayFields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        caption: { type: 'text', label: 'Caption' },
      },
      defaultItemProps: {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        alt: 'Gallery image',
        caption: '',
      },
    },

    // Layout
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
        { label: '5 Columns', value: 5 },
      ],
    },
    mobileColumns: {
      type: 'select',
      label: 'Mobile Columns',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
      ],
    },
    gap: {
      type: 'select',
      label: 'Gap Between Images',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small (8px)', value: 8 },
        { label: 'Medium (16px)', value: 16 },
        { label: 'Large (24px)', value: 24 },
      ],
    },
    layout: {
      type: 'select',
      label: 'Layout Style',
      options: [
        { label: 'Grid (Equal)', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
      ],
    },

    // Image Styling
    aspectRatio: {
      type: 'select',
      label: 'Image Aspect Ratio (Grid only)',
      options: [
        { label: 'Square (1:1)', value: '100%' },
        { label: 'Landscape (4:3)', value: '75%' },
        { label: 'Wide (16:9)', value: '56.25%' },
        { label: 'Portrait (3:4)', value: '133%' },
      ],
    },
    borderRadius: borderRadiusField,
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Zoom', value: 'zoom' },
        { label: 'Darken', value: 'darken' },
        { label: 'Lift', value: 'lift' },
      ],
    },

    // Lightbox
    enableLightbox: {
      type: 'radio',
      label: 'Enable Lightbox',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Captions
    showCaptions: {
      type: 'select',
      label: 'Show Captions',
      options: [
        { label: 'Never', value: 'never' },
        { label: 'On Hover', value: 'hover' },
        { label: 'Always', value: 'always' },
      ],
    },
  },
  defaultProps: {
    images: [
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', alt: 'Mountain landscape', caption: 'Beautiful mountains' },
      { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600', alt: 'Forest path', caption: 'Peaceful forest' },
      { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600', alt: 'Lake view', caption: 'Serene lake' },
      { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600', alt: 'Waterfall', caption: 'Majestic waterfall' },
      { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', alt: 'Green valley', caption: 'Lush valley' },
      { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600', alt: 'Foggy hills', caption: 'Misty morning' },
    ],
    columns: 3,
    mobileColumns: 2,
    gap: 16,
    layout: 'grid',
    aspectRatio: '100%',
    borderRadius: 2,
    hoverEffect: 'zoom',
    enableLightbox: true,
    showCaptions: 'hover',
  },
  render: ({
    images,
    columns,
    mobileColumns,
    gap,
    layout,
    aspectRatio,
    borderRadius,
    hoverEffect,
    enableLightbox,
    showCaptions,
  }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'zoom':
          return {
            '& img': {
              transition: 'transform 0.3s ease',
            },
            '&:hover img': {
              transform: 'scale(1.1)',
            },
          };
        case 'darken':
          return {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              transition: 'background-color 0.3s ease',
            },
            '&:hover::after': {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
          };
        case 'lift':
          return {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
            },
          };
        default:
          return {};
      }
    };

    const handleOpenLightbox = (index) => {
      if (enableLightbox) {
        setCurrentIndex(index);
        setLightboxOpen(true);
      }
    };

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: `repeat(${mobileColumns}, 1fr)`,
              sm: `repeat(${Math.min(columns, 3)}, 1fr)`,
              md: `repeat(${columns}, 1fr)`,
            },
            gap: `${gap}px`,
            ...(layout === 'masonry' && {
              gridAutoRows: 'auto',
            }),
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleOpenLightbox(index)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: `${borderRadiusValue}px`,
                cursor: enableLightbox ? 'pointer' : 'default',
                ...(layout === 'grid' && {
                  paddingBottom: aspectRatio,
                }),
                ...getHoverStyles(),
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                sx={{
                  ...(layout === 'grid' ? {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  } : {
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }),
                }}
              />

              {/* Caption */}
              {image.caption && showCaptions !== 'never' && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 16px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    color: '#ffffff',
                    opacity: showCaptions === 'always' ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 2,
                    ...(showCaptions === 'hover' && {
                      '.MuiBox-root:hover &': {
                        opacity: 1,
                      },
                    }),
                  }}
                >
                  <Typography variant="body2">{image.caption}</Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Lightbox */}
        <Dialog
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          maxWidth={false}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0,0,0,0.95)',
              maxWidth: '90vw',
              maxHeight: '90vh',
            },
          }}
        >
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#ffffff',
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    color: '#ffffff',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    color: '#ffffff',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}

            <Box
              component="img"
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              sx={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
              }}
            />
          </Box>

          {images[currentIndex]?.caption && (
            <Typography
              sx={{
                color: '#ffffff',
                textAlign: 'center',
                py: 2,
                px: 3,
              }}
            >
              {images[currentIndex].caption}
            </Typography>
          )}
        </Dialog>
      </>
    );
  },
};

export default Gallery;
