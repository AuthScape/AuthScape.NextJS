import React, {useEffect, useState, useRef} from 'react';
import { Box, alpha } from '@mui/system';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Card, CardContent, Stack, Chip, Paper, Divider, Avatar, useTheme, CircularProgress } from "@mui/material";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { apiService, RichTextEditor } from 'authscape';
import IconButton from '@mui/material/IconButton';
import {Comments} from './comments';

export const TicketDetail = ({ticketId, setIsLoading, currentUser, GoBackToViewTickets = null, customTabName = null, customTabElement = null, onDeleteTicket = null}) => {

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState(null);
  const [ticketType, setTicketType] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [priorty, setPriority] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [ticketAttachments, setTicketAttachments] = useState([]);
  const [customTabPayload, setCustomTabPayload] = useState(null);

  const [ticketDescription, setTicketDescription] = useState(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [createdByList, setCreatedByList] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('TicketId', ticketId);
      formData.append('File', file);

      const response = await apiService().post('/Ticket/AddAttachment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response != null && response.status == 200) {
        setTicketAttachments([...ticketAttachments, response.data]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    if (!confirm('Are you sure you want to delete this attachment?')) return;

    try {
      const response = await apiService().delete('/Ticket/DeleteAttachment?attachmentId=' + attachmentId);
      if (response != null && response.status == 200) {
        setTicketAttachments(ticketAttachments.filter(a => a.id !== attachmentId));
      }
    } catch (error) {
      console.error('Error deleting attachment:', error);
      alert('Error deleting attachment');
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      let response = await apiService().get("/Ticket/GetTicket?ticketId=" + ticketId);
      if (response != null && response.status == 200)
      {
        setTicket(response.data);

        setIsLoading(false);
        setStatus(response.data.selectedTicketStatusId);
        setTicketType(response.data.selectedTicketTypeId);
        setPriority(response.data.selectedPriortyId);
        setSelectedCreatedBy(response.data.selectedCreatedBy);
        setParticipants(response.data.participants);
        setTicketAttachments(response.data.attachments);
        setCustomTabPayload(response.data.customTabPayload);
        setTicketDescription(response.data.description);

        // Set company and location if available
        if (response.data.companyId) {
          setSelectedCompany({ id: response.data.companyId, title: response.data.companyName });
        }
        if (response.data.locationId) {
          setSelectedLocation({ id: response.data.locationId, name: response.data.locationName });
        }
      }
    }

    if (ticketId != null)
    {
      fetchData();
    }

  }, [ticketId]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refreshCreatedByList = async (query) => {

    let response = await apiService().get("/ticket/findUser?query=" + query);
    if (response != null && response.status == 200)
    {
      setCreatedByList(response.data);
    }
  }

  const refreshCompanyList = async (query) => {
    let response = await apiService().get("/UserManagement/GetCompanies?name=" + (query || ''));
    if (response != null && response.status == 200)
    {
      setCompanyList(response.data);
    }
  }

  const refreshLocationList = async (query, companyId = null) => {
    let url = "/UserManagement/GetLocations?name=" + (query || '');
    if (companyId) {
      url += "&companyId=" + companyId;
    }
    let response = await apiService().get(url);
    if (response != null && response.status == 200)
    {
      setLocationList(response.data);
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 4: return 'error';
      case 3: return 'warning';
      case 2: return 'info';
      case 1: return 'success';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'None';
    }
  };

  const DownloadFile = ({fileName, uri, attachmentId, onDelete}) => {

    return (
      <Card
        elevation={0}
        sx={{
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
          p: 2,
          minWidth: 200,
          textAlign:"center",
          transition: 'all 0.2s',
          position: 'relative',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4]
          }
        }}>
          {onDelete && (
            <IconButton
              size="small"
              onClick={() => onDelete(attachmentId)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: 'error.main',
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.2)
                }
              }}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          )}
          <Stack spacing={2} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main'
              }}
            >
              <InsertDriveFileRoundedIcon sx={{fontSize: 32}} />
            </Box>
            <Typography variant="body2" fontWeight={500} noWrap sx={{ width: '100%' }}>
              {fileName}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<DownloadRoundedIcon />}
              onClick={() => {
                window.open(uri);
              }}
              sx={{ borderRadius: 1.5 }}
            >
              Download
            </Button>
          </Stack>
      </Card>
    )
  }



  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>

      <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        p: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
              {ticket != null && ticket.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ticket #{ticketId}
            </Typography>
          </Box>

          <IconButton
            onClick={() => {
              if (GoBackToViewTickets != null)
              {
                GoBackToViewTickets();
              }
            }}
            sx={{
              bgcolor: alpha(theme.palette.grey[500], 0.1),
              color: 'text.secondary',
              '&:hover': {
                bgcolor: alpha(theme.palette.grey[500], 0.2)
              }
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card
              elevation={0}
              sx={{
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                <Tabs value={value} onChange={handleChange} aria-label="ticket tabs">
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Chat" {...a11yProps(1)} />
                  <Tab label="Notes" {...a11yProps(2)} />
                  <Tab label="Attachments" {...a11yProps(3)} />

                  {customTabName != null &&
                      <Tab label={customTabName} {...a11yProps(4)} />
                  }

                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                {isEditingDescription ? (
                  <Box>
                    <RichTextEditor
                      html={ticketDescription || ''}
                      onSave={async (html) => {
                        setTicketDescription(html);
                        setIsEditingDescription(false);
                        await apiService().put("/ticket/UpdateDescription", {
                          id: ticket.id,
                          description: html
                        });
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditingDescription(false)}
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Box sx={{
                      whiteSpace:"pre-wrap",
                      '& img': {
                        maxWidth: '100%',
                        borderRadius: 1
                      },
                      minHeight: 100,
                      position: 'relative',
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      bgcolor: alpha(theme.palette.background.default, 0.5),
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        '& .edit-overlay': {
                          opacity: 1
                        }
                      }
                    }}
                    onClick={() => setIsEditingDescription(true)}
                    >
                      <Box
                        className="edit-overlay"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          opacity: 0,
                          transition: 'opacity 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        <EditRoundedIcon sx={{ fontSize: 14 }} />
                        Click to edit
                      </Box>
                      {ticketDescription ? (
                        <Box dangerouslySetInnerHTML={{
                            __html: ticketDescription,
                        }}>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          No description provided. Click to add one...
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={value} index={1}>
                {ticket != null &&
                  <Comments ticketId={ticket.id} isDisabled={false} isNote={false} currentUser={currentUser} />
                }
              </TabPanel>

              <TabPanel value={value} index={2}>
                {ticket != null &&
                  <Comments ticketId={ticket.id} isDisabled={false} isNote={true} currentUser={currentUser} />
                }
              </TabPanel>

              <TabPanel value={value} index={3}>
                {ticket != null &&
                  <>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      <Button
                        variant="contained"
                        startIcon={uploadingFile ? <CircularProgress size={20} color="inherit" /> : <CloudUploadRoundedIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingFile}
                        sx={{ borderRadius: 2 }}
                      >
                        {uploadingFile ? 'Uploading...' : 'Upload Attachment'}
                      </Button>
                    </Box>
                    {ticketAttachments.length > 0 ? (
                      <Grid container spacing={2}>
                        {ticketAttachments.map((attachment, index) => (
                          <Grid item xs={12} sm={6} md={4} key={attachment.id || index}>
                            <DownloadFile
                              fileName={attachment.name}
                              uri={attachment.url}
                              attachmentId={attachment.id}
                              onDelete={handleDeleteAttachment}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          py: 6,
                          color: 'text.secondary'
                        }}
                      >
                        <InsertDriveFileRoundedIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                        <Typography variant="body2">
                          No attachments available
                        </Typography>
                      </Box>
                    )}
                  </>
                }
              </TabPanel>

              {customTabName != null &&
                  <TabPanel value={value} index={4}>
                      {customTabElement(customTabPayload)}
                  </TabPanel>
              }
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CategoryRoundedIcon fontSize="small" />
                    Ticket Details
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Status
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={status}
                          displayEmpty
                          onChange={async (val) =>{
                            setStatus(val.target.value);

                            await apiService().put("/ticket/UpdateStatus", {
                              id: ticket.id,
                              ticketStatusId: val.target.value
                            });

                          }}
                          sx={{ borderRadius: 1.5 }}
                        >
                          {ticket != null && ticket.ticketStatuses.map((status, index) => {
                            return (
                              <MenuItem key={index} value={status.id}>{status.name}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Priority
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={priorty}
                          onChange={async (val) =>{
                            setPriority(val.target.value);

                            await apiService().put("/ticket/UpdateTicketPriority", {
                              id: ticket.id,
                              priorityLevel: val.target.value
                            });

                          }}
                          renderValue={(value) => (
                            <Chip
                              label={getPriorityLabel(value)}
                              size="small"
                              color={getPriorityColor(value)}
                              sx={{ height: 24 }}
                            />
                          )}
                          sx={{ borderRadius: 1.5 }}
                        >
                          <MenuItem value={0}>None</MenuItem>
                          <MenuItem value={1}>Low</MenuItem>
                          <MenuItem value={2}>Medium</MenuItem>
                          <MenuItem value={3}>High</MenuItem>
                          <MenuItem value={4}>Urgent</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Ticket Type
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={ticketType}
                          onChange={async (val) =>{
                            setTicketType(val.target.value);

                            await apiService().put("/ticket/UpdateTicketType", {
                              id: ticket.id,
                              TicketTypeId: val.target.value
                            });

                          }}
                          sx={{ borderRadius: 1.5 }}
                        >
                          {ticket != null && ticket.ticketTypes.map((status, index) => {
                            return (
                              <MenuItem key={index} value={status.id}>{status.name}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <BusinessRoundedIcon sx={{ fontSize: 14 }} />
                        Company
                      </Typography>
                      <Autocomplete
                        size="small"
                        value={selectedCompany}
                        options={companyList}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={async (event, newValue) => {
                          setSelectedCompany(newValue);
                          // Clear location when company changes
                          setSelectedLocation(null);
                          setLocationList([]);

                          await apiService().put("/ticket/UpdateCompany", {
                            id: ticket.id,
                            companyId: newValue?.id || null,
                            companyName: newValue?.title || null
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select company..."
                            onChange={(e) => refreshCompanyList(e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 1.5
                              }
                            }}
                          />
                        )}
                      />
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnRoundedIcon sx={{ fontSize: 14 }} />
                        Location
                      </Typography>
                      <Autocomplete
                        size="small"
                        value={selectedLocation}
                        options={locationList}
                        getOptionLabel={(option) => option.name || ''}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={async (event, newValue) => {
                          setSelectedLocation(newValue);

                          await apiService().put("/ticket/UpdateLocation", {
                            id: ticket.id,
                            locationId: newValue?.id || null,
                            locationName: newValue?.name || null
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select location..."
                            onChange={(e) => refreshLocationList(e.target.value, selectedCompany?.id)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 1.5
                              }
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonRoundedIcon fontSize="small" />
                    Assignment
                  </Typography>

                  <Stack spacing={2}>
                    {ticket != null &&
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Assigned to
                      </Typography>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          borderRadius: 1.5,
                          bgcolor: alpha(theme.palette.primary.main, 0.04)
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                            {ticket.assignedFirstName?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {ticket.assignedFirstName} {ticket.assignedLastName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {ticket.assignedEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Box>
                    }

                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <GroupRoundedIcon fontSize="small" />
                        Participants
                      </Typography>
                      <Autocomplete
                        multiple={true}
                        size="small"
                        value={participants}
                        options={createdByList}
                        onChange={async (event, newValue) => {

                          await apiService().put("/ticket/UpdateParticipants", {
                            ticketId: ticketId,
                            participants: newValue
                          });

                          setParticipants(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="Add participants..." onChange={(val) => {
                          refreshCreatedByList(val.currentTarget.value);
                        }} sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5
                          }
                        }} />}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayRoundedIcon fontSize="small" />
                    Timeline
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <CalendarTodayRoundedIcon sx={{ fontSize: 14 }} />
                        Created
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {ticket != null ? ticket.created : ""}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <UpdateRoundedIcon sx={{ fontSize: 14 }} />
                        Last Updated
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {ticket != null ? ticket.lastUpdated : ""}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {onDeleteTicket && (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<DeleteRoundedIcon />}
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this ticket?')) {
                      onDeleteTicket();
                    }
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  Delete Ticket
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}
