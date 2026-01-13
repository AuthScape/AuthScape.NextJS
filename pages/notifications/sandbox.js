import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  Alert,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { apiService } from 'authscape';
import { toast } from 'react-toastify';

export default function NotificationSandbox({ currentUser }) {
  const [customTitle, setCustomTitle] = useState('Custom Notification');
  const [customMessage, setCustomMessage] = useState('This is a custom notification message');
  const [customLink, setCustomLink] = useState('');
  const [customCategory, setCustomCategory] = useState(null);
  const [customSeverity, setCustomSeverity] = useState(0); // Info
  const [scopeType, setScopeType] = useState('User');

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService().get('/Notification/GetCategories');
      if (response.status === 200) {
        setCategories(response.data);
        if (response.data.length > 0) {
          setCustomCategory(response.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const severities = [
    { name: 'Info', value: 0 },
    { name: 'Success', value: 1 },
    { name: 'Warning', value: 2 },
    { name: 'Error', value: 3 }
  ];

  const createNotification = async (title, message, categoryId, severity, linkUrl = null, scope = 'User') => {
    if (!currentUser) {
      toast.error('User not loaded');
      return;
    }
    try {
      const requestBody = {
        title,
        message,
        categoryId,
        severity,
        linkUrl,
        metadata: JSON.stringify({ source: 'sandbox', timestamp: new Date().toISOString() })
      };

      // Add scope based on selection
      if (scope === 'User') {
        requestBody.userId = currentUser.id;
      } else if (scope === 'Company' && currentUser.companyId) {
        requestBody.companyId = currentUser.companyId;
      } else if (scope === 'Location' && currentUser.locationId) {
        requestBody.locationId = currentUser.locationId;
      }

      console.log('Creating notification with payload:', requestBody);

      const response = await apiService().post('/Notification/CreateNotification', requestBody);

      console.log('Notification response:', response);

      // Don't show success toast - the notification itself will appear
    } catch (error) {
      console.error('Error creating notification:', error);
      console.error('Error response:', error.response);
      toast.error('Failed to create notification: ' + (error.response?.data || error.message));
    }
  };

  const handleCustomNotification = () => {
    createNotification(
      customTitle,
      customMessage,
      customCategory,
      customSeverity,
      customLink || null,
      scopeType
    );
  };

  // Show loading state if currentUser is not loaded yet or categories are loading
  if (!currentUser || loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notification System Sandbox
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Test the notification system with different types, severities, and scopes. All notifications will appear in real-time via SignalR.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Custom Notification Builder */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Custom Notification Builder
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link URL (optional)"
                placeholder="/some/path"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Scope</InputLabel>
                <Select value={scopeType} onChange={(e) => setScopeType(e.target.value)} label="Scope">
                  <MenuItem value="User">User Level</MenuItem>
                  <MenuItem value="Company" disabled={!currentUser.companyId}>
                    Company Level {!currentUser.companyId && '(No Company)'}
                  </MenuItem>
                  <MenuItem value="Location" disabled={!currentUser.locationId}>
                    Location Level {!currentUser.locationId && '(No Location)'}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={customCategory || ''}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  label="Category"
                  disabled={categories.length === 0}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {categories.length === 0 && (
                  <FormHelperText error>
                    No categories available. Please create categories in the admin panel.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select value={customSeverity} onChange={(e) => setCustomSeverity(e.target.value)} label="Severity">
                  {severities.map((sev) => (
                    <MenuItem key={sev.value} value={sev.value}>{sev.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleCustomNotification} fullWidth>
                Send Custom Notification
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      {/* Quick Test Examples by Severity */}
      <Typography variant="h6" gutterBottom>
        Quick Tests by Severity
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            color="info"
            fullWidth
            onClick={() => createNotification(
              'Info Notification',
              'This is an informational message',
              0,
              0
            )}
          >
            Send Info
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={() => createNotification(
              'Success Notification',
              'Operation completed successfully!',
              0,
              1
            )}
          >
            Send Success
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            onClick={() => createNotification(
              'Warning Notification',
              'Please review this important message',
              0,
              2
            )}
          >
            Send Warning
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => createNotification(
              'Error Notification',
              'An error occurred that needs attention',
              0,
              3
            )}
          >
            Send Error
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Category Examples - Generated Dynamically */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Category Examples
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Test notifications for each category type
      </Typography>

      {categories.length === 0 ? (
        <Alert severity="info">
          No categories available. Please create categories in the admin panel to see category examples.
        </Alert>
      ) : (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {categories.map((category) => (
            <Grid item xs={12} md={4} key={category.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Chip label={category.name} size="small" sx={{ mr: 1 }} />
                    {category.name} Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={() => createNotification(
                      category.name,
                      category.description,
                      category.id,
                      0,
                      null
                    )}
                  >
                    Test {category.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Notification Scopes */}
      <Typography variant="h6" gutterBottom>
        Notification Scopes
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                User-Level Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Sent only to the specific user. Personal messages, account changes, etc.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => createNotification(
                  'Personal Message',
                  'This notification is for you only',
                  0,
                  'Info',
                  null,
                  'User'
                )}
              >
                Send User Notification
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Company-Level Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Sent to all users in the company. Company announcements, policy changes, etc.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={!currentUser.companyId}
                onClick={() => createNotification(
                  'Company Announcement',
                  'This notification goes to all company users',
                  0,
                  'Info',
                  null,
                  'Company'
                )}
              >
                Send Company Notification
              </Button>
              {!currentUser.companyId && (
                <Alert severity="info" sx={{ mt: 1 }}>No company associated</Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Location-Level Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Sent to all users at a location. Site maintenance, local events, etc.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={!currentUser.locationId}
                onClick={() => createNotification(
                  'Location Alert',
                  'This notification goes to all users at this location',
                  0,
                  'Warning',
                  null,
                  'Location'
                )}
              >
                Send Location Notification
              </Button>
              {!currentUser.locationId && (
                <Alert severity="info" sx={{ mt: 1 }}>No location associated</Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Documentation */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body2" paragraph>
            The notification system supports:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                <strong>Real-time delivery</strong> via SignalR WebSocket connections
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Multiple categories</strong>: Categories can be configured dynamically in the admin panel
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Severity levels</strong>: Info, Success, Warning, Error
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Scoped delivery</strong>: User-level, Company-level, or Location-level
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Navigation links</strong>: Click notifications to navigate to relevant pages
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Email delivery</strong>: Notifications can trigger email notifications via SendGrid (if configured)
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>SMS support</strong>: SMS delivery placeholder ready for Twilio integration
              </Typography>
            </li>
          </ul>
          <Typography variant="body2" paragraph>
            All notifications appear in the notification center (bell icon in the header) and as toast messages.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
