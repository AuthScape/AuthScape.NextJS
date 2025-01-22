import React, { useEffect, useState } from 'react';
import {apiService} from 'authscape';
import { Checkbox, TextField, Paper, Typography, Box, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '../../components/marketplace/card';
import Pagination from '@mui/material/Pagination';
import { backgroundColor, boxShadow, paddingBottom, paddingRight, paddingTop } from '@xstyled/styled-components';

export default function Home({setIsLoading, currentUser}) {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(0);
    const [filters, setFilters] = useState([]);

    const [lastFilterSelected, setLastFilterSelected] = useState(null);

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
            pageSize: 12,
            searchParamFilters: filters,
            lastFilterSelected: lastFilterSelected
        });

        if (response != null && response.status == 200)
        {
            setCategories(response.data.filters);
            setProducts(response.data.products);
            setPageLength(response.data.pageSize)
            setTotal(response.data.total);

            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth' // Optional for smooth scrolling
            });
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
            <Box sx={{paddingLeft:2, fontSize:16, boxShadow:"0 0 1px #ddd", borderBottom: "1px solid #ccc", backgroundColor:"white", paddingTop:1, paddingBottom:1}}>
                <Grid container spacing={2}>
                    <Grid size={10}>
                        <Box sx={{paddingTop:0}}>
                            {page} - {products != null && (products.length * page)} of {total} Results
                        </Box>
                    </Grid>
                    <Grid size={2}>
                        {/* <FormControl fullWidth sx={{paddingRight:1}}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Age"
                                onChange={() => {
                                    
                                }}>
                                <MenuItem value={10}>Alpha</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}
                    </Grid>
                </Grid>
            </Box>
            

            <Grid container spacing={2} sx={{paddingTop:2, backgroundColor:"#"}}>
                <Grid size={2}>
                    {/* {JSON.stringify(filters)} */}
                    {categories != null && categories.map((according, index) => {
                        return (
                            <Accordion key={index} defaultExpanded={according.expanded} sx={{ boxShadow: 'none' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{fontWeight:"bold"}}>
                                    {according.category}
                                </AccordionSummary>
                                <Box sx={{paddingLeft:2, paddingRight:3}}>

                                    <Stack>
                                        {according.options.map((filterOption, index) => {
                                            return (
                                                <Box key={index}>
                                                    <Stack direction="row"
                                                        spacing={1}
                                                        sx={{justifyContent: "space-between", alignItems: "center"}}>
                                                        <Box>
                                                            <FormControlLabel control={<Checkbox defaultChecked={according.category ==  false} onChange={(event) => {

                                                                if (event.target.checked)
                                                                {
                                                                    setLastFilterSelected({
                                                                        category: according.category,
                                                                        option: filterOption
                                                                    });

                                                                    addToFilter({
                                                                        category: according.category,
                                                                        option: filterOption
                                                                    })
                                                                }
                                                                else
                                                                {
                                                                    removeFromFilter(according.category, filterOption);
                                                                }

                                                            }} />} label={filterOption} />
                                                        </Box>
                                                        <Box sx={{fontSize:12}}>
                                                            {/* {filterOption.available} */}
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
