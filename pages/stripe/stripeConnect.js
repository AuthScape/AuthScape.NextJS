import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { StripeConnectComponent } from '../../components/stripe';

export default function StripeConnectDemo({ currentUser }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Stripe Connect Demo
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This component allows vendors/merchants to connect their Stripe account for receiving payments.
        Requires an authenticated user.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <StripeConnectComponent
          currentUser={currentUser}
          onOnboardingComplete={(accountId) => {
            alert('Onboarding complete! Account ID: ' + accountId);
          }}
          onOnboardingError={(error) => {
            alert('Onboarding error: ' + error);
          }}
          showAccountStatus={true}
        />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Usage Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`import { StripeConnectComponent } from 'components/stripe';

<StripeConnectComponent
  currentUser={currentUser}
  onOnboardingComplete={(accountId) => {
    console.log('Connected:', accountId);
  }}
  onOnboardingError={(error) => {
    console.error('Error:', error);
  }}
  showAccountStatus={true}
/>`}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
}
