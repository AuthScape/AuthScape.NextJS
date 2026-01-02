/**
 * MarketplaceStyled - A beautifully styled marketplace implementation
 *
 * This component demonstrates how to use the Marketplace render props
 * to create a custom design like the furniture marketplace example.
 *
 * Features:
 * - Clean search bar with icon
 * - "Filters" header with "Clear All" link
 * - Filter categories as collapsible sections
 * - Filter options with counts aligned right
 * - Results header with count and sort dropdown
 * - Promo banner support
 * - Custom product card styling
 */

import React, { useState, useRef, useCallback } from "react";
import Marketplace from "./Marketplace";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  Pagination,
  Paper,
  Divider,
  Link,
  Tooltip,
  Popover,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PaletteIcon from "@mui/icons-material/Palette";

/**
 * CSS Color name to hex mapping for common color names
 */
const CSS_COLORS = {
  // Basic colors
  black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000",
  blue: "#0000ff", yellow: "#ffff00", cyan: "#00ffff", magenta: "#ff00ff",
  // Extended colors
  aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4",
  azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", blanchedalmond: "#ffebcd",
  blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0",
  chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc", crimson: "#dc143c", darkblue: "#00008b", darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00",
  darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff",
  dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222",
  floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080",
  grey: "#808080", greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4",
  indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c",
  lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd",
  lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa",
  lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6",
  maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd",
  mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa",
  mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080",
  oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500",
  orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98",
  paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5",
  peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd",
  powderblue: "#b0e0e6", purple: "#800080", rebeccapurple: "#663399", rosybrown: "#bc8f8f",
  royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460",
  seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0",
  skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090",
  snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c",
  teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0",
  violet: "#ee82ee", wheat: "#f5deb3", whitesmoke: "#f5f5f5", yellowgreen: "#9acd32",
};

/**
 * Get hex color from a color name
 */
const getColorHex = (colorName) => {
  if (!colorName) return null;
  const normalized = colorName.toLowerCase().replace(/[\s-_]/g, "");
  return CSS_COLORS[normalized] || null;
};

/**
 * Convert hex to RGB
 */
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

/**
 * Calculate color distance using weighted Euclidean distance
 * Weights based on human perception of color differences
 */
const colorDistance = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return Infinity;

  // Weighted distance based on human color perception
  const rMean = (rgb1.r + rgb2.r) / 2;
  const dR = rgb1.r - rgb2.r;
  const dG = rgb1.g - rgb2.g;
  const dB = rgb1.b - rgb2.b;

  return Math.sqrt(
    (2 + rMean / 256) * dR * dR +
    4 * dG * dG +
    (2 + (255 - rMean) / 256) * dB * dB
  );
};

/**
 * Find closest matching color names from available options
 */
const findClosestColors = (pickedHex, availableColors, maxResults = 5) => {
  const distances = availableColors
    .map((colorName) => {
      const hex = getColorHex(colorName);
      return {
        name: colorName,
        hex,
        distance: hex ? colorDistance(pickedHex, hex) : Infinity,
      };
    })
    .filter((c) => c.hex !== null)
    .sort((a, b) => a.distance - b.distance);

  return distances.slice(0, maxResults);
};

/**
 * Styled Marketplace Component
 *
 * @param {Object} props
 * @param {Function} props.setIsLoading - Loading state callback
 * @param {number} props.platformId - Platform ID
 * @param {number} props.oemCompanyId - OEM Company ID
 * @param {number} props.pageSize - Products per page
 * @param {Function} props.renderProductCard - Custom product card renderer
 * @param {React.ReactNode} props.promoBanner - Optional promo banner to show above products
 * @param {string} props.searchPlaceholder - Search input placeholder text
 * @param {Array} props.sortOptions - Sort dropdown options [{value, label}]
 * @param {Function} props.onSortChange - Callback when sort changes
 * @param {string} props.currentSort - Current sort value
 */
