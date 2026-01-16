import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListIcon from '@mui/icons-material/List';
import SyncIcon from '@mui/icons-material/Sync';
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

export function CrmEntityMappings({ connection, onBack, onSelectEntityMapping }) {
    const [entityMappings, setEntityMappings] = useState([]);
    const [crmEntities, setCrmEntities] = useState([]);
    const [authScapeTypes, setAuthScapeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
    const [editingMapping, setEditingMapping] = useState(null);
    const [crmEntitiesError, setCrmEntitiesError] = useState(null);
    const [crmEntitiesLoading, setCrmEntitiesLoading] = useState(false);
    const [syncingMappingId, setSyncingMappingId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [syncProgress, setSyncProgress] = useState(null); // { syncId, percentComplete, currentOperation, currentRecord, totalRecords }
    const hubConnectionRef = useRef(null);

    // Form state
    const [formData, setFormData] = useState({
        crmEntityName: '',
        crmEntityDisplayName: '',
        authScapeEntityType: 0,
        syncDirection: 2,
        isEnabled: true,
        crmFilterExpression: ''
    });

    const refreshMappings = async () => {
        setLoading(true);
        try {
            const response = await apiService().get(`/UserManagement/GetCrmEntityMappings?connectionId=${connection.id}`);
            if (response && response.status === 200) {
                setEntityMappings(response.data);
            }
        } catch (error) {
            console.error("Error fetching entity mappings:", error);
        }
        setLoading(false);
    };

    const fetchCrmEntities = async () => {
        setCrmEntitiesLoading(true);
        setCrmEntitiesError(null);
        try {
            console.log("Fetching CRM entities for connection:", connection.id);
            const response = await apiService().get(`/UserManagement/GetCrmAvailableEntities?connectionId=${connection.id}`);
            console.log("CRM entities response:", response);
            if (response && response.status === 200) {
                console.log("CRM entities data:", response.data);
                setCrmEntities(response.data);
            } else if (response && response.data && response.data.error) {
                // Handle error response from API
                setCrmEntitiesError(response.data.error);
                console.error("CRM entities error:", response.data.error);
            } else if (response && response.status >= 400) {
                setCrmEntitiesError(`Failed to fetch entities (status: ${response.status})`);
            }
        } catch (error) {
            console.error("Error fetching CRM entities:", error);
            console.error("Error response:", error.response);
            setCrmEntitiesError(error.response?.data?.error || error.message || "Failed to fetch CRM entities");
        }
        setCrmEntitiesLoading(false);
    };

    const fetchAuthScapeTypes = async () => {
        try {
            const response = await apiService().get('/UserManagement/GetCrmAuthScapeEntityTypes');
            if (response && response.status === 200) {
                setAuthScapeTypes(response.data);
            }
        } catch (error) {
            console.error("Error fetching AuthScape types:", error);
        }
    };

    useEffect(() => {
        if (connection) {
            refreshMappings();
            fetchCrmEntities();
            fetchAuthScapeTypes();
        }
    }, [connection]);

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
                    console.log('Sync progress update:', progress);
                    setSyncProgress(progress);

                    if (progress.status === 'Completed' || progress.status === 'Failed') {
                        // Clear progress after a short delay
                        setTimeout(() => {
                            setSyncProgress(null);
                            setSyncingMappingId(null);
                        }, 2000);
                    }
                });

                await hubConnection.start();
                console.log('SignalR connected for CRM sync progress');
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
                crmEntityName: mapping.crmEntityName,
                crmEntityDisplayName: mapping.crmEntityDisplayName || '',
                authScapeEntityType: mapping.authScapeEntityType,
                syncDirection: mapping.syncDirection,
                isEnabled: mapping.isEnabled,
                crmFilterExpression: mapping.crmFilterExpression || ''
            });
        } else {
            setEditingMapping(null);
            setFormData({
                crmEntityName: '',
                crmEntityDisplayName: '',
                authScapeEntityType: 0,
                syncDirection: 2,
                isEnabled: true,
                crmFilterExpression: ''
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
                await apiService().put(`/UserManagement/UpdateCrmEntityMapping?id=${editingMapping.id}`, {
                    crmEntityDisplayName: formData.crmEntityDisplayName,
                    syncDirection: formData.syncDirection,
                    isEnabled: formData.isEnabled,
                    crmFilterExpression: formData.crmFilterExpression
                });
            } else {
                await apiService().post("/UserManagement/CreateCrmEntityMapping", {
                    connectionId: connection.id,
                    crmEntityName: formData.crmEntityName,
                    crmEntityDisplayName: formData.crmEntityDisplayName,
                    authScapeEntityType: formData.authScapeEntityType,
                    syncDirection: formData.syncDirection,
                    isEnabled: formData.isEnabled,
                    crmFilterExpression: formData.crmFilterExpression
                });
            }
            await refreshMappings();
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving entity mapping:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService().delete(`/UserManagement/DeleteCrmEntityMapping?id=${id}`);
            await refreshMappings();
            setDeleteDialogOpen(null);
        } catch (error) {
            console.error("Error deleting entity mapping:", error);
        }
    };

    const handleSyncEntityMapping = async (mapping) => {
        setSyncingMappingId(mapping.id);
        setSyncProgress({ percentComplete: 0, currentOperation: 'Starting sync...', totalRecords: 0, currentRecord: 0 });

        try {
            // Join the entity mapping group for progress updates
            if (hubConnectionRef.current) {
                await hubConnectionRef.current.invoke('JoinSyncProgress', `entityMapping_${mapping.id}`);
            }

            const response = await apiService().post(`/UserManagement/TriggerCrmEntityMappingSync?entityMappingId=${mapping.id}&fullSync=true`);
            if (response && response.status === 200) {
                const result = response.data;

                // Join the sync-specific group if we got a syncId
                if (result.syncId && hubConnectionRef.current) {
                    await hubConnectionRef.current.invoke('JoinSyncProgress', result.syncId);
                }

                if (result.success) {
                    setSnackbar({
                        open: true,
                        message: `Sync completed: ${result.stats?.successCount || 0} records synced`,
                        severity: 'success'
                    });
                } else {
                    setSnackbar({
                        open: true,
                        message: result.message || 'Sync completed with errors',
                        severity: 'warning'
                    });
                }
            }
        } catch (error) {
            console.error("Error syncing entity mapping:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Sync failed',
                severity: 'error'
            });
            setSyncProgress(null);
            setSyncingMappingId(null);
        }
    };

    const handleCrmEntitySelect = (event, value) => {
        if (value) {
            setFormData({
                ...formData,
                crmEntityName: value.logicalName,
                crmEntityDisplayName: value.displayName
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
                        Entity Mappings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {connection.displayName || 'Unnamed Connection'}
                    </Typography>
                </Box>
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                    Add Entity Mapping
                </Button>
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : entityMappings.length === 0 ? (
                <Alert severity="info">
                    No entity mappings configured. Click "Add Entity Mapping" to map a CRM entity to an AuthScape entity type.
                </Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CRM Entity</TableCell>
                                <TableCell>AuthScape Type</TableCell>
                                <TableCell>Sync Direction</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Filter</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entityMappings.map((mapping) => (
                                <React.Fragment key={mapping.id}>
                                <TableRow hover>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="body2" fontWeight="medium">
                                                {mapping.crmEntityDisplayName || mapping.crmEntityName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {mapping.crmEntityName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={authScapeEntityLabels[mapping.authScapeEntityType]}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>{syncDirectionLabels[mapping.syncDirection]}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={mapping.isEnabled ? 'Enabled' : 'Disabled'}
                                            color={mapping.isEnabled ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {mapping.crmFilterExpression ? (
                                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                                                {mapping.crmFilterExpression.substring(0, 30)}
                                                {mapping.crmFilterExpression.length > 30 ? '...' : ''}
                                            </Typography>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Field Mappings">
                                            <IconButton
                                                onClick={() => onSelectEntityMapping && onSelectEntityMapping(mapping)}
                                            >
                                                <ListIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Sync this entity">
                                            <span>
                                                <IconButton
                                                    onClick={() => handleSyncEntityMapping(mapping)}
                                                    disabled={syncingMappingId === mapping.id || !mapping.isEnabled}
                                                    color="primary"
                                                >
                                                    {syncingMappingId === mapping.id ? (
                                                        <CircularProgress size={20} />
                                                    ) : (
                                                        <SyncIcon />
                                                    )}
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={() => handleOpenDialog(mapping)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                color="error"
                                                onClick={() => setDeleteDialogOpen(mapping)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                {/* Progress row */}
                                {syncingMappingId === mapping.id && syncProgress && (
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ py: 1, px: 2 }}>
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {syncProgress.currentOperation || 'Syncing...'}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {syncProgress.percentComplete}% ({syncProgress.currentRecord || 0} / {syncProgress.totalRecords || '?'})
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={syncProgress.percentComplete || 0}
                                                    sx={{
                                                        height: 8,
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
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMapping ? 'Edit Entity Mapping' : 'Add Entity Mapping'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {!editingMapping ? (
                            <>
                                {crmEntitiesError && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {crmEntitiesError}
                                    </Alert>
                                )}
                                <Autocomplete
                                    options={crmEntities}
                                    getOptionLabel={(option) => `${option.displayName} (${option.logicalName})`}
                                    onChange={handleCrmEntitySelect}
                                    loading={crmEntitiesLoading}
                                    noOptionsText={crmEntitiesError ? "Error loading entities" : "No entities found"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="CRM Entity"
                                            placeholder="Select a CRM entity"
                                            error={!!crmEntitiesError}
                                            helperText={crmEntitiesError ? "Check connection credentials" : ""}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <>
                                                        {crmEntitiesLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
                                                    {option.logicalName}
                                                </Typography>
                                            </Box>
                                        </li>
                                    )}
                                />
                            </>
                        ) : (
                            <TextField
                                label="CRM Entity"
                                value={formData.crmEntityDisplayName || formData.crmEntityName}
                                disabled
                                fullWidth
                            />
                        )}

                        <TextField
                            label="Display Name (optional)"
                            value={formData.crmEntityDisplayName}
                            onChange={(e) => setFormData({ ...formData, crmEntityDisplayName: e.target.value })}
                            fullWidth
                        />

                        <FormControl fullWidth disabled={!!editingMapping}>
                            <InputLabel>AuthScape Entity Type</InputLabel>
                            <Select
                                value={formData.authScapeEntityType}
                                label="AuthScape Entity Type"
                                onChange={(e) => setFormData({ ...formData, authScapeEntityType: e.target.value })}
                            >
                                {authScapeTypes.map((type) => (
                                    <MenuItem key={type.type} value={type.type}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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

                        <TextField
                            label="Filter Expression (optional)"
                            value={formData.crmFilterExpression}
                            onChange={(e) => setFormData({ ...formData, crmFilterExpression: e.target.value })}
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="e.g., statecode eq 0 (OData filter for Dynamics)"
                            helperText="Filter which CRM records to sync"
                        />

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
                <DialogTitle>Delete Entity Mapping?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the mapping for "{deleteDialogOpen?.crmEntityDisplayName || deleteDialogOpen?.crmEntityName}"?
                        This will also delete all field mappings associated with this entity.
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

            {/* Sync Result Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
}
