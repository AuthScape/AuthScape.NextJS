import React from 'react';
import { logError } from '../services/errorTrackingService';

/**
 * React Error Boundary component that catches JavaScript errors anywhere in the component tree,
 * logs them to the error tracking system, and displays a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to our error tracking service
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Extract component stack from errorInfo
    const componentStack = errorInfo?.componentStack || '';

    // Get the component name from the stack
    const componentNameMatch = componentStack.match(/at (\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Unknown';

    // Log to error tracking service
    logError({
      message: error.message || 'Component Error',
      errorType: error.name || 'ComponentError',
      stackTrace: error.stack || '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      componentName: componentName,
      metadata: JSON.stringify({
        componentStack: componentStack,
        props: this.props,
        errorBoundary: true
      })
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            padding: '2rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              color: '#dc3545'
            }}>
              ⚠️
            </div>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>
              Something went wrong
            </h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
              We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginBottom: '1.5rem',
                textAlign: 'left',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                maxHeight: '300px',
                overflow: 'auto'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  fontSize: '0.875rem',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  <strong>Error:</strong> {this.state.error.toString()}
                  {'\n\n'}
                  <strong>Stack Trace:</strong>
                  {'\n'}
                  {this.state.error.stack}
                  {this.state.errorInfo?.componentStack && (
                    <>
                      {'\n\n'}
                      <strong>Component Stack:</strong>
                      {'\n'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