const MarketplaceStyled = ({
  setIsLoading = () => {},
  platformId = 1,
  oemCompanyId = null,
  pageSize = 12,
  renderProductCard,
  promoBanner,
  searchPlaceholder = "Search for chairs, desks, Herman Miller Aeron...",
  sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ],
  onSortChange,
  currentSort = "relevance",
  ...otherProps
}) => {
  const [sort, setSort] = useState(currentSort);

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSort(newSort);
    if (onSortChange) {
      onSortChange(newSort);
    }
  };

  return (
    <Marketplace
      setIsLoading={setIsLoading}
      platformId={platformId}
      oemCompanyId={oemCompanyId}
      pageSize={pageSize}
      {...otherProps}
    >
      {(props) => {
        const {
          products,
          categories,
          filters,
          total,
          page,
          totalPages,
          setPage,
          toggleFilter,
          clearAllFilters,
          isFilterSelected,
          txtSearchBarRef,
          handleSearch,
          expandedCategories,
          setExpandedCategories,
          openFilterModal,
          minPrice,
          maxPrice,
          setPriceRange,
          clearPriceRange,
          trackClick,
        } = props;

        return (
          <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
            {/* Search Bar - Full Width */}
            <Box sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e0e0e0",
              py: 2,
              px: 3,
            }}>
              <Box sx={{ maxWidth: 1400, mx: "auto" }}>
                <TextField
                  fullWidth
                  placeholder={searchPlaceholder}
                  inputRef={txtSearchBarRef}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSearch} sx={{ color: "#7c4dff" }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 4 }}>
              <Grid container spacing={4}>
                {/* Filters Sidebar */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                    {/* Filters Header */}
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>
                        Filters
                      </Typography>
                      {filters.length > 0 && (
                        <Link
                          component="button"
                          onClick={clearAllFilters}
                          sx={{
                            fontSize: 14,
                            color: "#666",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          Clear All
                        </Link>
                      )}
                    </Box>

                    {/* Price Range Filter */}
                    <Box sx={{ mb: 2 }}>
                      <Typography sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#333",
                        py: 1.5,
                      }}>
                        Price Range
                      </Typography>
                      <PriceRangeFilter
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onPriceRangeChange={setPriceRange}
                        onClearPriceRange={clearPriceRange}
                      />
                      <Divider sx={{ my: 1 }} />
                    </Box>

                    {/* Filter Categories */}
                    {categories?.map((category, idx) => (
                      <FilterCategory
                        key={category.category}
                        category={category}
                        isExpanded={expandedCategories.includes(category.category)}
                        onToggleExpand={() => {
                          setExpandedCategories((prev) =>
                            prev.includes(category.category)
                              ? prev.filter((c) => c !== category.category)
                              : [...prev, category.category]
                          );
                        }}
                        isFilterSelected={isFilterSelected}
                        onToggleFilter={toggleFilter}
                        onShowMore={() => openFilterModal(category.category)}
                        showDivider={idx < categories.length - 1}
                      />
                    ))}
                  </Paper>
                </Grid>

                {/* Products Area */}
                <Grid size={{ xs: 12, md: 9 }}>
                  {/* Results Header */}
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {total.toLocaleString()} Products Found
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Sort by:
                      </Typography>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <Select
                          value={sort}
                          onChange={handleSortChange}
                          sx={{
                            backgroundColor: "#fff",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0e0e0",
                            },
                          }}
                        >
                          {sortOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Promo Banner */}
                  {promoBanner && (
                    <Box sx={{ mb: 3 }}>
                      {promoBanner}
                    </Box>
                  )}

                  {/* Products Grid */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {products?.map((product, index) => (
                      <Box
                        key={index}
                        onClick={() => trackClick(product.Index || product.Id || product.id)}
                      >
                        {renderProductCard ? renderProductCard(product, trackClick) : (
                          <DefaultProductCard product={product} />
                        )}
                      </Box>
                    ))}
                  </Box>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        shape="rounded"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            "&.Mui-selected": {
                              backgroundColor: "#333",
                              color: "#fff",
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      }}
    </Marketplace>
  );
};

/**
 * Filter Category Component
 */
