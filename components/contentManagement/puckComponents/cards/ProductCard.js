import React from 'react';
import { Box, Paper, Typography, Chip, Rating, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  borderRadiusField,
  elevationField,
  buttonVariantField,
} from '../shared/fieldTypes';

export const ProductCard = {
  label: 'Product Card',
  fields: {
    // Product info
    image: {
      type: 'text',
      label: 'Product Image URL',
    },
    title: {
      type: 'text',
      label: 'Product Name',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    link: {
      type: 'text',
      label: 'Product Link',
    },

    // Pricing
    price: {
      type: 'text',
      label: 'Price',
    },
    currency: {
      type: 'text',
      label: 'Currency Symbol',
    },
    salePrice: {
      type: 'text',
      label: 'Sale Price (optional)',
    },

    // Badge
    showBadge: {
      type: 'radio',
      label: 'Show Badge',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    badgeText: {
      type: 'text',
      label: 'Badge Text',
    },
    badgeColor: {
      type: 'select',
      label: 'Badge Color',
      options: [
        { label: 'Error (Sale)', value: 'error' },
        { label: 'Success (New)', value: 'success' },
        { label: 'Primary', value: 'primary' },
        { label: 'Warning', value: 'warning' },
      ],
    },

    // Rating
    showRating: {
      type: 'radio',
      label: 'Show Rating',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    rating: {
      type: 'number',
      label: 'Rating (1-5)',
    },
    reviewCount: {
      type: 'number',
      label: 'Review Count',
    },

    // Actions
    showAddToCart: {
      type: 'radio',
      label: 'Show Add to Cart',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    addToCartText: {
      type: 'text',
      label: 'Add to Cart Text',
    },
    showWishlist: {
      type: 'radio',
      label: 'Show Wishlist Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Layout
    imageHeight: {
      type: 'select',
      label: 'Image Height',
      options: [
        { label: 'Small (180px)', value: 180 },
        { label: 'Medium (220px)', value: 220 },
        { label: 'Large (280px)', value: 280 },
        { label: 'Square', value: 'square' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Zoom Image', value: 'zoom' },
        { label: 'Show Actions', value: 'actions' },
      ],
    },
  },
  defaultProps: {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    link: '#',
    price: '199.99',
    currency: '$',
    salePrice: '149.99',
    showBadge: true,
    badgeText: 'Sale',
    badgeColor: 'error',
    showRating: true,
    rating: 4.5,
    reviewCount: 128,
    showAddToCart: true,
    addToCartText: 'Add to Cart',
    showWishlist: true,
    imageHeight: 220,
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 2,
    hoverEffect: 'zoom',
  },
  render: ({
    image,
    title,
    description,
    link,
    price,
    currency,
    salePrice,
    showBadge,
    badgeText,
    badgeColor,
    showRating,
    rating,
    reviewCount,
    showAddToCart,
    addToCartText,
    showWishlist,
    imageHeight,
    backgroundColor,
    elevation,
    borderRadius,
    hoverEffect,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const isOnSale = salePrice && parseFloat(salePrice) < parseFloat(price);

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'lift':
          return {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
            },
          };
        case 'zoom':
          return {
            '& .product-image': {
              transition: 'transform 0.3s ease',
            },
            '&:hover .product-image': {
              transform: 'scale(1.08)',
            },
          };
        case 'actions':
          return {
            '& .product-actions': {
              opacity: 0,
              transform: 'translateY(10px)',
              transition: 'all 0.3s ease',
            },
            '&:hover .product-actions': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          };
        default:
          return {};
      }
    };

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          ...getHoverStyles(),
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Box
            component="a"
            href={link}
            sx={{
              display: 'block',
              height: imageHeight === 'square' ? 0 : imageHeight,
              paddingBottom: imageHeight === 'square' ? '100%' : 0,
            }}
          >
            <Box
              className="product-image"
              sx={{
                position: imageHeight === 'square' ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Box>

          {/* Badge */}
          {showBadge && badgeText && (
            <Chip
              label={badgeText}
              color={badgeColor}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 600,
              }}
            />
          )}

          {/* Wishlist */}
          {showWishlist && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                },
              }}
              size="small"
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          )}

          {/* Quick Actions (for actions hover effect) */}
          {hoverEffect === 'actions' && showAddToCart && (
            <Box
              className="product-actions"
              sx={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                right: 12,
              }}
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                  },
                }}
              >
                {addToCartText}
              </Button>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Title */}
          <Typography
            variant="subtitle1"
            component="a"
            href={link}
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              textDecoration: 'none',
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          )}

          {/* Rating */}
          {showRating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Rating value={rating} precision={0.5} size="small" readOnly />
              {reviewCount > 0 && (
                <Typography variant="caption" color="text.secondary">
                  ({reviewCount})
                </Typography>
              )}
            </Box>
          )}

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 'auto', mb: showAddToCart && hoverEffect !== 'actions' ? 2 : 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isOnSale ? 'error.main' : 'text.primary',
              }}
            >
              {currency}{isOnSale ? salePrice : price}
            </Typography>
            {isOnSale && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.disabled',
                }}
              >
                {currency}{price}
              </Typography>
            )}
          </Box>

          {/* Add to Cart Button */}
          {showAddToCart && hoverEffect !== 'actions' && (
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ShoppingCartIcon />}
            >
              {addToCartText}
            </Button>
          )}
        </Box>
      </Paper>
    );
  },
};

export default ProductCard;
