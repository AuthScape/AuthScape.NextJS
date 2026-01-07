import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { apiService } from 'authscape';
import useStripeSetup from './shared/useStripeSetup';
import StripeElementsWrapper from './shared/StripeElementsWrapper';
import PaymentMethodSelector, { useHasPaymentMethods } from './shared/PaymentMethodSelector';

/**
 * Internal form component for paying with a new payment method
 */
const PayForm = ({
  clientSecret,
  walletId,
  paymentMethodType,
  amountCents,
  description,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const formatAmount = () => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amountCents / 100);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
        if (onError) onError(error.message);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        if (onSuccess) onSuccess(paymentIntent);
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // Handle 3D Secure or other actions
        setErrorMessage('Additional authentication required. Please complete the verification.');
        if (onError) onError('requires_action');
      } else {
        setErrorMessage('Payment was not completed. Please try again.');
        if (onError) onError(paymentIntent?.status || 'unknown');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred');
      if (onError) onError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentRoundedIcon />}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!stripe || isProcessing}
        sx={{ marginTop: 2, padding: 2 }}
      >
        Pay {formatAmount()}
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
 * PayComponent - One-time payment component with wallet payment method selection
 *
 * @param {Object} props
 * @param {Object|null} props.currentUser - User object or null for guest mode
 * @param {string} props.logOffUserName - Guest: name for Stripe customer
 * @param {string} props.logOffEmail - Guest: email for Stripe customer
 * @param {string} props.stripeCustomerId - Optional: existing Stripe customer ID
 * @param {number} props.amountCents - Amount to charge in cents (e.g., 2500 = $25.00)
 * @param {string} props.description - Optional: description for the payment
 * @param {function} props.onPaymentSuccess - Callback: (paymentIntent) => void
 * @param {function} props.onError - Callback: (error) => void
 * @param {string} props.buttonLabel - Optional: custom button label
 * @param {boolean} props.allowSavedPaymentMethods - Allow using saved payment methods (default: true)
 * @param {number} props.paymentMethodType - 1=ACH, 3=Card (default: 3)
 * @param {boolean} props.showDialog - Show payment form in dialog (default: true)
 * @param {boolean} props.open - Control dialog open state externally (only when showDialog=true)
 * @param {function} props.onClose - Callback when dialog is closed
 */
