import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box, textAlign } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Autocomplete, Avatar, Button, Drawer, useTheme } from '@mui/material';
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
import { apiService } from 'authscape';
import Grid from '@mui/material/Grid2';

// remove when publishing
import {renderCustomField, renderSystemField } from './EditorFields';
import CompanyEditor from './CompanyEditor';
import { UserManagement } from './UserManagement';


const UserEditor = forwardRef(({userId = null, platformType, onSaved = null, onCustomTabs = null}, ref) => {

  const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const theme = useTheme();

  const [editors, setEditors] = useState({});
  const refTimeoutToken = useRef(null);

  const refShouldClose = useRef(false);
  const refSubmitButton = useRef(null);

  const [editAddCompanyId, setEditAddCompanyId] = useState(null);
  const [editAddLocationId, setEditAddLocationId] = useState(null);

  const [selectedRoles, setSelectedRole] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [inputCompanyValue, setInputCompanyValue] = useState('');

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [inputLocationValue, setInputLocationValue] = useState('');

  const [roles, setRole] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [customFields, setCustomFields] = useState([]);

  const [user, setUser] = useState(null);
  const [customTabs, setCustomTabs] = useState(null);

  const [tabOptions, setTabOptions] = useState([]);


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
  };


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };


  useEffect(() => {

      const fetchData = async () => {

          let responseRoles = await apiService().get("/UserManagement/GetRoles");
          if (responseRoles != null && responseRoles.status == 200)
          {
            setRole(responseRoles.data);
          }

          let responsePermissions = await apiService().get("/UserManagement/GetPermissions");
          if (responsePermissions != null && responsePermissions.status == 200)
          {
            setPermissions(responsePermissions.data);
          }

      }

      fetchData();

  }, []);



  const fetchUserData = async () => {
    let response = await apiService().get("/UserManagement/GetUser?userId=" + userId);
    if (response != null && response.status == 200)
    {
      setUser(response.data);

      if (response.data.company != null)
      {
        setCompany(response.data.company);
      }

      if (response.data.location != null)
      {
        setLocation(response.data.location);
      }

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

  useEffect(() => {

    if (userId != -1)
    {
      fetchUserData();
    }
      
  }, [userId])


  useEffect(() => {
  
      if (userId != null && onCustomTabs != null)
      {
        const fetchData = async () => {
          let tabs = await onCustomTabs(platformType, userId)
          if (tabs != null)
          {
            setCustomTabs(tabs);
          }
        }
        fetchData();
      }
  
  }, [userId]);


  const fields = platformType === 1
    ? [
        "FirstName",
        "LastName",
        "IsActive",
        "EmailConfirmed",
        "Email",
        "PhoneNumber"
      ]
    : [
        "FirstName",
        "LastName",
        "IsActive",
        "Email",
        "PhoneNumber"
      ]

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

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

        const response2 = await apiService().get("/UserManagement/GetCompanies?name=" + inputCompanyValue);
        if (response2 != null && response2.status == 200)
        {
          setCompanies(response2.data);
        }

        await refreshTabOptions();
    }

    // sets a delay so the user can type
    clearTimeout(refTimeoutToken.current)
    refTimeoutToken.current = setTimeout(() => {

      clearTimeout(refTimeoutToken.current)

      fetchData();

    }, 1000);
    

  }, [inputCompanyValue])


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

    if (user != null || userId == -1)
    {
      fetchData();
    }

  }, [user, userId, inputLocationValue, company])


  const saveChanges = (shouldClose) => {
    refShouldClose.current = shouldClose;
    refSubmitButton.current.click();
  }


  useImperativeHandle(ref, () => ({
    saveChanges,
  }));



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

            console.log('Form data:', data);
            console.log('EmailConfirmed value:', data.EmailConfirmed);
            console.log('IsActive value:', data.IsActive);

            let response = await apiService().put("/UserManagement/UpdateUser", {
                id: userId,
                firstName: data.FirstName,
                lastName: data.LastName,
                companyId: company != null ? company.id : null,
                locationId: location != null ? location.id : null,
                email: data.Email,
                phoneNumber: data.PhoneNumber,
                isActive: data.IsActive,
                emailConfirmed: data.EmailConfirmed,
                roles: selectedRoles != "" ? selectedRoles : null,
                permissions: selectedPermission != "" ? selectedPermission : null,
                customFields: userCustomFields
            });

            console.log('Update response:', response);

            if (response != null && response.status == 200)
            {
                if (onSaved != null)
                {
                    onSaved(refShouldClose.current, 1, userId, response.data);
                }
            }

          })} noValidate autoComplete="off">
            
            <Grid container spacing={2} sx={{paddingTop:2}}>
              <Grid size={4} sx={{backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : "#f5f8fa", borderRadius:2, border: `1px solid ${theme.palette.divider}`, padding:2}}>
                <Box sx={{textAlign:"center", display:"flex", justifyContent:"center", padding:2 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 100, height: 100 }} />
                </Box>

                <hr />
                <Box sx={{fontWeight:"bold", paddingBottom: 1}}>
                  About this contact
                </Box>

                {renderSystemField(userId, user, control, errors, register, fields)}

                <Box sx={{fontWeight:"bold", paddingTop:1, paddingBottom: 1}}>
                  Companies and Locations
                </Box>

                <Box>
                <Autocomplete
                  id="companySelect"
                  sx={{ paddingTop: 2 }}
                  getOptionLabel={(option) => option.title || option}
                  options={[...companies, { title: "Add Company", isAddOption: true }]} // Add option appended here
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={company}
                  noOptionsText="No companies"
                  onChange={(event, newValue) => {
                    if (newValue?.isAddOption) {
                      
                      setEditAddCompanyId(-1);

                      // Handle "Add Company" logic
                      // const newCompany = prompt("Enter the new company name:"); // Prompt the user for input
                      // if (newCompany) {
                      //   const updatedCompany = { title: newCompany };
                      //   setCompanies([...companies, updatedCompany]); // Add the new company to the list
                      //   setCompany(updatedCompany); // Select the new company
                      // }
                    } else {
                      setCompany(newValue); // Select an existing company
                    }
                    setLocation(null);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputCompanyValue(newInputValue);
                    setLocation(null);
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
                <Box sx={{textAlign:"right", paddingTop: 1}}>
                  <Button variant={"text"} onClick={() => {
                    setEditAddCompanyId(company != null ? company.id : -1);
                  }}>Edit Company</Button>
                  <Button variant={"text"} onClick={() =>{
                    setEditAddCompanyId(-1);
                  }}>Add Company</Button>
                </Box>

                <Autocomplete
                  id="LocationSelect"
                  sx={{ paddingTop: 3 }}
                  getOptionLabel={(option) => option.title || option}
                  options={[...locations, { title: "Add Location", isAddOption: true }]} // Add option appended here
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
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
                </Box>
                <Box sx={{textAlign:"right", paddingTop: 1}}>
                  <Button variant={"text"} onClick={() => {
                    setEditAddLocationId(location != null ? location.id : -1);
                  }}>Edit Location</Button>
                  <Button variant={"text"} onClick={() =>{
                    setEditAddLocationId(-1);
                  }}>Add Location</Button>
                </Box>

                <Box sx={{fontWeight:"bold", paddingTop:2}}>
                  Roles and Permissions
                </Box>

                <Box>

                    <FormControl sx={{ marginTop:3, width: "100%" }}>
                        <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                        <Select
                            fullWidth={true}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            {...register("roles", { required: false })}
                            multiple
                            value={selectedRoles}
                            onChange={(event) => {

                            const {
                                target: { value },
                            } = event;
                            setSelectedRole(
                                // On autofill we get a stringified value.
                                typeof value === 'string' ? value.split(',') : value,
                            );
                                
                            }}
                            input={<OutlinedInput label="Roles" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}>
                            {roles.map((role) => (
                                <MenuItem key={role.name} value={role.name}>
                                <Checkbox checked={selectedRoles.indexOf(role.name) > -1} />
                                <ListItemText primary={role.name} /> 
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors.roles && <Typography color={"red"}>{"roles"} is required.</Typography>}
                    

                    <FormControl sx={{ marginTop:3, width: "100%" }}>
                        <InputLabel id="demo-multiple-checkbox-label">Permissions</InputLabel>
                        <Select
                        fullWidth={true}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        {...register("permissions", { required: false })}
                        multiple
                        value={selectedPermission}
                        onChange={(event) => {

                          const {
                            target: { value },
                          } = event;
                          setSelectedPermission(
                            // On autofill we get a stringified value.
                            typeof value === 'string' ? value.split(',') : value,
                          );

                        }}
                        input={<OutlinedInput label="Roles" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}>
                        {permissions.map((permission) => (
                            <MenuItem key={permission.name} value={permission.name}>
                              <Checkbox checked={selectedPermission.indexOf(permission.name) > -1} />
                              <ListItemText primary={permission.name} /> 
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    {errors.permissions && <Typography color={"red"}>{"permissions"} is required.</Typography>}

                </Box>

              </Grid>
              <Grid item size={8} sx={{backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : "#f5f8fa", borderRadius:2, border: `1px solid ${theme.palette.divider}`, padding:2}}>
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
                                {renderCustomField(userId, user, control, errors, register, setValue, customFields.filter(s => s.tabId == tab.id))}
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


          {/* Company Information */}
          <React.Fragment key={"right"}>
            <Drawer
              anchor={"right"}
              open={editAddCompanyId != null}
              maxWidth={"lg"}
              onClose={() => {
                setEditAddCompanyId(null);
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "80vw", // Set width to 80% of the viewport width
                  maxWidth: "1000px", // Optional: Limit the maximum width
                },
              }}          
              >
                <Box sx={{padding:2}}>
                  <UserManagement platformType={2} defaultIdentifier={editAddCompanyId} onSaved={async (shouldClose, platformType, id, fields) => {
                    setEditAddCompanyId(null);
                    await fetchUserData();

                    onSaved(shouldClose, platformType, id, fields);

                  }} />
                </Box>
            </Drawer>
          </React.Fragment>


          {/* Location Information */}
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

UserEditor.displayName = "UserEditor";

export default UserEditor;