import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TextField from '@mui/material/TextField';
import { IconButton, Button, Chip, Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiService } from 'authscape';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LinkIcon from '@mui/icons-material/Link';

const syncDirectionLabels = {
    0: 'Inbound',
    1: 'Outbound',
    2: 'Bidirectional'
};

const getSyncDirectionIcon = (direction) => {
    switch (direction) {
        case 0: return <ArrowBackIosIcon fontSize="small" />;
        case 1: return <ArrowForwardIcon fontSize="small" />;
        case 2: return <SyncAltIcon fontSize="small" />;
        default: return <SyncAltIcon fontSize="small" />;
    }
};

export function CrmFieldMappings({ connection, entityMapping, onBack, onOpenRelationships }) {
    const [fieldMappings, setFieldMappings] = useState([]);
    const [crmFields, setCrmFields] = useState([]);
    const [authScapeFields, setAuthScapeFields] = useState([]);
    const [transformations, setTransformations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
    const [editingMapping, setEditingMapping] = useState(null);
    const [loadingDefaults, setLoadingDefaults] = useState(false);
    const [crmFieldsLoading, setCrmFieldsLoading] = useState(false);
    const [crmFieldsError, setCrmFieldsError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        authScapeField: '',
        crmField: '',
        syncDirection: 2,
        isEnabled: true,
        transformationType: '',
        transformationConfig: ''
    });

    const refreshMappings = async () => {
        setLoading(true);
        try {
            const response = await apiService().get(`/UserManagement/GetCrmFieldMappings?entityMappingId=${entityMapping.id}`);
            if (response && response.status === 200) {
                setFieldMappings(response.data);
            }
        } catch (error) {
            console.error("Error fetching field mappings:", error);
        }
        setLoading(false);
    };

    const fetchCrmFields = async () => {
        setCrmFieldsLoading(true);
        setCrmFieldsError(null);
        try {
            console.log("Fetching CRM fields for entity:", entityMapping.crmEntityName);
            const response = await apiService().get(`/UserManagement/GetCrmEntityFields?connectionId=${connection.id}&entityName=${entityMapping.crmEntityName}`);
            console.log("CRM fields response:", response);
            if (response && response.status === 200) {
                console.log("CRM fields data:", response.data);
                setCrmFields(response.data);
            } else if (response && response.data && response.data.error) {
                setCrmFieldsError(response.data.error);
                console.error("CRM fields error:", response.data.error);
            }
        } catch (error) {
            console.error("Error fetching CRM fields:", error);
            console.error("Error response:", error.response);
            setCrmFieldsError(error.response?.data?.error || error.message || "Failed to fetch CRM fields");
        }
        setCrmFieldsLoading(false);
    };

    const fetchAuthScapeFields = async () => {
        try {
            const response = await apiService().get('/UserManagement/GetCrmAuthScapeEntityTypes');
            if (response && response.status === 200) {
                const entityType = response.data.find(t => t.type === entityMapping.authScapeEntityType);
                if (entityType) {
                    setAuthScapeFields(entityType.availableFields);
                }
            }
        } catch (error) {
            console.error("Error fetching AuthScape fields:", error);
        }
    };

    const fetchTransformations = async () => {
        try {
            const response = await apiService().get('/UserManagement/GetCrmTransformationTypes');
            if (response && response.status === 200) {
                setTransformations(response.data);
            }
        } catch (error) {
            console.error("Error fetching transformations:", error);
        }
    };

    useEffect(() => {
        if (entityMapping) {
            refreshMappings();
            fetchCrmFields();
            fetchAuthScapeFields();
            fetchTransformations();
        }
    }, [entityMapping]);

    const handleOpenDialog = (mapping = null) => {
        if (mapping) {
            setEditingMapping(mapping);
            setFormData({
                authScapeField: mapping.authScapeField,
                crmField: mapping.crmField,
                syncDirection: mapping.syncDirection,
                isEnabled: mapping.isEnabled,
                transformationType: mapping.transformationType || '',
                transformationConfig: mapping.transformationConfig || ''
            });
        } else {
            setEditingMapping(null);
            setFormData({
                authScapeField: '',
                crmField: '',
                syncDirection: 2,
                isEnabled: true,
                transformationType: '',
                transformationConfig: ''
            });
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingMapping(null);
    };

    const handleSave = async () => {
        try {
            if (editingMapping) {
                await apiService().put(`/UserManagement/UpdateCrmFieldMapping?id=${editingMapping.id}`, {
                    authScapeField: formData.authScapeField,
                    crmField: formData.crmField,
                    syncDirection: formData.syncDirection,
                    isEnabled: formData.isEnabled,
                    transformationType: formData.transformationType || null,
                    transformationConfig: formData.transformationConfig || null
                });
            } else {
                await apiService().post("/UserManagement/CreateCrmFieldMapping", {
                    entityMappingId: entityMapping.id,
                    authScapeField: formData.authScapeField,
                    crmField: formData.crmField,
                    syncDirection: formData.syncDirection,
                    isEnabled: formData.isEnabled,
                    transformationType: formData.transformationType || null,
                    transformationConfig: formData.transformationConfig || null
                });
            }
            await refreshMappings();
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving field mapping:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService().delete(`/UserManagement/DeleteCrmFieldMapping?id=${id}`);
            await refreshMappings();
            setDeleteDialogOpen(null);
        } catch (error) {
            console.error("Error deleting field mapping:", error);
        }
    };

    const handleLoadDefaults = async () => {
        setLoadingDefaults(true);
        try {
            const response = await apiService().get(`/UserManagement/GetCrmDefaultFieldMappings?connectionId=${connection.id}&entityType=${entityMapping.authScapeEntityType}`);
            if (response && response.status === 200 && response.data.length > 0) {
                // Create batch of field mappings
                await apiService().post("/UserManagement/CreateCrmFieldMappingsBatch", {
                    entityMappingId: entityMapping.id,
                    mappings: response.data.map(d => ({
                        authScapeField: d.authScapeField,
                        crmField: d.crmField,
                        syncDirection: d.syncDirection,
                        isEnabled: d.isEnabled,
                        transformationType: d.transformationType,
                        transformationConfig: d.transformationConfig
                    }))
                });
                await refreshMappings();
            }
        } catch (error) {
            console.error("Error loading defaults:", error);
        }
        setLoadingDefaults(false);
    };

    const selectedTransformation = transformations.find(t => t.type === formData.transformationType);

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <IconButton onClick={onBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">
                        Field Mappings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {entityMapping.crmEntityDisplayName || entityMapping.crmEntityName} - {connection.displayName}
                    </Typography>
                </Box>
                <Tooltip title="Load default field mappings for this entity type">
                    <Button
                        variant="outlined"
                        onClick={handleLoadDefaults}
                        disabled={loadingDefaults}
                        startIcon={loadingDefaults ? <CircularProgress size={16} /> : <AutoFixHighIcon />}
                    >
                        Load Defaults
                    </Button>
                </Tooltip>
                <Button
                    variant="outlined"
                    onClick={() => {
                        console.log('Relationships button clicked');
                        if (onOpenRelationships) {
                            onOpenRelationships();
                        } else {
                            console.error('onOpenRelationships prop is not defined');
                        }
                    }}
                    startIcon={<LinkIcon />}
                >
                    Relationships
                </Button>
                <Button variant="contained" onClick={() => handleOpenDialog()} startIcon={<AddIcon />}>
                    Add Field Mapping
                </Button>
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : fieldMappings.length === 0 ? (
                <Alert severity="info">
                    No field mappings configured. Click "Add Field Mapping" to map CRM fields to AuthScape fields, or click "Load Defaults" to populate common mappings.
                </Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>AuthScape Field</TableCell>
                                <TableCell align="center">Direction</TableCell>
                                <TableCell>CRM Field</TableCell>
                                <TableCell>Transformation</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fieldMappings.map((mapping) => (
                                <TableRow key={mapping.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="medium">
                                            {mapping.authScapeField}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title={syncDirectionLabels[mapping.syncDirection]}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {getSyncDirectionIcon(mapping.syncDirection)}
                                            </Box>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {mapping.crmField}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {mapping.transformationType ? (
                                            <Chip
                                                label={mapping.transformationType}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={mapping.isEnabled ? 'Enabled' : 'Disabled'}
                                            color={mapping.isEnabled ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleOpenDialog(mapping)}
                                            title="Edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => setDeleteDialogOpen(mapping)}
                                            title="Delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMapping ? 'Edit Field Mapping' : 'Add Field Mapping'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Autocomplete
                            options={authScapeFields}
                            value={formData.authScapeField}
                            onChange={(e, value) => setFormData({ ...formData, authScapeField: value || '' })}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="AuthScape Field"
                                    placeholder="Select or type a field name"
                                />
                            )}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Sync Direction</InputLabel>
                            <Select
                                value={formData.syncDirection}
                                label="Sync Direction"
                                onChange={(e) => setFormData({ ...formData, syncDirection: e.target.value })}
                            >
                                <MenuItem value={0}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <ArrowBackIosIcon fontSize="small" />
                                        <span>Inbound Only (CRM to AuthScape)</span>
                                    </Stack>
                                </MenuItem>
                                <MenuItem value={1}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <ArrowForwardIcon fontSize="small" />
                                        <span>Outbound Only (AuthScape to CRM)</span>
                                    </Stack>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <SyncAltIcon fontSize="small" />
                                        <span>Bidirectional</span>
                                    </Stack>
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {crmFieldsError && (
                            <Alert severity="error" sx={{ mb: 1 }}>
                                {crmFieldsError}
                            </Alert>
                        )}
                        <Autocomplete
                            options={crmFields}
                            getOptionLabel={(option) => typeof option === 'string' ? option : `${option.displayName} (${option.logicalName})`}
                            value={crmFields.find(f => f.logicalName === formData.crmField) || formData.crmField}
                            onChange={(e, value) => {
                                if (typeof value === 'string') {
                                    setFormData({ ...formData, crmField: value });
                                } else if (value) {
                                    setFormData({ ...formData, crmField: value.logicalName });
                                } else {
                                    setFormData({ ...formData, crmField: '' });
                                }
                            }}
                            freeSolo
                            openOnFocus
                            loading={crmFieldsLoading}
                            noOptionsText={crmFieldsError ? "Error loading fields" : (crmFieldsLoading ? "Loading..." : `No fields found (${crmFields.length} loaded)`)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="CRM Field"
                                    placeholder="Select or type a field name"
                                    error={!!crmFieldsError}
                                    helperText={crmFieldsLoading ? "Loading fields..." : (crmFields.length > 0 ? `${crmFields.length} fields available` : "")}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {crmFieldsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <Box>
                                        <Typography variant="body2">{option.displayName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.logicalName} ({option.dataType})
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Transformation (optional)</InputLabel>
                            <Select
                                value={formData.transformationType}
                                label="Transformation (optional)"
                                onChange={(e) => setFormData({ ...formData, transformationType: e.target.value, transformationConfig: '' })}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {transformations.map((t) => (
                                    <MenuItem key={t.type} value={t.type}>
                                        <Box>
                                            <Typography variant="body2">{t.type}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {t.description}
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {selectedTransformation?.requiresConfig && (
                            <TextField
                                label="Transformation Config"
                                value={formData.transformationConfig}
                                onChange={(e) => setFormData({ ...formData, transformationConfig: e.target.value })}
                                fullWidth
                                multiline
                                rows={3}
                                placeholder={selectedTransformation.configSchema}
                                helperText="JSON configuration for the transformation"
                            />
                        )}

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isEnabled}
                                    onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                                />
                            }
                            label="Enabled"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        {editingMapping ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteDialogOpen} onClose={() => setDeleteDialogOpen(null)}>
                <DialogTitle>Delete Field Mapping?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the mapping "{deleteDialogOpen?.authScapeField}" to "{deleteDialogOpen?.crmField}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(null)}>Cancel</Button>
                    <Button
                        onClick={() => handleDelete(deleteDialogOpen?.id)}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
