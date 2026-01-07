import React, { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  CircularProgress,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { apiService } from 'authscape';
import useStripeSetup from './shared/useStripeSetup';
import StripeElementsWrapper from './shared/StripeElementsWrapper';
import PaymentMethodCard from './shared/PaymentMethodCard';

/**
 * Internal form component for adding a new payment method
 */
const AddPaymentForm = ({
  clientSecret,
  walletId,
  paymentMethodType,
  onSuccess,
  onError,
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
      const { error } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
        if (onError) onError(error.message);
        return;
      }

      const response = await stripe.retrieveSetupIntent(clientSecret);
      const setupIntent = response.setupIntent;

      if (setupIntent.status === 'succeeded') {
        const addResponse = await apiService().post('/Payment/AddPaymentMethod', {
          walletId: walletId,
          paymentMethodType: paymentMethodType,
          stripePaymentMethod: setupIntent.payment_method,
        });

        if (addResponse != null && addResponse.status === 200) {
          if (onSuccess) onSuccess(addResponse.data);
        } else {
          setErrorMessage('Failed to save payment method.');
          if (onError) onError('Failed to save payment method');
        }
      } else {
        setErrorMessage('Unable to complete setup. Please try again.');
        if (onError) onError(setupIntent.status);
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
        startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <CreditCardRoundedIcon />}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!stripe || isProcessing}
        sx={{ marginTop: 2, padding: 2 }}
      >
        Add Payment Method
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
 * PaymentComponent - Manage saved payment methods (cards, ACH)
 * Allows adding, removing, and setting default payment methods
 *
 * @param {Object} props
 * @param {Object|null} props.currentUser - User object or null for guest mode
 * @param {string} props.logOffUserName - Guest: name for Stripe customer
 * @param {string} props.logOffEmail - Guest: email for Stripe customer
 * @param {string} props.stripeCustomerId - Optional: existing Stripe customer ID
 * @param {number} props.paymentMethodType - 1=ACH, 3=Card (default: 3)
 * @param {function} props.onPaymentMethodAdded - Callback: (paymentMethod) => void
 * @param {function} props.onPaymentMethodRemoved - Callback: (paymentMethodId) => void
 * @param {function} props.onDefaultSet - Callback: (paymentMethodId) => void
 * @param {function} props.onError - Callback: (error) => void
 * @param {boolean} props.allowRemove - Allow removing methods (default: true)
 * @param {boolean} props.allowSetDefault - Allow setting default (default: true)
 * @param {string} props.title - Section title (default: "Payment Methods")
 */
export default function PaymentComponent({
  currentUser = null,
  logOffUserName = null,
  logOffEmail = null,
  stripeCustomerId = null,
  paymentMethodType = 3,
  onPaymentMethodAdded,
  onPaymentMethodRemoved,
  onDefaultSet,
  onError,
  allowRemove = true,
  allowSetDefault = true,
  title = 'Payment Methods',
}) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState(null);
  const [isLoadingMethods, setIsLoadingMethods] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [removeConfirmMethod, setRemoveConfirmMethod] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

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
    amount: null,
  });

  const fetchPaymentMethods = useCallback(async () => {
    setIsLoadingMethods(true);
    try {
      const response = await apiService().get(
        `/Payment/GetPaymentMethods?paymentMethodType=${paymentMethodType}`
      );
      if (response != null && response.status === 200) {
        setPaymentMethods(response.data);
        // Find default payment method
        const defaultMethod = response.data.find(pm => pm.isDefault);
        if (defaultMethod) {
          setDefaultPaymentMethodId(defaultMethod.id);
        }
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsLoadingMethods(false);
    }
  }, [paymentMethodType, onError]);

  useEffect(() => {
    if (currentUser != null) {
      fetchPaymentMethods();
    } else {
      setIsLoadingMethods(false);
    }
  }, [currentUser, fetchPaymentMethods]);

  const handleAddSuccess = async (walletPaymentMethodId) => {
    setShowAddDialog(false);
    await fetchPaymentMethods();
    await refreshStripe();
    if (onPaymentMethodAdded) {
      onPaymentMethodAdded(walletPaymentMethodId);
    }
  };

  const handleRemove = async () => {
    if (!removeConfirmMethod) return;
    setIsRemoving(true);

    try {
      const response = await apiService().delete(
        `/Payment/RemovePaymentMethod?id=${removeConfirmMethod.id}`
      );
      if (response != null && response.status === 200) {
        setRemoveConfirmMethod(null);
        await fetchPaymentMethods();
        if (onPaymentMethodRemoved) {
          onPaymentMethodRemoved(removeConfirmMethod.id);
        }
      } else {
        if (onError) onError('Failed to remove payment method');
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSetDefault = async (paymentMethodId) => {
    try {
      const response = await apiService().post('/Payment/SetDefaultPaymentMethod', {
        paymentMethodId: paymentMethodId,
      });
      if (response != null && response.status === 200) {
        setDefaultPaymentMethodId(paymentMethodId);
        await fetchPaymentMethods();
        if (onDefaultSet) {
          onDefaultSet(paymentMethodId);
        }
      } else {
        if (onError) onError('Failed to set default payment method');
      }
    } catch (err) {
      if (onError) onError(err.message);
    }
  };

  if (currentUser == null) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography color="text.secondary">
          Please sign in to manage your payment methods.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20, pb: 2 }}>
          {title}
        </Typography>
      )}

      {isLoadingMethods ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {paymentMethods.map((pm) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pm.id}>
              <PaymentMethodCard
                paymentMethod={pm}
                isDefault={pm.id === defaultPaymentMethodId || pm.isDefault}
                allowRemove={allowRemove}
                allowSetDefault={allowSetDefault}
                onRemove={() => setRemoveConfirmMethod(pm)}
                onSetDefault={handleSetDefault}
              />
            </Grid>
          ))}

          {/* Add New Card Button */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                height: 160,
                marginTop: 2,
                backgroundColor: '#1E6FB1',
                position: 'relative',
                border: '1px solid #2196F3',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#1565C0',
                },
              }}
              onClick={() => setShowAddDialog(true)}
            >
              <Typography variant="body1" sx={{ fontSize: 18, color: 'white' }}>
                <AddRoundedIcon sx={{ position: 'relative', top: 6 }} /> ADD NEW{' '}
                {paymentMethodType === 1 ? 'BANK ACCOUNT' : 'CARD'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Add Payment Method Dialog */}
      <Dialog
        open={showAddDialog}
        fullWidth
        maxWidth="sm"
        onClose={() => setShowAddDialog(false)}
      >
        <DialogTitle>Add Payment Method</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setShowAddDialog(false)}
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
            Enter your payment details below. Your information is securely processed by Stripe.
          </DialogContentText>
          <StripeElementsWrapper
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            isLoading={isStripeLoading}
            error={stripeError}
          >
            <AddPaymentForm
              clientSecret={clientSecret}
              walletId={walletId}
              paymentMethodType={paymentMethodType}
              onSuccess={handleAddSuccess}
              onError={onError}
            />
          </StripeElementsWrapper>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog
        open={removeConfirmMethod != null}
        fullWidth
        maxWidth="xs"
        onClose={() => setRemoveConfirmMethod(null)}
      >
        <DialogTitle>Remove Payment Method</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setRemoveConfirmMethod(null)}
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
          <DialogContentText>
            <Box sx={{ pb: 2 }}>Are you sure you want to remove this payment method?</Box>
            {removeConfirmMethod && (
              <Box>
                <Box>
                  <strong>Type:</strong> {removeConfirmMethod.brand || removeConfirmMethod.bankName}
                </Box>
                <Box>
                  <strong>Last 4:</strong> {removeConfirmMethod.last4}
                </Box>
                {removeConfirmMethod.expMonth && (
                  <Box>
                    <strong>Expires:</strong> {removeConfirmMethod.expMonth}/{removeConfirmMethod.expYear}
                  </Box>
                )}
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveConfirmMethod(null)}>Cancel</Button>
          <Button
            onClick={handleRemove}
            color="error"
            disabled={isRemoving}
            startIcon={isRemoving ? <CircularProgress size={16} /> : null}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
