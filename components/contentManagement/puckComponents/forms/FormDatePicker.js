import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const FormDatePicker = {
  label: 'Form Date Picker',
  fields: {
    // Basic
    label: {
      type: 'text',
      label: 'Label',
    },
    helperText: {
      type: 'text',
      label: 'Helper Text',
    },
    defaultValue: {
      type: 'text',
      label: 'Default Value (YYYY-MM-DD)',
    },

    // Type
    type: {
      type: 'select',
      label: 'Type',
      options: [
        { label: 'Date', value: 'date' },
        { label: 'Date & Time', value: 'datetime-local' },
        { label: 'Time', value: 'time' },
        { label: 'Month', value: 'month' },
        { label: 'Week', value: 'week' },
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
    min: {
      type: 'text',
      label: 'Min Date (YYYY-MM-DD)',
    },
    max: {
      type: 'text',
      label: 'Max Date (YYYY-MM-DD)',
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
    showIcon: {
      type: 'radio',
      label: 'Show Calendar Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Field name
    name: {
      type: 'text',
      label: 'Field Name',
    },
  },
  defaultProps: {
    label: 'Select Date',
    helperText: '',
    defaultValue: '',
    type: 'date',
    required: false,
    min: '',
    max: '',
    variant: 'outlined',
    size: 'medium',
    fullWidth: true,
    disabled: false,
    showIcon: true,
    name: 'date',
  },
  render: ({
    label,
    helperText,
    defaultValue,
    type,
    required,
    min,
    max,
    variant,
    size,
    fullWidth,
    disabled,
    showIcon,
    name,
  }) => {
    const [value, setValue] = React.useState(defaultValue);

    const inputProps = {};
    if (min) inputProps.min = min;
    if (max) inputProps.max = max;

    return (
      <TextField
        label={label}
        helperText={helperText}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        required={required}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        name={name}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={inputProps}
        InputProps={{
          startAdornment: showIcon ? (
            <InputAdornment position="start">
              <CalendarTodayIcon fontSize="small" color="action" />
            </InputAdornment>
          ) : undefined,
        }}
      />
    );
  },
};

export default FormDatePicker;
