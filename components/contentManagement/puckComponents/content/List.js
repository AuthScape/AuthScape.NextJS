import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const List = {
  label: 'List',
  fields: {
    // Items
    items: {
      type: 'array',
      label: 'List Items',
      arrayFields: {
        text: { type: 'text', label: 'Text' },
      },
      defaultItemProps: {
        text: 'List item',
      },
    },

    // Type
    listType: {
      type: 'select',
      label: 'List Type',
      options: [
        { label: 'Unordered (Bullets)', value: 'unordered' },
        { label: 'Ordered (Numbers)', value: 'ordered' },
        { label: 'Icon List', value: 'icon' },
      ],
    },
    iconType: {
      type: 'select',
      label: 'Icon (for Icon List)',
      options: [
        { label: 'Check Circle', value: 'check_circle' },
        { label: 'Check', value: 'check' },
        { label: 'Arrow', value: 'arrow' },
        { label: 'Star', value: 'star' },
        { label: 'Dot', value: 'dot' },
      ],
    },

    // Layout
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Item Spacing',
      options: [
        { label: 'Tight', value: 1 },
        { label: 'Normal', value: 2 },
        { label: 'Comfortable', value: 3 },
      ],
    },

    // Styling
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Success', value: 'success.main' },
        { label: 'Text', value: 'text.secondary' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIconColor: {
      type: 'text',
      label: 'Custom Icon Color',
    },
    iconSize: {
      type: 'select',
      label: 'Icon Size',
      options: [
        { label: 'Small', value: 16 },
        { label: 'Medium', value: 20 },
        { label: 'Large', value: 24 },
      ],
    },
    textSize: {
      type: 'select',
      label: 'Text Size',
      options: [
        { label: 'Small', value: 'body2' },
        { label: 'Medium', value: 'body1' },
        { label: 'Large', value: 'h6' },
      ],
    },
    textColor: {
      type: 'text',
      label: 'Text Color',
    },
  },
  defaultProps: {
    items: [
      { text: 'First list item with your content' },
      { text: 'Second list item with more content' },
      { text: 'Third list item to complete the list' },
    ],
    listType: 'icon',
    iconType: 'check_circle',
    columns: 1,
    spacing: 2,
    iconColor: 'success.main',
    customIconColor: '',
    iconSize: 20,
    textSize: 'body1',
    textColor: '',
  },
  render: ({
    items,
    listType,
    iconType,
    columns,
    spacing,
    iconColor,
    customIconColor,
    iconSize,
    textSize,
    textColor,
  }) => {
    const finalIconColor = iconColor === 'custom' ? customIconColor : iconColor;

    const getIcon = () => {
      const props = { sx: { fontSize: iconSize, color: finalIconColor } };
      switch (iconType) {
        case 'check':
          return <CheckIcon {...props} />;
        case 'arrow':
          return <ArrowRightIcon {...props} />;
        case 'star':
          return <StarIcon {...props} />;
        case 'dot':
          return <FiberManualRecordIcon {...props} sx={{ ...props.sx, fontSize: iconSize * 0.5 }} />;
        default:
          return <CheckCircleIcon {...props} />;
      }
    };

    const renderItem = (item, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          mb: spacing,
        }}
      >
        {listType === 'ordered' ? (
          <Typography
            variant={textSize}
            sx={{
              fontWeight: 600,
              color: finalIconColor,
              minWidth: 24,
            }}
          >
            {index + 1}.
          </Typography>
        ) : listType === 'icon' ? (
          <Box sx={{ flexShrink: 0, mt: 0.25 }}>{getIcon()}</Box>
        ) : (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: finalIconColor,
              flexShrink: 0,
              mt: textSize === 'h6' ? 1.25 : textSize === 'body1' ? 0.9 : 0.75,
            }}
          />
        )}
        <Typography
          variant={textSize}
          sx={{ color: textColor || 'text.primary' }}
        >
          {item.text}
        </Typography>
      </Box>
    );

    if (columns > 1) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: columns === 3 ? 'repeat(2, 1fr)' : `repeat(${columns}, 1fr)`,
              md: `repeat(${columns}, 1fr)`,
            },
            gap: spacing,
          }}
        >
          {items.map((item, index) => (
            <Box key={index}>{renderItem(item, index)}</Box>
          ))}
        </Box>
      );
    }

    return <Box>{items.map(renderItem)}</Box>;
  },
};

export default List;
