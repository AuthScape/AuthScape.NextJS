import React from 'react';
import { Box } from '@mui/material';
import {
  textAlignField,
  textColorField,
  spacingField,
} from '../shared/fieldTypes';

export const RichText = {
  label: 'Rich Text',
  fields: {
    content: {
      type: 'textarea',
      label: 'HTML Content',
    },
    color: textColorField,
    customColor: {
      type: 'text',
      label: 'Custom Color (hex)',
    },
    align: textAlignField,
    fontSize: {
      type: 'select',
      label: 'Base Font Size',
      options: [
        { label: 'Small (14px)', value: '14px' },
        { label: 'Normal (16px)', value: '16px' },
        { label: 'Large (18px)', value: '18px' },
        { label: 'Extra Large (20px)', value: '20px' },
      ],
    },
    lineHeight: {
      type: 'select',
      label: 'Line Height',
      options: [
        { label: 'Tight (1.4)', value: 1.4 },
        { label: 'Normal (1.6)', value: 1.6 },
        { label: 'Relaxed (1.8)', value: 1.8 },
        { label: 'Loose (2)', value: 2 },
      ],
    },
    columns: {
      type: 'select',
      label: 'Text Columns',
      options: [
        { label: 'Single Column', value: 1 },
        { label: 'Two Columns', value: 2 },
        { label: 'Three Columns', value: 3 },
      ],
    },
    columnGap: {
      type: 'select',
      label: 'Column Gap',
      options: [
        { label: 'Small (20px)', value: '20px' },
        { label: 'Medium (40px)', value: '40px' },
        { label: 'Large (60px)', value: '60px' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Narrow (600px)', value: '600px' },
        { label: 'Medium (800px)', value: '800px' },
        { label: 'Wide (1000px)', value: '1000px' },
        { label: 'Full', value: '100%' },
      ],
    },
    padding: spacingField('Padding'),
    margin: spacingField('Margin'),
  },
  defaultProps: {
    content: `<h3>Rich Text Heading</h3>
<p>This is a rich text component that supports <strong>bold</strong>, <em>italic</em>, and <a href="#">links</a>.</p>
<ul>
  <li>Bullet point one</li>
  <li>Bullet point two</li>
  <li>Bullet point three</li>
</ul>
<p>You can also include multiple paragraphs and various HTML elements.</p>`,
    color: 'text.primary',
    customColor: '',
    align: 'left',
    fontSize: '16px',
    lineHeight: 1.6,
    columns: 1,
    columnGap: '40px',
    maxWidth: 'none',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    margin: { top: 0, right: 0, bottom: 16, left: 0 },
  },
  render: ({
    content,
    color,
    customColor,
    align,
    fontSize,
    lineHeight,
    columns,
    columnGap,
    maxWidth,
    padding,
    margin,
  }) => {
    const getColor = () => {
      if (color === 'custom' && customColor) {
        return customColor;
      }
      return color;
    };

    return (
      <Box
        sx={{
          maxWidth: maxWidth === 'none' ? 'none' : maxWidth,
          width: '100%',
          padding: `${padding?.top || 0}px ${padding?.right || 0}px ${padding?.bottom || 0}px ${padding?.left || 0}px`,
          margin: `${margin?.top || 0}px ${margin?.right || 0}px ${margin?.bottom || 0}px ${margin?.left || 0}px`,
          color: getColor(),
          textAlign: align,
          fontSize: fontSize,
          lineHeight: lineHeight,
          columnCount: columns,
          columnGap: columnGap,
          // Typography styles for nested HTML elements
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            marginTop: '1em',
            marginBottom: '0.5em',
            fontWeight: 600,
            lineHeight: 1.3,
          },
          '& h1': { fontSize: '2.5em' },
          '& h2': { fontSize: '2em' },
          '& h3': { fontSize: '1.5em' },
          '& h4': { fontSize: '1.25em' },
          '& h5': { fontSize: '1.1em' },
          '& h6': { fontSize: '1em' },
          '& p': {
            marginBottom: '1em',
          },
          '& ul, & ol': {
            paddingLeft: '1.5em',
            marginBottom: '1em',
          },
          '& li': {
            marginBottom: '0.5em',
          },
          '& a': {
            color: 'primary.main',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'none',
            },
          },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            paddingLeft: '1em',
            marginLeft: 0,
            marginRight: 0,
            fontStyle: 'italic',
            opacity: 0.9,
          },
          '& code': {
            backgroundColor: 'action.hover',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
          },
          '& pre': {
            backgroundColor: 'action.hover',
            padding: '1em',
            borderRadius: '8px',
            overflow: 'auto',
            '& code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
          },
          '& hr': {
            border: 'none',
            borderTop: '1px solid',
            borderColor: 'divider',
            margin: '2em 0',
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '1em',
          },
          '& th, & td': {
            border: '1px solid',
            borderColor: 'divider',
            padding: '8px 12px',
            textAlign: 'left',
          },
          '& th': {
            backgroundColor: 'action.hover',
            fontWeight: 600,
          },
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  },
};

export default RichText;