const FilterCategory = ({
  category,
  isExpanded,
  onToggleExpand,
  isFilterSelected,
  onToggleFilter,
  onShowMore,
  showDivider,
}) => {
  const maxVisible = 5;
  const options = category.options || [];
  const visibleOptions = options.slice(0, maxVisible);
  const hasMore = category.hasMoreOptions || options.length > maxVisible || category.totalOptionsCount > maxVisible;

  // Check if this is a color category - use categoryType from API if available, otherwise fallback to name check
  // categoryType === 11 is ColorField enum value
  const isColorCategory = category.categoryType === 11 ||
    category.categoryType === "ColorField" ||
    category.category.toLowerCase() === "color";

  // Get color hex mapping from category (custom colors from backend)
  const customColorMapping = category.colorHexMapping || {};

  return (
    <Box>
      {/* Category Header */}
      <Box
        onClick={onToggleExpand}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          py: 1.5,
          "&:hover": { opacity: 0.8 },
        }}
      >
        <Typography sx={{
          fontWeight: 600,
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#333",
        }}>
          {category.category}
        </Typography>
        {isExpanded ? (
          <ExpandLessIcon sx={{ fontSize: 20, color: "#666" }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: 20, color: "#666" }} />
        )}
      </Box>

      {/* Category Options */}
      <Collapse in={isExpanded}>
        <Box sx={{ pb: 2 }}>
          {/* Color Picker for Color category */}
          {isColorCategory && (
            <ColorPickerFilter
              availableColors={options.map((o) => o.name)}
              customColorMapping={customColorMapping}
              onSelectColor={(colorName) => toggleFilter({
                category: category.category,
                subcategory: "",
                option: colorName,
              })}
              isFilterSelected={(colorName) => isFilterSelected(category.category, colorName, "")}
            />
          )}

          {/* Render options as color swatches or regular checkboxes */}
          {isColorCategory ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {visibleOptions.map((option) => (
                <ColorSwatchOption
                  key={option.name}
                  option={option}
                  customColorMapping={customColorMapping}
                  isSelected={isFilterSelected(category.category, option.name, "")}
                  onToggle={() => toggleFilter({
                    category: category.category,
                    subcategory: "",
                    option: option.name,
                  })}
                />
              ))}
            </Box>
          ) : (
            visibleOptions.map((option) => (
              <FilterOption
                key={option.name}
                option={option}
                isSelected={isFilterSelected(category.category, option.name, "")}
                onToggle={() => toggleFilter({
                  category: category.category,
                  subcategory: "",
                  option: option.name,
                })}
              />
            ))
          )}

          {hasMore && (
            <Typography
              component="button"
              onClick={onShowMore}
              sx={{
                background: "none",
                border: "none",
                color: "#666",
                fontSize: 13,
                cursor: "pointer",
                mt: 1,
                p: 0,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              + Show more
            </Typography>
          )}
        </Box>
      </Collapse>

      {showDivider && <Divider sx={{ my: 1 }} />}
    </Box>
  );

  function toggleFilter(filter) {
    onToggleFilter(filter);
  }
};

/**
 * Color Swatch Option Component
 * @param {Object} option - The color option with name and count
 * @param {Object} customColorMapping - Custom hex mappings from backend (overrides CSS colors)
 * @param {boolean} isSelected - Whether this color is selected
 * @param {Function} onToggle - Callback when color is toggled
 */
