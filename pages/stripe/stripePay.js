import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Snackbar,
} from '@mui/material';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import { apiService } from 'authscape';
import {
  PayComponent,
  SubscriptionPlansComponent,
} from '../../components/stripe';
import PaymentMethodSelector, {
  useHasPaymentMethods,
} from '../../components/stripe/shared/PaymentMethodSelector';

// Sample products for the Products tab
const sampleProducts = [
  {
    id: 1,
    name: 'Basic Service',
    description: 'One-time setup fee for basic configuration',
    price: 1999, // $19.99 in cents
  },
  {
    id: 2,
    name: 'Premium Package',
    description: 'Full feature access with priority support',
    price: 4999, // $49.99 in cents
  },
  {
    id: 3,
    name: 'Enterprise Setup',
    description: 'Custom configuration and dedicated onboarding',
    price: 9999, // $99.99 in cents
  },
];

/**
 * Quick Pay Tab - Enter an amount and charge immediately
 */
function QuickPayTab({ currentUser, onSuccess, onError }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const { hasPaymentMethods, isLoading: isLoadingMethods } = useHasPaymentMethods(currentUser, null);

  const formatAmount = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const amountCents = Math.round(parseFloat(amount || 0) * 100);
  const isValidAmount = amountCents >= 100; // Minimum $1.00

  const handlePay = async () => {
    if (!selectedPaymentMethod) {
      setError('Please select a payment method');
      return;
    }
    if (!isValidAmount) {
      setError('Minimum payment amount is $1.00');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await apiService().post('/Payment/QuickCharge', {
        amountCents: amountCents,
        paymentMethodId: selectedPaymentMethod.id,
        description: description || 'Quick payment',
      });

      if (response && response.status === 200 && response.data?.success) {
        setAmount('');
        setDescription('');
        // Pass status to parent so it can show appropriate message for ACH ("processing") vs cards ("succeeded")
        if (onSuccess) onSuccess(response.data, amountCents, response.data.status);
      } else {
        const msg = response?.data?.error || 'Payment failed';
        setError(msg);
        if (onError) onError(msg);
      }
    } catch (err) {
      const msg = err.message || 'An error occurred';
      setError(msg);
      if (onError) onError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!currentUser) {
    return (
      <Alert severity="info">
        Please sign in to make a quick payment.
      </Alert>
    );
  }

  if (isLoadingMethods) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hasPaymentMethods) {
    return (
      <Alert severity="warning">
        You don't have any saved payment methods. Please add a payment method in your wallet first.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter an amount and select a payment method to make a quick payment.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            placeholder="0.00"
            helperText="Minimum $1.00"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            placeholder="Payment for..."
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <PaymentMethodSelector
          currentUser={currentUser}
          paymentMethodType={null}
          onSelect={setSelectedPaymentMethod}
          showAddNewOption={false}
          title="Select Payment Method"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handlePay}
        disabled={!isValidAmount || !selectedPaymentMethod || isProcessing}
        startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentRoundedIcon />}
        sx={{ mt: 3, py: 1.5 }}
      >
        {isProcessing ? 'Processing...' : `Pay ${isValidAmount ? formatAmount(amountCents) : '$0.00'}`}
      </Button>
    </Box>
  );
}

/**
 * Products Tab - Select a product and purchase it
 */
function ProductsTab({ currentUser, onSuccess, onError }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [payDialogOpen, setPayDialogOpen] = useState(false);

  const formatPrice = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setPayDialogOpen(true);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setPayDialogOpen(false);
    if (onSuccess) onSuccess(paymentIntent, selectedProduct);
    setSelectedProduct(null);
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select a product or service to purchase.
      </Typography>

      <Grid container spacing={3}>
        {sampleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Typography variant="h5" color="primary">
                  {formatPrice(product.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBuy(product)}
                  startIcon={<ShoppingCartRoundedIcon />}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pay Dialog */}
      {selectedProduct && (
        <PayComponent
          currentUser={currentUser}
          amountCents={selectedProduct.price}
          description={`Purchase: ${selectedProduct.name}`}
          onPaymentSuccess={handlePaymentSuccess}
          onError={onError}
          showDialog={true}
          open={payDialogOpen}
          onClose={() => {
            setPayDialogOpen(false);
            setSelectedProduct(null);
          }}
          allowSavedPaymentMethods={true}
          paymentMethodType={3}
        />
      )}
    </Box>
  );
}

/**
 * Subscriptions Tab - View and subscribe to plans
 */
function SubscriptionsTab({ currentUser, onSuccess, onError }) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose a subscription plan that fits your needs.
      </Typography>

      <SubscriptionPlansComponent
        currentUser={currentUser}
        onSubscriptionCreated={(subscription) => {
          if (onSuccess) onSuccess(subscription);
        }}
        onError={onError}
      />
    </Box>
  );
}

/**
 * Main Payment Center Page
 */
export default function StripePayPage({ currentUser }) {
  const [mainTab, setMainTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSuccess = (data, extra, status) => {
    let message = 'Payment successful!';
    let severity = 'success';

    if (mainTab === 0) {
      // Quick Pay
      const amount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(extra / 100);

      // ACH payments show "processing" status - they take 1-3 business days
      if (status === 'processing') {
        message = `Payment of ${amount} initiated! ACH bank transfers typically take 1-3 business days to complete.`;
        severity = 'info';
      } else {
        message = `Payment of ${amount} completed successfully!`;
      }
    } else if (mainTab === 1 && extra) {
      // Product purchase
      message = `Successfully purchased ${extra.name}!`;
    } else if (mainTab === 2) {
      // Subscription
      message = 'Subscription created successfully!';
    }
    setSnackbar({ open: true, message, severity });
  };

  const handleError = (error) => {
    setSnackbar({ open: true, message: error || 'An error occurred', severity: 'error' });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Payment Center
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Make quick payments, purchase products, or subscribe to plans.
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={mainTab}
          onChange={(e, newValue) => setMainTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<PaymentRoundedIcon />}
            label="Quick Pay"
            iconPosition="start"
          />
          <Tab
            icon={<ShoppingCartRoundedIcon />}
            label="Products"
            iconPosition="start"
          />
          <Tab
            icon={<SubscriptionsRoundedIcon />}
            label="Subscriptions"
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {mainTab === 0 && (
            <QuickPayTab
              currentUser={currentUser}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
          {mainTab === 1 && (
            <ProductsTab
              currentUser={currentUser}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
          {mainTab === 2 && (
            <SubscriptionsTab
              currentUser={currentUser}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
