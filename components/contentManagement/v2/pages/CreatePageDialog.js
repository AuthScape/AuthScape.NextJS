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
  Tooltip,
  Stack,
  Typography,
  IconButton,
  Box,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useForm, Controller } from 'react-hook-form';
import { useContentManagement } from '../hooks/useContentManagement';
import CreateUrlRouteDialog from '../routes/CreateUrlRouteDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePageDialog({ open, onClose }) {
  const {
    pageTypes,
    pageRoots,
    createPage,
    fetchPageRoots,
  } = useContentManagement();

  const [saving, setSaving] = useState(false);
  const [createRouteDialogOpen, setCreateRouteDialogOpen] = useState(false);

  const defaultValues = {
    title: '',
    pageTypeId: null,
    pageRootId: -1,
    description: '',
    recursion: null,
    slug: '',
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const pageTypeId = watch('pageTypeId');
  const slug = watch('slug');
  const recursion = watch('recursion');

  const selectedPageType = pageTypes.find((type) => type.id === pageTypeId);
  const isRecursive = selectedPageType?.isRecursive || false;
  const isHomepage = selectedPageType?.isHomepage || false;

  // Build hierarchical page roots
  const buildHierarchicalRoots = () => {
    const topLevelRoots = pageRoots.filter((root) => !root.parentId);
    const childRoots = pageRoots.filter((root) => root.parentId);
    const result = [];

    topLevelRoots.forEach((parent) => {
      result.push(parent);
      const children = childRoots.filter((child) => child.parentId === parent.id);
      children.forEach((child) => {
        result.push({ ...child, isChild: true });
      });
    });

    return result;
  };

  const hierarchicalRoots = buildHierarchicalRoots();

  // Form validation
  const isFormValid =
    isValid &&
    pageTypeId &&
    (!isRecursive || recursion) &&
    (isHomepage || slug);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await createPage({
        title: data.title,
        pageTypeId: data.pageTypeId,
        pageRootId: data.pageRootId === -1 ? null : data.pageRootId,
        description: data.description,
        recursion: data.recursion,
        slug: !isHomepage ? data.slug : '',
      });
      onClose();
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRouteCreated = async () => {
    await fetchPageRoots();
    setCreateRouteDialogOpen(false);
  };

  return (
    <>
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
            Create New Page
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <form id="create-page-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Page Title"
                    size="small"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    autoFocus
                  />
                )}
              />

              <Controller
                name="pageTypeId"
                control={control}
                rules={{ required: 'Page type is required' }}
                render={({ field }) => (
                  <FormControl size="small" fullWidth error={!!errors.pageTypeId}>
                    <InputLabel>Page Type</InputLabel>
                    <Select
                      {...field}
                      label="Page Type"
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        const selectedType = pageTypes.find(
                          (type) => type.id === e.target.value
                        );
                        if (!selectedType?.isRecursive) {
                          setValue('recursion', null);
                        }
                      }}
                    >
                      {pageTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

              {!isHomepage && (
                <Controller
                  name="pageRootId"
                  control={control}
                  render={({ field }) => (
                    <FormControl size="small" fullWidth>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <InputLabel sx={{ position: 'relative', transform: 'none' }}>
                          URL Route
                        </InputLabel>
                        <Button
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => setCreateRouteDialogOpen(true)}
                          sx={{ textTransform: 'none' }}
                        >
                          Create Route
                        </Button>
                      </Box>
                      <Select
                        {...field}
                        value={field.value || -1}
                        renderValue={(selected) => {
                          if (selected === -1) return 'No Route (Root)';
                          const selectedRoot = pageRoots.find((r) => r.id === selected);
                          if (!selectedRoot) return '';
                          if (selectedRoot.parentId) {
                            const parent = pageRoots.find(
                              (p) => p.id === selectedRoot.parentId
                            );
                            return `/${parent?.rootUrl}/${selectedRoot.rootUrl}`;
                          }
                          return `/${selectedRoot.rootUrl}`;
                        }}
                      >
                        <MenuItem value={-1}>No Route (Root)</MenuItem>
                        {hierarchicalRoots.map((root) => (
                          <MenuItem
                            key={root.id}
                            value={root.id}
                            sx={{ pl: root.isChild ? 4 : 2 }}
                          >
                            {root.isChild && (
                              <span style={{ color: '#999', marginRight: '4px' }}>
                                ↳
                              </span>
                            )}
                            /{root.rootUrl}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}

              {!isHomepage && (
                <Controller
                  name="slug"
                  control={control}
                  rules={{ required: !isHomepage ? 'Slug is required' : false }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Page Slug
                          <Tooltip title="This will be part of the page URL" arrow>
                            <InfoOutlinedIcon sx={{ fontSize: 14 }} color="action" />
                          </Tooltip>
                        </Box>
                      }
                      size="small"
                      fullWidth
                      error={!!errors.slug}
                      helperText={errors.slug?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">/</InputAdornment>
                        ),
                      }}
                      onKeyDown={(e) => {
                        if (e.key === ' ') e.preventDefault();
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/\s/g, ''));
                      }}
                    />
                  )}
                />
              )}

              {isRecursive && (
                <Controller
                  name="recursion"
                  control={control}
                  rules={{
                    required: 'Recursion interval is required',
                    min: { value: 1, message: 'Must be at least 1 day' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Recursion Interval"
                      type="number"
                      size="small"
                      fullWidth
                      error={!!errors.recursion}
                      helperText={errors.recursion?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Days</InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    size="small"
                    placeholder="Optional description for this page"
                  />
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
            form="create-page-form"
            variant="contained"
            disabled={!isFormValid || saving}
          >
            {saving ? 'Creating...' : 'Create Page'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create URL Route Dialog */}
      <CreateUrlRouteDialog
        open={createRouteDialogOpen}
        onClose={() => setCreateRouteDialogOpen(false)}
        onCreated={handleRouteCreated}
      />
    </>
  );
}
