import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  CircularProgress,
  Chip,
  Divider,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { apiService } from 'authscape';

/**
 * Subscription Card Component
 */
const SubscriptionCard = ({ subscription, onCancel, onResume, showActions = true }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'canceled':
      case 'cancelled':
        return 'error';
      case 'past_due':
        return 'warning';
      case 'paused':
        return 'info';
      default:
        return 'default';
    }
  };

  const isActive = subscription.status?.toLowerCase() === 'active';
  const isCanceled = subscription.status?.toLowerCase() === 'canceled' || subscription.status?.toLowerCase() === 'cancelled';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{subscription.planName || subscription.productName}</Typography>
          <Chip
            label={subscription.status}
            color={getStatusColor(subscription.status)}
            size="small"
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Current Period</Typography>
            <Typography variant="body1">
              {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Amount</Typography>
            <Typography variant="body1">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: subscription.currency || 'USD',
              }).format((subscription.amount || 0) / 100)}
              /{subscription.interval || 'month'}
            </Typography>
          </Grid>
        </Grid>
        {subscription.cancelAtPeriodEnd && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            This subscription will be cancelled at the end of the current period.
          </Alert>
        )}
      </CardContent>
      {showActions && (
        <CardActions sx={{ p: 2 }}>
          {isActive && !subscription.cancelAtPeriodEnd && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelRoundedIcon />}
              onClick={() => onCancel(subscription)}
            >
              Cancel
            </Button>
          )}
          {(subscription.cancelAtPeriodEnd || isCanceled) && (
            <Button
              variant="contained"
              startIcon={<PlayArrowRoundedIcon />}
              onClick={() => onResume(subscription)}
            >
              Resume
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

/**
 * MySubscriptionsComponent - Display and manage user's subscriptions
 *
 * @param {Object} props
 * @param {Object} props.currentUser - User object (required for this component)
 * @param {function} props.onSubscriptionCancelled - Callback: (subscriptionId) => void
 * @param {function} props.onSubscriptionResumed - Callback: (subscriptionId) => void
 * @param {function} props.onError - Callback: (error) => void
 * @param {string} props.title - Optional title (default: "Your Subscriptions")
 * @param {boolean} props.showActions - Show cancel/resume buttons (default: true)
 * @param {string} props.filter - Filter: "all" | "active" | "canceled" (default: "all")
 * @param {boolean} props.showFilterToggle - Show filter toggle buttons (default: false)
 * @param {function} props.onSubscriptionsLoaded - Callback when subscriptions are loaded: (subscriptions) => void
 */
export default function MySubscriptionsComponent({
  currentUser,
  onSubscriptionCancelled,
  onSubscriptionResumed,
  onError,
  title = "Your Subscriptions",
  showActions = true,
  filter = "all",
  showFilterToggle = false,
  onSubscriptionsLoaded,
}) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelConfirmSub, setCancelConfirmSub] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filter);

  const fetchSubscriptions = useCallback(async () => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService().get('/Subscription/GetMySubscriptions?includeInactive=true');
      if (response != null && response.status === 200 && response.data.success) {
        const subs = response.data.subscriptions || [];
        setSubscriptions(subs);
        if (onSubscriptionsLoaded) {
          onSubscriptionsLoaded(subs);
        }
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, onError, onSubscriptionsLoaded]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleCancel = async () => {
    if (!cancelConfirmSub) return;
    setIsCancelling(true);

    try {
      const response = await apiService().post('/Subscription/CancelSubscription', {
        subscriptionId: cancelConfirmSub.id,
      });
      if (response != null && response.status === 200) {
        setCancelConfirmSub(null);
        await fetchSubscriptions();
        if (onSubscriptionCancelled) {
          onSubscriptionCancelled(cancelConfirmSub.id);
        }
      } else {
        if (onError) onError('Failed to cancel subscription');
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleResume = async (subscription) => {
    setIsResuming(true);
    try {
      const response = await apiService().post('/Subscription/ResumeSubscription', {
        subscriptionId: subscription.id,
      });
      if (response != null && response.status === 200) {
        await fetchSubscriptions();
        if (onSubscriptionResumed) {
          onSubscriptionResumed(subscription.id);
        }
      } else {
        if (onError) onError('Failed to resume subscription');
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsResuming(false);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setActiveFilter(newFilter);
    }
  };

  // Filter subscriptions based on activeFilter
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const status = sub.status?.toLowerCase();
    switch (activeFilter) {
      case 'active':
        return status === 'active';
      case 'canceled':
        return status === 'canceled' || status === 'cancelled';
      default:
        return true;
    }
  });

  // Get counts for filter badges
  const activeCount = subscriptions.filter(s => s.status?.toLowerCase() === 'active').length;
  const canceledCount = subscriptions.filter(s => s.status?.toLowerCase() === 'canceled' || s.status?.toLowerCase() === 'cancelled').length;

  if (!currentUser) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography color="text.secondary">
          Please log in to view your subscriptions.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20 }}>
            {title}
          </Typography>
        )}
        {showFilterToggle && (
          <ToggleButtonGroup
            value={activeFilter}
            exclusive
            onChange={handleFilterChange}
            size="small"
          >
            <ToggleButton value="all">
              All ({subscriptions.length})
            </ToggleButton>
            <ToggleButton value="active">
              Active ({activeCount})
            </ToggleButton>
            <ToggleButton value="canceled">
              Canceled ({canceledCount})
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredSubscriptions.length === 0 ? (
        <Typography color="text.secondary">
          {activeFilter === 'all'
            ? "You don't have any subscriptions."
            : activeFilter === 'active'
            ? "You don't have any active subscriptions."
            : "You don't have any canceled subscriptions."}
        </Typography>
      ) : (
        filteredSubscriptions.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            onCancel={setCancelConfirmSub}
            onResume={handleResume}
            showActions={showActions}
          />
        ))
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelConfirmSub != null}
        fullWidth
        maxWidth="xs"
        onClose={() => setCancelConfirmSub(null)}
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setCancelConfirmSub(null)}
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
            Are you sure you want to cancel your subscription to{' '}
            <strong>{cancelConfirmSub?.planName || cancelConfirmSub?.productName}</strong>?
            <br /><br />
            Your subscription will remain active until the end of your current billing period.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelConfirmSub(null)}>Keep Subscription</Button>
          <Button
            onClick={handleCancel}
            color="error"
            disabled={isCancelling}
            startIcon={isCancelling ? <CircularProgress size={16} /> : null}
          >
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/**
 * Export SubscriptionCard for individual use
 */
export { SubscriptionCard };
