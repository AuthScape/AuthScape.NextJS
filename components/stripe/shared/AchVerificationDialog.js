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
  // Determine which verification method based on microdepositType
  // 'descriptor_code' means only descriptor code works, 'amounts' means only amounts work
  const microdepositType = paymentMethod?.microdepositType;
  const isDescriptorCodeOnly = microdepositType === 'descriptor_code';
  const isAmountsOnly = microdepositType === 'amounts';

  // Default tab based on microdeposit type
  const getDefaultTab = () => {
    if (isDescriptorCodeOnly) return 1; // Descriptor code tab
    if (isAmountsOnly) return 0; // Amounts tab
    return 0; // Default to amounts
  };

  const [tabValue, setTabValue] = useState(getDefaultTab());
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [descriptorCode, setDescriptorCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update tab when paymentMethod changes
  React.useEffect(() => {
    setTabValue(getDefaultTab());
  }, [paymentMethod?.microdepositType]);

  const handleTabChange = (event, newValue) => {
    // Only allow tab change if not locked to a specific type
    if (isDescriptorCodeOnly || isAmountsOnly) {
      return; // Don't allow switching if locked to a specific method
    }
    setTabValue(newValue);
    setError(null);
  };

  const handleVerify = async () => {
    console.log('=== ACH VERIFICATION DEBUG ===');
    console.log('clientSecret:', clientSecret);
    console.log('paymentMethod object:', JSON.stringify(paymentMethod, null, 2));
    console.log('microdepositType:', microdepositType);
    console.log('isDescriptorCodeOnly:', isDescriptorCodeOnly);
    console.log('isAmountsOnly:', isAmountsOnly);
    console.log('tabValue:', tabValue);

    if (!clientSecret) {
      setError('Missing verification token. Please try adding the bank account again.');
      return;
    }

    if (!stripePromise) {
      setError('Stripe not initialized. Please refresh the page.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        setError('Failed to load Stripe. Please refresh the page.');
        setIsVerifying(false);
        return;
      }

      let result;

      // Determine which method to use based on microdepositType
      // Stripe test mode: descriptor_code uses SM1111, amounts uses 32 and 45
      const useDescriptorCode = tabValue === 1;

      if (!useDescriptorCode) {
        // Verify with amounts
        if (!amount1 || !amount2) {
          setError('Please enter both deposit amounts.');
          setIsVerifying(false);
          return;
        }
        const amounts = [parseInt(amount1), parseInt(amount2)];
        console.log('Calling stripe.verifyMicrodepositsForSetup with amounts:', amounts);
        result = await stripe.verifyMicrodepositsForSetup(clientSecret, {
          amounts: amounts,
        });
      } else {
        // Verify with descriptor code
        if (!descriptorCode) {
          setError('Please enter the descriptor code.');
          setIsVerifying(false);
          return;
        }
        const code = descriptorCode.toUpperCase().trim();
        console.log('Calling stripe.verifyMicrodepositsForSetup with descriptor_code:', code);
        result = await stripe.verifyMicrodepositsForSetup(clientSecret, {
          descriptor_code: code,
        });
      }

      console.log('Verification result:', JSON.stringify(result, null, 2));

      if (result.error) {
        console.error('Verification error:', result.error);

        // If verification failed with "does not match" error, show helpful message
        const errorMsg = result.error.message;
        if (errorMsg?.includes('does not match')) {
          if (useDescriptorCode) {
            setError(`${errorMsg} - Try using the "Deposit Amounts" tab with amounts 32 and 45 instead.`);
          } else {
            setError(`${errorMsg} - Try using the "Descriptor Code" tab with code SM1111 instead.`);
          }
        } else {
          setError(errorMsg);
        }
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
      console.error('Verification exception:', err);
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

            {/* Always show both tabs - let user try either method */}
            <Tabs value={tabValue} onChange={(e, v) => { setTabValue(v); setError(null); }} sx={{ mb: 2 }}>
              <Tab label="Deposit Amounts" />
              <Tab label="Descriptor Code" />
            </Tabs>
            {microdepositType && (
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Stripe recommends: {microdepositType === 'descriptor_code' ? 'Descriptor Code' : 'Deposit Amounts'}
              </Typography>
            )}

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
                <strong>Test Mode:</strong>{' '}
                {tabValue === 0 ? (
                  <>Enter amounts <strong>32</strong> and <strong>45</strong> (in cents) to simulate successful verification.</>
                ) : (
                  <>Enter descriptor code <strong>SM11AA</strong> to simulate successful verification.</>
                )}
              </Typography>
              {microdepositType && (
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                  Stripe requires: {microdepositType === 'descriptor_code' ? 'Descriptor Code' : 'Deposit Amounts'}
                </Typography>
              )}
            </Alert>

            {/* Hosted verification fallback */}
            {paymentMethod?.hostedVerificationUrl && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Having trouble? You can also{' '}
                  <a
                    href={paymentMethod.hostedVerificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold' }}
                  >
                    verify on Stripe's hosted page
                  </a>
                  {' '}instead.
                </Typography>
              </Alert>
            )}
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
