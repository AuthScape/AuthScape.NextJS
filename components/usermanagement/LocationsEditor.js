import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Autocomplete, Avatar, Button, Drawer } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useForm, Controller } from 'react-hook-form';
import { EditorState, ContentState } from 'draft-js';
import { Tab, Tabs, Stack } from '@mui/material';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { apiService, NewMappingColumn } from 'authscape';
import Grid from '@mui/material/Grid2';

// remove when publishing
import {renderCustomField, renderSystemField } from './EditorFields';


const LocationEditor = forwardRef(({locationId = null, platformType, onSaved = null, onCustomTabs = null}, ref) => {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const [editors, setEditors] = useState({});

  const refShouldClose = useRef(false);
  const refSubmitButton = useRef(null);

  const [selectedRoles, setSelectedRole] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const [company, setCompany] = useState(null);

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [inputCompanyValue, setInputCompanyValue] = useState('');

  const [customFields, setCustomFields] = useState([]);

  const [user, setUser] = useState(null);
  const [customTabs, setCustomTabs] = useState(null);

  const [tabOptions, setTabOptions] = useState([]);


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };

  useEffect(() => {

    const fetchData = async () => {

      await refreshTabOptions();

      let response = await apiService().get("/UserManagement/GetLocation?locationId=" + locationId);
      if (response != null && response.status == 200)
      {
        setLocation(response.data);

        setCompany(response.data.company);

        if (response.data.customFields != null)
        {
            setCustomFields(response.data.customFields);
        }
        setEditors({...editors});
      }

        // assign all selected roles
        if (response.data.roles != null)
        {
          let roleNames = [];
          for (let index = 0; index < response.data.roles.length; index++) {
            const role = response.data.roles[index];
            
            roleNames.push(role);
          }
          setSelectedRole(roleNames);
        }

        // assign all selected permissions
        if (response.data.permissions != null)
        {
          let permissionNames = [];
          for (let index = 0; index < response.data.permissions.length; index++) {
            const permission = response.data.permissions[index];
            
            permissionNames.push(permission);
          }
          setSelectedPermission(permissionNames);
        }
    }

    if (locationId != -1)
    {
      fetchData();
    }
      

  }, [locationId])


  useEffect(() => {

    if (locationId != null && onCustomTabs != null)
    {
      const fetchData = async () => {
        let tabs = await onCustomTabs(platformType, locationId)
        if (tabs != null)
        {
          setCustomTabs(tabs);
        }
      }
      fetchData();
    }

  }, [locationId]);

  const fields = [
    "Title",
    "Address",
    "City",
    "State",
    "ZipCode",
    "IsDeactivated"
  ]

  const refreshTabOptions = async () => {
      const customTabResponse = await apiService().get("/UserManagement/GetCustomTabs?platformType=" + platformType);
      if (customTabResponse != null && customTabResponse.status == 200)
      {
          let dataElement = customTabResponse.data; 
          setTabOptions(dataElement);

          if (dataElement.length > 0)
          {
            setTabValue(dataElement[0].id);
          }
      }
  }

  useEffect(() => {

    if (inputCompanyValue != null)
    {
      const fetchData = async () => {

        const response = await apiService().get("/UserManagement/GetCompaniesForLocation?searchBName=" + inputCompanyValue);
        if (response != null && response.status == 200)
        {
          setLocations(response.data)
        }

      }
      fetchData();
    }

  }, [inputCompanyValue]);


  const saveChanges = (shouldClose) => {
    refShouldClose.current = shouldClose;
    refSubmitButton.current.click();
  }


  useImperativeHandle(ref, () => ({
    saveChanges,
  }));

  return (
      <Box>

          <form onSubmit={handleSubmit(async (data) => {
            
            let userCustomFields = [];

            customFields && customFields.forEach(async (customField) => {

              let newValue = 
              // customField.customFieldType == 2 ? 
              // draftToHTML(editors[customField.customFieldId].getCurrentContent()) 
              // : 
              data[customField.customFieldId];
              if (newValue != null && typeof newValue === 'string')
              {
                userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: newValue.toString()
                });
              }
              else if (newValue instanceof Blob)
              {
                  const newBlob = new Blob([newValue], { type: newValue.type });
                
                  const data = new FormData();
                  data.append("file", newBlob);
                  data.append("identifier", locationId);

                  data.append("platformType", 3); // company
                  data.append("customFieldId", customField.customFieldId); 

                  const response = await apiService().post("/UserManagement/UploadCustomFieldImage", data);
                  if (response != null && response.status == 200)
                  {

                    userCustomFields.push({
                        customFieldId: customField.customFieldId,
                        name: customField.name,
                        isRequired: customField.isRequired,
                        customFieldType: customField.customFieldType,
                        value: response.data
                    });

                  }
              }
                
            });

            let response = await apiService().post("/UserManagement/UpdateLocation", {
                id: locationId,
                companyId: company != null ? company.id : null,
                title: data.Title,

                address: data.Address,
                city: data.City,
                state: data.State,
                postalCode: data.ZipCode,

                isDeactivated: !data.IsActive,
                customFields: userCustomFields
            });

            if (response != null && response.status == 200)
            {
                if (onSaved != null)
                {
                  onSaved(refShouldClose.current, 3, locationId, response.data);
                }
            }

          })} noValidate autoComplete="off">
            
            <Grid container spacing={2} sx={{paddingTop:2}}>
              <Grid size={4} sx={{backgroundColor:"#f5f8fa", borderRadius:2, border: "1px solid lightgray", padding:2}}>
                {/* <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 100, height: 100 }} />
                </Box> */}

                {/* <hr /> */}
                <Box sx={{fontWeight:"bold", paddingBottom: 1}}>
                  About this Location
                </Box>

                {renderSystemField(locationId, location, control, errors, register, fields)}

                <Autocomplete
                  id="companySelect"
                  sx={{paddingTop: 2}}
                  getOptionLabel={(option) => option.title || option}
                  options={[...locations, { title: "Add Company", isAddOption: true }]} // Add option appended here
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={company}
                  noOptionsText="Company Not Found"
                  onChange={(event, newValue) => {
                    if (newValue?.isAddOption) {

                      setEditAddLocationId(-1);

                    } else {

                      setCompany(newValue);

                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    
                    setInputCompanyValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Company" fullWidth />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={"company-" + option.title}>
                      <Grid container alignItems="center">
                        <Grid item sx={{ display: 'flex', width: 44 }}>
                          <BusinessRoundedIcon sx={{ color: 'text.secondary' }} />
                        </Grid>
                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                          <Typography variant="body2" color={option.isAddOption ? "primary" : "text.secondary"}>
                            {option.title}
                          </Typography>
                        </Grid>
                      </Grid>
                    </li>
                  )}
                />

              </Grid>
              <Grid item size={8} sx={{backgroundColor:"#f5f8fa", borderRadius:2, border: "1px solid lightgray", padding:2}}>
                  <Stack spacing={2}>
                    <Box>
                      <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" aria-label="basic tabs example" centered>
                        {tabOptions.map((tab, index) => {
                          return (
                            <Tab key={tab.id} label={tab.name} value={tab.id} />
                          )
                        })}

                        {customTabs != null && customTabs.map((tab, index) => {
                          return (
                            <Tab key={"custom-" + tab.id} label={tab.title} value={tab.id} />
                          )
                        })}
                      </Tabs>
                    </Box>
                    <Box>
                    {tabOptions.map((tab, index) => {
                      return (
                        <>
                        {tabValue === tab.id && 
                          <>
                            {customFields &&
                              <>
                                {renderCustomField(locationId, location, control, errors, register, setValue, customFields.filter(s => s.tabId == tab.id))}
                              </>
                            }
                          </>
                        }
                        </>
                      )
                    })}

                    {customTabs != null && customTabs.map((tab, index) => {
                        return (
                          <>
                            {tabValue === tab.id && 
                              <Box>
                                {tab.content}
                              </Box>
                            }
                          </>
                        )
                    })}
                    </Box>
                  </Stack>
                 
                 
                    
                    
                  <Button ref={refSubmitButton} variant="contained" type="submit" sx={{display:"none"}}>Save Changes</Button>
                  
              </Grid>
            </Grid>
          </form>

      </Box>
  )
});

LocationEditor.displayName = "LocationEditor";

export default LocationEditor;