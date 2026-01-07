import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Box, Typography } from '@mui/material';

export const FormRadioGroup = {
  label: 'Form Radio Group',
  fields: {
    // Basic
    label: {
      type: 'text',
      label: 'Group Label',
    },
    helperText: {
      type: 'text',
      label: 'Helper Text',
    },

    // Options
    options: {
      type: 'array',
      label: 'Options',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        value: { type: 'text', label: 'Value' },
        description: { type: 'text', label: 'Description (optional)' },
      },
      defaultItemProps: {
        label: 'Option',
        value: 'option',
        description: '',
      },
    },
    defaultValue: {
      type: 'text',
      label: 'Default Value',
    },

    // Behavior
    required: {
      type: 'radio',
      label: 'Required',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    disabled: {
      type: 'radio',
      label: 'Disabled',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Vertical', value: 'column' },
        { label: 'Horizontal', value: 'row' },
      ],
    },

    // Styling
    color: {
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
      ],
    },
    labelPlacement: {
      type: 'select',
      label: 'Label Placement',
      options: [
        { label: 'End', value: 'end' },
        { label: 'Start', value: 'start' },
      ],
    },

    // Field name
    name: {
      type: 'text',
      label: 'Field Name',
    },
  },
  defaultProps: {
    label: 'Select an option',
    helperText: '',
    options: [
      { label: 'Option A', value: 'a', description: '' },
      { label: 'Option B', value: 'b', description: '' },
      { label: 'Option C', value: 'c', description: '' },
    ],
    defaultValue: '',
    required: false,
    disabled: false,
    layout: 'column',
    color: 'primary',
    size: 'medium',
    labelPlacement: 'end',
    name: 'radioGroup',
  },
  render: ({
    label,
    helperText,
    options,
    defaultValue,
    required,
    disabled,
    layout,
    color,
    size,
    labelPlacement,
    name,
  }) => {
    const [value, setValue] = React.useState(defaultValue);

    return (
      <FormControl component="fieldset" disabled={disabled} required={required}>
        {label && (
          <FormLabel component="legend">
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
          </FormLabel>
        )}
        <RadioGroup
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          row={layout === 'row'}
          sx={{ mt: label ? 1 : 0 }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color={color} size={size} />}
              labelPlacement={labelPlacement}
              label={
                option.description ? (
                  <Box>
                    <Typography variant="body2">{option.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                ) : (
                  option.label
                )
              }
              sx={{
                alignItems: option.description ? 'flex-start' : 'center',
                '& .MuiRadio-root': {
                  mt: option.description ? -0.5 : 0,
                },
                mb: layout === 'column' ? 1 : 0,
              }}
            />
          ))}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
};

export default FormRadioGroup;
