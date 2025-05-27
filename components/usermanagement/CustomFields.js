import React, {useEffect, useState, useRef} from 'react';
import { Box, textAlign } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { IconButton, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiService } from 'authscape';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid2';

export function CustomFields({platformType}) {

    const roleNameRef = useRef(null);
    const [customFields, setCustomFields] = useState([]);
    const [newCustomFieldOpen, setNewCustomFieldOpen] = useState(null);

    const [newTabFieldOpen, setNewTabFieldOpen] = useState(null);
    const [deleteCustomFieldOpen, setDeleteCustomFieldOpen] = useState(null);
    const [deleteCustomTabOpen, setDeleteCustomTabOpen] = useState(null);



    const RefreshFields = async () => {
        let response = await apiService().get("/UserManagement/GetCustomFields?platformType=" + platformType);
        if (response != null && response.status == 200)
        {
            setCustomFields(response.data);
        }
    }

    useEffect(() => {

        RefreshFields();

    }, []);

    const AddNewCustomField = () => {

        const refName = useRef(null);
        const [fieldType, setFieldType] = useState(1);
        const [gridSize, setGridSize] = useState(1);
        const [isRequired, setIsRequired] = useState(false);
        const [isColumnVisibleInDatagrid, setIsColumnVisibleInDatagrid] = useState(false);
        const [tabOptions, setTabOptions] = useState([]);

        const [selectProperties, setSelectProperties] = useState([]);

        const [tabSelection, setTabSelection] = useState(null);

        const refTabName = useRef(null);

        const refreshTabOptions = async () => {
            const customTabResponse = await apiService().get("/UserManagement/GetCustomTabs?platformType=" + platformType);
            
            if (customTabResponse  && customTabResponse.status == 200)
            {
                setTabOptions(customTabResponse.data);
            }
        }

        const fetchCustomField = async () => {

            await refreshTabOptions();

            const customFieldResponse = await apiService().get("/UserManagement/GetCustomField?id=" + newCustomFieldOpen);
            
            if (customFieldResponse != null && customFieldResponse.status == 200)
            {
                refName.current.value = customFieldResponse.data.name;
                setFieldType(customFieldResponse.data.fieldType);
                setIsRequired(customFieldResponse.data.isRequired);
                setGridSize(customFieldResponse.data.gridSize);
                setTabSelection(customFieldResponse.data.tabId ? customFieldResponse.data.tabId : null);
                setIsColumnVisibleInDatagrid(customFieldResponse.data.isColumnOnDatagrid);

                if (customFieldResponse.data.properties != null && customFieldResponse.data.properties != "")
                {
                    setSelectProperties(JSON.parse(customFieldResponse.data.properties));
                }
            }
            
        }

        useEffect(() => {

            if (newCustomFieldOpen)
            {
                // look up the record for this custom field so we can display the values on the components
            if (newCustomFieldOpen != -1) fetchCustomField();
                refreshTabOptions();
            }

        }, [newCustomFieldOpen]);

        return (
        <>
            <Dialog open={newTabFieldOpen != null ? true : false}
                fullWidth={true}
                onClose={() => {
                    setNewTabFieldOpen(null);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {(newTabFieldOpen == -1 && newTabFieldOpen != null) && "Create Tab"}
                    {(newTabFieldOpen != -1 && newTabFieldOpen != null)  && "Edit Tab"}
                </DialogTitle>

                <DialogContent>
                    <TextField inputRef={refTabName} label="Name" variant="outlined" fullWidth={true} InputLabelProps={{ shrink: true }} sx={{paddingBottom:2, marginTop:2}} />
                </DialogContent>

                <DialogActions>
                <Button onClick={() => {
                        setNewTabFieldOpen(null);
                    }}>Cancel</Button>
                <Button onClick={async () => {

                        let id = null;
                        if (newTabFieldOpen != -1) 
                        {
                            id = newTabFieldOpen;
                        }

                        await apiService().post("/UserManagement/CreateTab", {
                            id: id,
                            name: refTabName.current.value,
                            platformType: platformType
                        });

                        await refreshTabOptions();

                        setNewTabFieldOpen(null);
                    }} autoFocus>
                    Add
                </Button>
                </DialogActions>

            </Dialog>

            <Dialog
                open={newCustomFieldOpen}
                onClose={() => {
                    setNewCustomFieldOpen(null);
                }}
                fullWidth={true}
                maxWidth={"md"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                    {(newCustomFieldOpen == -1 && newCustomFieldOpen != null) && "New Custom Field"}
                    {(newCustomFieldOpen != -1 && newCustomFieldOpen != null)  && "Edit Custom Field"}
                    </DialogTitle>
                <DialogContent>

                    <Grid container spacing={2}>
                        <Grid size={(fieldType == 6 || fieldType == 7) ? 6 : 12}>

                            <Box>
                            <TextField inputRef={refName} label="Name" variant="outlined" fullWidth={true} InputLabelProps={{ shrink: true }} sx={{paddingBottom:2, marginTop:2}} />
                            
                            <FormControl fullWidth sx={{paddingBottom:2}}>
                                <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fieldType}
                                    label="Field Type"
                                    onChange={(event) => {
                                        setFieldType(event.target.value);
                                    }}>
                                    <MenuItem value={1}>Text Field</MenuItem>
                                    <MenuItem value={2}>Rich Text Editor</MenuItem>
                                    <MenuItem value={3}>Number</MenuItem>
                                    <MenuItem value={4}>Date</MenuItem>
                                    <MenuItem value={5}>Yes / No</MenuItem>
                                    <MenuItem value={6}>Image</MenuItem>
                                    <MenuItem value={7}>Select</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{paddingBottom:2}}>
                                <FormControl fullWidth>
                                    <InputLabel shrink id="tab-simple-select-label" sx={{
                                        backgroundColor: "white",
                                        px: "3px"
                                    }}>Tabs</InputLabel>
                                    <Select aria-expanded={true}
                                        labelId="tab-simple-select-label"
                                        id="tab-simple-select"
                                        renderValue={(selected) => 
                                            tabOptions.find(t => t.id == selected).name }
                                        value={tabSelection}
                                        label={"tabs"}
                                        
                                        onChange={(event) => {
                                            setTabSelection(event.target.value);
                                        }}>
                                            <MenuItem value={null}> <em>None</em> </MenuItem>
                                            {tabOptions && tabOptions.map((tab) => {
                                                return (
                                                    <MenuItem key={tab.id} value={tab.id}>
                                                        <Stack direction={"row"}  sx={{
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            width: "100%"
                                                        }}>
                                                            <Box>
                                                                <Typography>{tab.name}</Typography>
                                                            </Box>
                                                            {
                                                                <Box>
                                                                    <IconButton color={"error"} onClick={(event) => {
                                                                        event.stopPropagation();
                                                                        setDeleteCustomTabOpen(tab);
                                                                    }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Box>
                                                            }
                                                        </Stack>
                                                    </MenuItem>
                                                )
                                            })}
                                    </Select>
                                </FormControl>
                                <Box sx={{textAlign:"right"}}>
                                    <Button variant="text" onClick={() => {
                                        setNewTabFieldOpen(-1);
                                    }}>Create Tab</Button>
                                </Box>
                            </Box>

                            <FormControlLabel control={<Switch checked={isRequired} onChange={(event) => {
                                setIsRequired(event.target.checked)
                            }} />} label="Is Required" sx={{paddingBottom:2}} />


                            <FormControlLabel control={<Switch checked={isColumnVisibleInDatagrid} onChange={(event) => {
                                setIsColumnVisibleInDatagrid(event.target.checked)
                            }} />} label="Is column visible in datagrid" sx={{paddingBottom:2}} />

                            <FormControl fullWidth sx={{paddingBottom:2}}>
                                <InputLabel id="demo-simple-select-label">Grid Size</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gridSize}
                                    label="Grid Size"
                                    onChange={(event) => {
                                        setGridSize(event.target.value);
                                    }}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                </Select>
                            </FormControl>
                            </Box>

                        </Grid>
                        {(fieldType == 6 || fieldType == 7) &&
                            <Grid size={6}>
                                <Box>
                                    Properties
                                </Box>
                                <Box>
                                    {fieldType == 6 &&
                                    <Box sx={{paddingTop:2}}>

                                        <Grid size={6}>
                                            Image Size
                                        </Grid>
                                        <Grid size={6} sx={{textAlign:"right"}}>
                                            <Button variant="contained"
                                                onClick={() => {

                                                    let newItem = {
                                                        id: Date.now(),
                                                        key: "",
                                                        value: ""
                                                    };

                                                    setSelectProperties(prevItems => {
                                                        return Array.isArray(prevItems) ? [...prevItems, newItem] : [newItem];
                                                    });

                                                }}
                                                >Add Option
                                            </Button>
                                        </Grid>


                                        {selectProperties && selectProperties.map((propObj) => {

                                            return (
                                                <Stack key={propObj.id} direction="row" spacing={1} sx={{paddingTop:2}}>

                                                    <TextField 
                                                        label="Name"
                                                        defaultValue={propObj.name}
                                                        InputLabelProps={{ shrink: true }}
                                                        variant="outlined"
                                                        onChange={(val) => {
                                                            propObj.name = val.currentTarget.value;
                                                        }}
                                                    />
                                                    
                                                    <TextField 
                                                        label="Width"
                                                        defaultValue={propObj.width}
                                                        InputLabelProps={{ shrink: true }}
                                                        variant="outlined"
                                                        onChange={(val) => {
                                                            propObj.width = val.currentTarget.value;
                                                        }}
                                                    />

                                                    <TextField
                                                        label="Height"
                                                        defaultValue={propObj.height}
                                                        InputLabelProps={{ shrink: true }}
                                                        variant="outlined"
                                                        onChange={(val) => {
                                                            propObj.height = val.currentTarget.value;
                                                        }}
                                                    />


                                                    <IconButton aria-label="delete" onClick={() => {

                                                        setSelectProperties(prevItems =>
                                                            prevItems.filter(item => item.id !== propObj.id)
                                                        );
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            )

                                        })}


                                    </Box>
                                    }
                                    
                                    {fieldType == 7 &&
                                    <Box sx={{paddingTop:2}}>
                                        <Box sx={{paddingBottom:1}}>
                                            <Grid container spacing={2}>
                                                <Grid size={6}>
                                                    Select
                                                </Grid>
                                                <Grid size={6} sx={{textAlign:"right"}}>
                                                    <Button variant="contained"
                                                    onClick={() => {

                                                        let newItem = {
                                                            id: Date.now(),
                                                            key: "",
                                                            value: ""
                                                        };

                                                        setSelectProperties(prevItems => {
                                                            return Array.isArray(prevItems) ? [...prevItems, newItem] : [newItem];
                                                        });

                                                    }}
                                                    >Add Option</Button>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        {selectProperties && selectProperties.map((propObj) => {

                                            return (
                                                <Stack key={propObj.id} direction="row" spacing={1} sx={{paddingTop:2}}>
                                                    <TextField label="Key" 
                                                        variant="outlined"
                                                        defaultValue={propObj.key} 
                                                        InputLabelProps={{ shrink: true }} 
                                                        onChange={(val) => {
                                                            propObj.key = val.currentTarget.value;
                                                        }}
                                                        />
                                                    <TextField label="Value" 
                                                        variant="outlined" 
                                                        defaultValue={propObj.value} 
                                                        InputLabelProps={{ shrink: true }} 
                                                        onChange={(val) => {
                                                            propObj.value = val.currentTarget.value;
                                                        }}
                                                        />
                                                    <IconButton aria-label="delete" onClick={() => {

                                                        setSelectProperties(prevItems =>
                                                            prevItems.filter(item => item.id !== propObj.id)
                                                        );
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            )

                                        })}

                                    </Box>
                                    }
                                </Box>
                            </Grid>
                        }
                    </Grid>

                </DialogContent>
                {/* } */}
                <DialogActions>
                <Button onClick={() => {
                        setNewCustomFieldOpen(null);
                    }}>Cancel</Button>
                <Button onClick={async () => {

                        let properties = null;
                        
                        if (selectProperties != null && selectProperties != "")
                        {
                            properties = JSON.stringify(selectProperties);
                        }

                        let id = null;
                        if (newCustomFieldOpen != -1) 
                        {
                            id = newCustomFieldOpen;
                        }

                        await apiService().post("/UserManagement/AddOrUpdateCustomField", {
                            id: id,
                            name: refName.current.value,
                            fieldType: fieldType,
                            customFieldPlatformType: platformType,
                            isRequired: isRequired,
                            isColumnVisibleInDatagrid: isColumnVisibleInDatagrid,
                            gridSize: gridSize,
                            tabSelection: tabSelection,
                            properties: properties
                        });

                        await RefreshFields();

                        setNewCustomFieldOpen(null);


                    }} autoFocus>
                    Update
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
            open={deleteCustomTabOpen}
            onClose={() => setDeleteCustomTabOpen(null)}
        >
            <DialogTitle id="alert-dialog-title">
            Delete {deleteCustomTabOpen && deleteCustomTabOpen.name} tab?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the {deleteCustomTabOpen && deleteCustomTabOpen.name} tab?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  onClick={async (event) => {
                    
                    let response = await apiService().delete("/UserManagement/DeleteCustomTab?id=" + deleteCustomTabOpen.id);
                    
                    refreshTabOptions();
                    setDeleteCustomTabOpen(null);
                }}>
                    Yes
                </Button>
                <Button  onClick={() => {
                setDeleteCustomTabOpen(null)
                }}>No</Button>
            
            </DialogActions>
        </Dialog>
        </>
        )
    }


    return (
        <>
        <Box>
            <Typography variant="h3" gutterBottom>
                Custom Fields
            </Typography>
            
            <Button variant="contained" sx={{width:200, marginTop:2}} onClick={async () => {

                // let response = await apiService().post("/UserManagement/AddPermission", { name: roleNameRef.current.value });
                // if (response != null)
                // {
                //     await RefreshRoles();
                //     // should refresh the getallroles dataset
                // }

                setNewCustomFieldOpen(-1);

            }}>Add Custom Field</Button>

            <TableContainer component={Paper} sx={{marginTop:2}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Field Type</TableCell>
                        <TableCell>Tabs</TableCell>
                        <TableCell>Is Required</TableCell>
                        <TableCell>Grid Size</TableCell>
                        <TableCell>Is Available In Datagrid</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {customFields.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:"pointer" }} onClick={() => {
                            setNewCustomFieldOpen(row.id);
                        }}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.fieldType == 1 && "Text Field"}
                                {row.fieldType == 2 && "Rich Text Editor"}
                                {row.fieldType == 3 && "Number"}
                                {row.fieldType == 4 && "Date"}
                                {row.fieldType == 5 && "Yes / No"}
                                {row.fieldType == 6 && "Image"}
                                {row.fieldType == 7 && "Select"}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.customFieldTab ? row.customFieldTab.name : ""}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.isRequired == true ? "Required" : "Not Required"}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.gridSize}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.isColumnOnDatagrid ? "Yes" : "No"}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <IconButton color={"error"} onClick={(event) => {
                                        
                                        event.stopPropagation();
                                        setDeleteCustomFieldOpen(row);
                                    }
                                }>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {AddNewCustomField()}
        </Box>

        <Dialog
            open={deleteCustomFieldOpen}
            onClose={() => setDeleteCustomFieldOpen(null)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            Delete {deleteCustomFieldOpen && deleteCustomFieldOpen.name} field?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the {deleteCustomFieldOpen && deleteCustomFieldOpen.name} field?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  onClick={async () => {
                    let response = await apiService().delete("/UserManagement/DeleteCustomField?id=" + deleteCustomFieldOpen.id);
                    await RefreshFields();
                    setDeleteCustomFieldOpen(null);
                }}>
                    Yes
                </Button>
                <Button  onClick={() => setDeleteCustomFieldOpen(null)}>No</Button>
            
            </DialogActions>
        </Dialog>
        
        </>
    )
}
