import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from 'authscape';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children, currentUser }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!currentUser) return;

    try {
      const response = await apiService().get('/Notification/GetNotifications?unreadOnly=false&take=50');
      if (response.status === 200) {
        setNotifications(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, [currentUser]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!currentUser) return;

    try {
      const response = await apiService().get('/Notification/GetUnreadCount');
      if (response.status === 200) {
        setUnreadCount(response.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  }, [currentUser]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await apiService().post('/Notification/MarkAsRead', { notificationId });
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, isRead: true, readAt: new Date() } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      await apiService().post('/Notification/MarkAllAsRead');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true, readAt: new Date() })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  }, []);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await apiService().delete(`/Notification/DeleteNotification?id=${notificationId}`);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, [notifications]);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    try {
      await apiService().delete('/Notification/ClearAllNotifications');
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to clear notifications:', err);
    }
  }, []);

  // SignalR connection setup
  useEffect(() => {
    if (!currentUser) return;

    // Get the API base URL from environment variable
    const apiBaseUrl = process.env.apiUri || 'http://localhost:54218';

    const hubUrl = `${apiBaseUrl}/notifications`;
    console.log('NotificationHub URL:', hubUrl);

    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, [currentUser]);

  // SignalR connection lifecycle
  useEffect(() => {
    if (!connection || !currentUser) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('NotificationHub connected successfully');
        setIsConnected(true);

        // Join user notification group
        await connection.invoke('JoinUserNotifications', currentUser.id);

        // Join company notification group if applicable
        if (currentUser.companyId) {
          await connection.invoke('JoinCompanyNotifications', currentUser.companyId);
        }

        // Join location notification group if applicable
        if (currentUser.locationId) {
          await connection.invoke('JoinLocationNotifications', currentUser.locationId);
        }

        // Fetch initial data
        await fetchNotifications();
        await fetchUnreadCount();
      } catch (err) {
        console.error('Failed to connect to NotificationHub:', err);
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name,
          statusCode: err.statusCode
        });

        // Still fetch notifications from API even if SignalR fails
        try {
          await fetchNotifications();
          await fetchUnreadCount();
        } catch (apiErr) {
          console.error('Failed to fetch notifications from API:', apiErr);
        }

        // Don't retry if it's a negotiate/auth error
        const shouldRetry = !err.message?.includes('negotiate') &&
                           !err.message?.includes('401') &&
                           !err.message?.includes('Unauthorized');

        if (shouldRetry) {
          console.log('Will retry connection in 5 seconds...');
          setTimeout(startConnection, 5000);
        } else {
          console.log('Not retrying - negotiate or auth error detected');
        }
      }
    };

    // Handle incoming notifications
    connection.on('OnNotificationReceived', (notification) => {
      console.log('Received notification:', notification);

      // Add to state
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Determine the description to show (prioritize message, fallback to categoryName)
      const description = notification.message || notification.categoryName || '';

      // Show toast with description
      toast.info(
        <div>
          <strong>{notification.title}</strong>
          {description && <div style={{ fontSize: '0.9em', marginTop: '4px' }}>{description}</div>}
        </div>,
        {
          onClick: () => {
            if (notification.linkUrl) {
              window.location.href = notification.linkUrl;
            }
          }
        }
      );
    });

    connection.onreconnecting(() => {
      console.log('NotificationHub reconnecting...');
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      console.log('NotificationHub reconnected');
      setIsConnected(true);
      fetchNotifications();
      fetchUnreadCount();
    });

    connection.onclose(() => {
      console.log('NotificationHub disconnected');
      setIsConnected(false);
    });

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection, currentUser, fetchNotifications, fetchUnreadCount]);

  const value = {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    refresh: fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
