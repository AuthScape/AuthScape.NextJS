import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@mui/system';
import { Autocomplete, Avatar, Button, Chip, Drawer, useTheme } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Tab, Tabs, Stack } from '@mui/material';
import { apiService } from 'authscape';
import TextField from '@mui/material/TextField';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

// remove when publishing
import {renderCustomField, renderSystemField } from './EditorFields';
import { UserManagement } from './UserManagement';
import { DropZone } from '../dropzone';

const CompanyEditor = forwardRef(({companyId = null, platformType, onSaved = null, onCustomTabs = null}, ref) => {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const theme = useTheme();

  const [editors, setEditors] = useState({});

  const refShouldClose = useRef(false);
  const refSubmitButton = useRef(null);

  const [selectedRoles, setSelectedRole] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const [inputCompanyValue, setInputCompanyValue] = useState('');
  const [editAddLocationId, setEditAddLocationId] = useState(null);

  const [company, setCompany] = useState(null);

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState({});
  const [inputLocationValue, setInputLocationValue] = useState('');

  const [domains, setDomains] = useState([]);
  const [domainInput, setDomainInput] = useState('');

  const [customFields, setCustomFields] = useState([]);

  const [user, setUser] = useState(null);
  const [customTabs, setCustomTabs] = useState(null);

  const [companyLogo, setCompanyLogo] = useState(null);

  const [tabOptions, setTabOptions] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };

  const fetchCompanyData = async () => {

      await refreshTabOptions();

      let response = await apiService().get("/UserManagement/GetCompany?companyId=" + companyId);
      if (response != null && response.status == 200)
      {

        setCompanyLogo(response.data.logo);

        setLocation(response.data.locations);
        setDomains(response.data.emailDomains || []);
        setCompany(response.data);

        if (response.data.customFields != null)
        {
            setCustomFields(response.data.customFields);
        }
        setEditors({...editors});
      }
  }

  useEffect(() => {

    if (companyId != -1)
    {
      fetchCompanyData();
    }

  }, [companyId])

  const fields = [
    "Title",
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

    const fetchData = async () => {

      if (company != null)
      {
        if (inputLocationValue == null || inputLocationValue == "")
        {
          let response = await apiService().get("/UserManagement/GetLocations?companyId=" + company.id);
          if (response != null && response.status == 200)
          {
            setLocations(response.data);
          }
        }
        else
        {
          let response = await apiService().get("/UserManagement/GetLocations?companyId=" + company.id + "&name=" + inputLocationValue);
          if (response != null && response.status == 200)
          {
            setLocations(response.data);
          }
        }
      }
    }

    if (company != null || companyId == -1)
    {
      fetchData();
    }

  }, [company, companyId, inputLocationValue, company])


  const saveChanges = (shouldClose) => {
    refShouldClose.current = shouldClose;
    refSubmitButton.current.click();
  }

  useImperativeHandle(ref, () => ({
    saveChanges,
  }));

  useEffect(() => {

    if (companyId != null && onCustomTabs != null)
    {
      const fetchData = async () => {
        let tabs = await onCustomTabs(platformType, companyId)
        if (tabs != null)
        {
          setCustomTabs(tabs);
        }
      }
      fetchData();
    }

  }, [companyId]);

  return (
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        color: theme.palette.text.primary
      }}>

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
              else if (newValue != null && typeof newValue === 'boolean')
              {
                userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: newValue.toString()
                });
              }
              else if (newValue != null && typeof newValue === 'object')
              {
                const dateObject = new Date(newValue);
                const simpleDate = dateObject.toISOString().split('T')[0];

                userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: simpleDate.toString()
                });

              }
              else if (newValue instanceof Blob)
              {
                  const newBlob = new Blob([newValue], { type: newValue.type });
                
                  const data = new FormData();
                  data.append("file", newBlob);
                  data.append("identifier", companyId); 

                  data.append("platformType", 2); // company
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

            let response = await apiService().post("/UserManagement/UpdateCompany", {
                id: companyId,
                title: data.Title,
                isDeactivated: !data.IsActive,
                customFields: userCustomFields,
                locations: location,
                domains: domains
            });

            if (response != null && response.status == 200)
            {
                if (onSaved != null)
                {
                  onSaved(refShouldClose.current, 2, companyId, response.data);
                }
            }

          })} noValidate autoComplete="off">
            
            <Grid container spacing={2} sx={{paddingTop:2}}>
              <Grid size={{ xs: 12, md: 4 }} sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                padding: 2
              }}>
                <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>

                    <DropZone image={companyLogo != null ? companyLogo : ""} text={"Drag 'n' drop your logo here, or click to select your logo"} onDrop={async (blob) => {
                      
                      const data = new FormData();
                      data.append("file", blob);
                      data.append("companyId", companyId); 

                      const response = await apiService().post("/UserManagement/UploadLogo", data);
                      if (response != null && response.status == 200)
                      {
                        fetchCompanyData();
                      }

                    }} />
                
                </Box>

                <hr />
                <Box sx={{fontWeight:"bold", paddingBottom: 1}}>
                  About this company
                </Box>

                {renderSystemField(companyId, company, control, errors, register, fields)}

                <Box sx={{fontWeight:"bold", paddingTop:1, paddingBottom: 1}}>
                  Locations
                </Box>

                  <Autocomplete
                    id="LocationSelect"
                    multiple={true}
                    getOptionLabel={(option) => option.title || option}
                    options={[...locations, { title: "Add Location", isAddOption: true }]} // Add option appended here
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          sx={{height: 60}}
                          label={
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                {option.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {option.address}
                              </Typography>
                            </div>
                          }
                        />
                      ))
                    }
                    value={location}
                    noOptionsText="No locations"
                    onChange={(event, newValue) => {
                      if (newValue?.isAddOption) {
  
                        setEditAddLocationId(-1);
  
                      } else {
                        
                        setLocation(newValue); // Select an existing location
                      }
                    }}
                    onInputChange={(event, newInputValue) => {
                      // Optional: Update input handling logic
                      setInputCompanyValue(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Location" fullWidth />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={"location-" + option.title}>
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

                <Box sx={{fontWeight:"bold", paddingTop:2, paddingBottom: 1}}>
                  Email Domains
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{display:"block", paddingBottom: 1}}>
                  Add email domains (e.g., example.org, example.com) to automatically map users to this company when they sign up
                </Typography>

                  <Autocomplete
                    id="DomainSelect"
                    multiple
                    freeSolo
                    options={[]}
                    value={domains}
                    onChange={(event, newValue) => {
                      // Validate and format domains
                      const formattedDomains = newValue.map(domain => {
                        let formatted = domain.trim().toLowerCase();
                        // Add @ if not present
                        if (formatted && !formatted.startsWith('@')) {
                          formatted = '@' + formatted;
                        }
                        return formatted;
                      }).filter(domain => domain.length > 1); // Remove empty or just @ domains

                      setDomains(formattedDomains);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          label={option}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Email Domains"
                        placeholder="Type domain and press Enter (e.g., example.org or example.com)"
                        fullWidth
                      />
                    )}
                  />


              </Grid>
              <Grid item size={{ xs: 12, md: 8 }} sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                padding: 2
              }}>
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
                                {renderCustomField(companyId, company, control, errors, register, setValue, customFields.filter(s => s.tabId == tab.id))}
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


          <React.Fragment key={"right"}>
            <Drawer
              anchor={"right"}
              open={editAddLocationId != null}
              maxWidth={"lg"}
              onClose={() => {
                setEditAddLocationId(null);
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "80vw", // Set width to 80% of the viewport width
                  maxWidth: "1000px", // Optional: Limit the maximum width
                },
              }}          
              >
                <Box sx={{padding:2}}>

                  <UserManagement platformType={3} companyId={company != null ? company.id : -1} defaultIdentifier={editAddLocationId} onSaved={async (shouldClose, platformType, id, fields) => {
                    setEditAddLocationId(null);
                    await fetchUserData();

                    onSaved(shouldClose, platformType, id, fields);
                  }} />

                </Box>
            </Drawer>
          </React.Fragment>

      </Box>
  )
});

CompanyEditor.displayName = "CompanyEditor";

export default CompanyEditor;