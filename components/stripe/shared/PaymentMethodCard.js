import React from 'react';
import { Box, Typography, IconButton, Chip, Button } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

/**
 * Displays a saved payment method as a styled card
 * Supports both credit cards and bank accounts (ACH)
 */
export default function PaymentMethodCard({
  paymentMethod,
  onRemove,
  onSetDefault,
  onVerify,
  isDefault = false,
  allowRemove = true,
  allowSetDefault = true,
}) {
  const isACH = paymentMethod.bankName != null || paymentMethod.accountType != null;
  const needsVerification = paymentMethod.status === 'requires_action' ||
    paymentMethod.status === 'pending' ||
    paymentMethod.requiresVerification;

  const showVerifyButton = needsVerification && isACH && onVerify;

  return (
    <Box
      sx={{
        height: 180,
        marginTop: 2,
        backgroundColor: isDefault ? '#5D87FF' : '#2196F3',
        position: 'relative',
        border: '1px solid #2196F3',
        borderRadius: 1,
        overflow: 'hidden',
        cursor: allowSetDefault && !isDefault && onSetDefault && !needsVerification ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (allowSetDefault && !isDefault && onSetDefault && !needsVerification) {
          onSetDefault(paymentMethod.id);
        }
      }}
    >
      {/* Delete Button - top right */}
      {allowRemove && onRemove && (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(paymentMethod.id);
          }}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <DeleteRoundedIcon sx={{ color: 'white' }} />
        </IconButton>
      )}

      {/* Default Badge - top left */}
      {isDefault && (
        <Chip
          icon={<StarRoundedIcon sx={{ color: 'white !important', fontSize: 16 }} />}
          label="Default"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            height: 24,
            '& .MuiChip-icon': { color: 'white' },
          }}
        />
      )}

      {/* Card/Bank Icon and Name */}
      <Box
        sx={{
          position: 'absolute',
          top: isDefault ? 40 : 12,
          left: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {isACH ? (
          <AccountBalanceRoundedIcon sx={{ color: 'white', fontSize: 20 }} />
        ) : (
          <CreditCardRoundedIcon sx={{ color: 'white', fontSize: 20 }} />
        )}
        <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
          {paymentMethod.brand || paymentMethod.bankName}
        </Typography>
      </Box>

      {/* Card Number - centered */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: needsVerification && isACH ? 'translateY(-60%)' : 'translateY(-50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ color: 'white', fontSize: 16, letterSpacing: 2 }}>
          **** **** **** {paymentMethod.last4}
        </Typography>
      </Box>

      {/* Expiry / Account Type - bottom right */}
      {!(needsVerification && isACH && onVerify) && (
        <Box sx={{ position: 'absolute', bottom: 12, right: 12, textAlign: 'right' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
            {isACH ? 'Account Type' : 'EXPIRES'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {isACH ? paymentMethod.accountType : `${paymentMethod.expMonth}/${paymentMethod.expYear}`}
          </Typography>
        </Box>
      )}

      {/* Account Type shown above verify button when verification needed */}
      {needsVerification && isACH && onVerify && (
        <Box sx={{ position: 'absolute', bottom: 60, right: 12, textAlign: 'right' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
            Account Type
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {paymentMethod.accountType}
          </Typography>
        </Box>
      )}

      {/* Full-width Verify Button at bottom */}
      {needsVerification && isACH && onVerify && (
        <Button
          variant="contained"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onVerify(paymentMethod);
          }}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            backgroundColor: '#FFA726',
            color: 'white',
            py: 1.5,
            fontSize: 14,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
          }}
        >
          VERIFY BANK ACCOUNT
        </Button>
      )}
    </Box>
  );
}
