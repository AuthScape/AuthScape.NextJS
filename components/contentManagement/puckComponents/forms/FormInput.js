import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

export const FormInput = {
  label: 'Form Input',
  fields: {
    // Basic
    label: {
      type: 'text',
      label: 'Label',
    },
    placeholder: {
      type: 'text',
      label: 'Placeholder',
    },
    helperText: {
      type: 'text',
      label: 'Helper Text',
    },
    defaultValue: {
      type: 'text',
      label: 'Default Value',
    },

    // Type
    inputType: {
      type: 'select',
      label: 'Input Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
        { label: 'Number', value: 'number' },
        { label: 'Phone', value: 'tel' },
        { label: 'URL', value: 'url' },
      ],
    },

    // Validation
    required: {
      type: 'radio',
      label: 'Required',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    minLength: {
      type: 'number',
      label: 'Min Length',
    },
    maxLength: {
      type: 'number',
      label: 'Max Length',
    },

    // Icons
    startIcon: {
      type: 'text',
      label: 'Start Icon (Material Icon name)',
    },
    endIcon: {
      type: 'text',
      label: 'End Icon (Material Icon name)',
    },

    // Styling
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' },
        { label: 'Standard', value: 'standard' },
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
    fullWidth: {
      type: 'radio',
      label: 'Full Width',
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

    // Field name for forms
    name: {
      type: 'text',
      label: 'Field Name (for form submission)',
    },
  },
  defaultProps: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: '',
    defaultValue: '',
    inputType: 'email',
    required: false,
    minLength: 0,
    maxLength: 0,
    startIcon: '',
    endIcon: '',
    variant: 'outlined',
    size: 'medium',
    fullWidth: true,
    disabled: false,
    name: 'email',
  },
  render: ({
    label,
    placeholder,
    helperText,
    defaultValue,
    inputType,
    required,
    minLength,
    maxLength,
    startIcon,
    endIcon,
    variant,
    size,
    fullWidth,
    disabled,
    name,
  }) => {
    const inputProps = {};
    if (minLength > 0) inputProps.minLength = minLength;
    if (maxLength > 0) inputProps.maxLength = maxLength;

    return (
      <TextField
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        defaultValue={defaultValue}
        type={inputType}
        required={required}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        name={name}
        inputProps={inputProps}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">
              <span className="material-icons" style={{ fontSize: 20 }}>
                {startIcon}
              </span>
            </InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">
              <span className="material-icons" style={{ fontSize: 20 }}>
                {endIcon}
              </span>
            </InputAdornment>
          ) : undefined,
        }}
      />
    );
  },
};

export default FormInput;
