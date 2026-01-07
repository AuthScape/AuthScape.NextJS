import React, { useState, useRef } from 'react';
import { Box, Button, Typography, IconButton, LinearProgress, Paper, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const FormFileUpload = {
  label: 'Form File Upload',
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
    dragDropText: {
      type: 'text',
      label: 'Drag & Drop Text',
    },
    browseText: {
      type: 'text',
      label: 'Browse Button Text',
    },

    // Restrictions
    accept: {
      type: 'select',
      label: 'Accept File Types',
      options: [
        { label: 'All Files', value: '*' },
        { label: 'Images', value: 'image/*' },
        { label: 'PDFs', value: '.pdf' },
        { label: 'Documents', value: '.doc,.docx,.pdf,.txt' },
        { label: 'Videos', value: 'video/*' },
        { label: 'Audio', value: 'audio/*' },
      ],
    },
    maxSize: {
      type: 'select',
      label: 'Max File Size',
      options: [
        { label: '1 MB', value: 1 },
        { label: '5 MB', value: 5 },
        { label: '10 MB', value: 10 },
        { label: '25 MB', value: 25 },
        { label: '50 MB', value: 50 },
      ],
    },
    multiple: {
      type: 'radio',
      label: 'Multiple Files',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    maxFiles: {
      type: 'number',
      label: 'Max Number of Files',
    },

    // Preview
    showPreview: {
      type: 'radio',
      label: 'Show Preview',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    previewSize: {
      type: 'select',
      label: 'Preview Size',
      options: [
        { label: 'Small', value: 60 },
        { label: 'Medium', value: 80 },
        { label: 'Large', value: 100 },
      ],
    },

    // Styling
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Drop Zone', value: 'dropzone' },
        { label: 'Button', value: 'button' },
        { label: 'Compact', value: 'compact' },
      ],
    },
    borderStyle: {
      type: 'select',
      label: 'Border Style',
      options: [
        { label: 'Dashed', value: 'dashed' },
        { label: 'Solid', value: 'solid' },
        { label: 'None', value: 'none' },
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
    required: {
      type: 'radio',
      label: 'Required',
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
    label: 'Upload Files',
    helperText: '',
    dragDropText: 'Drag and drop files here, or',
    browseText: 'Browse Files',
    accept: 'image/*',
    maxSize: 5,
    multiple: true,
    maxFiles: 5,
    showPreview: true,
    previewSize: 80,
    variant: 'dropzone',
    borderStyle: 'dashed',
    disabled: false,
    required: false,
    name: 'files',
  },
  render: ({
    label,
    helperText,
    dragDropText,
    browseText,
    accept,
    maxSize,
    multiple,
    maxFiles,
    showPreview,
    previewSize,
    variant,
    borderStyle,
    disabled,
    required,
    name,
  }) => {
    const [files, setFiles] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const getFileIcon = (file) => {
      if (file.type.startsWith('image/')) return <ImageIcon />;
      if (file.type === 'application/pdf') return <PictureAsPdfIcon />;
      return <InsertDriveFileIcon />;
    };

    const formatSize = (bytes) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const validateFile = (file) => {
      if (file.size > maxSize * 1024 * 1024) {
        return `File exceeds ${maxSize}MB limit`;
      }
      return null;
    };

    const handleFiles = (newFiles) => {
      setError('');
      const validFiles = [];

      for (const file of newFiles) {
        const error = validateFile(file);
        if (error) {
          setError(error);
          continue;
        }
        validFiles.push(file);
      }

      if (multiple) {
        const combined = [...files, ...validFiles].slice(0, maxFiles);
        setFiles(combined);
      } else {
        setFiles(validFiles.slice(0, 1));
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      handleFiles(Array.from(e.dataTransfer.files));
    };

    const handleChange = (e) => {
      handleFiles(Array.from(e.target.files));
    };

    const removeFile = (index) => {
      setFiles(files.filter((_, i) => i !== index));
    };

    // Button variant
    if (variant === 'button') {
      return (
        <Box>
          {label && (
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              {label}
              {required && <span style={{ color: 'red' }}> *</span>}
            </Typography>
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            name={name}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
          >
            {browseText}
          </Button>
          {files.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {files.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => removeFile(index)}
                  size="small"
                />
              ))}
            </Box>
          )}
          {helperText && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {helperText}
            </Typography>
          )}
          {error && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              {error}
            </Typography>
          )}
        </Box>
      );
    }

    // Dropzone variant (default)
    return (
      <Box>
        {label && (
          <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
          </Typography>
        )}

        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          name={name}
          style={{ display: 'none' }}
        />

        <Paper
          variant="outlined"
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          sx={{
            p: variant === 'compact' ? 2 : 4,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: isDragOver ? 'action.hover' : 'background.paper',
            borderStyle: borderStyle,
            borderColor: isDragOver ? 'primary.main' : 'divider',
            borderWidth: 2,
            opacity: disabled ? 0.5 : 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: disabled ? undefined : 'action.hover',
            },
          }}
        >
          <CloudUploadIcon sx={{ fontSize: variant === 'compact' ? 32 : 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {dragDropText}
          </Typography>
          <Button
            size="small"
            sx={{ mt: 1 }}
            disabled={disabled}
          >
            {browseText}
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Max {maxSize}MB {multiple && `· Up to ${maxFiles} files`}
          </Typography>
        </Paper>

        {/* File Preview */}
        {showPreview && files.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {files.map((file, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  minWidth: 200,
                }}
              >
                {file.type.startsWith('image/') ? (
                  <Box
                    component="img"
                    src={URL.createObjectURL(file)}
                    sx={{
                      width: previewSize,
                      height: previewSize,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: previewSize,
                      height: previewSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'grey.100',
                      borderRadius: 1,
                    }}
                  >
                    {getFileIcon(file)}
                  </Box>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatSize(file.size)}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => removeFile(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>
        )}

        {helperText && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {helperText}
          </Typography>
        )}
        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            {error}
          </Typography>
        )}
      </Box>
    );
  },
};

export default FormFileUpload;
