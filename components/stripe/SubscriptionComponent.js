import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import SubscriptionPlansComponent from './SubscriptionPlansComponent';
import MySubscriptionsComponent from './MySubscriptionsComponent';

/**
 * SubscriptionComponent - Combined subscription management
 * Combines SubscriptionPlansComponent and MySubscriptionsComponent
 *
 * For more granular control, use the individual components directly:
 * - SubscriptionPlansComponent: Display and subscribe to plans
 * - MySubscriptionsComponent: View and manage user's subscriptions
 *
 * @param {Object} props
 * @param {Object|null} props.currentUser - User object or null for guest mode
 * @param {string} props.logOffUserName - Guest: name for Stripe customer
 * @param {string} props.logOffEmail - Guest: email for Stripe customer
 * @param {string} props.stripeCustomerId - Optional: existing Stripe customer ID
 * @param {function} props.onSubscriptionCreated - Callback: (subscription) => void
 * @param {function} props.onSubscriptionCancelled - Callback: (subscriptionId) => void
 * @param {function} props.onError - Callback: (error) => void
 * @param {boolean} props.showPlans - Show available plans (default: true)
 * @param {boolean} props.showActiveSubscriptions - Show user's subscriptions (default: true)
 * @param {string} props.subscriptionFilter - Filter for subscriptions: "all" | "active" | "canceled" (default: "all")
 * @param {boolean} props.showSubscriptionFilterToggle - Show filter toggle for subscriptions (default: false)
 * @param {boolean} props.showSubscriptionActions - Show cancel/resume buttons (default: true)
 */
export default function SubscriptionComponent({
  currentUser = null,
  logOffUserName = null,
  logOffEmail = null,
  stripeCustomerId = null,
  onSubscriptionCreated,
  onSubscriptionCancelled,
  onError,
  showPlans = true,
  showActiveSubscriptions = true,
  subscriptionFilter = "all",
  showSubscriptionFilterToggle = false,
  showSubscriptionActions = true,
}) {
  const [subscribedPriceIds, setSubscribedPriceIds] = useState([]);

  const handleSubscriptionsLoaded = useCallback((subscriptions) => {
    const activeIds = subscriptions
      .filter(s => s.status?.toLowerCase() === 'active')
      .map(s => s.priceId);
    setSubscribedPriceIds(activeIds);
  }, []);

  const handleSubscriptionCreated = useCallback((subscription) => {
    // Refresh subscribed price IDs
    if (subscription?.priceId) {
      setSubscribedPriceIds(prev => [...prev, subscription.priceId]);
    }
    if (onSubscriptionCreated) {
      onSubscriptionCreated(subscription);
    }
  }, [onSubscriptionCreated]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* User's Subscriptions */}
      {showActiveSubscriptions && currentUser != null && (
        <Box sx={{ mb: 4 }}>
          <MySubscriptionsComponent
            currentUser={currentUser}
            onSubscriptionCancelled={onSubscriptionCancelled}
            onError={onError}
            title="Your Subscriptions"
            showActions={showSubscriptionActions}
            filter={subscriptionFilter}
            showFilterToggle={showSubscriptionFilterToggle}
            onSubscriptionsLoaded={handleSubscriptionsLoaded}
          />
        </Box>
      )}

      {/* Available Plans */}
      {showPlans && (
        <SubscriptionPlansComponent
          currentUser={currentUser}
          logOffUserName={logOffUserName}
          logOffEmail={logOffEmail}
          stripeCustomerId={stripeCustomerId}
          onSubscriptionCreated={handleSubscriptionCreated}
          onError={onError}
          title="Available Plans"
          subscribedPriceIds={subscribedPriceIds}
        />
      )}
    </Box>
  );
}
