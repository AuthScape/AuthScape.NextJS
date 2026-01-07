import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { SubscriptionComponent } from '../../components/stripe';

export default function StripeSubscriptionDemo({ currentUser }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Stripe Subscription Demo
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This component displays available subscription plans and allows users to subscribe,
        view their active subscriptions, and cancel/resume subscriptions.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <SubscriptionComponent
          currentUser={currentUser}
          onSubscriptionCreated={(subscription) => {
            alert('Subscription created! ID: ' + JSON.stringify(subscription));
          }}
          onSubscriptionCancelled={(subscriptionId) => {
            alert('Subscription cancelled: ' + subscriptionId);
          }}
          onError={(error) => {
            alert('Error: ' + error);
          }}
          showPlans={true}
          showActiveSubscriptions={true}
        />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Usage Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`import { SubscriptionComponent } from 'components/stripe';

<SubscriptionComponent
  currentUser={currentUser}
  onSubscriptionCreated={(subscription) => {
    console.log('Subscribed:', subscription);
  }}
  onSubscriptionCancelled={(subscriptionId) => {
    console.log('Cancelled:', subscriptionId);
  }}
  onError={(error) => {
    console.error('Error:', error);
  }}
  showPlans={true}
  showActiveSubscriptions={true}
/>`}
          </pre>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Guest Mode Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`<SubscriptionComponent
  currentUser={null}
  logOffUserName="John Doe"
  logOffEmail="john@example.com"
  onSubscriptionCreated={(subscription) => {
    console.log('Guest subscribed:', subscription);
  }}
/>`}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
}
