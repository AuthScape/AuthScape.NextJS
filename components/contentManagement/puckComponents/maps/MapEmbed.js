import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export const MapEmbed = {
  label: 'Map Embed',
  fields: {
    // Location
    embedType: {
      type: 'select',
      label: 'Map Type',
      options: [
        { label: 'Google Maps Embed', value: 'google' },
        { label: 'OpenStreetMap', value: 'osm' },
        { label: 'Custom Embed URL', value: 'custom' },
      ],
    },
    address: {
      type: 'text',
      label: 'Address (for Google Maps)',
    },
    latitude: {
      type: 'text',
      label: 'Latitude',
    },
    longitude: {
      type: 'text',
      label: 'Longitude',
    },
    customEmbedUrl: {
      type: 'text',
      label: 'Custom Embed URL',
    },
    zoom: {
      type: 'select',
      label: 'Zoom Level',
      options: [
        { label: 'Street (18)', value: 18 },
        { label: 'Neighborhood (15)', value: 15 },
        { label: 'City (12)', value: 12 },
        { label: 'Region (8)', value: 8 },
        { label: 'Country (5)', value: 5 },
      ],
    },

    // Styling
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Small (250px)', value: 250 },
        { label: 'Medium (400px)', value: 400 },
        { label: 'Large (500px)', value: 500 },
        { label: 'Extra Large (600px)', value: 600 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
    showBorder: {
      type: 'radio',
      label: 'Show Border',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },

    // Caption
    showCaption: {
      type: 'radio',
      label: 'Show Caption',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    caption: {
      type: 'text',
      label: 'Caption Text',
    },
  },
  defaultProps: {
    embedType: 'osm',
    address: '',
    latitude: '40.7128',
    longitude: '-74.0060',
    customEmbedUrl: '',
    zoom: 15,
    height: 400,
    borderRadius: 2,
    showBorder: false,
    elevation: 0,
    showCaption: false,
    caption: 'Our Location',
  },
  render: ({
    embedType,
    address,
    latitude,
    longitude,
    customEmbedUrl,
    zoom,
    height,
    borderRadius,
    showBorder,
    elevation,
    showCaption,
    caption,
  }) => {
    const getMapUrl = () => {
      if (embedType === 'custom' && customEmbedUrl) {
        return customEmbedUrl;
      }

      if (embedType === 'google') {
        if (address) {
          return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}&zoom=${zoom}`;
        }
        return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=${zoom}`;
      }

      // OpenStreetMap
      return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude - (-0.01)},${latitude - (-0.01)}&layer=mapnik&marker=${latitude},${longitude}`;
    };

    const borderRadiusValue = borderRadius * 4;

    return (
      <Paper
        elevation={elevation}
        sx={{
          overflow: 'hidden',
          borderRadius: `${borderRadiusValue}px`,
          border: showBorder ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Box
          component="iframe"
          src={getMapUrl()}
          sx={{
            width: '100%',
            height: height,
            border: 'none',
            display: 'block',
          }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        />
        {showCaption && caption && (
          <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {caption}
            </Typography>
          </Box>
        )}
      </Paper>
    );
  },
};

export default MapEmbed;
