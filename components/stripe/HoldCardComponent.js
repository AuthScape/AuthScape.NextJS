import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { apiService } from 'authscape';
import useStripeSetup from './shared/useStripeSetup';
import StripeElementsWrapper from './shared/StripeElementsWrapper';

/**
 * Internal form component that handles Stripe SetupIntent confirmation
 */
const HoldCardForm = ({
  clientSecret,
  walletId,
  paymentMethodType,
  onCardSaved,
  onError,
  buttonText,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, setupIntent: confirmedSetupIntent } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
      });

      // For ACH bank accounts, Stripe returns an "error" with type requires_action
      // This is expected behavior for micro-deposit verification flow
      if (error) {
        // Check if this is the expected ACH micro-deposit verification flow
        if (error.type === 'validation_error' && error.message?.includes('requires_action')) {
          // This is expected for ACH - continue to retrieve the SetupIntent
        } else if (error.setup_intent?.status === 'requires_action') {
          // SetupIntent requires action (ACH verification) - this is not a real error
        } else {
          // This is a real error
          setErrorMessage(error.message);
          setIsProcessing(false);
          if (onError) {
            onError(error.message);
          }
          return;
        }
      }

      // Retrieve the SetupIntent to get the payment method and current status
      const response = await stripe.retrieveSetupIntent(clientSecret);
      const setupIntent = response.setupIntent;

      switch (setupIntent.status) {
        case 'succeeded':
        case 'requires_action':
          // For ACH/bank accounts, 'requires_action' means micro-deposit verification is needed
          // We still save the payment method - it will be verified later via micro-deposits
          const addResponse = await apiService().post('/Payment/AddPaymentMethod', {
            walletId: walletId,
            paymentMethodType: paymentMethodType,
            stripePaymentMethod: setupIntent.payment_method,
          });

          if (addResponse != null && addResponse.status === 200) {
            const responseData = addResponse.data;

            // Check if this requires verification (ACH micro-deposits)
            if (responseData.requiresVerification) {
              // Payment method saved but needs verification
              if (onCardSaved) {
                onCardSaved(setupIntent.id, setupIntent.payment_method, {
                  ...responseData,
                  requiresVerification: true,
                  message: 'Bank account saved. Please check your email for micro-deposit verification instructions.',
                });
              }
            } else {
              if (onCardSaved) {
                onCardSaved(setupIntent.id, setupIntent.payment_method, responseData);
              }
            }
          } else {
            setErrorMessage('Failed to save payment method. Please try again.');
            if (onError) {
              onError('Failed to save payment method');
            }
          }
          setIsProcessing(false);
          break;

        case 'processing':
          setErrorMessage('Your payment method is being processed. Please wait...');
          setIsProcessing(false);
          break;

        case 'requires_payment_method':
          setErrorMessage('Please provide a valid payment method.');
          setIsProcessing(false);
          if (onError) {
            onError('requires_payment_method');
          }
          break;

        default:
          setErrorMessage('Something went wrong. Please try again.');
          setIsProcessing(false);
          if (onError) {
            onError('failed');
          }
          break;
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred');
      setIsProcessing(false);
      if (onError) {
        onError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <CreditCardRoundedIcon />}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!stripe || isProcessing}
        sx={{ marginTop: 2, padding: 2 }}
      >
        {buttonText || 'Save Card'}
      </Button>
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {errorMessage}
        </Typography>
      )}
    </form>
  );
};

/**
 * HoldCardComponent - Save a card for future use without charging
 * Uses Stripe SetupIntent to securely save payment method details
 *
 * @param {Object} props
 * @param {Object|null} props.currentUser - User object or null for guest mode
 * @param {string} props.logOffUserName - Guest: name for Stripe customer
 * @param {string} props.logOffEmail - Guest: email for Stripe customer
 * @param {string} props.stripeCustomerId - Optional: existing Stripe customer ID
 * @param {number} props.paymentMethodType - 1=ACH, 3=Card (default: 3)
 * @param {function} props.onCardSaved - Callback: (setupIntentId, paymentMethodId, walletPaymentMethodId) => void
 * @param {function} props.onError - Callback: (error) => void
 * @param {string} props.buttonText - Custom button text (default: "Save Card")
 * @param {string} props.description - Custom description text
 */
export default function HoldCardComponent({
  currentUser = null,
  logOffUserName = null,
  logOffEmail = null,
  stripeCustomerId = null,
  paymentMethodType = 3,
  onCardSaved,
  onError,
  buttonText = 'Save Card',
  description = 'Enter your payment details below. Your card will be saved for future use.',
}) {
  const {
    stripePromise,
    clientSecret,
    walletId,
    isLoading,
    error,
  } = useStripeSetup({
    currentUser,
    logOffUserName,
    logOffEmail,
    stripeCustomerId,
    paymentMethodType,
    amount: null, // null = SetupIntent (no charge)
  });

  return (
    <Box sx={{ width: '100%' }}>
      {description && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}

      <StripeElementsWrapper
        stripePromise={stripePromise}
        clientSecret={clientSecret}
        isLoading={isLoading}
        error={error}
      >
        <HoldCardForm
          clientSecret={clientSecret}
          walletId={walletId}
          paymentMethodType={paymentMethodType}
          onCardSaved={onCardSaved}
          onError={onError}
          buttonText={buttonText}
        />
      </StripeElementsWrapper>
    </Box>
  );
}
