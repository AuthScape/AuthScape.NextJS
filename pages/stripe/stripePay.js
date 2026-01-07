import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { HoldCardComponent } from '../../components/stripe';

export default function StripePayDemo({ currentUser }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Stripe Pay Demo (Hold Card)
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This component allows users to save a card for future use without charging it immediately.
        Uses Stripe SetupIntent to securely store payment method details.
        Supports both authenticated users and guest mode.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <HoldCardComponent
          currentUser={currentUser}
          paymentMethodType={3} // 3 = Card
          onCardSaved={(setupIntentId, paymentMethodId, walletPaymentMethodId) => {
            alert(`Card saved!\nSetupIntent: ${setupIntentId}\nPaymentMethod: ${paymentMethodId}\nWallet ID: ${walletPaymentMethodId}`);
          }}
          onError={(error) => {
            alert('Error: ' + error);
          }}
          buttonText="Save Payment Method"
          description="Enter your card details below. Your card will be saved for future purchases."
        />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Usage Example (Authenticated)</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`import { HoldCardComponent } from 'components/stripe';

<HoldCardComponent
  currentUser={currentUser}
  onCardSaved={(setupIntentId, paymentMethodId, walletId) => {
    console.log('Card saved:', paymentMethodId);
    // Store walletId to charge later
  }}
  onError={(error) => console.error('Error:', error)}
  buttonText="Save Payment Method"
  description="Enter your card details below."
/>`}
          </pre>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Guest Mode Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`<HoldCardComponent
  currentUser={null}
  logOffUserName="John Doe"
  logOffEmail="john@example.com"
  onCardSaved={(setupIntentId, paymentMethodId) => {
    console.log('Guest card saved:', paymentMethodId);
    // Store for later checkout
  }}
  buttonText="Save Card"
/>`}
          </pre>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>ACH Bank Account Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`<HoldCardComponent
  currentUser={currentUser}
  paymentMethodType={1} // 1 = ACH Bank Account
  onCardSaved={(setupIntentId, paymentMethodId) => {
    console.log('Bank account saved:', paymentMethodId);
  }}
  buttonText="Save Bank Account"
  description="Enter your bank account details."
/>`}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
}
