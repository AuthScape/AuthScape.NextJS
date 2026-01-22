import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TextField from '@mui/material/TextField';
import { IconButton, Button, Chip, Tooltip, Snackbar, LinearProgress } from '@mui/material';
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
import * as signalR from '@microsoft/signalr';

const syncDirectionLabels = {
    0: 'Inbound',
    1: 'Outbound',
    2: 'Bidirectional'
};

const authScapeEntityLabels = {
    0: 'User',
    1: 'Company',
    2: 'Location'
};

const getSyncDirectionIcon = (direction) => {
    switch (direction) {
        case 0: return <ArrowBackIosIcon fontSize="small" />;
        case 1: return <ArrowForwardIcon fontSize="small" />;
        case 2: return <SyncAltIcon fontSize="small" />;
        default: return <SyncAltIcon fontSize="small" />;
    }
};

export function CrmRelationshipMappings({ connection, entityMapping, onBack }) {
    const [relationshipMappings, setRelationshipMappings] = useState([]);
    const [relationshipFields, setRelationshipFields] = useState([]);
    const [crmFields, setCrmFields] = useState([]);
    const [entityMappings, setEntityMappings] = useState([]); // All entity mappings for this connection
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
    const [editingMapping, setEditingMapping] = useState(null);
    const [crmFieldsLoading, setCrmFieldsLoading] = useState(false);
    const [syncingUserLocations, setSyncingUserLocations] = useState(false);
    const [autoCreateCompany, setAutoCreateCompany] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [syncProgress, setSyncProgress] = useState(null);
    const hubConnectionRef = useRef(null);

    // Form state
    const [formData, setFormData] = useState({
        authScapeField: '',
        relatedAuthScapeEntityType: 1, // Company by default
        crmLookupField: '',
        crmRelatedEntityName: '',
        displayName: '',
        syncDirection: 2,
        isEnabled: true,
        autoCreateRelated: false,
        syncNullValues: true
    });

    const refreshMappings = async () => {
        setLoading(true);
        try {
            const response = await apiService().get(`/UserManagement/GetCrmRelationshipMappings?entityMappingId=${entityMapping.id}`);
            if (response && response.status === 200) {
                setRelationshipMappings(response.data);
            }
        } catch (error) {
            console.error("Error fetching relationship mappings:", error);
        }
        setLoading(false);
    };

    const fetchRelationshipFields = async () => {
        try {
            const response = await apiService().get(`/UserManagement/GetCrmRelationshipFields?entityType=${entityMapping.authScapeEntityType}`);
            if (response && response.status === 200) {
                setRelationshipFields(response.data);
            }
        } catch (error) {
            console.error("Error fetching relationship fields:", error);
        }
    };

    const fetchCrmFields = async () => {
        setCrmFieldsLoading(true);
        try {
            console.log("Fetching CRM fields for entity:", entityMapping.crmEntityName);
            const response = await apiService().get(`/UserManagement/GetCrmEntityFields?connectionId=${connection.id}&entityName=${entityMapping.crmEntityName}`);
            console.log("CRM fields response:", response);
            if (response && response.status === 200) {
                console.log("CRM fields data:", response.data);
                // Filter to only show lookup fields (fields that reference other entities)
                const lookupFields = response.data.filter(f =>
                    f.dataType === 'Lookup' ||
                    f.dataType === 'Customer' ||
                    f.dataType === 'Owner'
                );
                console.log("Lookup fields found:", lookupFields.length, lookupFields);
                setCrmFields(lookupFields);
            }
        } catch (error) {
            console.error("Error fetching CRM fields:", error);
        }
        setCrmFieldsLoading(false);
    };

    // Fetch all entity mappings for this connection to determine CRM entity for related AuthScape entities
    const fetchEntityMappings = async () => {
        try {
            const response = await apiService().get(`/UserManagement/GetCrmEntityMappings?connectionId=${connection.id}`);
            if (response && response.status === 200) {
                setEntityMappings(response.data);
                console.log("Entity mappings loaded:", response.data);
            }
        } catch (error) {
            console.error("Error fetching entity mappings:", error);
        }
    };

    // Helper function to find the CRM entity name for a given AuthScape entity type
    const getCrmEntityForAuthScapeType = (authScapeEntityType) => {
        const mapping = entityMappings.find(m => m.authScapeEntityType === authScapeEntityType);
        return mapping?.crmEntityName || null;
    };

    useEffect(() => {
        if (entityMapping) {
            refreshMappings();
            fetchRelationshipFields();
            fetchCrmFields();
            fetchEntityMappings();
        }
    }, [entityMapping]);

    // Setup SignalR connection for sync progress updates
    useEffect(() => {
        const setupSignalR = async () => {
            try {
                const apiUri = process.env.apiUri || 'http://localhost:54218';
                const hubUrl = `${apiUri}/crmsync`;
                const hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(hubUrl)
                    .withAutomaticReconnect()
                    .build();

                hubConnection.on('OnSyncProgress', (progress) => {
                    console.log('Relationship sync progress update:', progress);
                    setSyncProgress(progress);

                    if (progress.status === 'Completed' || progress.status === 'Failed') {
                        // Clear progress after a short delay
                        setTimeout(() => {
                            setSyncProgress(null);
                            setSyncingUserLocations(false);
                        }, 2000);
                    }
                });

                await hubConnection.start();
                console.log('SignalR connected for relationship sync progress');
                hubConnectionRef.current = hubConnection;
            } catch (error) {
                console.error('SignalR connection error:', error);
            }
        };

        setupSignalR();

        return () => {
            if (hubConnectionRef.current) {
                hubConnectionRef.current.stop();
            }
        };
    }, []);

    const handleOpenDialog = (mapping = null) => {
        if (mapping) {
            setEditingMapping(mapping);
            setFormData({
                authScapeField: mapping.authScapeField,
                relatedAuthScapeEntityType: mapping.relatedAuthScapeEntityType,
                crmLookupField: mapping.crmLookupField,
                crmRelatedEntityName: mapping.crmRelatedEntityName,
                displayName: mapping.displayName || '',
                syncDirection: mapping.syncDirection,
                isEnabled: mapping.isEnabled,
                autoCreateRelated: mapping.autoCreateRelated,
                syncNullValues: mapping.syncNullValues
            });
        } else {
            setEditingMapping(null);
            // Pre-fill with first available relationship field if any
            const firstField = relationshipFields[0];
            const relatedEntityType = firstField?.relatedEntityType ?? 1;
            // Auto-determine CRM entity based on existing entity mappings
            const crmEntity = getCrmEntityForAuthScapeType(relatedEntityType) || '';
            setFormData({
                authScapeField: firstField?.field || '',
                relatedAuthScapeEntityType: relatedEntityType,
                crmLookupField: '',
                crmRelatedEntityName: crmEntity,
                displayName: '',
                syncDirection: 2,
                isEnabled: true,
                autoCreateRelated: false,
                syncNullValues: true
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
                await apiService().put(`/UserManagement/UpdateCrmRelationshipMapping?id=${editingMapping.id}`, {
                    authScapeField: formData.authScapeField,
                    relatedAuthScapeEntityType: formData.relatedAuthScapeEntityType,
                    crmLookupField: formData.crmLookupField,
                    crmRelatedEntityName: formData.crmRelatedEntityName,
                    displayName: formData.displayName,
                    syncDirection: formData.syncDirection,
                    isEnabled: formData.isEnabled,
                    autoCreateRelated: formData.autoCreateRelated,
                    syncNullValues: formData.syncNullValues
                });
            } else {
                await apiService().post("/UserManagement/CreateCrmRelationshipMapping", {
                    entityMappingId: entityMapping.id,
                    authScapeField: formData.authScapeField,
                    relatedAuthScapeEntityType: formData.relatedAuthScapeEntityType,
                    crmLookupField: formData.crmLookupField,
                    crmRelatedEntityName: formData.crmRelatedEntityName,
                    displayName: formData.displayName,
                    syncDirection: formData.syncDirection,
                    isEnabled: formData.isEnabled,
                    autoCreateRelated: formData.autoCreateRelated,
                    syncNullValues: formData.syncNullValues
                });
            }
            await refreshMappings();
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving relationship mapping:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService().delete(`/UserManagement/DeleteCrmRelationshipMapping?id=${id}`);
            await refreshMappings();
            setDeleteDialogOpen(null);
        } catch (error) {
            console.error("Error deleting relationship mapping:", error);
        }
    };

    const handleSyncUserLocationsFromCrm = async () => {
        setSyncingUserLocations(true);
        setSyncProgress({ percentComplete: 0, currentOperation: 'Syncing user locations from CRM...', totalRecords: 0, currentRecord: 0 });

        try {
            // Join the connection progress group for updates
            if (hubConnectionRef.current) {
                await hubConnectionRef.current.invoke('JoinConnectionProgress', connection.id);
            }

            const response = await apiService().post(`/UserManagement/SyncCrmUserLocations?connectionId=${connection.id}&autoCreateCompany=${autoCreateCompany}`);
            if (response && response.status === 200) {
                const result = response.data;

                // Join the sync-specific group if we got a syncId
                if (result.syncId && hubConnectionRef.current) {
                    await hubConnectionRef.current.invoke('JoinSyncProgress', result.syncId);
                }

                if (result.success) {
                    setSnackbar({
                        open: true,
                        message: result.message || `Sync completed: ${result.stats?.updateCount || 0} users updated`,
                        severity: 'success'
                    });
                } else {
                    setSnackbar({
                        open: true,
                        message: result.message || 'Sync completed with some issues',
                        severity: 'warning'
                    });
                }
            }
        } catch (error) {
            console.error("Error syncing user locations from CRM:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Sync failed',
                severity: 'error'
            });
        } finally {
            setSyncProgress(null);
            setSyncingUserLocations(false);
        }
    };

    const handleRelationshipFieldSelect = (event, value) => {
        if (value) {
            // Auto-determine CRM entity based on existing entity mappings for the related entity type
            const crmEntity = getCrmEntityForAuthScapeType(value.relatedEntityType) || '';
            console.log(`Selected relationship field ${value.field}, related entity type: ${value.relatedEntityType}, mapped CRM entity: ${crmEntity}`);
            setFormData({
                ...formData,
                authScapeField: value.field,
                relatedAuthScapeEntityType: value.relatedEntityType,
                displayName: value.displayName,
                crmRelatedEntityName: crmEntity
            });
        }
    };

    const handleCrmFieldSelect = (event, value) => {
        if (value) {
            // Only set the lookup field - don't auto-fill crmRelatedEntityName
            // because that should be the CRM entity that the related AuthScape entity syncs to,
            // NOT the target of the lookup field
            setFormData({
                ...formData,
                crmLookupField: value.logicalName
            });
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <IconButton onClick={onBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">
                        Relationship Mappings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {entityMapping.crmEntityDisplayName || entityMapping.crmEntityName} &rarr; {authScapeEntityLabels[entityMapping.authScapeEntityType]}
                    </Typography>
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={autoCreateCompany}
                            onChange={(e) => setAutoCreateCompany(e.target.checked)}
                            size="small"
                        />
                    }
                    label={<Typography variant="body2">Auto-create Company</Typography>}
                />
                <Tooltip title="Pull location assignments from CRM Contacts based on relationship mapping">
                    <span>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={syncingUserLocations ? <CircularProgress size={16} /> : <CloudDownloadIcon />}
                            onClick={handleSyncUserLocationsFromCrm}
                            disabled={syncingUserLocations}
                        >
                            Sync User Locations from CRM
                        </Button>
                    </span>
                </Tooltip>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
                    Add Relationship
                </Button>
            </Stack>

            <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                    Relationship mappings link AuthScape entities (like Company or Location) to CRM lookup fields.
                    For example, map User.CompanyId to Contact.parentcustomerid to automatically associate contacts with accounts.
                </Typography>
            </Alert>

            {/* Progress bar for sync */}
            {syncingUserLocations && syncProgress && (
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {syncProgress.currentOperation || 'Syncing relationships...'}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {syncProgress.percentComplete}% ({syncProgress.currentRecord || 0} / {syncProgress.totalRecords || '?'})
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={syncProgress.percentComplete || 0}
                            sx={{
                                height: 10,
                                borderRadius: 1,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 1,
                                    backgroundColor: syncProgress.status === 'Failed' ? 'error.main' :
                                                     syncProgress.status === 'Completed' ? 'success.main' : 'primary.main'
                                }
                            }}
                        />
                    </Box>
                </Paper>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : relationshipMappings.length === 0 ? (
                <Alert severity="warning">
                    No relationship mappings configured. Add a mapping to link related entities between AuthScape and CRM.
                </Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>AuthScape Field</TableCell>
                                <TableCell>Related Entity</TableCell>
                                <TableCell>CRM Lookup Field</TableCell>
                                <TableCell>CRM Entity</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {relationshipMappings.map((mapping) => (
                                <TableRow key={mapping.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LinkIcon fontSize="small" color="primary" />
                                            <Typography variant="body2">
                                                {mapping.displayName || mapping.authScapeField}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={authScapeEntityLabels[mapping.relatedAuthScapeEntityType]}
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                            {mapping.crmLookupField}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                            {mapping.crmRelatedEntityName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={syncDirectionLabels[mapping.syncDirection]}>
                                            <Chip
                                                icon={getSyncDirectionIcon(mapping.syncDirection)}
                                                label={syncDirectionLabels[mapping.syncDirection]}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Tooltip>
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
                    {editingMapping ? 'Edit Relationship Mapping' : 'Add Relationship Mapping'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            AuthScape Relationship
                        </Typography>

                        <Autocomplete
                            options={relationshipFields}
                            getOptionLabel={(option) => `${option.displayName} (${option.field})`}
                            value={relationshipFields.find(f => f.field === formData.authScapeField) || null}
                            onChange={handleRelationshipFieldSelect}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="AuthScape Relationship Field"
                                    placeholder="Select a relationship field"
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <Box>
                                        <Typography variant="body2">{option.displayName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.field} &rarr; {authScapeEntityLabels[option.relatedEntityType]}
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                        />

                        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                            CRM Lookup Configuration
                        </Typography>

                        {formData.crmRelatedEntityName && (
                            <Alert severity="info" sx={{ py: 0.5 }}>
                                <Typography variant="body2">
                                    {authScapeEntityLabels[formData.relatedAuthScapeEntityType]} syncs to <strong>{formData.crmRelatedEntityName}</strong> in CRM.
                                    Select the lookup field that references this entity.
                                </Typography>
                            </Alert>
                        )}

                        {!formData.crmRelatedEntityName && formData.authScapeField && (
                            <Alert severity="warning" sx={{ py: 0.5 }}>
                                <Typography variant="body2">
                                    No entity mapping found for {authScapeEntityLabels[formData.relatedAuthScapeEntityType]}.
                                    Please create an entity mapping first.
                                </Typography>
                            </Alert>
                        )}

                        <Autocomplete
                            options={crmFields}
                            getOptionLabel={(option) => {
                                const name = option.displayName || option.logicalName;
                                return `${name} (${option.logicalName})`;
                            }}
                            value={crmFields.find(f => f.logicalName === formData.crmLookupField) || null}
                            onChange={handleCrmFieldSelect}
                            loading={crmFieldsLoading}
                            noOptionsText={crmFieldsLoading ? "Loading..." : `No lookup fields found for ${entityMapping.crmEntityName}`}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="CRM Lookup Field"
                                    placeholder="Select a CRM lookup field"
                                    helperText={`${crmFields.length} lookup field(s) from ${entityMapping.crmEntityName}`}
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
                                        <Typography variant="body2">{option.displayName || option.logicalName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.logicalName} {option.dataType ? `(${option.dataType})` : ''}
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                        />

                        <TextField
                            label="Display Name (optional)"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Sync Direction</InputLabel>
                            <Select
                                value={formData.syncDirection}
                                label="Sync Direction"
                                onChange={(e) => setFormData({ ...formData, syncDirection: e.target.value })}
                            >
                                <MenuItem value={0}>Inbound Only (CRM to AuthScape)</MenuItem>
                                <MenuItem value={1}>Outbound Only (AuthScape to CRM)</MenuItem>
                                <MenuItem value={2}>Bidirectional</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack direction="row" spacing={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isEnabled}
                                        onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                                    />
                                }
                                label="Enabled"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.syncNullValues}
                                        onChange={(e) => setFormData({ ...formData, syncNullValues: e.target.checked })}
                                    />
                                }
                                label="Sync Null Values"
                            />
                        </Stack>
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
                <DialogTitle>Delete Relationship Mapping?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the relationship mapping "{deleteDialogOpen?.displayName || deleteDialogOpen?.authScapeField}"?
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

            {/* Snackbar for sync notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
