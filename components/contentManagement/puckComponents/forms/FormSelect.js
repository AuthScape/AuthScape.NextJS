import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip, Box } from '@mui/material';

export const FormSelect = {
  label: 'Form Select',
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

    // Options
    options: {
      type: 'array',
      label: 'Options',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        value: { type: 'text', label: 'Value' },
      },
      defaultItemProps: {
        label: 'Option',
        value: 'option',
      },
    },
    defaultValue: {
      type: 'text',
      label: 'Default Value',
    },

    // Behavior
    multiple: {
      type: 'radio',
      label: 'Multiple Selection',
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
    searchable: {
      type: 'radio',
      label: 'Native (Mobile-friendly)',
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

    // Field name
    name: {
      type: 'text',
      label: 'Field Name',
    },
  },
  defaultProps: {
    label: 'Select Option',
    placeholder: 'Choose an option',
    helperText: '',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    defaultValue: '',
    multiple: false,
    required: false,
    searchable: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: true,
    disabled: false,
    name: 'select',
  },
  render: ({
    label,
    placeholder,
    helperText,
    options,
    defaultValue,
    multiple,
    required,
    searchable,
    variant,
    size,
    fullWidth,
    disabled,
    name,
  }) => {
    const [value, setValue] = React.useState(multiple ? [] : defaultValue);

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <FormControl
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        required={required}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          label={label}
          multiple={multiple}
          native={searchable}
          name={name}
          displayEmpty={!!placeholder}
          renderValue={
            multiple
              ? (selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((val) => {
                      const option = options.find((o) => o.value === val);
                      return <Chip key={val} label={option?.label || val} size="small" />;
                    })}
                  </Box>
                )
              : undefined
          }
        >
          {searchable ? (
            <>
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          ) : (
            <>
              {placeholder && (
                <MenuItem value="" disabled>
                  <em>{placeholder}</em>
                </MenuItem>
              )}
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </>
          )}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
};

export default FormSelect;
