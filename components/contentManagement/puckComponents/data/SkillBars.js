import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

export const SkillBars = {
  label: 'Skill Bars',
  fields: {
    // Skills
    skills: {
      type: 'array',
      label: 'Skills',
      arrayFields: {
        name: { type: 'text', label: 'Skill Name' },
        value: { type: 'number', label: 'Value (0-100)' },
        color: { type: 'text', label: 'Color (optional)' },
      },
      defaultItemProps: {
        name: 'Skill',
        value: 80,
        color: '',
      },
    },

    // Display
    showPercent: {
      type: 'radio',
      label: 'Show Percentage',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    percentPosition: {
      type: 'select',
      label: 'Percentage Position',
      options: [
        { label: 'Right of label', value: 'right' },
        { label: 'End of bar', value: 'end' },
        { label: 'Inside bar', value: 'inside' },
      ],
    },

    // Styling
    color: {
      type: 'select',
      label: 'Default Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' },
      ],
    },
    barHeight: {
      type: 'select',
      label: 'Bar Height',
      options: [
        { label: 'Thin (6px)', value: 6 },
        { label: 'Small (10px)', value: 10 },
        { label: 'Medium (14px)', value: 14 },
        { label: 'Large (20px)', value: 20 },
        { label: 'Extra Large (28px)', value: 28 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 4 },
        { label: 'Medium', value: 8 },
        { label: 'Rounded', value: 50 },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Track Background Color',
    },
    spacing: {
      type: 'select',
      label: 'Spacing Between Bars',
      options: [
        { label: 'Tight', value: 2 },
        { label: 'Normal', value: 3 },
        { label: 'Comfortable', value: 4 },
        { label: 'Spacious', value: 5 },
      ],
    },
    animated: {
      type: 'radio',
      label: 'Animated',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    labelStyle: {
      type: 'select',
      label: 'Label Style',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Bold', value: 'bold' },
        { label: 'Uppercase', value: 'uppercase' },
      ],
    },
  },
  defaultProps: {
    skills: [
      { name: 'React', value: 90, color: '' },
      { name: 'JavaScript', value: 85, color: '' },
      { name: 'TypeScript', value: 80, color: '' },
      { name: 'Node.js', value: 75, color: '' },
      { name: 'CSS/SCSS', value: 85, color: '' },
    ],
    showPercent: true,
    percentPosition: 'right',
    color: 'primary',
    barHeight: 10,
    borderRadius: 4,
    backgroundColor: '',
    spacing: 3,
    animated: true,
    labelStyle: 'normal',
  },
  render: ({
    skills,
    showPercent,
    percentPosition,
    color,
    barHeight,
    borderRadius,
    backgroundColor,
    spacing,
    animated,
    labelStyle,
  }) => {
    const getLabelStyles = () => {
      switch (labelStyle) {
        case 'bold':
          return { fontWeight: 600 };
        case 'uppercase':
          return { textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' };
        default:
          return {};
      }
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
        {skills.map((skill, index) => {
          const clampedValue = Math.min(100, Math.max(0, skill.value || 0));
          const barColor = skill.color || undefined;

          return (
            <Box key={index}>
              {/* Label row */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.primary',
                    ...getLabelStyles(),
                  }}
                >
                  {skill.name}
                </Typography>

                {showPercent && percentPosition === 'right' && (
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {clampedValue}%
                  </Typography>
                )}
              </Box>

              {/* Progress bar */}
              <Box sx={{ position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={clampedValue}
                  color={barColor ? 'inherit' : color}
                  sx={{
                    height: barHeight,
                    borderRadius: `${borderRadius}px`,
                    backgroundColor: backgroundColor || 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: `${borderRadius}px`,
                      backgroundColor: barColor,
                      transition: animated ? 'transform 0.8s ease-out' : 'none',
                    },
                  }}
                />

                {/* Percentage inside bar */}
                {showPercent && percentPosition === 'inside' && barHeight >= 14 && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      left: `${Math.max(clampedValue - 8, 2)}%`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: barHeight >= 20 ? '0.75rem' : '0.65rem',
                    }}
                  >
                    {clampedValue}%
                  </Typography>
                )}

                {/* Percentage at end */}
                {showPercent && percentPosition === 'end' && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      left: `calc(${clampedValue}% + 8px)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {clampedValue}%
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  },
};

export default SkillBars;
