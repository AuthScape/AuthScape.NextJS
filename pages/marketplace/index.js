import React, { useEffect, useState } from 'react';
import {apiService} from 'authscape';
import { Checkbox, TextField, Paper, Typography, Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '../../components/marketplace/card';
import Pagination from '@mui/material/Pagination';

export default function Home({setIsLoading, currentUser}) {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(0);

    const [filters, setFilters] = useState([]);
    


    const addToFilter = (newFilter) => { 
        setFilters(prevFilters => [...prevFilters, newFilter]);
    };

    const removeFromFilter = (category, option) => { 
        setFilters(prevFilters => prevFilters.filter(
            filter => !(filter.category === category && filter.option === option)
          ));          
    }

    const handleChange = (event, value) => {
      setPage(value);
    };

    const fetchData = async () => {

        setIsLoading(true);

        const response = await apiService().post("/Marketplace/Search", {
            pageNumber: page,
            pageSize: 10,
            searchParamFilters: filters
        });

        if (response != null && response.status == 200)
        {
            setCategories(response.data.categories);
            setProducts(response.data.products);
            setPageLength(response.data.pageSize)
            setTotal(response.data.total);
        }

        setIsLoading(false);
    }


    useEffect(() => {

        fetchData();

    }, [page, pageLength, filters]);


    return (
        <Box>
            <Box sx={{paddingLeft:2, fontSize:18}}>
                {total} Found
            </Box>
            <Grid container spacing={2}>
                <Grid size={2}>
                    {categories != null && categories.map((according, index) => {
                        return (
                            <Accordion key={index} defaultExpanded={according.expanded} sx={{ boxShadow: 'none' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{fontWeight:"bold"}}>
                                    {according.name}
                                </AccordionSummary>
                                <Box sx={{paddingLeft:2, paddingRight:3}}>

                                    <Stack>
                                        {according.filters.map((filterOption, index) => {
                                            return (
                                                <Box key={index}>
                                                    <Stack direction="row"
                                                        spacing={1}
                                                        sx={{justifyContent: "space-between", alignItems: "center"}}>
                                                        <Box>
                                                            <FormControlLabel control={<Checkbox defaultChecked={false} onChange={(event) => {

                                                                if (event.target.checked)
                                                                {
                                                                    addToFilter({
                                                                        category: according.name,
                                                                        option: filterOption.name
                                                                    })
                                                                }
                                                                else
                                                                {
                                                                    removeFromFilter(according.name, filterOption.name);
                                                                }
                                                                //alert("clicked: " + filterOption.name + " from " + according.name)
                                                            }} />} label={filterOption.name} />
                                                        </Box>
                                                        <Box sx={{fontSize:12}}>
                                                            {filterOption.available}
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
                                return (
                                <Grid size={3} key={index}>
                                    <Card product={product} />
                                </Grid>
                                )
                            })}

                            
                        </Grid>
                    </Box>

                    <Pagination count={pageLength} page={page} onChange={handleChange} />
                </Grid>
            </Grid>
            
        </Box>
    )
}
