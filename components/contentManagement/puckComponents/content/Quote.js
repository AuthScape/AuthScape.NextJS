import React from 'react';
import { Box, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export const Quote = {
  label: 'Quote',
  fields: {
    // Content
    text: {
      type: 'textarea',
      label: 'Quote Text',
    },
    author: {
      type: 'text',
      label: 'Author',
    },
    citation: {
      type: 'text',
      label: 'Citation/Source',
    },

    // Style
    style: {
      type: 'select',
      label: 'Style',
      options: [
        { label: 'Modern (Left Border)', value: 'modern' },
        { label: 'Classic (Quote Marks)', value: 'classic' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Centered', value: 'centered' },
        { label: 'Card', value: 'card' },
      ],
    },
    size: {
      type: 'select',
      label: 'Text Size',
      options: [
        { label: 'Small', value: 'body1' },
        { label: 'Medium', value: 'h6' },
        { label: 'Large', value: 'h5' },
        { label: 'Extra Large', value: 'h4' },
      ],
    },

    // Colors
    borderColor: {
      type: 'text',
      label: 'Accent Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    textColor: {
      type: 'text',
      label: 'Text Color',
    },

    // Icon
    showQuoteIcon: {
      type: 'radio',
      label: 'Show Quote Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    iconColor: {
      type: 'text',
      label: 'Icon Color',
    },
  },
  defaultProps: {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    citation: '',
    style: 'modern',
    size: 'h6',
    borderColor: '',
    backgroundColor: '',
    textColor: '',
    showQuoteIcon: true,
    iconColor: '',
  },
  render: ({
    text,
    author,
    citation,
    style,
    size,
    borderColor,
    backgroundColor,
    textColor,
    showQuoteIcon,
    iconColor,
  }) => {
    const getStyleProps = () => {
      switch (style) {
        case 'modern':
          return {
            borderLeft: '4px solid',
            borderColor: borderColor || 'primary.main',
            pl: 3,
            py: 2,
          };
        case 'classic':
          return {
            position: 'relative',
            pl: showQuoteIcon ? 6 : 0,
          };
        case 'minimal':
          return {
            fontStyle: 'italic',
          };
        case 'centered':
          return {
            textAlign: 'center',
            py: 3,
          };
        case 'card':
          return {
            backgroundColor: backgroundColor || 'grey.50',
            p: 4,
            borderRadius: 2,
          };
        default:
          return {};
      }
    };

    return (
      <Box
        component="blockquote"
        sx={{
          m: 0,
          ...getStyleProps(),
        }}
      >
        {/* Quote Icon */}
        {showQuoteIcon && (style === 'classic' || style === 'centered' || style === 'card') && (
          <FormatQuoteIcon
            sx={{
              position: style === 'classic' ? 'absolute' : 'relative',
              left: style === 'classic' ? 0 : 'auto',
              top: style === 'classic' ? 0 : 'auto',
              fontSize: 48,
              color: iconColor || 'primary.light',
              opacity: 0.5,
              transform: 'rotate(180deg)',
              mb: style !== 'classic' ? 1 : 0,
              display: 'block',
              mx: style === 'centered' ? 'auto' : 0,
            }}
          />
        )}

        {/* Quote Text */}
        <Typography
          variant={size}
          sx={{
            fontStyle: style === 'minimal' || style === 'classic' ? 'italic' : 'normal',
            color: textColor || 'text.primary',
            lineHeight: 1.6,
            fontWeight: size === 'h4' || size === 'h5' ? 400 : 500,
          }}
        >
          "{text}"
        </Typography>

        {/* Attribution */}
        {(author || citation) && (
          <Box sx={{ mt: 2, textAlign: style === 'centered' ? 'center' : 'left' }}>
            {author && (
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: textColor || 'text.primary',
                }}
              >
                — {author}
              </Typography>
            )}
            {citation && (
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {citation}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  },
};

export default Quote;
