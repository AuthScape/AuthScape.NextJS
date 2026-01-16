import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { apiService, toast } from 'authscape';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const NotificationContext = createContext();

// Module-level state to persist across component remounts
let globalConnection = null;
let globalUserId = null;
let globalIsInitialized = false;

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    // Return a fallback object when provider is not available (for testing)
    return {
      notifications: [],
      unreadCount: 0,
      isConnected: false,
      markAsRead: () => {},
      markAllAsRead: () => {},
      deleteNotification: () => {},
      clearAll: () => {},
      refresh: () => {}
    };
  }
  return context;
}

export function NotificationProvider({ children, currentUser }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

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
      setNotifications(prev => {
        const notification = prev.find(n => n.id === notificationId);
        if (notification && !notification.isRead) {
          setUnreadCount(count => Math.max(0, count - 1));
        }
        return prev.filter(n => n.id !== notificationId);
      });
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, []);

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

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const [notifResponse, countResponse] = await Promise.all([
        apiService().get('/Notification/GetNotifications?unreadOnly=false&take=50'),
        apiService().get('/Notification/GetUnreadCount')
      ]);
      if (notifResponse.status === 200) {
        setNotifications(notifResponse.data);
      }
      if (countResponse.status === 200) {
        setUnreadCount(countResponse.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, []);

  // Single useEffect for SignalR - uses module-level state to persist across remounts
  useEffect(() => {
    const userId = currentUser?.id;

    // Skip if no user
    if (!userId) {
      return;
    }

    // Local fetch function
    const fetchData = async () => {
      try {
        const [notifResponse, countResponse] = await Promise.all([
          apiService().get('/Notification/GetNotifications?unreadOnly=false&take=50'),
          apiService().get('/Notification/GetUnreadCount')
        ]);
        if (notifResponse.status === 200) {
          setNotifications(notifResponse.data);
        }
        if (countResponse.status === 200) {
          setUnreadCount(countResponse.data.count);
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    // If already initialized for this user with an active connection, just sync state
    if (globalIsInitialized && globalUserId === userId && globalConnection) {
      setIsConnected(globalConnection.state === 'Connected');
      fetchData();
      return;
    }

    // If user changed, clean up old connection
    if (globalConnection && globalUserId !== userId) {
      globalConnection.stop();
      globalConnection = null;
      globalIsInitialized = false;
    }

    globalUserId = userId;
    globalIsInitialized = true;

    const apiBaseUrl = process.env.apiUri || 'http://localhost:54218';
    const hubUrl = `${apiBaseUrl}/notifications`;

    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(LogLevel.Warning)
      .build();

    globalConnection = connection;

    // Handle incoming notifications
    connection.on('OnNotificationReceived', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);

      const description = notification.message || notification.categoryName || '';
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
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
      fetchData();
    });

    connection.onclose(() => {
      setIsConnected(false);
    });

    // Start connection
    const startConnection = async () => {
      try {
        await connection.start();
        setIsConnected(true);

        // Join groups
        await connection.invoke('JoinUserNotifications', userId);
        if (currentUser?.companyId) {
          await connection.invoke('JoinCompanyNotifications', currentUser.companyId);
        }
        if (currentUser?.locationId) {
          await connection.invoke('JoinLocationNotifications', currentUser.locationId);
        }

        // Fetch initial data
        await fetchData();
      } catch (err) {
        console.error('Failed to connect to NotificationHub:', err.message);
        // Still fetch notifications even if SignalR fails
        await fetchData();
      }
    };

    startConnection();

    // No cleanup - we want the connection to persist across remounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

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
