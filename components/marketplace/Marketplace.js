import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { apiService } from "authscape";
import {
  Checkbox,
  Typography,
  Box,
  Stack,
  AccordionDetails,
  Chip,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useTheme, useMediaQuery } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Modal component for browsing and searching filter options
 * This is completely isolated from the main component to prevent re-render issues
 */
const FilterOptionsModal = ({
  open,
  onClose,
  category,
  platformId,
  oemCompanyId,
  activeFilters,
  selectedOptions,
  onToggleOption,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const debounceRef = useRef(null);
  const listRef = useRef(null);

  // Fetch options from API
  const fetchOptions = useCallback(async (searchValue, pageNum, append = false) => {
    if (!category) return;

    setLoading(true);
    try {
      const response = await apiService().post("/Marketplace/GetFilterOptions", {
        platformId,
        oemCompanyId,
        filterCategory: category,
        searchTerm: searchValue || null,
        pageNumber: pageNum,
        pageSize: 50,
        selectedOptions: selectedOptions || [],
        activeFilters: activeFilters || []
      });

      if (response?.status === 200) {
        const { options: newOptions, totalCount: total, hasMorePages } = response.data;

        if (append) {
          setOptions(prev => {
            const existingNames = new Set(prev.map(o => o.name));
            const uniqueNewOptions = newOptions.filter(o => !existingNames.has(o.name));
            return [...prev, ...uniqueNewOptions];
          });
        } else {
          setOptions(newOptions || []);
        }

        setTotalCount(total);
        setHasMore(hasMorePages);
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    } finally {
      setLoading(false);
    }
  }, [category, platformId, oemCompanyId, selectedOptions, activeFilters]);

  // Initial load when modal opens
  useEffect(() => {
    if (open && category) {
      setSearchTerm("");
      setOptions([]);
      setPage(1);
      fetchOptions("", 1, false);
    }
  }, [open, category]);

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchOptions(value, 1, false);
    }, 300);
  };

  // Load more options
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchOptions(searchTerm, page + 1, true);
    }
  };

  // Check if option is selected
  const isOptionSelected = (optionName) => {
    return selectedOptions?.includes(optionName) || false;
  };

  // Handle scroll to load more
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
      handleLoadMore();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { minHeight: '60vh', maxHeight: '80vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography variant="h6" component="span">
          {category}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3, pb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder={`Search ${category?.toLowerCase()}...`}
          value={searchTerm}
          onChange={handleSearchChange}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchTerm("");
                    fetchOptions("", 1, false);
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {totalCount} option{totalCount !== 1 ? 's' : ''} available
          {selectedOptions?.length > 0 && ` - ${selectedOptions.length} selected`}
        </Typography>
      </Box>

      <Divider />

      <DialogContent
        ref={listRef}
        onScroll={handleScroll}
        sx={{ p: 0 }}
      >
        {options.length === 0 && !loading ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              {searchTerm ? `No results for "${searchTerm}"` : 'No options available'}
            </Typography>
          </Box>
        ) : (
          <List dense>
            {options.map((option) => (
              <ListItem key={option.name} disablePadding>
                <ListItemButton
                  onClick={() => onToggleOption(category, option.name)}
                  dense
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Checkbox
                      edge="start"
                      checked={isOptionSelected(option.name)}
                      tabIndex={-1}
                      disableRipple
                      size="small"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={option.name}
                    secondary={option.count !== undefined ? `${option.count} product${option.count !== 1 ? 's' : ''}` : null}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {hasMore && !loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Button onClick={handleLoadMore} size="small">
              Load more...
            </Button>
          </Box>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Custom hook that exposes all marketplace state and actions.
 * Use this hook to build completely custom UIs while leveraging the marketplace logic.
 */
export const useMarketplace = ({
  platformId = 1,
  oemCompanyId = null,
  pageSize = 12,
  onLoadingChange = () => {},
  smoothScrollEnable = true,
  priceField = "Price",
}) => {
  const router = useRouter();

  // Derive state from URL parameters
  const page = useMemo(() => {
    const pageParam = router.query.page;
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [router.query.page]);

  // Price range from URL
  const minPrice = useMemo(() => {
    const param = router.query.minPrice;
    return param ? parseFloat(param) : null;
  }, [router.query.minPrice]);

  const maxPrice = useMemo(() => {
    const param = router.query.maxPrice;
    return param ? parseFloat(param) : null;
  }, [router.query.maxPrice]);

  const filters = useMemo(() => {
    return Object.entries(router.query)
      .filter(([key]) => key !== "page" && key !== "minPrice" && key !== "maxPrice")
      .map(([category, value]) => {
        if (typeof value !== "string") return null;

        const values = value.split(',');
        return values.map(val => {
          const [subcategory, option] = val.includes("--")
            ? val.split("--")
            : ["", val];
          return { category, subcategory, option };
        });
      })
      .filter(Boolean)
      .flat();
  }, [router.query]);

  // Local UI states
  const textSearchRef = useRef("");
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  // Update URL when filters change
  const updateQueryParams = useCallback((newParams) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        ...newParams,
        page: 1
      }
    }, undefined, { shallow: true });
  }, [router]);

  // Add a filter to the URL
  const addFilter = useCallback((filter) => {
    const value = filter.subcategory
      ? `${filter.subcategory}--${filter.option}`
      : filter.option;

    const currentValue = router.query[filter.category];

    let newValue;
    if (currentValue) {
      const values = currentValue.split(',');
      if (!values.includes(value)) {
        newValue = [...values, value].join(',');
      } else {
        return;
      }
    } else {
      newValue = value;
    }

    updateQueryParams({ [filter.category]: newValue });
  }, [router.query, updateQueryParams]);

  // Remove a filter from the URL
  const removeFilter = useCallback((filter) => {
    const value = filter.subcategory
      ? `${filter.subcategory}--${filter.option}`
      : filter.option;

    const currentValue = router.query[filter.category];

    if (currentValue) {
      const values = currentValue.split(',');
      const newValues = values.filter(v => v !== value);

      if (newValues.length > 0) {
        updateQueryParams({ [filter.category]: newValues.join(',') });
      } else {
        const newQuery = { ...router.query };
        delete newQuery[filter.category];
        delete newQuery.page;
        router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
      }
    }
  }, [router, updateQueryParams]);

  // Toggle filter (add if not exists, remove if exists)
  const toggleFilter = useCallback((filter) => {
    const isSelected = filters.some(
      (f) => f.category === filter.category &&
        f.subcategory === (filter.subcategory || "") &&
        f.option === filter.option
    );

    if (isSelected) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }
  }, [filters, addFilter, removeFilter]);

  // Remove all filters
  const clearAllFilters = useCallback(() => {
    const newQuery = { ...router.query };
    Object.keys(newQuery).forEach(key => {
      if (key !== "page") {
        delete newQuery[key];
      }
    });
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  }, [router]);

  // Set page
  const setPage = useCallback((newPage) => {
    router.replace({
      query: { ...router.query, page: newPage }
    }, undefined, { shallow: true });
  }, [router]);

  // Set text search
  const setTextSearch = useCallback((text) => {
    textSearchRef.current = text;
  }, []);

  // Set price range
  const setPriceRange = useCallback((min, max) => {
    const newQuery = { ...router.query, page: 1 };

    if (min !== null && min !== undefined && min !== "") {
      newQuery.minPrice = min;
    } else {
      delete newQuery.minPrice;
    }

    if (max !== null && max !== undefined && max !== "") {
      newQuery.maxPrice = max;
    } else {
      delete newQuery.maxPrice;
    }

    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  }, [router]);

  // Clear price range
  const clearPriceRange = useCallback(() => {
    const newQuery = { ...router.query };
    delete newQuery.minPrice;
    delete newQuery.maxPrice;
    delete newQuery.page;
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  }, [router]);

  // Perform search
  const search = useCallback(async () => {
    if (!router.isReady) return;

    setIsLoading(true);
    onLoadingChange(true);

    try {
      const response = await apiService().post("/Marketplace/Search", {
        platformId,
        oemCompanyId,
        pageNumber: page,
        pageSize,
        searchParamFilters: filters,
        categoryFilters: categories,
        textSearch: textSearchRef.current || "",
        minPrice: minPrice,
        maxPrice: maxPrice,
        priceField: priceField,
      });

      if (response?.status === 200) {
        setCategories(response.data.filters);
        setProducts(response.data.products);
        setTotal(response.data.total);
        setTrackingId(response.data.trackingId);

        if (smoothScrollEnable) {
          window.scroll({ top: 0, behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      onLoadingChange(false);
    }
  }, [router.isReady, platformId, oemCompanyId, page, pageSize, filters, categories, smoothScrollEnable, onLoadingChange, minPrice, maxPrice, priceField]);

  // Fetch data when URL changes
  useEffect(() => {
    if (router.isReady) {
      search();
    }
  }, [router.isReady, router.query]);

  // Check if a filter option is selected
  const isFilterSelected = useCallback((category, option, subcategory = "") => {
    return filters.some(
      (f) => f.category === category && f.subcategory === subcategory && f.option === option
    );
  }, [filters]);

  // Get selected options for a category
  const getSelectedOptionsForCategory = useCallback((categoryName) => {
    return filters
      .filter(f => f.category === categoryName && !f.subcategory)
      .map(f => f.option);
  }, [filters]);

  // Get active filters excluding a specific category
  const getActiveFiltersExcludingCategory = useCallback((categoryName) => {
    return filters.filter(f => f.category !== categoryName);
  }, [filters]);

  // Track a product click (fire-and-forget)
  const trackClick = useCallback((productId) => {
    if (!trackingId || !productId) return;

    // Fire-and-forget API call
    apiService().post("/Marketplace/Clicked", null, {
      params: {
        trackingId: trackingId,
        productOrServiceId: productId
      }
    }).catch(() => {
      // Silently fail - analytics should never break the user experience
    });
  }, [trackingId]);

  // Transform raw product data into usable format
  const transformProduct = useCallback((product) => {
    const groups = {};
    product.forEach(({ name, value }) => {
      if (!groups[name]) groups[name] = [];
      groups[name].push(value);
    });

    const productData = {};
    Object.keys(groups).forEach((key) => {
      const distinctValues = groups[key].filter(
        (v, idx, arr) =>
          arr.findIndex((x) => JSON.stringify(x) === JSON.stringify(v)) === idx
      );
      productData[key] = distinctValues.length === 1 ? distinctValues[0] : distinctValues;
    });

    return productData;
  }, []);

  // Get transformed products
  const transformedProducts = useMemo(() => {
    if (!products) return [];
    return products.map(transformProduct);
  }, [products, transformProduct]);

  return {
    // State
    page,
    filters,
    categories,
    products: transformedProducts,
    rawProducts: products,
    total,
    isLoading,
    textSearch: textSearchRef.current,
    totalPages: Math.ceil(total / pageSize),
    pageSize,
    minPrice,
    maxPrice,
    trackingId,

    // Actions
    addFilter,
    removeFilter,
    toggleFilter,
    clearAllFilters,
    setPage,
    setTextSearch,
    search,
    isFilterSelected,
    getSelectedOptionsForCategory,
    getActiveFiltersExcludingCategory,
    setPriceRange,
    clearPriceRange,
    trackClick,

    // Config
    platformId,
    oemCompanyId,
    priceField,
  };
};

/**
 * Marketplace component with customizable render props for full design flexibility.
 *
 * @param {Object} props
 * @param {Function} props.setIsLoading - Callback when loading state changes
 * @param {number} props.platformId - Platform ID for API calls
 * @param {number} props.oemCompanyId - OEM Company ID for API calls
 * @param {number} props.pageSize - Number of products per page
 * @param {boolean} props.smoothScrollEnable - Enable smooth scroll on page change
 * @param {boolean} props.expandAllCategoriesByDefault - Expand all filter categories by default
 *
 * RENDER PROPS (for full customization):
 * @param {Function} props.renderLayout - Custom layout wrapper: (props) => JSX
 * @param {Function} props.renderSearchBar - Custom search bar: (props) => JSX
 * @param {Function} props.renderResultsHeader - Custom results header: (props) => JSX
 * @param {Function} props.renderActiveFilters - Custom active filters display: (props) => JSX
 * @param {Function} props.renderFiltersPanel - Custom entire filters panel: (props) => JSX
 * @param {Function} props.renderFilterCategory - Custom filter category: (props) => JSX
 * @param {Function} props.renderFilterOption - Custom filter option: (props) => JSX
 * @param {Function} props.renderProductGrid - Custom product grid wrapper: (props) => JSX
 * @param {Function} props.renderProductCard - Custom product card: (productData) => JSX (alias: cardView)
 * @param {Function} props.renderPagination - Custom pagination: (props) => JSX
 * @param {Function} props.renderEmpty - Custom empty state: () => JSX
 * @param {Function} props.renderLoading - Custom loading state: () => JSX
 * @param {React.ReactNode} props.children - Function as child pattern: (marketplaceProps) => JSX
 */
const Marketplace = ({
  setIsLoading = () => {},
  oemCompanyId = null,
  platformId = 1,
  companyId = null,
  maxHeightScrolling = 300,
  cardGridSize = 3,
  pageSize = 12,
  smoothScrollEnable = true,
  expandAllCategoriesByDefault = true,

  // Render props for customization
  renderLayout,
  renderSearchBar,
  renderResultsHeader,
  renderActiveFilters,
  renderFiltersPanel,
  renderFilterCategory,
  renderFilterOption,
  renderProductGrid,
  renderProductCard,
  renderPagination,
  renderEmpty,
  renderLoading,
  renderPromoBanner,

  // Legacy prop (alias for renderProductCard)
  cardView = null,

  // Children as function pattern
  children,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  // Use the marketplace hook for all state management
  const marketplace = useMarketplace({
    platformId,
    oemCompanyId,
    pageSize,
    onLoadingChange: setIsLoading,
    smoothScrollEnable,
  });

  const {
    page,
    filters,
    categories,
    products,
    rawProducts,
    total,
    isLoading,
    totalPages,
    addFilter,
    removeFilter,
    toggleFilter,
    clearAllFilters,
    setPage,
    setTextSearch,
    search,
    isFilterSelected,
    getSelectedOptionsForCategory,
    getActiveFiltersExcludingCategory,
    minPrice,
    maxPrice,
    setPriceRange,
    clearPriceRange,
    trackClick,
    trackingId,
  } = marketplace;

  // Local UI states
  const txtSearchBarRef = useRef(null);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState([]);

  // Modal state for filter options browsing
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterModalCategory, setFilterModalCategory] = useState(null);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  // Open the filter options modal for a category
  const openFilterModal = useCallback((categoryName) => {
    setFilterModalCategory(categoryName);
    setFilterModalOpen(true);
  }, []);

  // Close the filter options modal
  const closeFilterModal = useCallback(() => {
    setFilterModalOpen(false);
    setFilterModalCategory(null);
  }, []);

  // Toggle a filter option from the modal
  const handleModalToggleOption = useCallback((categoryName, optionName) => {
    toggleFilter({
      category: categoryName,
      subcategory: "",
      option: optionName,
    });
  }, [toggleFilter]);

  // Initialize expanded categories from URL
  useEffect(() => {
    if (router.isReady && categories) {
      if (expandAllCategoriesByDefault) {
        setExpandedCategories(categories.map(c => c.category));
      } else {
        const filterKeys = Object.keys(router.query).filter(key => key !== "page");
        setExpandedCategories(filterKeys);
      }
    }
  }, [router.isReady, categories, expandAllCategoriesByDefault, router.query]);

  // Handle search
  const handleSearch = async () => {
    setTextSearch(txtSearchBarRef.current?.value || "");
    await search();
  };

  // ============================================
  // Props objects for render props
  // ============================================

  const searchBarProps = {
    inputRef: txtSearchBarRef,
    onSearch: handleSearch,
    onKeyDown: async (event) => {
      if (event.key === "Enter") {
        await handleSearch();
      }
    },
  };

  const resultsHeaderProps = {
    page,
    pageSize,
    total,
    productsCount: products?.length || 0,
  };

  const activeFiltersProps = {
    filters,
    onRemoveFilter: removeFilter,
    onClearAll: clearAllFilters,
  };

  const filtersPanelProps = {
    categories,
    filters,
    expandedCategories,
    setExpandedCategories,
    expandedSubcategories,
    setExpandedSubcategories,
    onAddFilter: addFilter,
    onRemoveFilter: removeFilter,
    onToggleFilter: toggleFilter,
    isFilterSelected,
    openFilterModal,
    maxHeightScrolling,
  };

  const productGridProps = {
    products,
    rawProducts,
    cardGridSize,
  };

  const paginationProps = {
    page,
    totalPages,
    total,
    onPageChange: setPage,
  };

  // Extend marketplace object with UI-specific props
  const marketplaceProps = {
    ...marketplace,
    // UI State
    expandedCategories,
    setExpandedCategories,
    expandedSubcategories,
    setExpandedSubcategories,
    filterModalOpen,
    filterModalCategory,
    openFilterModal,
    closeFilterModal,
    // Refs
    txtSearchBarRef,
    // Handlers
    handleSearch,
    handleModalToggleOption,
    // Props for sub-components
    searchBarProps,
    resultsHeaderProps,
    activeFiltersProps,
    filtersPanelProps,
    productGridProps,
    paginationProps,
    // Config
    maxHeightScrolling,
    cardGridSize,
    isDesktop,
  };

  // ============================================
  // If children function is provided, use render props pattern
  // ============================================
  if (typeof children === 'function') {
    return children(marketplaceProps);
  }

  // ============================================
  // Default renderers
  // ============================================

  // Default search bar
  const defaultRenderSearchBar = () => (
    <Grid size={10} sx={{ textAlign: "left", display: "flex", alignItems: "center" }}>
      <TextField
        id="searchbar"
        label="Search for ..."
        variant="outlined"
        inputRef={txtSearchBarRef}
        fullWidth={true}
        onKeyDown={searchBarProps.onKeyDown}
        sx={{ flex: 1, borderRadius: "0px" }}
      />
      <Button
        variant="contained"
        startIcon={<SearchRoundedIcon />}
        sx={{ height: "100%", borderRadius: "0px", marginLeft: "-1px" }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Grid>
  );

  // Default results header
  const defaultRenderResultsHeader = () => (
    <Grid size={2}>
      <Box sx={{ textAlign: "right", paddingTop: 2 }}>
        {page} - {products != null && products.length * page} of {total} Results
      </Box>
    </Grid>
  );

  // Default active filters
  const defaultRenderActiveFilters = () => {
    if (filters.length === 0) return null;

    return (
      <Grid size={12}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ marginRight: 1, marginBottom: 1 }}>Filters:</Typography>
          {filters.map((filter, index) => (
            <Chip
              key={`${filter.category}-${filter.subcategory}-${filter.option}-${index}`}
              label={
                filter.subcategory
                  ? `${filter.category}: ${filter.subcategory} - ${filter.option}`
                  : `${filter.category}: ${filter.option}`
              }
              onDelete={() => removeFilter(filter)}
              deleteIcon={<ClearIcon />}
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
          <Chip
            label="Clear All"
            onClick={clearAllFilters}
            variant="outlined"
            sx={{ marginBottom: 1 }}
          />
        </Box>
      </Grid>
    );
  };

  // Default filter option renderer
  const defaultRenderFilterOption = (category, filterOption) => {
    if (filterOption.subcategories == null || filterOption.subcategories.length === 0) {
      return (
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{
                paddingLeft: 0.8,
                paddingTop: 0,
                color: "lightgray",
              }}
              checked={isFilterSelected(category.category, filterOption.name, "")}
              onChange={(event) => {
                const filter = {
                  category: category.category,
                  subcategory: "",
                  option: filterOption.name,
                };
                event.target.checked ? addFilter(filter) : removeFilter(filter);
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: 14, marginTop: -1 }}>
              {filterOption.name}
              {filterOption.count !== undefined && (
                <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary', ml: 0.5 }}>
                  ({filterOption.count})
                </Typography>
              )}
            </Typography>
          }
        />
      );
    }

    // With subcategories
    return (
      <Accordion
        expanded={expandedSubcategories.includes(filterOption.name)}
        onChange={(event, isExpanded) => {
          event.stopPropagation();
          setExpandedSubcategories((prev) =>
            isExpanded
              ? [...prev, filterOption.name]
              : prev.filter((name) => name !== filterOption.name)
          );
        }}
        sx={{ marginTop: -2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ paddingTop: 0, marginTop: -1 }}
        >
          <Typography component="span">
            {filterOption.name}
            {filterOption.count !== undefined && (
              <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary', ml: 0.5 }}>
                ({filterOption.count})
              </Typography>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ marginTop: -1 }}>
          {filterOption.subcategories.map((subcat) => (
            <Box key={subcat.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      paddingLeft: 0.8,
                      paddingTop: 0,
                      color: "lightgray",
                    }}
                    checked={isFilterSelected(category.category, subcat.name, filterOption.name)}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => {
                      const filter = {
                        category: category.category,
                        subcategory: filterOption.name,
                        option: subcat.name,
                      };
                      event.target.checked ? addFilter(filter) : removeFilter(filter);
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, marginTop: -1 }}>
                    {subcat.name}
                    {subcat.count !== undefined && (
                      <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary', ml: 0.5 }}>
                        ({subcat.count})
                      </Typography>
                    )}
                  </Typography>
                }
                onClick={(event) => event.stopPropagation()}
              />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    );
  };

  // Default filter category renderer
  const defaultRenderFilterCategory = (category) => {
    const maxVisibleOptions = 10;
    const displayOptions = category.options?.slice(0, maxVisibleOptions) || [];
    const hasMoreOptions = category.hasMoreOptions || (category.options?.length > maxVisibleOptions) || category.totalOptionsCount > maxVisibleOptions;

    return (
      <Box
        sx={{
          marginTop: 0,
          paddingLeft: 1,
          marginBottom: 2,
          paddingTop: 1,
          position: "relative",
          maxHeight: maxHeightScrolling,
          overflow: "auto",
        }}
      >
        <Stack>
          {displayOptions.map((filterOption) => (
            <Box key={filterOption.name}>
              <Stack direction="row" spacing={0} sx={{ display: "block" }}>
                <Box>
                  {renderFilterOption
                    ? renderFilterOption({ category, option: filterOption, isSelected: isFilterSelected(category.category, filterOption.name, ""), onToggle: () => toggleFilter({ category: category.category, subcategory: "", option: filterOption.name }) })
                    : defaultRenderFilterOption(category, filterOption)
                  }
                </Box>
              </Stack>
            </Box>
          ))}

          {hasMoreOptions && (
            <Button
              size="small"
              onClick={() => openFilterModal(category.category)}
              sx={{
                mt: 1,
                textTransform: 'none',
                justifyContent: 'flex-start',
                pl: 0.8,
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
              startIcon={<SearchRoundedIcon fontSize="small" />}
            >
              Show all {category.totalOptionsCount > 0 ? `${category.totalOptionsCount} ` : ''}options...
            </Button>
          )}
        </Stack>
      </Box>
    );
  };

  // Default filters panel
  const defaultRenderFiltersPanel = () => (
    <Grid size={2}>
      {categories != null &&
        categories.map((category) => (
          <Accordion
            key={category.category}
            expanded={expandedCategories.includes(category.category)}
            onChange={(event, isExpanded) => {
              setExpandedCategories((prev) =>
                isExpanded
                  ? [...prev, category.category]
                  : prev.filter((cat) => cat !== category.category)
              );
            }}
            sx={{ boxShadow: "none", fontSize: 14, margin: 0 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                fontSize: 16,
                marginTop: 2,
                marginBottom: 0,
                borderTop: "1px solid #e0e0e0",
                marginLeft: -1,
              }}
            >
              {category.category}
              {category.totalOptionsCount > 0 && (
                <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary', ml: 1 }}>
                  ({category.totalOptionsCount})
                </Typography>
              )}
            </AccordionSummary>
            {renderFilterCategory
              ? renderFilterCategory({ category, ...filtersPanelProps })
              : defaultRenderFilterCategory(category)
            }
          </Accordion>
        ))}
    </Grid>
  );

  // Default product grid
  const defaultRenderProductGrid = () => {
    const productCardRenderer = renderProductCard || cardView;

    return (
      <Grid size={10}>
        <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
          <Grid container spacing={2}>
            {products &&
              products.map((productData, index) => (
                <Grid
                  size={{ sm: 12, md: Number(productData.CardSize) || cardGridSize }}
                  sx={{ width: "100%" }}
                  key={index}
                >
                  {productCardRenderer && productCardRenderer(productData)}
                </Grid>
              ))}
          </Grid>
        </Box>
        {renderPagination ? renderPagination(paginationProps) : defaultRenderPagination()}
      </Grid>
    );
  };

  // Default pagination
  const defaultRenderPagination = () => (
    <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
      <Pagination
        size="large"
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        showFirstButton
        showLastButton
      />
    </Box>
  );

  // Default layout
  const defaultRenderLayout = () => (
    <Box>
      <FilterOptionsModal
        open={filterModalOpen}
        onClose={closeFilterModal}
        category={filterModalCategory}
        platformId={platformId}
        oemCompanyId={oemCompanyId}
        activeFilters={filterModalCategory ? getActiveFiltersExcludingCategory(filterModalCategory) : []}
        selectedOptions={filterModalCategory ? getSelectedOptionsForCategory(filterModalCategory) : []}
        onToggleOption={handleModalToggleOption}
      />

      <Box sx={{ paddingLeft: 2, fontSize: 16, paddingBottom: 1 }}>
        <Grid container spacing={2}>
          {renderSearchBar ? renderSearchBar(searchBarProps) : defaultRenderSearchBar()}
          {renderResultsHeader ? renderResultsHeader(resultsHeaderProps) : defaultRenderResultsHeader()}
          {renderActiveFilters ? renderActiveFilters(activeFiltersProps) : defaultRenderActiveFilters()}
        </Grid>
      </Box>

      <Grid container={isDesktop} spacing={2}>
        {renderFiltersPanel ? renderFiltersPanel(filtersPanelProps) : defaultRenderFiltersPanel()}
        {renderProductGrid ? renderProductGrid(productGridProps) : defaultRenderProductGrid()}
      </Grid>
    </Box>
  );

  // Use custom layout or default
  if (renderLayout) {
    return renderLayout(marketplaceProps);
  }

  return defaultRenderLayout();
};

Marketplace.displayName = "Marketplace";

export default Marketplace;