const ColorSwatchOption = ({ option, customColorMapping = {}, isSelected, onToggle }) => {
  // First check custom mapping, then fall back to CSS color lookup
  const colorHex = customColorMapping[option.name] || getColorHex(option.name);
  const rgb = colorHex ? hexToRgb(colorHex) : null;
  const isLightColor = rgb && (rgb.r + rgb.g + rgb.b) / 3 > 200;

  return (
    <Tooltip title={`${option.name}${option.count !== undefined ? ` (${option.count})` : ""}`} arrow>
      <Box
        onClick={onToggle}
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: colorHex || "#ccc",
          border: isSelected ? "3px solid #333" : "2px solid #ddd",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s ease",
          boxShadow: isSelected ? "0 0 0 2px #fff, 0 0 0 4px #333" : "none",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: isSelected
              ? "0 0 0 2px #fff, 0 0 0 4px #333"
              : "0 2px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        {isSelected && (
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: isLightColor ? "#333" : "#fff",
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
};

/**
 * Color Picker Filter Component
 * @param {Array} availableColors - Array of color names available as filter options
 * @param {Object} customColorMapping - Custom hex mappings from backend (overrides CSS colors)
 * @param {Function} onSelectColor - Callback when a color is selected
 * @param {Function} isFilterSelected - Function to check if a color is selected
 */
const ColorPickerFilter = ({ availableColors, customColorMapping = {}, onSelectColor, isFilterSelected }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pickedColor, setPickedColor] = useState("#ff0000");
  const [closestColors, setClosestColors] = useState([]);
  const colorInputRef = useRef(null);

  // Helper to get hex for a color name (checks custom mapping first)
  const getHexForColor = (colorName) => customColorMapping[colorName] || getColorHex(colorName);

  // Find closest colors considering custom mapping
  const findClosest = (pickedHex, colors) => {
    const distances = colors
      .map((colorName) => {
        const hex = getHexForColor(colorName);
        return {
          name: colorName,
          hex,
          distance: hex ? colorDistance(pickedHex, hex) : Infinity,
        };
      })
      .filter((c) => c.hex !== null)
      .sort((a, b) => a.distance - b.distance);

    return distances.slice(0, 5);
  };

  const handleOpenPicker = (event) => {
    setAnchorEl(event.currentTarget);
    // Find closest colors for initial color
    const closest = findClosest(pickedColor, availableColors);
    setClosestColors(closest);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setPickedColor(newColor);
    const closest = findClosest(newColor, availableColors);
    setClosestColors(closest);
  };

  const handleSelectClosestColor = (colorName) => {
    onSelectColor(colorName);
    handleClosePicker();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleOpenPicker}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          p: 1,
          borderRadius: 1,
          border: "1px dashed #ccc",
          mb: 1,
          "&:hover": {
            borderColor: "#999",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <PaletteIcon sx={{ fontSize: 18, color: "#666" }} />
        <Typography sx={{ fontSize: 12, color: "#666" }}>
          Pick a color to find matches
        </Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, minWidth: 240 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1.5, color: "#333" }}>
            Pick a Color
          </Typography>

          {/* Color Picker Input */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <input
              ref={colorInputRef}
              type="color"
              value={pickedColor}
              onChange={handleColorChange}
              style={{
                width: 50,
                height: 50,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                padding: 0,
              }}
            />
            <Box>
              <Typography sx={{ fontSize: 12, color: "#666" }}>Selected:</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 500, fontFamily: "monospace" }}>
                {pickedColor.toUpperCase()}
              </Typography>
            </Box>
          </Box>

          {/* Closest Matching Colors */}
          {closestColors.length > 0 && (
            <>
              <Typography sx={{ fontSize: 12, color: "#666", mb: 1 }}>
                Closest available colors:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {closestColors.map((color, index) => (
                  <Box
                    key={color.name}
                    onClick={() => handleSelectClosestColor(color.name)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      borderRadius: 1,
                      cursor: "pointer",
                      backgroundColor: isFilterSelected(color.name) ? "#f0f0f0" : "transparent",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: color.hex,
                        border: "1px solid #ddd",
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontSize: 13, flex: 1 }}>
                      {color.name}
                    </Typography>
                    {index === 0 && (
                      <Typography sx={{ fontSize: 10, color: "#888", fontStyle: "italic" }}>
                        Best match
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </>
          )}

          {closestColors.length === 0 && (
            <Typography sx={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>
              No matching colors found in available filters
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

/**
 * Price Range Filter Component
 * @param {number|null} minPrice - Current minimum price
 * @param {number|null} maxPrice - Current maximum price
 * @param {Function} onPriceRangeChange - Callback when price range changes
 * @param {Function} onClearPriceRange - Callback to clear price range
 */
const PriceRangeFilter = ({ minPrice, maxPrice, onPriceRangeChange, onClearPriceRange }) => {
  const [localMin, setLocalMin] = useState(minPrice ?? "");
  const [localMax, setLocalMax] = useState(maxPrice ?? "");
  const debounceRef = useRef(null);

  // Sync local state with props when URL changes
  React.useEffect(() => {
    setLocalMin(minPrice ?? "");
    setLocalMax(maxPrice ?? "");
  }, [minPrice, maxPrice]);

  // Debounced apply
  const applyPriceRange = useCallback((min, max) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const minVal = min !== "" ? parseFloat(min) : null;
      const maxVal = max !== "" ? parseFloat(max) : null;
      onPriceRangeChange(minVal, maxVal);
    }, 500);
  }, [onPriceRangeChange]);

  const handleMinChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setLocalMin(value);
      applyPriceRange(value, localMax);
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setLocalMax(value);
      applyPriceRange(localMin, value);
    }
  };

  const handleClear = () => {
    setLocalMin("");
    setLocalMax("");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onClearPriceRange();
  };

  const hasValue = localMin !== "" || localMax !== "";

  return (
    <Box sx={{ pb: 2 }}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Min"
          value={localMin}
          onChange={handleMinChange}
          InputProps={{
            startAdornment: (
              <Typography sx={{ color: "#999", fontSize: 14, mr: 0.5 }}>$</Typography>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#bdbdbd" },
            },
            "& input": {
              fontSize: 14,
              py: 1,
              px: 0.5,
            },
          }}
        />
        <TextField
          size="small"
          placeholder="Max"
          value={localMax}
          onChange={handleMaxChange}
          InputProps={{
            startAdornment: (
              <Typography sx={{ color: "#999", fontSize: 14, mr: 0.5 }}>$</Typography>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#bdbdbd" },
            },
            "& input": {
              fontSize: 14,
              py: 1,
              px: 0.5,
            },
          }}
        />
      </Box>
      {hasValue && (
        <Typography
          component="button"
          onClick={handleClear}
          sx={{
            background: "none",
            border: "none",
            color: "#666",
            fontSize: 12,
            cursor: "pointer",
            mt: 1,
            p: 0,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Clear price range
        </Typography>
      )}
    </Box>
  );
};

/**
 * Filter Option Component
 */
const FilterOption = ({ option, isSelected, onToggle }) => {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 0.75,
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f5f5f5" },
        borderRadius: 1,
        px: 0.5,
        mx: -0.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox
          checked={isSelected}
          size="small"
          sx={{
            p: 0,
            color: "#ccc",
            "&.Mui-checked": { color: "#333" },
          }}
        />
        <Typography sx={{ fontSize: 14, color: "#333" }}>
          {option.name}
        </Typography>
      </Box>
      {option.count !== undefined && (
        <Typography sx={{ fontSize: 13, color: "#999" }}>
          {option.count.toLocaleString()}
        </Typography>
      )}
    </Box>
  );
};

/**
 * Default Product Card (fallback if no custom card provided)
 */
const DefaultProductCard = ({ product }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "1px solid #e5e5e5",
        transition: "all 0.2s ease",
        width: "100%",
        height: 340,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              color: "#333",
              px: 1,
              py: 0.25,
              borderRadius: 0.5,
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {product.Condition}
          </Box>
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
            fontWeight: 500,
            fontSize: 14,
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
};

/**
 * Pre-built Promo Banner Component
 */
export const PromoBanner = ({
  icon,
  title,
  description,
  highlight,
  onClick,
}) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 4,
        borderRadius: 2,
        border: "2px solid #333",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s",
        "&:hover": onClick ? {
          borderColor: "#7c4dff",
          transform: "translateY(-2px)",
        } : {},
      }}
    >
      {icon && (
        <Box sx={{ mb: 2, fontSize: 32 }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
      )}
      {highlight && (
        <Typography sx={{ color: "#7c4dff", fontWeight: 500 }}>
          {highlight}
        </Typography>
      )}
    </Paper>
  );
};

export default MarketplaceStyled;

// Export color utilities for use in custom color implementations
export { CSS_COLORS, getColorHex, hexToRgb, colorDistance, findClosestColors };
