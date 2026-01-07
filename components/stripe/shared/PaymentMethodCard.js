import React from 'react';
import { Box, Typography, IconButton, Chip, Grid } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

/**
 * Displays a saved payment method as a styled card
 * Supports both credit cards and bank accounts (ACH)
 *
 * @param {Object} props
 * @param {Object} props.paymentMethod - Payment method data
 * @param {string} props.paymentMethod.id - Payment method ID
 * @param {string} props.paymentMethod.last4 - Last 4 digits
 * @param {string} props.paymentMethod.brand - Card brand (Visa, Mastercard, etc.)
 * @param {string} props.paymentMethod.bankName - Bank name for ACH
 * @param {number} props.paymentMethod.expMonth - Expiration month (cards only)
 * @param {number} props.paymentMethod.expYear - Expiration year (cards only)
 * @param {string} props.paymentMethod.accountType - Account type for ACH (checking/savings)
 * @param {function} props.onRemove - Callback when remove button is clicked: (id) => void
 * @param {function} props.onSetDefault - Callback when set default is clicked: (id) => void
 * @param {boolean} props.isDefault - Whether this is the default payment method
 * @param {boolean} props.allowRemove - Whether to show remove button (default: true)
 * @param {boolean} props.allowSetDefault - Whether to show set default button (default: true)
 */
export default function PaymentMethodCard({
  paymentMethod,
  onRemove,
  onSetDefault,
  isDefault = false,
  allowRemove = true,
  allowSetDefault = true,
}) {
  const isACH = paymentMethod.bankName != null || paymentMethod.accountType != null;

  return (
    <Box
      sx={{
        height: 160,
        marginTop: 2,
        backgroundColor: isDefault ? '#5D87FF' : '#2196F3',
        position: 'relative',
        border: '1px solid #2196F3',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: allowSetDefault && !isDefault && onSetDefault ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (allowSetDefault && !isDefault && onSetDefault) {
          onSetDefault(paymentMethod.id);
        }
      }}
    >
      {/* Default Badge */}
      {isDefault && (
        <Chip
          icon={<StarRoundedIcon sx={{ color: 'white !important' }} />}
          label="Default"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            '& .MuiChip-icon': { color: 'white' },
          }}
        />
      )}

      {/* Delete Button */}
      {allowRemove && onRemove && (
        <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(paymentMethod.id);
            }}
          >
            <DeleteRoundedIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Card/Bank Type */}
      <Typography
        variant="body1"
        sx={{
          fontSize: 18,
          position: 'absolute',
          left: 15,
          top: isDefault ? 40 : 10,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {isACH ? (
          <AccountBalanceRoundedIcon />
        ) : (
          <CreditCardRoundedIcon />
        )}
        {paymentMethod.brand || paymentMethod.bankName}
      </Typography>

      {/* Card Number */}
      <Typography
        variant="body1"
        sx={{ verticalAlign: 'middle', fontSize: 18, color: 'white' }}
      >
        * * * * &nbsp; * * * * &nbsp; * * * * &nbsp; {paymentMethod.last4}
      </Typography>

      {/* Expiry / Account Type */}
      <Grid
        container
        spacing={1}
        sx={{ position: 'absolute', bottom: 8, marginLeft: 0, width: '100%' }}
      >
        <Grid item xs={12} sx={{ textAlign: 'right', paddingRight: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: 12, marginLeft: 2, marginTop: 1, color: '#e9e9e9' }}
          >
            {isACH ? 'Account Type' : 'EXPIRES'}
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: 12, marginLeft: 2, marginTop: '-9px', color: 'white' }}
          >
            {isACH ? (
              paymentMethod.accountType
            ) : (
              `${paymentMethod.expMonth}/${paymentMethod.expYear}`
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
