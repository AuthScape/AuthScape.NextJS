import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';
import SettingsIcon from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';
import { IconButton, Button, Chip } from '@mui/material';
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
import LinearProgress from '@mui/material/LinearProgress';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

const syncDirectionLabels = {
    0: 'Inbound Only',
    1: 'Outbound Only',
    2: 'Bidirectional'
};

export function CrmConnections({ onSelectConnection }) {
    const [connections, setConnections] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
    const [editingConnection, setEditingConnection] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [testing, setTesting] = useState(false);
    const [syncing, setSyncing] = useState({});
    const [syncProgress, setSyncProgress] = useState({}); // { connectionId: { progress: 0, message: '', currentStep: 0, totalSteps: 0 } }
    const [syncResult, setSyncResult] = useState(null);
    const [syncResultDialogOpen, setSyncResultDialogOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        provider: 0,
        displayName: '',
        environmentUrl: '',
        apiKey: '',
        syncDirection: 2,
        syncIntervalMinutes: 15,
        isEnabled: true
    });

    const refreshConnections = async () => {
        setLoading(true);
        try {
            const response = await apiService().get("/UserManagement/GetCrmConnections");
            if (response && response.status === 200) {
                setConnections(response.data);
            }
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
        setLoading(false);
    };

    const fetchProviders = async () => {
        try {
            const response = await apiService().get("/UserManagement/GetCrmProviders");
            console.log("GetCrmProviders response:", response);
            if (response && response.status === 200) {
                console.log("Providers data:", response.data);
                setProviders(response.data);
            }
        } catch (error) {
            console.error("Error fetching providers:", error);
            console.error("Error response:", error.response);
        }
    };

    useEffect(() => {
        refreshConnections();
        fetchProviders();
    }, []);

    const handleOpenDialog = (connection = null) => {
        if (connection) {
            setEditingConnection(connection);
            setFormData({
                provider: connection.provider,
                displayName: connection.displayName || '',
                environmentUrl: connection.environmentUrl || '',
                apiKey: '',
                syncDirection: connection.syncDirection,
                syncIntervalMinutes: connection.syncIntervalMinutes,
                isEnabled: connection.isEnabled
            });
        } else {
            setEditingConnection(null);
            setFormData({
                provider: 0,
                displayName: '',
                environmentUrl: '',
                apiKey: '',
                syncDirection: 2,
                syncIntervalMinutes: 15,
                isEnabled: true
            });
        }
        setTestResult(null);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingConnection(null);
        setTestResult(null);
    };

    const handleSave = async () => {
        try {
            if (editingConnection) {
                // Build update request - only include credentials if they were changed
                const updateData = {
                    displayName: formData.displayName,
                    environmentUrl: formData.environmentUrl,
                    syncDirection: formData.syncDirection,
                    syncIntervalMinutes: formData.syncIntervalMinutes,
                    isEnabled: formData.isEnabled
                };

                // Include API key if entered (for updating existing connections)
                if (formData.apiKey) updateData.apiKey = formData.apiKey;

                await apiService().put(`/UserManagement/UpdateCrmConnection?id=${editingConnection.id}`, updateData);
            } else {
                await apiService().post("/UserManagement/CreateCrmConnection", formData);
            }
            await refreshConnections();
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving connection:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService().delete(`/UserManagement/DeleteCrmConnection?id=${id}`);
            await refreshConnections();
            setDeleteDialogOpen(null);
        } catch (error) {
            console.error("Error deleting connection:", error);
        }
    };

    const handleTestConnection = async (id) => {
        setTesting(true);
        setTestResult(null);
        try {
            const response = await apiService().post(`/UserManagement/TestCrmConnection?id=${id}`);
            if (response && response.status === 200) {
                setTestResult(response.data);
            }
        } catch (error) {
            setTestResult({ success: false, message: error.message || 'Test failed' });
        }
        setTesting(false);
    };

    const pollSyncProgress = async (connectionId) => {
        try {
            const response = await apiService().get(`/UserManagement/GetCrmSyncProgress?connectionId=${connectionId}`);
            if (response && response.status === 200) {
                const progressData = response.data;
                setSyncProgress(prev => ({
                    ...prev,
                    [connectionId]: {
                        progress: progressData.progress,
                        message: progressData.message,
                        currentStep: progressData.currentStep,
                        totalSteps: progressData.totalSteps
                    }
                }));
                return progressData.isRunning;
            }
        } catch (error) {
            console.error("Error polling sync progress:", error);
        }
        return false;
    };

    const handleSync = async (conn) => {
        setSyncing(prev => ({ ...prev, [conn.id]: true }));
        setSyncProgress(prev => ({ ...prev, [conn.id]: { progress: 0, message: 'Starting sync...', currentStep: 0, totalSteps: 0 } }));
        setSyncResult(null);

        // Start polling for progress
        const pollInterval = setInterval(async () => {
            const isRunning = await pollSyncProgress(conn.id);
            if (!isRunning) {
                clearInterval(pollInterval);
            }
        }, 500); // Poll every 500ms

        try {
            const response = await apiService().post(`/UserManagement/SyncCrmConnection?id=${conn.id}`);
            clearInterval(pollInterval); // Stop polling when sync completes

            if (response && response.status === 200) {
                setSyncResult({ ...response.data, connectionName: conn.displayName || 'CRM' });
                setSyncResultDialogOpen(true);
                // Refresh connections to update last sync time
                await refreshConnections();
            } else if (response && response.data) {
                setSyncResult({
                    success: false,
                    message: response.data.error || 'Sync failed',
                    connectionName: conn.displayName || 'CRM'
                });
                setSyncResultDialogOpen(true);
            }
        } catch (error) {
            clearInterval(pollInterval); // Stop polling on error
            console.error("Error syncing connection:", error);
            setSyncResult({
                success: false,
                message: error.response?.data?.error || error.message || 'Sync failed',
                connectionName: conn.displayName || 'CRM',
                errors: error.response?.data?.errors || []
            });
            setSyncResultDialogOpen(true);
        }
        setSyncing(prev => ({ ...prev, [conn.id]: false }));
        setSyncProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[conn.id];
            return newProgress;
        });
    };

    const getProviderName = (type) => {
        const provider = providers.find(p => p.type === type);
        return provider ? provider.name : `Provider ${type}`;
    };

    const selectedProvider = providers.find(p => p.type === formData.provider);

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">
                    CRM Connections
                </Typography>
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                    Add Connection
                </Button>
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : connections.length === 0 ? (
                <Alert severity="info">
                    No CRM connections configured. Click "Add Connection" to create one.
                </Alert>
            ) : (
                <Box sx={{ position: 'relative' }}>
                    {/* Show progress bar when any connection is syncing */}
                    {Object.values(syncing).some(Boolean) && (
                        <Box sx={{ mb: 2 }}>
                            {Object.entries(syncProgress).map(([connId, progress]) => (
                                <Box key={connId} sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {progress.message || 'Syncing...'}
                                        </Typography>
                                        <Typography variant="body2" fontWeight="medium">
                                            {progress.progress}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress.progress}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Connection ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Provider</TableCell>
                                <TableCell>Environment</TableCell>
                                <TableCell>Sync Direction</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Sync</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {connections.map((conn) => (
                                <TableRow key={conn.id} hover>
                                    <TableCell>
                                        <Tooltip title="Click to copy">
                                            <Chip
                                                label={conn.id}
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(conn.id.toString());
                                                }}
                                                sx={{ cursor: 'pointer', fontFamily: 'monospace' }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{conn.displayName || 'Unnamed'}</TableCell>
                                    <TableCell>{getProviderName(conn.provider)}</TableCell>
                                    <TableCell>{conn.environmentUrl || '-'}</TableCell>
                                    <TableCell>{syncDirectionLabels[conn.syncDirection]}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={conn.isEnabled ? 'Enabled' : 'Disabled'}
                                            color={conn.isEnabled ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {conn.lastSyncAt
                                            ? new Date(conn.lastSyncAt).toLocaleString()
                                            : 'Never'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleSync(conn)}
                                            disabled={syncing[conn.id] || !conn.isEnabled}
                                            title={conn.isEnabled ? "Sync All Mapped Entities" : "Enable connection to sync"}
                                            color="primary"
                                        >
                                            {syncing[conn.id] ? <CircularProgress size={20} /> : <SyncIcon />}
                                        </IconButton>
                                        <IconButton
                                            onClick={() => onSelectConnection && onSelectConnection(conn)}
                                            title="Configure Mappings"
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleOpenDialog(conn)}
                                            title="Edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => setDeleteDialogOpen(conn)}
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
                </Box>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingConnection ? 'Edit CRM Connection' : 'Add CRM Connection'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {editingConnection && (
                            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Connection ID
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontFamily: 'monospace', fontWeight: 600 }}
                                    >
                                        {editingConnection.id}
                                    </Typography>
                                    <Tooltip title="Copy to clipboard">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                navigator.clipboard.writeText(editingConnection.id.toString());
                                            }}
                                        >
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Use this ID when setting up webhooks in Power Automate
                                </Typography>
                            </Paper>
                        )}

                        <FormControl fullWidth disabled={!!editingConnection}>
                            <InputLabel>Provider</InputLabel>
                            <Select
                                value={formData.provider}
                                label="Provider"
                                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                            >
                                {providers.map((p) => (
                                    <MenuItem key={p.type} value={p.type}>{p.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Display Name"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            fullWidth
                        />

                        <TextField
                            label="Environment URL"
                            value={formData.environmentUrl}
                            onChange={(e) => setFormData({ ...formData, environmentUrl: e.target.value })}
                            fullWidth
                            placeholder="e.g., https://org.crm.dynamics.com"
                        />

                        {selectedProvider?.supportsApiKey && (
                            <TextField
                                label="API Key"
                                type="password"
                                value={formData.apiKey}
                                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                                fullWidth
                                helperText={editingConnection ? "Leave blank to keep existing" : ""}
                            />
                        )}


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

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isEnabled}
                                    onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                                />
                            }
                            label="Enabled"
                        />

                        {editingConnection && (
                            <Box>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleTestConnection(editingConnection.id)}
                                    disabled={testing}
                                    startIcon={testing ? <CircularProgress size={16} /> : <SyncIcon />}
                                >
                                    Test Connection
                                </Button>
                                {testResult && (
                                    <Alert severity={testResult.success ? 'success' : 'error'} sx={{ mt: 1 }}>
                                        {testResult.message}
                                    </Alert>
                                )}
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        {editingConnection ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteDialogOpen} onClose={() => setDeleteDialogOpen(null)}>
                <DialogTitle>Delete Connection?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the connection "{deleteDialogOpen?.displayName}"?
                        This will also delete all entity and field mappings associated with this connection.
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

            {/* Sync Result Dialog */}
            <Dialog open={syncResultDialogOpen} onClose={() => setSyncResultDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Sync {syncResult?.success ? 'Completed' : 'Failed'} - {syncResult?.connectionName}
                </DialogTitle>
                <DialogContent>
                    <Alert severity={syncResult?.success ? 'success' : 'error'} sx={{ mb: 2 }}>
                        {syncResult?.message}
                    </Alert>

                    {syncResult?.totalProcessed > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>Sync Statistics:</Typography>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Total Processed:</Typography>
                                    <Typography variant="body2">{syncResult.totalProcessed}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Successful:</Typography>
                                    <Typography variant="body2" color="success.main">{syncResult.successCount}</Typography>
                                </Box>
                                {syncResult.failedCount > 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Failed:</Typography>
                                        <Typography variant="body2" color="error.main">{syncResult.failedCount}</Typography>
                                    </Box>
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Created:</Typography>
                                    <Typography variant="body2">{syncResult.createdCount}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Updated:</Typography>
                                    <Typography variant="body2">{syncResult.updatedCount}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Inbound (CRM to AuthScape):</Typography>
                                    <Typography variant="body2">{syncResult.inboundCount}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Outbound (AuthScape to CRM):</Typography>
                                    <Typography variant="body2">{syncResult.outboundCount}</Typography>
                                </Box>
                                {syncResult.durationMs > 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Duration:</Typography>
                                        <Typography variant="body2">{(syncResult.durationMs / 1000).toFixed(2)}s</Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                    )}

                    {syncResult?.errors?.length > 0 && (
                        <Box>
                            <Typography variant="subtitle2" color="error" gutterBottom>Errors:</Typography>
                            <Paper variant="outlined" sx={{ p: 1, maxHeight: 150, overflow: 'auto' }}>
                                {syncResult.errors.map((err, idx) => (
                                    <Typography key={idx} variant="caption" display="block" color="error.main">
                                        {err}
                                    </Typography>
                                ))}
                            </Paper>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSyncResultDialogOpen(false)} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
