import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { toast, Bounce, Slide, Zoom, Flip } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

const transitions = {
  Bounce: Bounce,
  Slide: Slide,
  Zoom: Zoom,
  Flip: Flip,
};

const positions = [
  'top-right',
  'top-center',
  'top-left',
  'bottom-right',
  'bottom-center',
  'bottom-left',
];

const themes = ['light', 'dark', 'colored'];

export default function ToastPlayground({ currentUser }) {
  // Toast options state
  const [message, setMessage] = useState('This is a toast notification!');
  const [position, setPosition] = useState('top-right');
  const [autoClose, setAutoClose] = useState(3000);
  const [theme, setTheme] = useState('colored');
  const [transition, setTransition] = useState('Bounce');
  const [hideProgressBar, setHideProgressBar] = useState(false);
  const [closeOnClick, setCloseOnClick] = useState(true);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [draggable, setDraggable] = useState(true);

  const getToastOptions = () => ({
    position,
    autoClose: autoClose || false,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    theme,
    transition: transitions[transition],
  });

  const showToast = (type) => {
    const toastMessage = message || `This is a ${type} toast!`;
    const options = getToastOptions();

    switch (type) {
      case 'success':
        toast.success(toastMessage, options);
        break;
      case 'error':
        toast.error(toastMessage, options);
        break;
      case 'warning':
        toast.warning(toastMessage, options);
        break;
      case 'info':
        toast.info(toastMessage, options);
        break;
      default:
        toast(toastMessage, options);
    }
  };

  const showPromiseToast = () => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3 ? resolve('Success!') : reject('Error occurred');
      }, 2000);
    });

    toast.promise(myPromise, {
      pending: 'Loading...',
      success: 'Operation completed successfully!',
      error: 'Something went wrong!',
    }, getToastOptions());
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Toast Playground
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Test and customize toast notifications with various options and styles.
      </Typography>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Toast Types
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => showToast('success')}
              >
                Success
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<ErrorOutlineIcon />}
                onClick={() => showToast('error')}
              >
                Error
              </Button>
              <Button
                variant="contained"
                color="warning"
                startIcon={<WarningAmberIcon />}
                onClick={() => showToast('warning')}
              >
                Warning
              </Button>
              <Button
                variant="contained"
                color="info"
                startIcon={<InfoOutlinedIcon />}
                onClick={() => showToast('info')}
              >
                Info
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<NotificationsIcon />}
                onClick={() => showToast('default')}
              >
                Default
              </Button>
              <Button
                variant="outlined"
                onClick={showPromiseToast}
              >
                Promise Toast
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Configuration
            </Typography>

            <TextField
              fullWidth
              label="Toast Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={position}
                    label="Position"
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    {positions.map((pos) => (
                      <MenuItem key={pos} value={pos}>
                        {pos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={theme}
                    label="Theme"
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    {themes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Transition</InputLabel>
                  <Select
                    value={transition}
                    label="Transition"
                    onChange={(e) => setTransition(e.target.value)}
                  >
                    {Object.keys(transitions).map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Auto Close (ms)"
                  value={autoClose}
                  onChange={(e) => setAutoClose(Number(e.target.value))}
                  helperText="0 = no auto close"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Toggles */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Options
            </Typography>

            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!hideProgressBar}
                    onChange={(e) => setHideProgressBar(!e.target.checked)}
                  />
                }
                label="Show Progress Bar"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={closeOnClick}
                    onChange={(e) => setCloseOnClick(e.target.checked)}
                  />
                }
                label="Close on Click"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={pauseOnHover}
                    onChange={(e) => setPauseOnHover(e.target.checked)}
                  />
                }
                label="Pause on Hover"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={draggable}
                    onChange={(e) => setDraggable(e.target.checked)}
                  />
                }
                label="Draggable"
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Current Settings
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={position} size="small" variant="outlined" />
              <Chip label={theme} size="small" variant="outlined" />
              <Chip label={transition} size="small" variant="outlined" />
              <Chip label={`${autoClose}ms`} size="small" variant="outlined" />
            </Stack>
          </Paper>
        </Grid>

        {/* Position Preview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Position Preview
            </Typography>
            <Box
              sx={{
                position: 'relative',
                height: 200,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {positions.map((pos) => {
                const [vertical, horizontal] = pos.split('-');
                return (
                  <Button
                    key={pos}
                    size="small"
                    variant={position === pos ? 'contained' : 'outlined'}
                    onClick={() => setPosition(pos)}
                    sx={{
                      position: 'absolute',
                      top: vertical === 'top' ? 8 : 'auto',
                      bottom: vertical === 'bottom' ? 8 : 'auto',
                      left: horizontal === 'left' ? 8 : horizontal === 'center' ? '50%' : 'auto',
                      right: horizontal === 'right' ? 8 : 'auto',
                      transform: horizontal === 'center' ? 'translateX(-50%)' : 'none',
                      minWidth: 100,
                    }}
                  >
                    {pos}
                  </Button>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Usage Examples */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Usage Examples
            </Typography>
            <Typography variant="body2" component="pre" sx={{
              fontFamily: 'monospace',
              fontSize: 12,
              p: 2,
              bgcolor: 'grey.900',
              color: 'grey.100',
              borderRadius: 1,
              overflow: 'auto'
            }}>
{`import { toast } from 'react-toastify';

// Simple toast
toast("Hello World");

// Success toast
toast.success("Operation successful!");

// Error toast with options
toast.error("Something went wrong!", {
  position: "top-center",
  autoClose: 5000,
  theme: "colored"
});

// Warning toast
toast.warning("Please check your input");

// Info toast
toast.info("New updates available");

// Promise toast (loading → success/error)
toast.promise(myAsyncFunction(), {
  pending: "Loading...",
  success: "Done!",
  error: "Failed!"
});`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
