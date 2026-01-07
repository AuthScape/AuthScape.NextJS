import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Chip,
} from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { apiService } from 'authscape';

/**
 * PaymentMethodSelector - Reusable component for selecting from saved payment methods
 *
 * @param {Object} props
 * @param {Object|null} props.currentUser - User object (required to fetch methods)
 * @param {number|null} props.paymentMethodType - 1=ACH, 3=Card, null=all (default: null for all)
 * @param {function} props.onSelect - Callback: (paymentMethod) => void
 * @param {function} props.onAddNew - Callback: () => void (switch to new card form)
 * @param {string} props.selectedId - Pre-selected payment method ID
 * @param {boolean} props.showAddNewOption - Show "Add new" button (default: true)
 * @param {function} props.onError - Callback: (error) => void
 * @param {string} props.title - Optional title (default: "Select Payment Method")
 */
export default function PaymentMethodSelector({
  currentUser = null,
  paymentMethodType = null, // null = fetch all types
  onSelect,
  onAddNew,
  selectedId = null,
  showAddNewOption = true,
  onError,
  title = 'Select Payment Method',
}) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethodId, setSelectedMethodId] = useState(selectedId);

  const fetchPaymentMethods = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch all payment methods (cards and ACH) if no specific type requested
      const fetchTypes = paymentMethodType !== null ? [paymentMethodType] : [1, 3]; // 1=ACH, 3=Card
      const allMethods = [];

      for (const type of fetchTypes) {
        const response = await apiService().get(
          `/Payment/GetPaymentMethods?paymentMethodType=${type}`
        );
        if (response != null && response.status === 200 && response.data) {
          allMethods.push(...response.data);
        }
      }

      setPaymentMethods(allMethods);
      // Auto-select default method if none selected
      if (!selectedId && allMethods.length > 0) {
        const defaultMethod = allMethods.find((pm) => pm.isDefault);
        if (defaultMethod) {
          setSelectedMethodId(defaultMethod.id);
          if (onSelect) onSelect(defaultMethod);
        } else {
          setSelectedMethodId(allMethods[0].id);
          if (onSelect) onSelect(allMethods[0]);
        }
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [paymentMethodType, selectedId, onSelect, onError]);

  useEffect(() => {
    if (currentUser != null) {
      fetchPaymentMethods();
    } else {
      setIsLoading(false);
    }
  }, [currentUser, fetchPaymentMethods]);

  const handleSelect = (methodId) => {
    setSelectedMethodId(methodId);
    const method = paymentMethods.find((pm) => pm.id === methodId);
    if (method && onSelect) {
      onSelect(method);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (paymentMethods.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {title}
        </Typography>
      )}

      <RadioGroup
        value={selectedMethodId || ''}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {paymentMethods.map((pm) => {
          const isACH = pm.bankName != null || pm.accountType != null;
          return (
            <Box
              key={pm.id}
              sx={{
                border: selectedMethodId === pm.id ? '2px solid #5D87FF' : '1px solid #e0e0e0',
                borderRadius: 1,
                mb: 1,
                p: 1.5,
                cursor: 'pointer',
                backgroundColor: selectedMethodId === pm.id ? 'rgba(93, 135, 255, 0.05)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(93, 135, 255, 0.1)',
                },
              }}
              onClick={() => handleSelect(pm.id)}
            >
              <FormControlLabel
                value={pm.id}
                control={<Radio />}
                sx={{ width: '100%', m: 0 }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', ml: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {isACH ? (
                        <AccountBalanceRoundedIcon color="action" />
                      ) : (
                        <CreditCardRoundedIcon color="action" />
                      )}
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {pm.brand || pm.bankName} •••• {pm.last4}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {isACH
                            ? pm.accountType
                            : `Expires ${pm.expMonth}/${pm.expYear}`}
                        </Typography>
                      </Box>
                    </Box>
                    {pm.isDefault && (
                      <Chip
                        icon={<StarRoundedIcon sx={{ fontSize: 14 }} />}
                        label="Default"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
              />
            </Box>
          );
        })}
      </RadioGroup>

      {showAddNewOption && onAddNew && (
        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={onAddNew}
          fullWidth
          sx={{ mt: 1 }}
        >
          Add New {paymentMethodType === 1 ? 'Bank Account' : 'Card'}
        </Button>
      )}
    </Box>
  );
}

/**
 * Hook to check if user has saved payment methods
 * @param {Object} currentUser - User object
 * @param {number|null} paymentMethodType - 1=ACH, 3=Card, null=check all types (default: null)
 */
export function useHasPaymentMethods(currentUser, paymentMethodType = null) {
  const [hasPaymentMethods, setHasPaymentMethods] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const checkPaymentMethods = async () => {
      try {
        // Check all payment method types if no specific type requested
        const typesToCheck = paymentMethodType !== null ? [paymentMethodType] : [1, 3]; // 1=ACH, 3=Card
        let totalCount = 0;

        for (const type of typesToCheck) {
          const response = await apiService().get(
            `/Payment/GetPaymentMethods?paymentMethodType=${type}`
          );
          if (response != null && response.status === 200 && response.data) {
            totalCount += response.data.length;
          }
        }

        setHasPaymentMethods(totalCount > 0);
      } catch {
        setHasPaymentMethods(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentMethods();
  }, [currentUser, paymentMethodType]);

  return { hasPaymentMethods, isLoading };
}
