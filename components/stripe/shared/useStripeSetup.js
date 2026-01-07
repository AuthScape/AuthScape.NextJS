import { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { apiService } from 'authscape';

// Cache the stripe promise to avoid re-initializing
let cachedStripePromise = null;
let cachedPublicKey = null;

/**
 * Custom hook for initializing Stripe with client secret from the API
 * Fetches the public key from the API instead of storing it on the frontend
 * Supports both authenticated and guest modes
 *
 * @param {Object} options
 * @param {Object|null} options.currentUser - User object or null for guest mode
 * @param {string} options.logOffUserName - Guest: name for Stripe customer
 * @param {string} options.logOffEmail - Guest: email for Stripe customer
 * @param {string} options.stripeCustomerId - Optional: existing Stripe customer ID
 * @param {number} options.paymentMethodType - 1=ACH, 3=Card (default: 3)
 * @param {number|null} options.amount - null for SetupIntent, value for PaymentIntent
 * @param {string|null} options.priceId - for subscriptions
 * @returns {Object} { stripePromise, clientSecret, walletId, isLoading, error, refresh }
 */
export default function useStripeSetup({
  currentUser = null,
  logOffUserName = null,
  logOffEmail = null,
  stripeCustomerId = null,
  paymentMethodType = 3,
  amount = null,
  priceId = null,
} = {}) {
  const [stripePromise, setStripePromise] = useState(cachedStripePromise);
  const [clientSecret, setClientSecret] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeStripe = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get the Stripe public key from API (if not cached)
      if (!cachedStripePromise) {
        const keyResponse = await apiService().get("/Payment/GetStripePublicKey");
        if (keyResponse != null && keyResponse.status === 200 && keyResponse.data.publicKey) {
          cachedPublicKey = keyResponse.data.publicKey;
          cachedStripePromise = loadStripe(cachedPublicKey);
          setStripePromise(cachedStripePromise);
        } else {
          const errorMsg = keyResponse?.data?.message || 'Failed to get Stripe public key';
          console.error('Failed to get Stripe public key:', keyResponse);
          setError(errorMsg);
          setIsLoading(false);
          return;
        }
      } else {
        setStripePromise(cachedStripePromise);
      }

      // Step 2: Connect customer and get client secret
      let response = null;

      if (currentUser == null) {
        // Guest mode - use no-auth endpoint
        response = await apiService().post("/Payment/ConnectCustomerNoAuth", {
          paymentMethodType: paymentMethodType,
          amount: amount,
          priceId: priceId,
          name: logOffUserName,
          email: logOffEmail,
          stripeCustomerId: stripeCustomerId
        });
      } else {
        // Authenticated mode
        response = await apiService().post("/Payment/ConnectCustomer", {
          paymentMethodType: paymentMethodType,
          amount: amount,
          priceId: priceId,
          stripeCustomerId: stripeCustomerId
        });
      }

      if (response != null && response.status === 200) {
        setClientSecret(response.data.clientSecret);
        setWalletId(response.data.walletId);
      } else {
        // Get error message from response if available
        const errorMsg = response?.data?.message || response?.data?.error || response?.statusText || 'Failed to initialize payment. Please try again.';
        console.error('Payment initialization failed:', response);
        setError(errorMsg);
      }
    } catch (err) {
      // Handle axios/fetch errors with response data
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'An error occurred while initializing payment.';
      console.error('Payment initialization error:', err);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, logOffUserName, logOffEmail, stripeCustomerId, paymentMethodType, amount, priceId]);

  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  return {
    stripePromise,
    clientSecret,
    walletId,
    isLoading,
    error,
    refresh: initializeStripe,
  };
}
