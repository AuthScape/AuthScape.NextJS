import { useEffect, useState, useCallback, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

/**
 * Hook for real-time page building updates via SignalR.
 * Connects to the PageBuilderHub to receive live component updates from Claude MCP.
 *
 * @param {string} pageId - The GUID of the page being edited
 * @param {object} options - Configuration options
 * @param {function} options.onComponentAdded - Callback when a component is added
 * @param {function} options.onComponentUpdated - Callback when a component is updated
 * @param {function} options.onComponentRemoved - Callback when a component is removed
 * @param {function} options.onContentReplaced - Callback when full content is replaced
 * @param {function} options.onBuildingStarted - Callback when Claude starts building
 * @param {function} options.onBuildingCompleted - Callback when Claude finishes building
 * @param {function} options.onBuildingProgress - Callback for progress updates
 * @param {boolean} options.autoConnect - Whether to connect automatically (default: true)
 * @returns {object} - { isConnected, isBuilding, buildingMessage, connect, disconnect }
 */
export const usePageBuilderSignalR = (pageId, options = {}) => {
  const {
    onComponentAdded,
    onComponentUpdated,
    onComponentRemoved,
    onContentReplaced,
    onBuildingStarted,
    onBuildingCompleted,
    onBuildingProgress,
    autoConnect = true,
  } = options;

  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildingMessage, setBuildingMessage] = useState('');
  const [buildingProgress, setBuildingProgress] = useState({ current: 0, total: null });

  const connectionRef = useRef(null);
  const pageIdRef = useRef(pageId);

  // Update pageId ref when it changes
  useEffect(() => {
    pageIdRef.current = pageId;
  }, [pageId]);

  // Create and manage SignalR connection
  useEffect(() => {
    if (!pageId || !autoConnect) {
      return;
    }

    const hubUrl = `${window.location.origin}/pagebuilder`;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Retry intervals
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Set up event listeners
    newConnection.on('OnComponentAdded', (component, index) => {
      console.log('[PageBuilder] Component added:', component, 'at index:', index);
      if (onComponentAdded) {
        onComponentAdded(component, index);
      }
    });

    newConnection.on('OnComponentUpdated', (index, component) => {
      console.log('[PageBuilder] Component updated at index:', index, component);
      if (onComponentUpdated) {
        onComponentUpdated(index, component);
      }
    });

    newConnection.on('OnComponentRemoved', (index) => {
      console.log('[PageBuilder] Component removed at index:', index);
      if (onComponentRemoved) {
        onComponentRemoved(index);
      }
    });

    newConnection.on('OnContentReplaced', (content) => {
      console.log('[PageBuilder] Content replaced:', content);
      if (onContentReplaced) {
        onContentReplaced(content);
      }
    });

    newConnection.on('OnBuildingStarted', (message) => {
      console.log('[PageBuilder] Building started:', message);
      setIsBuilding(true);
      setBuildingMessage(message || 'Building page...');
      setBuildingProgress({ current: 0, total: null });
      if (onBuildingStarted) {
        onBuildingStarted(message);
      }
    });

    newConnection.on('OnBuildingCompleted', () => {
      console.log('[PageBuilder] Building completed');
      setIsBuilding(false);
      setBuildingMessage('');
      setBuildingProgress({ current: 0, total: null });
      if (onBuildingCompleted) {
        onBuildingCompleted();
      }
    });

    newConnection.on('OnBuildingProgress', (message, currentStep, totalSteps) => {
      console.log('[PageBuilder] Progress:', message, currentStep, '/', totalSteps);
      setBuildingMessage(message);
      setBuildingProgress({ current: currentStep, total: totalSteps });
      if (onBuildingProgress) {
        onBuildingProgress(message, currentStep, totalSteps);
      }
    });

    // Handle connection state changes
    newConnection.onreconnecting((error) => {
      console.log('[PageBuilder] Reconnecting...', error);
      setIsConnected(false);
    });

    newConnection.onreconnected((connectionId) => {
      console.log('[PageBuilder] Reconnected:', connectionId);
      setIsConnected(true);
      // Rejoin the page group after reconnection
      if (pageIdRef.current) {
        newConnection.invoke('JoinPage', pageIdRef.current).catch(console.error);
      }
    });

    newConnection.onclose((error) => {
      console.log('[PageBuilder] Connection closed:', error);
      setIsConnected(false);
    });

    // Start the connection
    newConnection
      .start()
      .then(() => {
        console.log('[PageBuilder] Connected to hub');
        setIsConnected(true);
        // Join the page group
        return newConnection.invoke('JoinPage', pageId);
      })
      .then(() => {
        console.log('[PageBuilder] Joined page:', pageId);
      })
      .catch((error) => {
        console.error('[PageBuilder] Connection error:', error);
        setIsConnected(false);
      });

    connectionRef.current = newConnection;
    setConnection(newConnection);

    // Cleanup on unmount or pageId change
    return () => {
      if (newConnection) {
        // Leave the page group before disconnecting
        if (pageId && newConnection.state === signalR.HubConnectionState.Connected) {
          newConnection.invoke('LeavePage', pageId).catch(() => {});
        }
        newConnection.stop();
      }
    };
  }, [pageId, autoConnect]);

  // Manual connect function
  const connect = useCallback(() => {
    if (connectionRef.current && connectionRef.current.state === signalR.HubConnectionState.Disconnected) {
      connectionRef.current.start()
        .then(() => {
          setIsConnected(true);
          if (pageIdRef.current) {
            return connectionRef.current.invoke('JoinPage', pageIdRef.current);
          }
        })
        .catch(console.error);
    }
  }, []);

  // Manual disconnect function
  const disconnect = useCallback(() => {
    if (connectionRef.current) {
      if (pageIdRef.current && connectionRef.current.state === signalR.HubConnectionState.Connected) {
        connectionRef.current.invoke('LeavePage', pageIdRef.current).catch(() => {});
      }
      connectionRef.current.stop();
      setIsConnected(false);
    }
  }, []);

  return {
    connection,
    isConnected,
    isBuilding,
    buildingMessage,
    buildingProgress,
    connect,
    disconnect,
  };
};

export default usePageBuilderSignalR;
