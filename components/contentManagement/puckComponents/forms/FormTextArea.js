import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

export const FormTextArea = {
  label: 'Form Text Area',
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
      type: 'textarea',
      label: 'Default Value',
    },

    // Size
    rows: {
      type: 'select',
      label: 'Rows',
      options: [
        { label: '3 Rows', value: 3 },
        { label: '4 Rows', value: 4 },
        { label: '5 Rows', value: 5 },
        { label: '6 Rows', value: 6 },
        { label: '8 Rows', value: 8 },
        { label: '10 Rows', value: 10 },
      ],
    },
    maxRows: {
      type: 'select',
      label: 'Max Rows (Auto-expand)',
      options: [
        { label: 'Fixed Height', value: 0 },
        { label: '6 Rows', value: 6 },
        { label: '8 Rows', value: 8 },
        { label: '10 Rows', value: 10 },
        { label: '15 Rows', value: 15 },
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
    showCharCount: {
      type: 'radio',
      label: 'Show Character Count',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
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
    resize: {
      type: 'select',
      label: 'Resize',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Both', value: 'both' },
      ],
    },

    // Field name
    name: {
      type: 'text',
      label: 'Field Name',
    },
  },
  defaultProps: {
    label: 'Message',
    placeholder: 'Enter your message',
    helperText: '',
    defaultValue: '',
    rows: 4,
    maxRows: 0,
    required: false,
    minLength: 0,
    maxLength: 500,
    showCharCount: true,
    variant: 'outlined',
    fullWidth: true,
    disabled: false,
    resize: 'vertical',
    name: 'message',
  },
  render: ({
    label,
    placeholder,
    helperText,
    defaultValue,
    rows,
    maxRows,
    required,
    minLength,
    maxLength,
    showCharCount,
    variant,
    fullWidth,
    disabled,
    resize,
    name,
  }) => {
    const [value, setValue] = React.useState(defaultValue);

    const inputProps = {};
    if (minLength > 0) inputProps.minLength = minLength;
    if (maxLength > 0) inputProps.maxLength = maxLength;

    const helperContent = (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span>{helperText}</span>
        {showCharCount && maxLength > 0 && (
          <Typography
            variant="caption"
            color={value.length > maxLength ? 'error' : 'text.secondary'}
          >
            {value.length}/{maxLength}
          </Typography>
        )}
      </Box>
    );

    return (
      <TextField
        label={label}
        placeholder={placeholder}
        helperText={helperContent}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        multiline
        rows={maxRows > 0 ? undefined : rows}
        minRows={maxRows > 0 ? rows : undefined}
        maxRows={maxRows > 0 ? maxRows : undefined}
        required={required}
        variant={variant}
        fullWidth={fullWidth}
        disabled={disabled}
        name={name}
        inputProps={{
          ...inputProps,
          style: { resize },
        }}
      />
    );
  },
};

export default FormTextArea;
