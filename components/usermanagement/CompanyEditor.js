import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@mui/system';
import { Autocomplete, Avatar, Button, Chip, Drawer } from '@mui/material';
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

const CompanyEditor = forwardRef(({companyId = null, platformType, onSaved = null}, ref) => {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

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

  const [customFields, setCustomFields] = useState([]);

  const [user, setUser] = useState(null);

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

      let response = await apiService().get("/UserManagement/GetCompany?companyId=" + companyId);
      if (response != null && response.status == 200)
      {

        setLocation(response.data.locations);
        setCompany(response.data);

        if (response.data.customFields != null)
        {
            setCustomFields(response.data.customFields);
        }
        setEditors({...editors});
      }
    }

    if (companyId != -1)
    {
      fetchData();
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



  return (
      <Box>

          <form onSubmit={handleSubmit(async (data) => {
            
            let userCustomFields = [];

            customFields && customFields.forEach(customField => {

              let newValue = 
              // customField.customFieldType == 2 ? 
              // draftToHTML(editors[customField.customFieldId].getCurrentContent()) 
              // : 
              data[customField.customFieldId];
              if (newValue != null)
              {
                userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: newValue.toString()
                });
              }
                
            });
            

            let response = await apiService().post("/UserManagement/UpdateCompany", {
                id: companyId,
                title: data.Title,
                isDeactivated: !data.IsActive,
                customFields: userCustomFields,
                locations: location
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
              <Grid size={4} sx={{backgroundColor:"#f5f8fa", borderRadius:2, border: "1px solid lightgray", padding:2}}>
                <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 100, height: 100 }} />
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