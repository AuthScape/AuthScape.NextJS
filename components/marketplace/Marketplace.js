import React, { useEffect, useState } from 'react';
import {apiService} from 'authscape';
import { Checkbox, Typography, Box, Stack, Breadcrumbs, AccordionDetails, AccordionActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router'

const Marketplace = ({setIsLoading, currentUser, oemCompanyId = null, platformId = 1, companyId = null, maxHeightScrolling = 300, cardGridSize = 3, pageSize = 12, smoothScrollEnable = true, cardView = null}) => {

    const router = useRouter();
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(0);
    const [filters, setFilters] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [lastFilterSelected, setLastFilterSelected] = useState(null);

    const addToFilter = (newFilter) => { 
        setFilters(prevFilters => [...prevFilters, newFilter]);
    };

    const removeFromFilter = (category, option) => { 
        setFilters(prevFilters => prevFilters.filter(
            filter => !(filter.category === category && filter.option === option)
          ));          
    }

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&::before': {
          display: 'none',
        },
    }));

    const handleChange = (event, value) => {
      setPage(value);
    };

    const fetchData = async () => {

        setIsLoading(true);
        
        const response = await apiService().post("/Marketplace/Search", {
            platformId: platformId,
            oemCompanyId: oemCompanyId,
            pageNumber: page,
            pageSize: pageSize,
            searchParamFilters: filters,
            lastFilterSelected: lastFilterSelected,
            categoryFilters: categories
        });

        if (response != null && response.status == 200) {
            setCategories(response.data.filters);
            setProducts(response.data.products);
            setPageLength(response.data.pageSize)
            setTotal(response.data.total);

            if (smoothScrollEnable) {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [page, filters]);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    return (
        <Box>
            <Box sx={{paddingLeft:2, fontSize:16, paddingTop:1, paddingBottom:1}}>
                <Grid container spacing={2}>
                    <Grid size={10}>
                        <Box sx={{paddingTop:0}}>

                            {router.query.slug != null &&
                            <p>Post: {router.query.slug[0] + " -> " + router.query.slug[1]}</p>
                            }

                            <Breadcrumbs separator=">" aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href="/" >
                                    All Categories
                                </Link>
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/material-ui/getting-started/installation/"
                                >
                                    Tables
                                </Link>
                                <Typography sx={{ color: "gray" }}>Lounge Chair</Typography>
                            </Breadcrumbs>
                        </Box>
                    </Grid>
                    <Grid size={2}>
                        <Box sx={{textAlign:"right"}}>
                            {page} - {products != null && (products.length * page)} of {total} Results
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
            <Grid container spacing={2} sx={{paddingTop:2, backgroundColor:"#"}}>
                <Grid size={2}>
                    {categories != null && categories.map((category, index) => {
                        return (
                            <Accordion 
                                key={index}
                                expanded={expandedCategories.includes(category.category)}
                                onChange={(event, isExpanded) => {
                                    setExpandedCategories(prev => 
                                        isExpanded 
                                            ? [...prev, category.category] 
                                            : prev.filter(cat => cat !== category.category)
                                    );
                                }}
                                sx={{ boxShadow: 'none', fontSize:14, margin: 0 }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon />} 
                                    aria-controls="panel1-content" 
                                    id="panel1-header" 
                                    sx={{
                                        fontSize:16, 
                                        marginTop:0, 
                                        marginBottom: 0, 
                                        borderTop:"1px solid #e0e0e0", 
                                        marginLeft: -1
                                    }}
                                >
                                    {category.category}
                                </AccordionSummary>
                                <Box sx={{marginTop:0, paddingLeft:1, marginBottom:2, position:"relative", maxHeight: maxHeightScrolling, overflow:"auto"}}>
                                    <Stack >
                                        {category.options.map((filterOption, index) => {
                                            return (
                                                <Box key={index} >
                                                    <Stack direction="row" spacing={0} sx={{alignItems: "center"}}>
                                                        <Box>


                                                            {/* <Box>{filterOption.name}</Box>
                                                            <Box>{filterOption.subcategories.map((subcat) =>
                                                                <Box sx={{paddingLeft:2}}>{subcat.name}</Box>
                                                            )}</Box> */}

                                                            {filterOption.subcategories.length == 0 &&
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            size="small"
                                                                            sx={{padding:0.8, color:"lightgray"}}
                                                                            checked={filters.some(f => 
                                                                                f.category === category.category && 
                                                                                f.option === filterOption.name
                                                                            )}
                                                                            onChange={(event) => {
                                                                                event.stopPropagation();
                                                                                if (event.target.checked) {
                                                                                    setLastFilterSelected({
                                                                                        category: category.category,
                                                                                        option: filterOption.name
                                                                                    });
                                                                                    addToFilter({
                                                                                        category: category.category,
                                                                                        option: filterOption.name
                                                                                    });
                                                                                } else {
                                                                                    removeFromFilter(category.category, filterOption.name);
                                                                                }
                                                                            }} 
                                                                        />
                                                                    }
                                                                    label={<Typography sx={{fontSize:14}}>{filterOption.name}</Typography>} 
                                                                />
                                                            }

                                                            {filterOption.subcategories.length > 0 &&
                                                            <>


                                                                <Accordion>
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls="panel1-content"
                                                                        id="panel1-header">
                                                                        <Typography component="span">{filterOption.name}</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>

                                                                        <Box>{filterOption.subcategories.map((subcat) =>


                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        size="small"
                                                                                        sx={{padding:0.8, color:"lightgray"}}
                                                                                        checked={filters.some(f => 
                                                                                            f.category === category.category && 
                                                                                            f.option === subcat.name
                                                                                        )}
                                                                                        onChange={(event) => {
                                                                                            event.stopPropagation();
                                                                                            if (event.target.checked) {
                                                                                                setLastFilterSelected({
                                                                                                    category: category.category,
                                                                                                    option: subcat.name
                                                                                                });
                                                                                                addToFilter({
                                                                                                    category: category.category,
                                                                                                    option: subcat.name
                                                                                                });
                                                                                            } else {
                                                                                                removeFromFilter(category.category, subcat.name);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                }
                                                                                label={<Typography sx={{fontSize:14}}>{subcat.name}</Typography>} 
                                                                            />


                                                                            // <Box sx={{paddingLeft:2}}>{subcat.name}</Box>
                                                                        
                                                                        
                                                                        
                                                                        )}</Box>

                                                                    </AccordionDetails>
                                                                </Accordion>


                                                                

                                                            </>
                                                            }

                                                            
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            )
                                        })}
                                    </Stack>
                                </Box>
                            </Accordion>
                        )
                    })}
                </Grid>
                <Grid size={10}>
                    <Box sx={{paddingBottom:2}}>
                        <Grid container spacing={2}>
                            {products != null && products.map((product, index) => {
                                let productData = {};
                                for (let index = 0; index < product.length; index++) {
                                    const element = product[index];
                                    productData[element.name] = element.value;
                                }
                                return (
                                <Grid size={cardGridSize} key={index}>
                                    {cardView != null && cardView(productData)}
                                </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                    <Box>
                        <Pagination size="large" count={pageLength} page={page} onChange={handleChange} showFirstButton showLastButton />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

Marketplace.displayName = "Marketplace";

export default Marketplace;