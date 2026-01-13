import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Chip,
  useTheme,
  IconButton as MuiIconButton,
} from '@mui/material';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    if (notification.linkUrl) {
      window.location.href = notification.linkUrl;
    }
  };

  const handleDeleteClick = async (e, notificationId) => {
    e.stopPropagation();
    await deleteNotification(notificationId);
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Success':
        return <CheckCircleIcon sx={{ color: '#10b981' }} />;
      case 'Warning':
        return <WarningIcon sx={{ color: '#f59e0b' }} />;
      case 'Error':
        return <ErrorIcon sx={{ color: '#ef4444' }} />;
      case 'Info':
      default:
        return <InfoIcon sx={{ color: theme.palette.primary.main }} />;
    }
  };

  const formatNotificationTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsRoundedIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 400,
            maxWidth: '90vw',
            maxHeight: '80vh',
            mt: 1.5,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                size="small"
                color="primary"
                sx={{ height: 24, fontSize: '0.75rem' }}
              />
            )}
          </Box>
        </Box>

        <Divider />

        <List sx={{ p: 0, maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <NotificationsRoundedIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.3 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No notifications
              </Typography>
            </Box>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    py: 2,
                    px: 2,
                    backgroundColor: notification.isRead ? 'transparent' : theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.15)' : 'rgba(33, 150, 243, 0.08)',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {!notification.isRead && (
                    <CircleIcon
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 8,
                        color: 'primary.main',
                      }}
                    />
                  )}
                  <ListItemAvatar sx={{ ml: notification.isRead ? 0 : 1.5 }}>
                    <Avatar sx={{ bgcolor: 'transparent' }}>
                      {getSeverityIcon(notification.severity)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={notification.isRead ? 400 : 600}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {formatNotificationTime(notification.created)}
                        </Typography>
                      </>
                    }
                  />
                  <MuiIconButton
                    size="small"
                    onClick={(e) => handleDeleteClick(e, notification.id)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </MuiIconButton>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>

        {notifications.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center' }}>
              <Button size="small" onClick={markAllAsRead} disabled={unreadCount === 0}>
                Mark all as read
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotificationCenter;
