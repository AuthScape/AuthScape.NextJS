import React from 'react';
import { FormControlLabel, Checkbox, FormHelperText, Box, Typography } from '@mui/material';

export const FormCheckbox = {
  label: 'Form Checkbox',
  fields: {
    // Basic
    label: {
      type: 'text',
      label: 'Label',
    },
    description: {
      type: 'text',
      label: 'Description',
    },
    helperText: {
      type: 'text',
      label: 'Helper Text',
    },

    // State
    defaultChecked: {
      type: 'radio',
      label: 'Default Checked',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
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
    indeterminate: {
      type: 'radio',
      label: 'Indeterminate',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
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
        { label: 'Default', value: 'default' },
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
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },

    // Field name
    name: {
      type: 'text',
      label: 'Field Name',
    },
    value: {
      type: 'text',
      label: 'Value',
    },
  },
  defaultProps: {
    label: 'I agree to the terms and conditions',
    description: '',
    helperText: '',
    defaultChecked: false,
    required: false,
    disabled: false,
    indeterminate: false,
    color: 'primary',
    size: 'medium',
    labelPlacement: 'end',
    name: 'agreement',
    value: 'agreed',
  },
  render: ({
    label,
    description,
    helperText,
    defaultChecked,
    required,
    disabled,
    indeterminate,
    color,
    size,
    labelPlacement,
    name,
    value,
  }) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    const labelContent = description ? (
      <Box>
        <Typography variant="body2">
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    ) : (
      <>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </>
    );

    return (
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              indeterminate={indeterminate && !checked}
              color={color}
              size={size}
              disabled={disabled}
              name={name}
              value={value}
              required={required}
            />
          }
          label={labelContent}
          labelPlacement={labelPlacement}
          sx={{
            alignItems: description ? 'flex-start' : 'center',
            '& .MuiCheckbox-root': {
              mt: description ? -0.5 : 0,
            },
          }}
        />
        {helperText && (
          <FormHelperText sx={{ ml: 4 }}>{helperText}</FormHelperText>
        )}
      </Box>
    );
  },
};

export default FormCheckbox;
