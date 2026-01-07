import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Tooltip,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import BuildIcon from '@mui/icons-material/Build';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useForm, Controller } from 'react-hook-form';
import { useContentManagement } from '../hooks/useContentManagement';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
      sx={{ pt: 2 }}
    >
      {value === index && children}
    </Box>
  );
}

export default function PagePropertiesPanel({ onClose }) {
  const {
    selectedPage,
    pageTypes,
    pageRoots,
    updatePage,
    openVisualBuilder,
  } = useContentManagement();

  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);

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
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const pageTypeId = watch('pageTypeId');
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

  // Reset form when selected page changes
  useEffect(() => {
    if (selectedPage) {
      reset({
        title: selectedPage.title || '',
        pageTypeId: selectedPage.pageTypeId || null,
        pageRootId: selectedPage.pageRootId || -1,
        description: selectedPage.description || '',
        recursion: selectedPage.recursion || null,
        slug: selectedPage.slug || '',
      });
    } else {
      reset(defaultValues);
    }
  }, [selectedPage, reset]);

  const onSubmit = async (data) => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      await updatePage({
        pageId: selectedPage.id,
        title: data.title,
        pageTypeId: data.pageTypeId,
        pageRootId: data.pageRootId === -1 ? null : data.pageRootId,
        description: data.description,
        recursion: data.recursion,
        slug: !isHomepage ? data.slug : '',
      });
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!selectedPage) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography color="text.secondary" variant="body2">
          Select a page to view and edit its properties
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.default',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Page Properties
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Details" />
          <Tab label="SEO" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel value={activeTab} index={0}>
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
                  />
                )}
              />

              <Controller
                name="pageTypeId"
                control={control}
                rules={{ required: 'Page type is required' }}
                render={({ field }) => (
                  <FormControl size="small" fullWidth>
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
                      <InputLabel>URL Route</InputLabel>
                      <Select
                        {...field}
                        label="URL Route"
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
                    required: 'Recursion is required',
                    min: { value: 1, message: 'Must be at least 1' },
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
                    rows={4}
                    fullWidth
                    size="small"
                  />
                )}
              />
            </Stack>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Typography color="text.secondary" variant="body2">
              SEO settings coming soon...
            </Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Typography color="text.secondary" variant="body2">
              Advanced settings coming soon...
            </Typography>
          </TabPanel>
        </form>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.default',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<BuildIcon />}
          onClick={() => openVisualBuilder(selectedPage.id)}
          fullWidth
        >
          Visual Editor
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || saving}
          fullWidth
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Paper>
  );
}
