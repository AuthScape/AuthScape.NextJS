import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { loadStripe } from '@stripe/stripe-js';

/**
 * AchVerificationDialog - Dialog for verifying ACH bank accounts via micro-deposits
 *
 * @param {Object} props
 * @param {boolean} props.open - Whether dialog is open
 * @param {function} props.onClose - Called when dialog closes
 * @param {function} props.onVerified - Called when verification succeeds
 * @param {function} props.onError - Called when verification fails
 * @param {string} props.clientSecret - SetupIntent client secret for verification
 * @param {Object} props.stripePromise - Stripe promise instance
 * @param {Object} props.paymentMethod - Payment method object with bank info
 */
export default function AchVerificationDialog({
  open,
  onClose,
  onVerified,
  onError,
  clientSecret,
  stripePromise,
  paymentMethod,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [descriptorCode, setDescriptorCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError(null);
  };

  const handleVerify = async () => {
    if (!clientSecret) {
      setError('Missing verification token. Please try adding the bank account again.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      let result;

      if (tabValue === 0) {
        // Verify with amounts
        if (!amount1 || !amount2) {
          setError('Please enter both deposit amounts.');
          setIsVerifying(false);
          return;
        }
        result = await stripe.verifyMicrodepositsForSetup(clientSecret, {
          amounts: [parseInt(amount1), parseInt(amount2)],
        });
      } else {
        // Verify with descriptor code
        if (!descriptorCode) {
          setError('Please enter the descriptor code.');
          setIsVerifying(false);
          return;
        }
        result = await stripe.verifyMicrodepositsForSetup(clientSecret, {
          descriptor_code: descriptorCode.toUpperCase(),
        });
      }

      if (result.error) {
        setError(result.error.message);
        if (onError) onError(result.error.message);
      } else if (result.setupIntent?.status === 'succeeded') {
        setSuccess(true);
        if (onVerified) onVerified(result.setupIntent);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Verification incomplete. Status: ' + result.setupIntent?.status);
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
      if (onError) onError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    if (!isVerifying) {
      setAmount1('');
      setAmount2('');
      setDescriptorCode('');
      setError(null);
      setSuccess(false);
      setTabValue(0);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccountBalanceIcon color="primary" />
        Verify Bank Account
        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={isVerifying}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Bank account verified successfully!
          </Alert>
        ) : (
          <>
            <DialogContentText sx={{ mb: 2 }}>
              To verify your bank account, enter the two small deposits that were sent to your account,
              or the descriptor code that appears on your bank statement.
            </DialogContentText>

            {paymentMethod && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Verifying: <strong>{paymentMethod.bankName || 'Bank Account'}</strong> ending in{' '}
                  <strong>{paymentMethod.last4}</strong>
                </Typography>
              </Box>
            )}

            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Deposit Amounts" />
              <Tab label="Descriptor Code" />
            </Tabs>

            {tabValue === 0 ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="First Deposit (cents)"
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  placeholder="e.g., 32"
                  fullWidth
                  disabled={isVerifying}
                  helperText="Enter amount in cents"
                  inputProps={{ min: 1, max: 99 }}
                />
                <TextField
                  label="Second Deposit (cents)"
                  type="number"
                  value={amount2}
                  onChange={(e) => setAmount2(e.target.value)}
                  placeholder="e.g., 45"
                  fullWidth
                  disabled={isVerifying}
                  helperText="Enter amount in cents"
                  inputProps={{ min: 1, max: 99 }}
                />
              </Box>
            ) : (
              <TextField
                label="Descriptor Code"
                value={descriptorCode}
                onChange={(e) => setDescriptorCode(e.target.value)}
                placeholder="e.g., SM1234"
                fullWidth
                disabled={isVerifying}
                helperText="6-character code from your bank statement (e.g., SM1234)"
                inputProps={{ maxLength: 6 }}
              />
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Test Mode:</strong> Use amounts <strong>32</strong> and <strong>45</strong>, or
                descriptor code <strong>SM1111</strong> to simulate successful verification.
              </Typography>
            </Alert>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isVerifying}>
          {success ? 'Close' : 'Cancel'}
        </Button>
        {!success && (
          <Button
            onClick={handleVerify}
            variant="contained"
            disabled={isVerifying}
            startIcon={isVerifying ? <CircularProgress size={16} /> : null}
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
