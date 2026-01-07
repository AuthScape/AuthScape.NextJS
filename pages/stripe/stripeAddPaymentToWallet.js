import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { PaymentComponent } from '../../components/stripe';

export default function AddToWalletDemo({ currentUser }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Add To Wallet Demo
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This component allows users to manage their saved payment methods (cards and bank accounts).
        Users can add new payment methods, remove existing ones, and set a default payment method.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <PaymentComponent
          currentUser={currentUser}
          paymentMethodType={3} // 3 = Card, 1 = ACH
          onPaymentMethodAdded={(paymentMethod) => {
            alert('Payment method added: ' + paymentMethod);
          }}
          onPaymentMethodRemoved={(paymentMethodId) => {
            alert('Payment method removed: ' + paymentMethodId);
          }}
          onDefaultSet={(paymentMethodId) => {
            alert('Default payment method set: ' + paymentMethodId);
          }}
          onError={(error) => {
            alert('Error: ' + error);
          }}
          allowRemove={true}
          allowSetDefault={true}
          title="Payment Methods"
        />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Usage Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`import { PaymentComponent } from 'components/stripe';

<PaymentComponent
  currentUser={currentUser}
  paymentMethodType={3} // 3 = Card, 1 = ACH
  onPaymentMethodAdded={(pm) => console.log('Added:', pm)}
  onPaymentMethodRemoved={(id) => console.log('Removed:', id)}
  onDefaultSet={(id) => console.log('Default set:', id)}
  onError={(error) => console.error('Error:', error)}
  allowRemove={true}
  allowSetDefault={true}
  title="Payment Methods"
/>`}
          </pre>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>ACH Bank Account Example</Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ margin: 0, fontSize: 12, overflow: 'auto' }}>
{`<PaymentComponent
  currentUser={currentUser}
  paymentMethodType={1} // 1 = ACH Bank Account
  onPaymentMethodAdded={(pm) => console.log('Bank added:', pm)}
  title="Bank Accounts"
/>`}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
}
