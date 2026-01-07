// Reusable field type definitions for Puck components

// Common padding/margin object field
export const spacingField = (label = 'Spacing') => ({
  type: 'object',
  label,
  objectFields: {
    top: { type: 'number', label: 'Top' },
    right: { type: 'number', label: 'Right' },
    bottom: { type: 'number', label: 'Bottom' },
    left: { type: 'number', label: 'Left' },
  },
});

// Alignment options
export const alignmentField = {
  type: 'select',
  label: 'Alignment',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ],
};

// Text alignment for typography
export const textAlignField = {
  type: 'select',
  label: 'Text Align',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
    { label: 'Justify', value: 'justify' },
  ],
};

// Flex justify content
export const justifyContentField = {
  type: 'select',
  label: 'Justify Content',
  options: [
    { label: 'Start', value: 'flex-start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'flex-end' },
    { label: 'Space Between', value: 'space-between' },
    { label: 'Space Around', value: 'space-around' },
    { label: 'Space Evenly', value: 'space-evenly' },
  ],
};

// Flex align items
export const alignItemsField = {
  type: 'select',
  label: 'Align Items',
  options: [
    { label: 'Start', value: 'flex-start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'flex-end' },
    { label: 'Stretch', value: 'stretch' },
    { label: 'Baseline', value: 'baseline' },
  ],
};

// Background color with common presets
export const backgroundColorField = {
  type: 'select',
  label: 'Background Color',
  options: [
    { label: 'Transparent', value: 'transparent' },
    { label: 'White', value: '#ffffff' },
    { label: 'Light Gray', value: '#f5f5f5' },
    { label: 'Gray', value: '#e0e0e0' },
    { label: 'Dark', value: '#212121' },
    { label: 'Black', value: '#000000' },
    { label: 'Primary', value: 'primary.main' },
    { label: 'Secondary', value: 'secondary.main' },
    { label: 'Custom', value: 'custom' },
  ],
};

// Text color options
export const textColorField = {
  type: 'select',
  label: 'Text Color',
  options: [
    { label: 'Default', value: 'inherit' },
    { label: 'Primary', value: 'text.primary' },
    { label: 'Secondary', value: 'text.secondary' },
    { label: 'White', value: '#ffffff' },
    { label: 'Black', value: '#000000' },
    { label: 'Primary Color', value: 'primary.main' },
    { label: 'Secondary Color', value: 'secondary.main' },
    { label: 'Error', value: 'error.main' },
    { label: 'Success', value: 'success.main' },
    { label: 'Custom', value: 'custom' },
  ],
};

// Button variants
export const buttonVariantField = {
  type: 'select',
  label: 'Button Style',
  options: [
    { label: 'Contained', value: 'contained' },
    { label: 'Outlined', value: 'outlined' },
    { label: 'Text', value: 'text' },
  ],
};

// Button sizes
export const buttonSizeField = {
  type: 'select',
  label: 'Size',
  options: [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ],
};

// Shadow/elevation options
export const elevationField = {
  type: 'select',
  label: 'Shadow',
  options: [
    { label: 'None', value: 0 },
    { label: 'Small', value: 1 },
    { label: 'Medium', value: 3 },
    { label: 'Large', value: 6 },
    { label: 'Extra Large', value: 12 },
  ],
};

// Border radius options
export const borderRadiusField = {
  type: 'select',
  label: 'Border Radius',
  options: [
    { label: 'None', value: 0 },
    { label: 'Small', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'Large', value: 3 },
    { label: 'Extra Large', value: 4 },
    { label: 'Round', value: '50%' },
  ],
};

// Typography variant field
export const typographyVariantField = {
  type: 'select',
  label: 'Variant',
  options: [
    { label: 'H1', value: 'h1' },
    { label: 'H2', value: 'h2' },
    { label: 'H3', value: 'h3' },
    { label: 'H4', value: 'h4' },
    { label: 'H5', value: 'h5' },
    { label: 'H6', value: 'h6' },
    { label: 'Subtitle 1', value: 'subtitle1' },
    { label: 'Subtitle 2', value: 'subtitle2' },
    { label: 'Body 1', value: 'body1' },
    { label: 'Body 2', value: 'body2' },
    { label: 'Caption', value: 'caption' },
    { label: 'Overline', value: 'overline' },
  ],
};

// Font weight options
export const fontWeightField = {
  type: 'select',
  label: 'Font Weight',
  options: [
    { label: 'Light', value: 300 },
    { label: 'Regular', value: 400 },
    { label: 'Medium', value: 500 },
    { label: 'Semi Bold', value: 600 },
    { label: 'Bold', value: 700 },
    { label: 'Extra Bold', value: 800 },
  ],
};

// Max width options for containers
export const maxWidthField = {
  type: 'select',
  label: 'Max Width',
  options: [
    { label: 'Extra Small (444px)', value: 'xs' },
    { label: 'Small (600px)', value: 'sm' },
    { label: 'Medium (900px)', value: 'md' },
    { label: 'Large (1200px)', value: 'lg' },
    { label: 'Extra Large (1536px)', value: 'xl' },
    { label: 'Full Width', value: false },
  ],
};

// Responsive visibility
export const visibilityField = {
  type: 'select',
  label: 'Visibility',
  options: [
    { label: 'Always Visible', value: 'always' },
    { label: 'Desktop Only', value: 'desktop' },
    { label: 'Mobile Only', value: 'mobile' },
    { label: 'Hidden', value: 'hidden' },
  ],
};
