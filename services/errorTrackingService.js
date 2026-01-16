import { apiService } from 'authscape';

/**
 * Error Tracking Service
 *
 * Sends errors immediately to the backend error tracking system.
 */

let sessionId = null;
let userId = null;

/**
 * Initialize the error tracking service
 * @param {Object} currentUser - Current user object (optional)
 */
export function initializeErrorTracking(currentUser = null) {
  if (currentUser && currentUser.id) {
    userId = currentUser.id;
  }

  sessionId = getOrCreateSessionId();

  if (process.env.NODE_ENV === 'development') {
    console.log('Error tracking initialized with session:', sessionId, 'userId:', userId);
  }
}

/**
 * Log an error to the tracking system
 * @param {Object} errorData - Error information
 */
export async function logError(errorData) {
  // Ensure sessionId is initialized
  if (!sessionId && typeof window !== 'undefined') {
    sessionId = getOrCreateSessionId();
  }

  const error = {
    message: errorData.message || 'Unknown error',
    errorType: errorData.errorType || 'JavaScriptError',
    stackTrace: errorData.stackTrace || '',
    url: errorData.url || (typeof window !== 'undefined' ? window.location.href : ''),
    componentName: errorData.componentName || null,
    userId: userId || null,
    sessionId: sessionId || null,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    ipAddress: '', // Will be filled in by the backend from HttpContext
    metadata: errorData.metadata || null
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Error tracked:', error, 'userId being sent:', error.userId);
  }

  // Send immediately using apiService to hit the backend
  try {
    const response = await apiService().post('/ErrorTracking/LogError', error);
    if (response) {
      if (response.status === 200) {
        console.log('Error successfully logged to tracking system');
      } else {
        console.error('Error tracking API returned:', response.status, JSON.stringify(response.data, null, 2));
      }
    }
  } catch (err) {
    // Don't log this error to avoid infinite loop
    console.error('Failed to send error to tracking system:', err.message, err.response?.data);
  }
}

/**
 * Get or create a session ID for tracking
 */
function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;

  let storedSessionId = sessionStorage.getItem('errorTrackingSessionId');

  if (!storedSessionId) {
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
 * Update the user ID (call when user logs in/out)
 */
export function setUserId(newUserId) {
  userId = newUserId;
}

export default {
  initializeErrorTracking,
  logError,
  setUserId
};
