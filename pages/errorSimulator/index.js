import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import StorageIcon from '@mui/icons-material/Storage';
import JavascriptIcon from '@mui/icons-material/Javascript';
import { apiService } from 'authscape';

// Frontend error types
const frontendErrors = [
  {
    id: 'js-reference',
    name: 'Reference Error',
    description: 'Access an undefined variable',
    category: 'JavaScript',
    severity: 'error',
    trigger: () => {
      // eslint-disable-next-line no-undef
      console.log(undefinedVariable);
    },
  },
  {
    id: 'js-type',
    name: 'Type Error',
    description: 'Call a method on null/undefined',
    category: 'JavaScript',
    severity: 'error',
    trigger: () => {
      const obj = null;
      obj.someMethod();
    },
  },
  {
    id: 'js-syntax',
    name: 'Syntax Error (eval)',
    description: 'Execute invalid JavaScript syntax',
    category: 'JavaScript',
    severity: 'error',
    trigger: () => {
      // eslint-disable-next-line no-eval
      eval('function( {');
    },
  },
  {
    id: 'js-range',
    name: 'Range Error',
    description: 'Create array with invalid length',
    category: 'JavaScript',
    severity: 'error',
    trigger: () => {
      new Array(-1);
    },
  },
  {
    id: 'promise-unhandled',
    name: 'Unhandled Promise Rejection',
    description: 'Reject a promise without catching it',
    category: 'Async',
    severity: 'warning',
    trigger: () => {
      Promise.reject(new Error('Simulated unhandled promise rejection'));
    },
  },
  {
    id: 'promise-timeout',
    name: 'Async Timeout Error',
    description: 'Simulate an async operation that fails after delay',
    category: 'Async',
    severity: 'error',
    trigger: () => {
      setTimeout(() => {
        throw new Error('Simulated async timeout error');
      }, 100);
    },
  },
  {
    id: 'custom-error',
    name: 'Custom Application Error',
    description: 'Throw a custom application error',
    category: 'Application',
    severity: 'error',
    trigger: () => {
      class CustomAppError extends Error {
        constructor(message, code) {
          super(message);
          this.name = 'CustomAppError';
          this.code = code;
        }
      }
      throw new CustomAppError('This is a custom application error', 'APP_001');
    },
  },
  {
    id: 'stack-overflow',
    name: 'Stack Overflow',
    description: 'Trigger infinite recursion (limited)',
    category: 'JavaScript',
    severity: 'error',
    trigger: () => {
      const recurse = () => recurse();
      recurse();
    },
  },
];

// Backend error codes to simulate
const backendErrorCodes = [
  { code: 400, name: 'Bad Request', description: 'Invalid request parameters or body' },
  { code: 401, name: 'Unauthorized', description: 'Authentication required or failed' },
  { code: 403, name: 'Forbidden', description: 'Authenticated but not authorized' },
  { code: 404, name: 'Not Found', description: 'Resource does not exist' },
  { code: 405, name: 'Method Not Allowed', description: 'HTTP method not supported' },
  { code: 408, name: 'Request Timeout', description: 'Server timed out waiting' },
  { code: 409, name: 'Conflict', description: 'Request conflicts with current state' },
  { code: 410, name: 'Gone', description: 'Resource no longer available' },
  { code: 422, name: 'Unprocessable Entity', description: 'Validation errors' },
  { code: 429, name: 'Too Many Requests', description: 'Rate limit exceeded' },
  { code: 500, name: 'Internal Server Error', description: 'Unexpected server error' },
  { code: 501, name: 'Not Implemented', description: 'Functionality not implemented' },
  { code: 502, name: 'Bad Gateway', description: 'Invalid response from upstream' },
  { code: 503, name: 'Service Unavailable', description: 'Server temporarily unavailable' },
  { code: 504, name: 'Gateway Timeout', description: 'Upstream server timed out' },
];

// Backend exception types
const backendExceptions = [
  { type: 'NullReference', name: 'Null Reference Exception', description: 'Access null object' },
  { type: 'ArgumentNull', name: 'Argument Null Exception', description: 'Null argument passed' },
  { type: 'InvalidOperation', name: 'Invalid Operation Exception', description: 'Invalid state operation' },
  { type: 'Timeout', name: 'Timeout Exception', description: 'Operation timed out' },
  { type: 'Database', name: 'Database Exception', description: 'Database operation failed' },
  { type: 'Validation', name: 'Validation Exception', description: 'Data validation failed' },
  { type: 'NotFound', name: 'Not Found Exception', description: 'Entity not found' },
  { type: 'Unauthorized', name: 'Unauthorized Exception', description: 'Access denied' },
];

function ErrorCard({ error, onTrigger, type = 'frontend' }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'default';
    }
  };

  const getCodeColor = (code) => {
    if (code >= 500) return 'error';
    if (code >= 400) return 'warning';
    return 'info';
  };

  if (type === 'frontend') {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {error.name}
            </Typography>
            <Chip
              label={error.category}
              size="small"
              color={getSeverityColor(error.severity)}
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {error.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<BugReportIcon />}
            onClick={onTrigger}
            fullWidth
          >
            Trigger Error
          </Button>
        </CardActions>
      </Card>
    );
  }

  // Backend error code card
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {error.code} {error.name}
          </Typography>
          <Chip
            label={error.code}
            size="small"
            color={getCodeColor(error.code)}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {error.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="warning"
          variant="contained"
          startIcon={<CloudOffIcon />}
          onClick={onTrigger}
          fullWidth
        >
          Simulate
        </Button>
      </CardActions>
    </Card>
  );
}

