import axios from 'axios';

/**
 * Error Tracking Service
 *
 * Provides batched error logging to the backend error tracking system.
 * Errors are queued and sent in batches every 30-60 seconds to reduce network overhead.
 */

// Configuration
const BATCH_INTERVAL = 30000; // 30 seconds (configurable from backend settings)
const MAX_QUEUE_SIZE = 50; // Maximum errors to queue before forcing a send

// Error queue
let errorQueue = [];
let batchTimer = null;
let sessionId = null;
let userId = null;

/**
 * Initialize the error tracking service
 * Sets up global error handlers and batch sending timer
 */
export function initializeErrorTracking(currentUser = null) {
  // Set user ID if provided
  if (currentUser && currentUser.id) {
    userId = currentUser.id;
  }

  // Get or create session ID
  sessionId = getOrCreateSessionId();

  // Set up global error handlers
  if (typeof window !== 'undefined') {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Handle global JavaScript errors
    window.addEventListener('error', handleGlobalError);

    // Send any queued errors before page unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Start the batch sending timer
    startBatchTimer();
  }

  console.log('Error tracking initialized with session:', sessionId);
}

/**
 * Log an error to the tracking system
 * @param {Object} errorData - Error information
 */
export function logError(errorData) {
  const enrichedError = {
    message: errorData.message || 'Unknown error',
    errorType: errorData.errorType || 'JavaScriptError',
    stackTrace: errorData.stackTrace || '',
    url: errorData.url || (typeof window !== 'undefined' ? window.location.href : ''),
    componentName: errorData.componentName || null,
    userId: userId,
    sessionId: sessionId,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    metadata: errorData.metadata || null,
    timestamp: new Date().toISOString()
  };

  // Add to queue
  errorQueue.push(enrichedError);

  // If queue is getting large, send immediately
  if (errorQueue.length >= MAX_QUEUE_SIZE) {
    sendBatch();
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Error tracked:', enrichedError);
  }
}

/**
 * Handle unhandled promise rejections
 */
function handleUnhandledRejection(event) {
  logError({
    message: event.reason?.message || 'Unhandled Promise Rejection',
    errorType: 'UnhandledPromiseRejection',
    stackTrace: event.reason?.stack || '',
    metadata: JSON.stringify({
      reason: event.reason?.toString(),
      promise: event.promise?.toString()
    })
  });
}

/**
 * Handle global JavaScript errors
 */
function handleGlobalError(event) {
  logError({
    message: event.message || 'Global Error',
    errorType: event.error?.name || 'Error',
    stackTrace: event.error?.stack || '',
    url: event.filename || window.location.href,
    metadata: JSON.stringify({
      lineno: event.lineno,
      colno: event.colno
    })
  });
}

/**
 * Send errors before page unload using sendBeacon for reliability
 */
function handleBeforeUnload() {
  if (errorQueue.length > 0) {
    sendBatch(true); // Use sendBeacon
  }
}

/**
 * Start the batch sending timer
 */
function startBatchTimer() {
  if (batchTimer) {
    clearInterval(batchTimer);
  }

  batchTimer = setInterval(() => {
    if (errorQueue.length > 0) {
      sendBatch();
    }
  }, BATCH_INTERVAL);
}

/**
 * Send the current batch of errors to the server
 * @param {boolean} useBeacon - Use navigator.sendBeacon for reliability during page unload
 */
async function sendBatch(useBeacon = false) {
  if (errorQueue.length === 0) return;

  const batch = [...errorQueue];
  errorQueue = []; // Clear queue immediately to prevent duplicates

  try {
    if (useBeacon && navigator.sendBeacon) {
      // Use sendBeacon for page unload (more reliable)
      const url = `${getApiBaseUrl()}/api/ErrorTracking/LogBatch`;
      const blob = new Blob([JSON.stringify(batch)], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    } else {
      // Use axios for normal batch sending
      await axios.post('/api/ErrorTracking/LogBatch', batch, {
        timeout: 5000 // 5 second timeout
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`Sent batch of ${batch.length} errors to tracking system`);
      }
    }
  } catch (error) {
    // If sending fails, add errors back to queue (but don't log this error to avoid infinite loop)
    console.error('Failed to send error batch:', error);
    errorQueue.unshift(...batch);

    // Limit queue size to prevent memory issues
    if (errorQueue.length > MAX_QUEUE_SIZE * 2) {
      errorQueue = errorQueue.slice(0, MAX_QUEUE_SIZE);
    }
  }
}

/**
 * Get or create a session ID for tracking
 */
function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;

  let storedSessionId = sessionStorage.getItem('errorTrackingSessionId');

  if (!storedSessionId) {
    // Try to get from analytics session if available
    storedSessionId = sessionStorage.getItem('analyticsSessionId') || generateGuid();
    sessionStorage.setItem('errorTrackingSessionId', storedSessionId);
  }

  return storedSessionId;
}

/**
 * Generate a GUID for session tracking
 */
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get the API base URL
 */
function getApiBaseUrl() {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
}

/**
 * Manually flush the error queue (useful for testing)
 */
export function flushErrors() {
  if (errorQueue.length > 0) {
    sendBatch();
  }
}

/**
 * Clean up error tracking (call when unmounting app)
 */
export function cleanupErrorTracking() {
  if (typeof window !== 'undefined') {
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    window.removeEventListener('error', handleGlobalError);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }

  if (batchTimer) {
    clearInterval(batchTimer);
    batchTimer = null;
  }

  // Send any remaining errors
  if (errorQueue.length > 0) {
    sendBatch(true);
  }
}

/**
 * Update the user ID (call when user logs in/out)
 */
export function setUserId(newUserId) {
  userId = newUserId;
}

// Export default object with all functions
export default {
  initializeErrorTracking,
  logError,
  flushErrors,
  cleanupErrorTracking,
  setUserId
};
