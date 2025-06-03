import React, { useEffect, useState, useMemo, useRef } from "react";
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

const Marketplace = ({
  setIsLoading,
  oemCompanyId = null,
  platformId = 1,
  companyId = null,
  maxHeightScrolling = 300,
  cardGridSize = 3,
  pageSize = 12,
  smoothScrollEnable = true,
  cardView = null,
  expandAllCategoriesByDefault = true
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  // Derive state from URL parameters
  const page = useMemo(() => {
    const pageParam = router.query.page;
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [router.query.page]);

  const filters = useMemo(() => {
    return Object.entries(router.query)
      .filter(([key]) => key !== "page")
      .map(([category, value]) => {
        if (typeof value !== "string") return null;
        
        // Handle multiple values per category
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
  const textSearchRef = useRef(null);
  const txtSearchBarRef = useRef(null);

  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState([]);

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

  // Update URL when filters change
  const updateQueryParams = (newParams) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        ...newParams,
        page: 1 // Reset to page 1 when filters change
      }
    }, undefined, { shallow: true });
  };

  // Add a filter to the URL
  const addFilter = (filter) => {
    const value = filter.subcategory 
      ? `${filter.subcategory}--${filter.option}`
      : filter.option;
    
    const currentValue = router.query[filter.category];
    
    // Handle multiple values per category
    let newValue;
    if (currentValue) {
      const values = currentValue.split(',');
      if (!values.includes(value)) {
        newValue = [...values, value].join(',');
      } else {
        return; // Filter already exists
      }
    } else {
      newValue = value;
    }
    
    updateQueryParams({ [filter.category]: newValue });
  };

  // Remove a filter from the URL
  const removeFilter = (filter) => {
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
        delete newQuery.page; // Reset page when filters change
        router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
      }
    }
  };

  // Remove all filters
  const clearAllFilters = () => {
    const newQuery = { ...router.query };
    Object.keys(newQuery).forEach(key => {
      if (key !== "page") {
        delete newQuery[key];
      }
    });
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  const fetchData = async () => {
    if (!router.isReady) return;

    setIsLoading(true);
    
    try {
      const response = await apiService().post("/Marketplace/Search", {
        platformId,
        oemCompanyId,
        pageNumber: page,
        pageSize,
        searchParamFilters: filters,
        categoryFilters: categories,
        textSearch: textSearchRef.current || "",
      });

      if (response?.status === 200) {
        setCategories(response.data.filters);
        setProducts(response.data.products);
        setTotal(response.data.total);
        
        if (smoothScrollEnable) {
          window.scroll({ top: 0, behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize expanded categories from URL
  useEffect(() => {
    if (router.isReady && categories) {
      if (expandAllCategoriesByDefault) {
        // Open all categories
        setExpandedCategories(categories.map(c => c.category));
      } else {
        // Only expand categories with filters in URL
        const filterKeys = Object.keys(router.query).filter(key => key !== "page");
        setExpandedCategories(filterKeys);
      }
    }
  }, [router.isReady, categories, expandAllCategoriesByDefault]);





  // Fetch data when URL changes
  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query]);

  function getGlobalArrayKeys(products) {
    const globalArrayKeys = new Set();

    products.forEach((product) => {
      const groups = {};
      product.forEach(({ name, value }) => {
        if (!groups[name]) groups[name] = [];
        groups[name].push(value);
      });

      Object.keys(groups).forEach((key) => {
        const distinctValues = groups[key].filter(
          (v, idx, arr) =>
            arr.findIndex((x) => JSON.stringify(x) === JSON.stringify(v)) === idx
        );
        if (groups[key].length > 1 && distinctValues.length > 1) {
          globalArrayKeys.add(key);
        }
        if (groups[key].some((v) => Array.isArray(v))) {
          globalArrayKeys.add(key);
        }
      });
    });

    return globalArrayKeys;
  }

  return (
    <Box>
      <Box sx={{ paddingLeft: 2, fontSize: 16, paddingBottom: 1 }}>
        <Grid container spacing={2}>          
          <Grid size={10} sx={{ textAlign: "left", display: "flex", alignItems: "center" }}>
            <TextField
              id="searchbar"
              label="Search for ..."
              variant="outlined"
              inputRef={txtSearchBarRef}
              fullWidth={true}
              onKeyDown={async (event) => {
                if (event.key === "Enter") {
                  textSearchRef.current = event.target.value;
                  await fetchData();
                }
              }}
              sx={{ flex: 1, borderRadius: "0px" }}
            />
            <Button
              variant="contained"
              startIcon={<SearchRoundedIcon />}
              sx={{ height: "100%", borderRadius: "0px", marginLeft: "-1px" }}
              onClick={async () => {
                textSearchRef.current = txtSearchBarRef.current.value;
                await fetchData();
              }}>
              Search
            </Button>
          </Grid>

          <Grid size={2}>
            <Box sx={{ textAlign: "right", paddingTop:2 }}>
              {page} - {products != null && products.length * page} of {total} Results
            </Box>
          </Grid>
          <Grid size={12}>
            {/* Filter Chips */}
            {filters.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>Filters:</Typography>
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
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container={isDesktop} spacing={2}>
        <Grid size={2}>
          {categories != null &&
            categories.map((category) => {
              return (
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
                    {category.category == "Manufacturer" ? "Brand" : category.category}
                  </AccordionSummary>
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
                      {category.options.map((filterOption) => {
                        return (
                          <Box key={filterOption.name}>
                            <Stack direction="row" spacing={0} sx={{ display: "block" }}>
                              <Box>
                                {filterOption.subcategories == null ||
                                filterOption.subcategories.length === 0 ? (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        size="small"
                                        sx={{
                                          paddingLeft: 0.8,
                                          paddingTop: 0,
                                          color: "lightgray",
                                        }}
                                        checked={filters.some(
                                          (f) =>
                                            f.category === category.category &&
                                            f.subcategory === "" &&
                                            f.option === filterOption.name
                                        )}
                                        onChange={(event) => {
                                          const filter = {
                                            category: category.category,
                                            subcategory: "",
                                            option: filterOption.name,
                                          };
                                          event.target.checked
                                            ? addFilter(filter)
                                            : removeFilter(filter);
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography sx={{ fontSize: 14, marginTop: -1 }}>
                                        {filterOption.name}
                                      </Typography>
                                    }
                                  />
                                ) : (
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
                                                checked={filters.some(
                                                  (f) =>
                                                    f.category === category.category &&
                                                    f.subcategory === filterOption.name &&
                                                    f.option === subcat.name
                                                )}
                                                onClick={(event) => event.stopPropagation()}
                                                onChange={(event) => {
                                                  const filter = {
                                                    category: category.category,
                                                    subcategory: filterOption.name,
                                                    option: subcat.name,
                                                  };
                                                  event.target.checked
                                                    ? addFilter(filter)
                                                    : removeFilter(filter);
                                                }}
                                              />
                                            }
                                            label={
                                              <Typography sx={{ fontSize: 14, marginTop: -1 }}>
                                                {subcat.name}
                                              </Typography>
                                            }
                                            onClick={(event) => event.stopPropagation()}
                                          />
                                        </Box>
                                      ))}
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                              </Box>
                            </Stack>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                </Accordion>
              );
            })}
        </Grid>
        <Grid size={10}>
          <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
            <Grid container spacing={2}>
              {products &&
                products.map((product, index) => {
                  const globalArrayKeys = getGlobalArrayKeys(products);

                  // Group fields by key for the individual product.
                  const groups = {};
                  product.forEach(({ name, value }) => {
                    if (!groups[name]) groups[name] = [];
                    groups[name].push(value);
                  });

                  const productData = {};
                  Object.keys(groups).forEach((key) => {
                    // Deduplicate values locally.
                    const distinctValues = groups[key].filter(
                      (v, idx, arr) =>
                        arr.findIndex(
                          (x) => JSON.stringify(x) === JSON.stringify(v)
                        ) === idx
                    );
                    if (globalArrayKeys.has(key)) {
                      // For keys meant to be arrays globally—even if there's only one distinct value—
                      // keep the result as an array.
                      productData[key] = distinctValues;
                    } else {
                      // For keys not flagged as multi‑valued, unwrap if there's only one unique item.
                      productData[key] =
                        distinctValues.length === 1
                          ? distinctValues[0]
                          : distinctValues;
                    }
                  });

                  return (
                    <Grid
                      size={{ sm: 12, md: cardGridSize }}
                      sx={{ width: "100%" }}
                      key={index}>
                      {cardView && cardView(productData)}
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
          <Box sx={{paddingTop: 2, paddingBottom: 2}}>
            <Pagination
              size="large"
              count={Math.ceil(total / pageSize)}
              page={page}
              onChange={(event, value) => {
                router.replace({
                  query: { ...router.query, page: value }
                }, undefined, { shallow: true });
              }}
              showFirstButton
              showLastButton
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Marketplace.displayName = "Marketplace";

export default Marketplace;