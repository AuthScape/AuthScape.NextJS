import React from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, StepConnector } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const StepIndicator = {
  label: 'Step Indicator',
  fields: {
    // Steps
    steps: {
      type: 'array',
      label: 'Steps',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        description: { type: 'text', label: 'Description (optional)' },
      },
      defaultItemProps: {
        label: 'Step',
        description: '',
      },
    },
    currentStep: {
      type: 'number',
      label: 'Current Step (0-indexed)',
    },

    // Layout
    orientation: {
      type: 'select',
      label: 'Orientation',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    alternativeLabel: {
      type: 'radio',
      label: 'Labels Below (Horizontal only)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Behavior
    clickable: {
      type: 'radio',
      label: 'Clickable Steps',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showDescription: {
      type: 'radio',
      label: 'Show Descriptions',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    color: {
      type: 'select',
      label: 'Active Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
      ],
    },
    customActiveColor: {
      type: 'text',
      label: 'Custom Active Color',
    },
    connectorStyle: {
      type: 'select',
      label: 'Connector Style',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Thick', value: 'thick' },
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
  },
  defaultProps: {
    steps: [
      { label: 'Account Details', description: 'Create your account' },
      { label: 'Personal Info', description: 'Tell us about yourself' },
      { label: 'Review', description: 'Review and confirm' },
      { label: 'Complete', description: 'All done!' },
    ],
    currentStep: 1,
    orientation: 'horizontal',
    alternativeLabel: false,
    clickable: false,
    showDescription: true,
    color: 'primary',
    customActiveColor: '',
    connectorStyle: 'default',
    size: 'medium',
  },
  render: ({
    steps,
    currentStep,
    orientation,
    alternativeLabel,
    clickable,
    showDescription,
    color,
    customActiveColor,
    connectorStyle,
    size,
  }) => {
    const activeColor = customActiveColor || `${color}.main`;

    const getConnectorStyles = () => {
      switch (connectorStyle) {
        case 'dashed':
          return {
            '& .MuiStepConnector-line': {
              borderStyle: 'dashed',
            },
          };
        case 'thick':
          return {
            '& .MuiStepConnector-line': {
              borderWidth: 3,
            },
          };
        default:
          return {};
      }
    };

    const CustomStepIcon = ({ active, completed, icon }) => {
      const iconSize = size === 'small' ? 24 : 32;

      if (completed) {
        return (
          <CheckCircleIcon
            sx={{
              color: activeColor,
              fontSize: iconSize,
            }}
          />
        );
      }

      return (
        <Box
          sx={{
            width: iconSize,
            height: iconSize,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: active ? activeColor : 'grey.300',
            color: active ? '#ffffff' : 'grey.600',
            fontSize: size === 'small' ? 12 : 14,
            fontWeight: 600,
          }}
        >
          {icon}
        </Box>
      );
    };

    return (
      <Stepper
        activeStep={currentStep}
        orientation={orientation}
        alternativeLabel={orientation === 'horizontal' && alternativeLabel}
        sx={{
          ...getConnectorStyles(),
          '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
            borderColor: activeColor,
          },
          '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
            borderColor: activeColor,
          },
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            completed={index < currentStep}
            sx={{
              cursor: clickable ? 'pointer' : 'default',
            }}
          >
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon {...props} icon={index + 1} />
              )}
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: size === 'small' ? '0.875rem' : '1rem',
                  fontWeight: index === currentStep ? 600 : 400,
                },
              }}
            >
              {step.label}
              {showDescription && step.description && orientation === 'horizontal' && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {step.description}
                </Typography>
              )}
            </StepLabel>

            {orientation === 'vertical' && showDescription && step.description && (
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
    );
  },
};

export default StepIndicator;
