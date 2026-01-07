import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Wrapper component for Stripe Elements provider
 * Shows loading state while Stripe is initializing
 *
 * @param {Object} props
 * @param {Promise} props.stripePromise - Stripe promise from loadStripe
 * @param {string} props.clientSecret - Client secret from PaymentIntent or SetupIntent
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message if any
 * @param {React.ReactNode} props.children - Child components (PaymentElement, etc.)
 */
export default function StripeElementsWrapper({
  stripePromise,
  clientSecret,
  isLoading = false,
  error = null,
  children,
}) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!stripePromise || !clientSecret) {
    return (
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">Unable to load payment form.</Typography>
      </Box>
    );
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
