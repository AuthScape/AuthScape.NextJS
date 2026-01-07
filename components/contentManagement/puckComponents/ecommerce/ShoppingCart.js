import React, { useState } from 'react';
import {
  Box,
  Badge,
  IconButton,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const iconMap = {
  shopping_cart: ShoppingCartIcon,
  shopping_bag: ShoppingBagIcon,
  shopping_basket: ShoppingBasketIcon,
};

export const ShoppingCart = {
  label: 'Shopping Cart',
  fields: {
    // Display Options
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Icon Only', value: 'icon-only' },
        { label: 'Mini (Icon + Count)', value: 'mini' },
        { label: 'Full (With Price)', value: 'full' },
      ],
    },
    cartIcon: {
      type: 'select',
      label: 'Cart Icon',
      options: [
        { label: 'Shopping Cart', value: 'shopping_cart' },
        { label: 'Shopping Bag', value: 'shopping_bag' },
        { label: 'Shopping Basket', value: 'shopping_basket' },
      ],
    },

    // Content
    showItemCount: {
      type: 'radio',
      label: 'Show Item Count Badge',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showTotal: {
      type: 'radio',
      label: 'Show Total Price',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    emptyMessage: {
      type: 'text',
      label: 'Empty Cart Message',
    },

    // Behavior
    openDrawer: {
      type: 'radio',
      label: 'Open Cart Drawer on Click',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    drawerPosition: {
      type: 'select',
      label: 'Drawer Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },

    // Position (for fixed variant)
    position: {
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Inline', value: 'inline' },
        { label: 'Fixed Right', value: 'fixed-right' },
        { label: 'Fixed Left', value: 'fixed-left' },
      ],
    },

    // Styling
    iconColor: {
      type: 'text',
      label: 'Icon Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color (Fixed)',
    },
    badgeColor: {
      type: 'select',
      label: 'Badge Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Error (Red)', value: 'error' },
        { label: 'Success (Green)', value: 'success' },
      ],
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },

    // Demo Data (for preview)
    demoItemCount: {
      type: 'number',
      label: 'Demo Item Count (Preview)',
    },
    demoTotal: {
      type: 'text',
      label: 'Demo Total (Preview)',
    },
  },
  defaultProps: {
    variant: 'mini',
    cartIcon: 'shopping_cart',
    showItemCount: true,
    showTotal: false,
    emptyMessage: 'Your cart is empty',
    openDrawer: true,
    drawerPosition: 'right',
    position: 'inline',
    iconColor: '',
    backgroundColor: '#ffffff',
    badgeColor: 'primary',
    size: 'medium',
    demoItemCount: 3,
    demoTotal: '$99.99',
  },
  render: ({
    variant,
    cartIcon,
    showItemCount,
    showTotal,
    emptyMessage,
    openDrawer,
    drawerPosition,
    position,
    iconColor,
    backgroundColor,
    badgeColor,
    size,
    demoItemCount,
    demoTotal,
  }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const IconComponent = iconMap[cartIcon] || ShoppingCartIcon;

    const sizeMap = {
      small: { iconSize: 20, buttonSize: 36 },
      medium: { iconSize: 24, buttonSize: 44 },
      large: { iconSize: 32, buttonSize: 52 },
    };
    const { iconSize, buttonSize } = sizeMap[size];

    // Demo cart items for preview
    const demoItems = demoItemCount > 0 ? [
      { id: 1, name: 'Product 1', price: '$29.99', quantity: 1, image: '' },
      { id: 2, name: 'Product 2', price: '$49.99', quantity: 2, image: '' },
      { id: 3, name: 'Product 3', price: '$19.99', quantity: 1, image: '' },
    ].slice(0, demoItemCount) : [];

    const getPositionStyles = () => {
      if (position === 'fixed-right') {
        return {
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 1000,
        };
      }
      if (position === 'fixed-left') {
        return {
          position: 'fixed',
          left: 20,
          bottom: 20,
          zIndex: 1000,
        };
      }
      return {};
    };

    const CartButton = (
      <Paper
        elevation={position !== 'inline' ? 4 : 0}
        sx={{
          ...getPositionStyles(),
          backgroundColor: position !== 'inline' ? backgroundColor : 'transparent',
          borderRadius: position !== 'inline' ? '50%' : 0,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          p: variant === 'full' ? 1 : 0,
        }}
      >
        <IconButton
          onClick={() => openDrawer && setDrawerOpen(true)}
          sx={{
            color: iconColor || 'inherit',
            width: buttonSize,
            height: buttonSize,
          }}
        >
          <Badge
            badgeContent={showItemCount ? demoItemCount : 0}
            color={badgeColor}
            invisible={!showItemCount || demoItemCount === 0}
          >
            <IconComponent sx={{ fontSize: iconSize }} />
          </Badge>
        </IconButton>

        {variant === 'full' && showTotal && (
          <Typography variant="body2" fontWeight={600} sx={{ pr: 1 }}>
            {demoTotal}
          </Typography>
        )}
      </Paper>
    );

    return (
      <Box sx={{ display: 'inline-block' }}>
        {CartButton}

        <Drawer
          anchor={drawerPosition}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 350, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Shopping Cart</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider />

            {demoItems.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <IconComponent sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">{emptyMessage}</Typography>
              </Box>
            ) : (
              <>
                <List>
                  {demoItems.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <IconButton edge="end" size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar variant="rounded" sx={{ bgcolor: 'grey.200' }}>
                          <ShoppingBagIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`${item.price} × ${item.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider />

                <Box sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1">Total:</Typography>
                    <Typography variant="subtitle1" fontWeight={600}>{demoTotal}</Typography>
                  </Box>
                  <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                    Checkout
                  </Button>
                  <Button variant="outlined" fullWidth onClick={() => setDrawerOpen(false)}>
                    Continue Shopping
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    );
  },
};

export default ShoppingCart;
