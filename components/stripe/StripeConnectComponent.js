import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { apiService } from 'authscape';

/**
 * StripeConnectComponent - Stripe Connect onboarding for vendors/marketplaces
 * Allows users to connect their Stripe account to receive payments
 *
 * @param {Object} props
 * @param {Object} props.currentUser - Required: authenticated user
 * @param {function} props.onOnboardingComplete - Callback: (accountId) => void
 * @param {function} props.onOnboardingError - Callback: (error) => void
 * @param {boolean} props.showAccountStatus - Show current status (default: true)
 * @param {string} props.returnBaseUrl - Base URL for return/refresh URLs (defaults to window.location.origin)
 */
export default function StripeConnectComponent({
  currentUser,
  onOnboardingComplete,
  onOnboardingError,
  showAccountStatus = true,
  returnBaseUrl,
}) {
  const [accountStatus, setAccountStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingOnboarding, setIsStartingOnboarding] = useState(false);
  const [error, setError] = useState(null);

  const getReturnUrl = () => {
    if (returnBaseUrl) return returnBaseUrl;
    if (typeof window !== 'undefined') return window.location.origin;
    return '';
  };

  const fetchAccountStatus = useCallback(async () => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try to get account status - this endpoint may need to be added to the API
      const response = await apiService().get('/Payment/GetStripeConnectStatus');
      if (response != null && response.status === 200) {
        setAccountStatus(response.data);

        // Check if onboarding is complete
        if (response.data?.isComplete && onOnboardingComplete) {
          onOnboardingComplete(response.data.accountId);
        }
      } else {
        // No account exists yet
        setAccountStatus(null);
      }
    } catch (err) {
      // 404 means no account exists, which is fine
      if (err?.response?.status !== 404) {
        setError(err.message || 'Failed to fetch account status');
        if (onOnboardingError) onOnboardingError(err.message);
      }
      setAccountStatus(null);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, onOnboardingComplete, onOnboardingError]);

  useEffect(() => {
    fetchAccountStatus();
  }, [fetchAccountStatus]);

  const startOnboarding = async () => {
    setIsStartingOnboarding(true);
    setError(null);

    try {
      const response = await apiService().get(
        `/Payment/SetupStripeConnect?returnBaseUrl=${encodeURIComponent(getReturnUrl())}`
      );

      if (response != null && response.status === 200) {
        // Response is the onboarding URL
        const onboardingUrl = response.data;
        if (onboardingUrl) {
          // Redirect to Stripe Connect onboarding
          window.location.href = onboardingUrl;
        } else {
          setError('Failed to get onboarding URL');
          if (onOnboardingError) onOnboardingError('Failed to get onboarding URL');
        }
      } else {
        setError('Failed to start onboarding');
        if (onOnboardingError) onOnboardingError('Failed to start onboarding');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to start Stripe Connect onboarding';
      setError(errorMessage);
      if (onOnboardingError) onOnboardingError(errorMessage);
    } finally {
      setIsStartingOnboarding(false);
    }
  };

  if (!currentUser) {
    return (
      <Box sx={{ py: 2 }}>
        <Alert severity="warning">
          Please sign in to connect your Stripe account.
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const isConnected = accountStatus?.isComplete || accountStatus?.validationCompleted;
  const hasStartedOnboarding = accountStatus?.accountId || accountStatus?.stripeConnectAccountId;

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Account Status Card */}
      {showAccountStatus && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceRoundedIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Stripe Connect</Typography>
                <Typography variant="body2" color="text.secondary">
                  Connect your Stripe account to receive payments
                </Typography>
              </Box>
              <Chip
                icon={isConnected ? <CheckCircleRoundedIcon /> : <WarningRoundedIcon />}
                label={isConnected ? 'Connected' : (hasStartedOnboarding ? 'Pending' : 'Not Connected')}
                color={isConnected ? 'success' : (hasStartedOnboarding ? 'warning' : 'default')}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {isConnected && accountStatus && (
              <Grid container spacing={2}>
                {accountStatus.businessName && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Business Name</Typography>
                    <Typography variant="body1">{accountStatus.businessName}</Typography>
                  </Grid>
                )}
                {accountStatus.supportEmail && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Support Email</Typography>
                    <Typography variant="body1">{accountStatus.supportEmail}</Typography>
                  </Grid>
                )}
                {accountStatus.supportPhone && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Support Phone</Typography>
                    <Typography variant="body1">{accountStatus.supportPhone}</Typography>
                  </Grid>
                )}
                {accountStatus.url && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Website</Typography>
                    <Typography variant="body1">{accountStatus.url}</Typography>
                  </Grid>
                )}
                {(accountStatus.supportAddress || accountStatus.supportCity) && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Support Address</Typography>
                    <Typography variant="body1">
                      {[
                        accountStatus.supportAddress,
                        accountStatus.supportCity,
                        accountStatus.supportState,
                        accountStatus.supportZipCode,
                      ].filter(Boolean).join(', ')}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    {accountStatus.card_payments && (
                      <Chip label="Card Payments" size="small" color="primary" variant="outlined" />
                    )}
                    {accountStatus.transfers && (
                      <Chip label="Transfers" size="small" color="primary" variant="outlined" />
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}

            {!isConnected && hasStartedOnboarding && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Your Stripe Connect account setup is incomplete. Please complete the onboarding process to start receiving payments.
              </Alert>
            )}

            {!isConnected && !hasStartedOnboarding && (
              <Typography color="text.secondary">
                Connect your Stripe account to start receiving payments from customers. The setup process takes just a few minutes.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {!isConnected && (
          <Button
            variant="contained"
            startIcon={isStartingOnboarding ? <CircularProgress size={20} color="inherit" /> : <LaunchRoundedIcon />}
            onClick={startOnboarding}
            disabled={isStartingOnboarding}
          >
            {hasStartedOnboarding ? 'Continue Setup' : 'Connect with Stripe'}
          </Button>
        )}

        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          onClick={fetchAccountStatus}
          disabled={isLoading}
        >
          Refresh Status
        </Button>

        {isConnected && (
          <Button
            variant="outlined"
            startIcon={<LaunchRoundedIcon />}
            onClick={() => window.open('https://dashboard.stripe.com/', '_blank')}
          >
            Open Stripe Dashboard
          </Button>
        )}
      </Box>
    </Box>
  );
}
