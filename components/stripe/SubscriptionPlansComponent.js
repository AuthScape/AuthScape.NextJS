import React, { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
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
  IconButton,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { apiService } from 'authscape';
import useStripeSetup from './shared/useStripeSetup';
import StripeElementsWrapper from './shared/StripeElementsWrapper';
import PaymentMethodSelector, { useHasPaymentMethods } from './shared/PaymentMethodSelector';

/**
 * Internal form component for subscribing with a new payment method
 */
const SubscribeForm = ({
  clientSecret,
  walletId,
  paymentMethodType,
  selectedPlan,
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
        // First save the payment method
        const addResponse = await apiService().post('/Payment/AddPaymentMethod', {
          walletId: walletId,
          paymentMethodType: paymentMethodType,
          stripePaymentMethod: setupIntent.payment_method,
        });

        if (addResponse != null && addResponse.status === 200) {
          // Now create the subscription
          const subResponse = await apiService().post('/Subscription/CreateSubscription', {
            priceId: selectedPlan.priceId,
            walletPaymentMethodId: addResponse.data,
          });

          if (subResponse != null && subResponse.status === 200) {
            if (onSuccess) onSuccess(subResponse.data);
          } else {
            setErrorMessage('Failed to create subscription.');
            if (onError) onError('Failed to create subscription');
          }
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
        Subscribe to {selectedPlan?.name}
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
 * Subscription Plan Card
 */
const PlanCard = ({ plan, onSubscribe, isSubscribed }) => {
  const formatPrice = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: plan.currency || 'USD',
    });
    if (plan.formattedPrice) {
      return plan.formattedPrice;
    }
    const amount = plan.amount || 0;
    const interval = plan.displayInterval || plan.interval || 'month';
    return `${formatter.format(amount)}/${interval}`;
  };

  const priceId = plan.stripePriceId || plan.priceId;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: isSubscribed ? '2px solid #5D87FF' : '1px solid #e0e0e0',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {plan.name}
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {formatPrice()}
        </Typography>
        {plan.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {plan.description}
          </Typography>
        )}
        {plan.isMostPopular && (
          <Chip
            label="Most Popular"
            size="small"
            color="primary"
            sx={{ mb: 1 }}
          />
        )}
        {plan.enableTrial && plan.trialPeriodDays > 0 && (
          <Chip
            label={`${plan.trialPeriodDays} day free trial`}
            size="small"
            color="success"
            sx={{ mb: 2, ml: plan.isMostPopular ? 1 : 0 }}
          />
        )}
        {plan.features && plan.features.length > 0 && (
          <List dense>
            {plan.features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <CheckCircleRoundedIcon sx={{ color: 'success.main', mr: 1, fontSize: 18 }} />
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        {isSubscribed ? (
          <Chip label="Current Plan" color="primary" sx={{ width: '100%' }} />
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => onSubscribe({ ...plan, priceId })}
            disabled={!priceId}
          >
            {plan.isContactUs ? 'Contact Us' : 'Subscribe'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

/**
 * SubscriptionPlansComponent - Display and subscribe to available plans
 *
 * @param {Object} props
 * @param {Object|null} props.currentUser - User object or null for guest mode
 * @param {string} props.logOffUserName - Guest: name for Stripe customer
 * @param {string} props.logOffEmail - Guest: email for Stripe customer
 * @param {string} props.stripeCustomerId - Optional: existing Stripe customer ID
 * @param {function} props.onSubscriptionCreated - Callback: (subscription) => void
 * @param {function} props.onError - Callback: (error) => void
 * @param {string} props.title - Optional title (default: "Available Plans")
 * @param {Array} props.subscribedPriceIds - Optional: array of price IDs user is subscribed to
 * @param {boolean} props.allowSavedPaymentMethods - Allow using saved payment methods (default: true)
 */
export default function SubscriptionPlansComponent({
  currentUser = null,
  logOffUserName = null,
  logOffEmail = null,
  stripeCustomerId = null,
  onSubscriptionCreated,
  onError,
  title = "Available Plans",
  subscribedPriceIds = [],
  allowSavedPaymentMethods = true,
}) {
  const [plans, setPlans] = useState([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [paymentTab, setPaymentTab] = useState(0); // 0 = saved, 1 = new
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { hasPaymentMethods, isLoading: isLoadingPaymentMethods } = useHasPaymentMethods(
    allowSavedPaymentMethods ? currentUser : null,
    null // null = check all payment method types (cards + ACH)
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
    paymentMethodType: 3,
    amount: null,
    priceId: selectedPlan?.priceId,
  });

  const fetchPlans = useCallback(async () => {
    setIsLoadingPlans(true);
    try {
      const response = await apiService().get('/Subscription/GetAvailablePlans');
      if (response != null && response.status === 200 && response.data.success) {
        setPlans(response.data.plans || []);
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsLoadingPlans(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setSelectedPaymentMethod(null);
    // Default to saved methods tab if user has saved methods
    setPaymentTab(hasPaymentMethods ? 0 : 1);
    setShowSubscribeDialog(true);
  };

  const handleSubscribeSuccess = async (subscription) => {
    setShowSubscribeDialog(false);
    setSelectedPlan(null);
    setSelectedPaymentMethod(null);
    await refreshStripe();
    if (onSubscriptionCreated) {
      onSubscriptionCreated(subscription);
    }
  };

  const handleSubscribeWithSavedMethod = async () => {
    if (!selectedPaymentMethod || !selectedPlan) return;

    setIsSubscribing(true);

    const requestData = {
      priceId: selectedPlan.priceId,
      walletPaymentMethodId: selectedPaymentMethod.id,
    };

    try {
      const response = await apiService().post('/Subscription/CreateSubscription', requestData);

      if (response != null && response.status === 200) {
        if (response.data?.success === false) {
          if (onError) onError(response.data.error || 'Failed to create subscription');
        } else {
          handleSubscribeSuccess(response.data);
        }
      } else {
        if (onError) onError('Failed to create subscription');
      }
    } catch (err) {
      // Extract error message from API response if available
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      if (onError) onError(errorMessage);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSubscribeDialog(false);
    setSelectedPlan(null);
    setSelectedPaymentMethod(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20, pb: 2 }}>
          {title}
        </Typography>
      )}

      {isLoadingPlans ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : plans.length === 0 ? (
        <Typography color="text.secondary">
          No subscription plans are currently available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {plans.map((plan) => {
            const planPriceId = plan.stripePriceId || plan.priceId;
            return (
              <Grid item xs={12} sm={6} md={4} key={planPriceId || plan.id}>
                <PlanCard
                  plan={plan}
                  onSubscribe={handleSubscribe}
                  isSubscribed={subscribedPriceIds.includes(planPriceId)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Subscribe Dialog */}
      <Dialog
        open={showSubscribeDialog}
        fullWidth
        maxWidth="sm"
        onClose={handleCloseDialog}
      >
        <DialogTitle>Subscribe to {selectedPlan?.name}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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
              : 'Enter your payment details to subscribe.'}{' '}
            You will be charged{' '}
            {selectedPlan && (selectedPlan.formattedPrice || new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: selectedPlan.currency || 'USD',
            }).format(selectedPlan.amount || 0))}{' '}
            per {selectedPlan?.displayInterval || selectedPlan?.interval || 'month'}.
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
                paymentMethodType={3}
                onSelect={setSelectedPaymentMethod}
                onAddNew={() => setPaymentTab(1)}
                showAddNewOption={false}
                onError={onError}
                title={null}
              />
              <Button
                startIcon={isSubscribing ? <CircularProgress size={20} color="inherit" /> : <CreditCardRoundedIcon />}
                fullWidth
                variant="contained"
                disabled={!selectedPaymentMethod || isSubscribing}
                onClick={handleSubscribeWithSavedMethod}
                sx={{ marginTop: 2, padding: 2 }}
              >
                Subscribe to {selectedPlan?.name}
              </Button>
            </Box>
          )}

          {/* Tab 1: New Payment Method (or only option for guests/users without saved methods) */}
          {(paymentTab === 1 || !hasPaymentMethods) && (
            <StripeElementsWrapper
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              isLoading={isStripeLoading}
              error={stripeError}
            >
              <SubscribeForm
                clientSecret={clientSecret}
                walletId={walletId}
                paymentMethodType={3}
                selectedPlan={selectedPlan}
                onSuccess={handleSubscribeSuccess}
                onError={onError}
              />
            </StripeElementsWrapper>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
