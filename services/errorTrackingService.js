import axios from 'axios';

/**
 * Error Tracking Service
 *
 * Sends errors immediately to the IDP (Identity Provider) error tracking system.
 * Error tracking is centralized in IDP so that if the API fails, errors can still be reported.
 */

let sessionId = null;
let userId = null;

// Get IDP URL - error tracking is centralized in IDP
const getIdpUrl = () => {
  return process.env.authorityUri || 'https://localhost:44303';
};

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
    console.log('Error tracking initialized with session:', sessionId, 'userId:', userId, 'IDP URL:', getIdpUrl());
  }
}

/**
 * Log an error to the tracking system (IDP)
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

  // Send to IDP (not API) - error tracking is centralized in IDP
  try {
    const idpUrl = getIdpUrl();
    const response = await axios.post(`${idpUrl}/api/ErrorTracking/LogError`, error, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Include cookies for session tracking
    });
    if (response) {
      if (response.status === 200) {
        console.log('Error successfully logged to tracking system (IDP)');
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