export default function ErrorSimulator({ currentUser }) {
  const [lastError, setLastError] = useState(null);
  const [backendResponse, setBackendResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customErrorCode, setCustomErrorCode] = useState(500);
  const [customErrorMessage, setCustomErrorMessage] = useState('Custom error message');
  const [selectedExceptionType, setSelectedExceptionType] = useState('NullReference');

  const triggerFrontendError = (error) => {
    setLastError({ type: 'frontend', name: error.name, timestamp: new Date().toISOString() });
    try {
      error.trigger();
    } catch (e) {
      console.error('Triggered error:', e);
      // Error will be caught by global error handler
    }
  };

  const triggerBackendError = async (statusCode) => {
    setIsLoading(true);
    setBackendResponse(null);
    try {
      const response = await apiService().post('/ErrorSimulator/SimulateHttpError', {
        statusCode,
        message: `Simulated ${statusCode} error`,
      });
      setBackendResponse({ success: true, data: response.data });
    } catch (e) {
      setBackendResponse({
        success: false,
        status: e.response?.status || 'Network Error',
        error: e.response?.data || e.message,
      });
      setLastError({
        type: 'backend',
        name: `HTTP ${e.response?.status || 'Error'}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerBackendException = async (exceptionType) => {
    setIsLoading(true);
    setBackendResponse(null);
    try {
      const response = await apiService().post('/ErrorSimulator/SimulateException', {
        exceptionType,
        message: `Simulated ${exceptionType} exception`,
      });
      setBackendResponse({ success: true, data: response.data });
    } catch (e) {
      setBackendResponse({
        success: false,
        status: e.response?.status || 'Network Error',
        error: e.response?.data || e.message,
      });
      setLastError({
        type: 'backend-exception',
        name: exceptionType,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerCustomError = async () => {
    setIsLoading(true);
    setBackendResponse(null);
    try {
      const response = await apiService().post('/ErrorSimulator/SimulateHttpError', {
        statusCode: customErrorCode,
        message: customErrorMessage,
      });
      setBackendResponse({ success: true, data: response.data });
    } catch (e) {
      setBackendResponse({
        success: false,
        status: e.response?.status || 'Network Error',
        error: e.response?.data || e.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Error Simulator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Trigger various frontend and backend errors to test error tracking and handling.
      </Typography>

      {lastError && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setLastError(null)}>
          Last triggered: <strong>{lastError.name}</strong> ({lastError.type}) at {lastError.timestamp}
        </Alert>
      )}

      {/* Frontend Errors Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <JavascriptIcon color="warning" />
          <Typography variant="h6">Frontend Errors</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          These errors are triggered in the browser and caught by the global error handler.
        </Typography>

        <Grid container spacing={2}>
          {frontendErrors.map((error) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={error.id}>
              <ErrorCard
                error={error}
                onTrigger={() => triggerFrontendError(error)}
                type="frontend"
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Backend HTTP Errors Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CloudOffIcon color="error" />
          <Typography variant="h6">Backend HTTP Status Codes</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simulate various HTTP error responses from the backend API.
        </Typography>

        <Grid container spacing={2}>
          {backendErrorCodes.map((error) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={error.code}>
              <ErrorCard
                error={error}
                onTrigger={() => triggerBackendError(error.code)}
                type="backend"
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Backend Exceptions Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <StorageIcon color="error" />
          <Typography variant="h6">Backend Exceptions</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Trigger specific .NET exception types on the backend.
        </Typography>

        <Grid container spacing={2}>
          {backendExceptions.map((exc) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={exc.type}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {exc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exc.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    startIcon={<ErrorOutlineIcon />}
                    onClick={() => triggerBackendException(exc.type)}
                    fullWidth
                    disabled={isLoading}
                  >
                    Throw Exception
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Custom Error Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <WarningAmberIcon color="warning" />
          <Typography variant="h6">Custom Error</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Create a custom error with specific status code and message.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
          <TextField
            type="number"
            label="Status Code"
            value={customErrorCode}
            onChange={(e) => setCustomErrorCode(Number(e.target.value))}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Error Message"
            value={customErrorMessage}
            onChange={(e) => setCustomErrorMessage(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 300 }}
          />
          <Button
            variant="contained"
            color="error"
            onClick={triggerCustomError}
            disabled={isLoading}
            sx={{ height: 56 }}
          >
            Trigger Custom Error
          </Button>
        </Stack>
      </Paper>

      {/* Response Display */}
      {backendResponse && (
        <Paper sx={{ p: 3, bgcolor: backendResponse.success ? 'success.light' : 'error.light' }}>
          <Typography variant="h6" gutterBottom>
            {backendResponse.success ? 'Success Response' : 'Error Response'}
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: 12,
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              overflow: 'auto',
              maxHeight: 300,
            }}
          >
            {JSON.stringify(backendResponse, null, 2)}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
