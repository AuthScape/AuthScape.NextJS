/**
 * Marketplace Example Page
 *
 * This demonstrates how to use the MarketplaceStyled component
 * to create a marketplace that matches the furniture store design.
 *
 * Analytics: Click tracking is automatic. When a user clicks a product,
 * the marketplace tracks the click using the trackingId from the search.
 * You can also access the trackClick function if you need custom handling.
 */

import React, { useState } from "react";
import MarketplaceStyled from "../components/marketplace/MarketplaceStyled";
import { Box, Typography, Paper, Chip } from "@mui/material";

export default function MarketplaceExample() {
  const [isLoading, setIsLoading] = useState(false);

  // Custom product card matching the furniture store design
  // The second parameter (trackClick) is optional - click tracking is automatic
  const renderProductCard = (product, trackClick) => (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.2s ease",
        width: "100%",
        height: 340,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e5e5",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
          borderColor: "#ddd",
        },
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          height: 160,
          flexShrink: 0,
          backgroundColor: "#f8f8f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #eee",
        }}
      >
        {product.Image ? (
          <img
            src={product.Image}
            alt={product.Name || "Product"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography sx={{ color: "#bbb", fontSize: 13 }}>No Image</Typography>
        )}

        {/* Condition Badge */}
        {product.Condition && (
          <Chip
            label={product.Condition.toUpperCase()}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#fff",
              color: "#333",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: "0.5px",
              border: "1px solid #ddd",
            }}
          />
        )}
      </Box>

      {/* Product Info */}
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Brand - fixed height */}
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 600,
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            mb: 0.5,
            height: 14,
            overflow: "hidden",
          }}
        >
          {product.Brand || "\u00A0"}
        </Typography>

        {/* Product Name - fixed 2 lines */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#222",
            lineHeight: 1.4,
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: 40,
          }}
        >
          {product.Name || "Untitled Product"}
        </Typography>

        {/* Product Details - fixed height */}
        <Typography
          sx={{
            fontSize: 12,
            color: "#666",
            height: 18,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {[product.Size, product.Color, product.Stock && `Qty: ${product.Stock}`]
            .filter(Boolean)
            .join(" • ") || "\u00A0"}
        </Typography>

        {/* Price - at bottom */}
        <Box sx={{ mt: "auto" }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#c62828" }}>
            {product.Price
              ? `$${parseFloat(product.Price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "\u00A0"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box>
      {/* Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      )}

      <MarketplaceStyled
        setIsLoading={setIsLoading}
        platformId={1}
        pageSize={12}
        renderProductCard={renderProductCard}
        searchPlaceholder="Search for chairs, desks, Herman Miller Aeron..."
        sortOptions={[
          { value: "relevance", label: "Relevance" },
          { value: "price_low", label: "Price: Low to High" },
          { value: "price_high", label: "Price: High to Low" },
          { value: "newest", label: "Newest First" },
          { value: "popular", label: "Most Popular" },
        ]}
        onSortChange={(sort) => console.log("Sort changed:", sort)}
      />
    </Box>
  );
}
