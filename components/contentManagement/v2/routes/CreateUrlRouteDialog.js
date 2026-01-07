import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Stack,
  Typography,
  IconButton,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUrlRouteDialog({ open, onClose, onCreated, editRoute }) {
  const { oemCompanyId, pageRoots, showNotification } = useContentManagement();
  const [saving, setSaving] = useState(false);
  const isEditing = !!editRoute;

  const defaultValues = {
    title: '',
    rootUrl: '',
    parentId: null,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  // Reset form when dialog opens/closes or edit route changes
  useEffect(() => {
    if (open) {
      if (editRoute) {
        reset({
          title: editRoute.title || '',
          rootUrl: editRoute.rootUrl || '',
          parentId: editRoute.parentId || null,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, editRoute, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        title: data.title,
        rootUrl: data.rootUrl.replace(/^\//, ''), // Remove leading slash if present
        parentId: data.parentId,
        privateLabelCompanyId: oemCompanyId,
      };

      let response;
      if (isEditing) {
        response = await apiService().post('/ContentManagement/UpdatePageRoot', {
          ...payload,
          pageRootId: editRoute.id,
        });
      } else {
        response = await apiService().post('/ContentManagement/CreatePageRoot', payload);
      }

      if (response?.status === 200) {
        showNotification(
          `URL route ${isEditing ? 'updated' : 'created'} successfully`,
          'success'
        );
        if (onCreated) {
          onCreated();
        }
        onClose();
      }
    } catch (error) {
      console.error('Error saving URL route:', error);
      showNotification(`Failed to ${isEditing ? 'update' : 'create'} URL route`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Get top-level routes for parent selection (exclude self when editing)
  const parentOptions = pageRoots.filter(
    (root) => !root.parentId && (!isEditing || root.id !== editRoute?.id)
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={600}>
          {isEditing ? 'Edit URL Route' : 'Create URL Route'}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <form id="create-route-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Route Title"
                  size="small"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message || 'A friendly name for this route'}
                  autoFocus
                />
              )}
            />

            <Controller
              name="rootUrl"
              control={control}
              rules={{
                required: 'URL path is required',
                pattern: {
                  value: /^[a-z0-9-]+$/i,
                  message: 'Only letters, numbers, and hyphens allowed',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="URL Path"
                  size="small"
                  fullWidth
                  error={!!errors.rootUrl}
                  helperText={errors.rootUrl?.message || 'The path segment for this route'}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">/</InputAdornment>,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ') e.preventDefault();
                  }}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase());
                  }}
                />
              )}
            />

            <Controller
              name="parentId"
              control={control}
              render={({ field }) => (
                <FormControl size="small" fullWidth>
                  <InputLabel>Parent Route (Optional)</InputLabel>
                  <Select
                    {...field}
                    label="Parent Route (Optional)"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  >
                    <MenuItem value="">
                      <em>None (Top Level)</em>
                    </MenuItem>
                    {parentOptions.map((route) => (
                      <MenuItem key={route.id} value={route.id}>
                        /{route.rootUrl}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          type="submit"
          form="create-route-form"
          variant="contained"
          disabled={!isValid || saving}
        >
          {saving ? 'Saving...' : isEditing ? 'Update Route' : 'Create Route'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