export default function PayComponent({
  currentUser = null,
  logOffUserName = null,
  logOffEmail = null,
  stripeCustomerId = null,
  amountCents,
  description = '',
  onPaymentSuccess,
  onError,
  buttonLabel,
  allowSavedPaymentMethods = true,
  paymentMethodType = 3,
  showDialog = true,
  open: externalOpen,
  onClose,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [paymentTab, setPaymentTab] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

  const { hasPaymentMethods, isLoading: isLoadingPaymentMethods } = useHasPaymentMethods(
    allowSavedPaymentMethods ? currentUser : null,
    paymentMethodType
  );

  const {
    stripePromise,
    clientSecret,
    walletId,
    isLoading: isStripeLoading,
    error: stripeError,
    refresh: refreshStripe,
  } = useStripeSetup({
    currentUser,
    logOffUserName,
    logOffEmail,
    stripeCustomerId,
    paymentMethodType,
    amount: amountCents,
  });

  const formatAmount = () => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amountCents / 100);
  };

  const handleOpen = () => {
    setPaymentTab(hasPaymentMethods ? 0 : 1);
    setSelectedPaymentMethod(null);
    setErrorMessage(null);
    if (externalOpen === undefined) {
      setInternalOpen(true);
    }
  };

  const handleClose = () => {
    if (externalOpen === undefined) {
      setInternalOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };

  const handlePayWithSavedMethod = async () => {
    if (!selectedPaymentMethod) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await apiService().post('/Payment/QuickCharge', {
        amountCents,
        paymentMethodId: selectedPaymentMethod.id, // This is the wallet payment method GUID
        description,
      });

      if (response != null && response.status === 200) {
        handleClose();
        await refreshStripe();
        if (onPaymentSuccess) onPaymentSuccess(response.data);
      } else {
        const msg = 'Failed to process payment';
        setErrorMessage(msg);
        if (onError) onError(msg);
      }
    } catch (err) {
      const msg = err.message || 'An error occurred';
      setErrorMessage(msg);
      if (onError) onError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    handleClose();
    await refreshStripe();
    if (onPaymentSuccess) onPaymentSuccess(paymentIntent);
  };

  const defaultButtonLabel = buttonLabel || `Pay ${formatAmount()}`;

  // Render just the form without dialog
  if (!showDialog) {
    return (
      <Box sx={{ width: '100%' }}>
        {/* Payment method tabs - only show if user has saved methods */}
        {allowSavedPaymentMethods && currentUser && hasPaymentMethods && (
          <Tabs
            value={paymentTab}
            onChange={(e, newValue) => setPaymentTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Use Saved Card" />
            <Tab label="Add New Card" />
          </Tabs>
        )}

        {/* Tab 0: Saved Payment Methods */}
        {paymentTab === 0 && hasPaymentMethods && (
          <Box>
            <PaymentMethodSelector
              currentUser={currentUser}
              paymentMethodType={paymentMethodType}
              onSelect={setSelectedPaymentMethod}
              onAddNew={() => setPaymentTab(1)}
              showAddNewOption={false}
              onError={onError}
              title={null}
            />
            <Button
              startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentRoundedIcon />}
              fullWidth
              variant="contained"
              disabled={!selectedPaymentMethod || isProcessing}
              onClick={handlePayWithSavedMethod}
              sx={{ marginTop: 2, padding: 2 }}
            >
              Pay {formatAmount()}
            </Button>
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}
          </Box>
        )}

        {/* Tab 1: New Payment Method */}
        {(paymentTab === 1 || !hasPaymentMethods) && (
          <StripeElementsWrapper
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            isLoading={isStripeLoading}
            error={stripeError}
          >
            <PayForm
              clientSecret={clientSecret}
              walletId={walletId}
              paymentMethodType={paymentMethodType}
              amountCents={amountCents}
              description={description}
              onSuccess={handlePaymentSuccess}
              onError={onError}
            />
          </StripeElementsWrapper>
        )}
      </Box>
    );
  }

  // Render with dialog
  return (
    <>
      <Button
        variant="contained"
        startIcon={<PaymentRoundedIcon />}
        onClick={handleOpen}
        disabled={!amountCents || amountCents <= 0}
      >
        {defaultButtonLabel}
      </Button>

      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
      >
        <DialogTitle>Complete Payment</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText sx={{ pb: 2 }}>
            {paymentTab === 0 && hasPaymentMethods
              ? 'Select a payment method from your wallet or add a new one.'
              : 'Enter your payment details to complete the payment.'}{' '}
            Amount: <strong>{formatAmount()}</strong>
            {description && (
              <>
                <br />
                {description}
              </>
            )}
          </DialogContentText>

          {/* Payment method tabs - only show if user has saved methods */}
          {allowSavedPaymentMethods && currentUser && hasPaymentMethods && (
            <Tabs
              value={paymentTab}
              onChange={(e, newValue) => setPaymentTab(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Use Saved Card" />
              <Tab label="Add New Card" />
            </Tabs>
          )}

          {/* Tab 0: Saved Payment Methods */}
          {paymentTab === 0 && hasPaymentMethods && (
            <Box>
              <PaymentMethodSelector
                currentUser={currentUser}
                paymentMethodType={paymentMethodType}
                onSelect={setSelectedPaymentMethod}
                onAddNew={() => setPaymentTab(1)}
                showAddNewOption={false}
                onError={onError}
                title={null}
              />
              <Button
                startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentRoundedIcon />}
                fullWidth
                variant="contained"
                disabled={!selectedPaymentMethod || isProcessing}
                onClick={handlePayWithSavedMethod}
                sx={{ marginTop: 2, padding: 2 }}
              >
                Pay {formatAmount()}
              </Button>
              {errorMessage && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {errorMessage}
                </Typography>
              )}
            </Box>
          )}

          {/* Tab 1: New Payment Method */}
          {(paymentTab === 1 || !hasPaymentMethods) && (
            <StripeElementsWrapper
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              isLoading={isStripeLoading}
              error={stripeError}
            >
              <PayForm
                clientSecret={clientSecret}
                walletId={walletId}
                paymentMethodType={paymentMethodType}
                amountCents={amountCents}
                description={description}
                onSuccess={handlePaymentSuccess}
                onError={onError}
              />
            </StripeElementsWrapper>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
