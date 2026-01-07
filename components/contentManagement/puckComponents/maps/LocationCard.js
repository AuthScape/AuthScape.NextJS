import React from 'react';
import { Box, Paper, Typography, Button, Stack, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const LocationCard = {
  label: 'Location Card',
  fields: {
    // Content
    name: {
      type: 'text',
      label: 'Location Name',
    },
    address: {
      type: 'textarea',
      label: 'Address',
    },
    phone: {
      type: 'text',
      label: 'Phone Number',
    },
    hours: {
      type: 'text',
      label: 'Hours (e.g., "Mon-Fri 9-5")',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    tags: {
      type: 'array',
      label: 'Tags',
      arrayFields: {
        label: { type: 'text', label: 'Tag' },
      },
      defaultItemProps: {
        label: 'Parking Available',
      },
    },

    // Map
    showMap: {
      type: 'radio',
      label: 'Show Map',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    mapPosition: {
      type: 'select',
      label: 'Map Position',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    latitude: {
      type: 'text',
      label: 'Latitude',
    },
    longitude: {
      type: 'text',
      label: 'Longitude',
    },
    mapHeight: {
      type: 'select',
      label: 'Map Height',
      options: [
        { label: 'Small (150px)', value: 150 },
        { label: 'Medium (200px)', value: 200 },
        { label: 'Large (250px)', value: 250 },
      ],
    },

    // Actions
    showDirections: {
      type: 'radio',
      label: 'Show Directions Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    directionsText: {
      type: 'text',
      label: 'Directions Button Text',
    },
    showCall: {
      type: 'radio',
      label: 'Show Call Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
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
  },
  defaultProps: {
    name: 'Downtown Office',
    address: '123 Business Street\nNew York, NY 10001',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Fri: 9AM-5PM',
    description: '',
    tags: [
      { label: 'Parking Available' },
      { label: 'Wheelchair Accessible' },
    ],
    showMap: true,
    mapPosition: 'top',
    latitude: '40.7128',
    longitude: '-74.0060',
    mapHeight: 200,
    showDirections: true,
    directionsText: 'Get Directions',
    showCall: true,
    elevation: 2,
    borderRadius: 2,
    showBorder: false,
  },
  render: ({
    name,
    address,
    phone,
    hours,
    description,
    tags,
    showMap,
    mapPosition,
    latitude,
    longitude,
    mapHeight,
    showDirections,
    directionsText,
    showCall,
    elevation,
    borderRadius,
    showBorder,
  }) => {
    const borderRadiusValue = borderRadius * 4;

    const getDirectionsUrl = () => {
      if (latitude && longitude) {
        return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      }
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address?.replace(/\n/g, ', '))}`;
    };

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude) - 0.005},${parseFloat(latitude) - 0.005},${parseFloat(longitude) + 0.005},${parseFloat(latitude) + 0.005}&layer=mapnik&marker=${latitude},${longitude}`;

    const isHorizontal = mapPosition === 'left' || mapPosition === 'right';

    const MapComponent = showMap && (
      <Box
        component="iframe"
        src={mapUrl}
        sx={{
          width: '100%',
          height: isHorizontal ? '100%' : mapHeight,
          minHeight: isHorizontal ? mapHeight : 'auto',
          border: 'none',
          display: 'block',
        }}
        loading="lazy"
        title="Location Map"
      />
    );

    const ContentComponent = (
      <Box sx={{ p: 3, flex: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {name}
        </Typography>

        {address && (
          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1.5 }}>
            <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary', mt: 0.3 }} />
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {address}
            </Typography>
          </Stack>
        )}

        {phone && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {phone}
            </Typography>
          </Stack>
        )}

        {hours && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <AccessTimeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {hours}
            </Typography>
          </Stack>
        )}

        {description && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}

        {tags && tags.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag.label}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        )}

        {(showDirections || showCall) && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {showDirections && (
              <Button
                variant="contained"
                size="small"
                startIcon={<DirectionsIcon />}
                href={getDirectionsUrl()}
                target="_blank"
              >
                {directionsText}
              </Button>
            )}
            {showCall && phone && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<PhoneIcon />}
                href={`tel:${phone.replace(/\D/g, '')}`}
              >
                Call
              </Button>
            )}
          </Stack>
        )}
      </Box>
    );

    return (
      <Paper
        elevation={elevation}
        sx={{
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          border: showBorder ? '1px solid' : 'none',
          borderColor: 'divider',
          display: isHorizontal ? 'flex' : 'block',
          flexDirection: mapPosition === 'right' ? 'row' : 'row-reverse',
        }}
      >
        {isHorizontal ? (
          <>
            {mapPosition === 'left' && showMap && (
              <Box sx={{ width: '40%', minWidth: 200 }}>{MapComponent}</Box>
            )}
            {ContentComponent}
            {mapPosition === 'right' && showMap && (
              <Box sx={{ width: '40%', minWidth: 200 }}>{MapComponent}</Box>
            )}
          </>
        ) : (
          <>
            {mapPosition === 'top' && MapComponent}
            {ContentComponent}
            {mapPosition === 'bottom' && MapComponent}
          </>
        )}
      </Paper>
    );
  },
};

export default LocationCard;
