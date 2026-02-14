import React, {useEffect, useState, useRef, useCallback} from 'react';
import { Box, alpha } from '@mui/system';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Card, CardContent, Stack, Chip, Paper, Divider, Avatar, useTheme, CircularProgress,
  Badge, Breadcrumbs, Link, AvatarGroup, Snackbar, Alert, LinearProgress, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { apiService, RichTextEditor } from 'authscape';
import IconButton from '@mui/material/IconButton';
import {Comments} from './comments';
import { useDropzone } from 'react-dropzone';

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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [createdByList, setCreatedByList] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const fileInputRef = useRef(null);

  const [messageCount, setMessageCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', message: '', onConfirm: null });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmDialog({ open: true, title, message, onConfirm });
  };

  const uploadFile = async (file) => {
    if (!file) return;
    setUploadingFile(true);
    setUploadFileName(file.name);
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
        setTicketAttachments(prev => [...prev, response.data]);
        showSnackbar('File uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      showSnackbar('Error uploading file', 'error');
    } finally {
      setUploadingFile(false);
      setUploadFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    await uploadFile(file);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      await uploadFile(file);
    }
  }, [ticketId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: false });

  const handleDeleteAttachment = async (attachmentId) => {
    showConfirm(
      'Delete Attachment',
      'Are you sure you want to delete this attachment? This action cannot be undone.',
      async () => {
        try {
          const response = await apiService().delete('/Ticket/DeleteAttachment?attachmentId=' + attachmentId);
          if (response != null && response.status == 200) {
            setTicketAttachments(ticketAttachments.filter(a => a.id !== attachmentId));
            showSnackbar('Attachment deleted');
          }
        } catch (error) {
          console.error('Error deleting attachment:', error);
          showSnackbar('Error deleting attachment', 'error');
        }
      }
    );
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
        setEditTitle(response.data.name || '');

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

  const getPriorityAccentColor = (priority) => {
    switch(priority) {
      case 4: return theme.palette.error.main;
      case 3: return theme.palette.warning.main;
      case 2: return theme.palette.info.main;
      case 1: return theme.palette.success.main;
      default: return theme.palette.grey[400];
    }
  };

  const getStatusColor = (statusName) => {
    const s = statusName?.toLowerCase() || '';
    if (s.includes('open') || s.includes('new')) return 'info';
    if (s.includes('progress') || s.includes('assigned')) return 'warning';
    if (s.includes('resolved') || s.includes('closed')) return 'success';
    if (s.includes('pending')) return 'default';
    return 'default';
  };

  const getStatusName = () => {
    if (!ticket || !ticket.ticketStatuses) return '';
    const s = ticket.ticketStatuses.find(ts => ts.id === status);
    return s?.name || '';
  };

  const getTypeName = () => {
    if (!ticket || !ticket.ticketTypes) return '';
    const t = ticket.ticketTypes.find(tt => tt.id === ticketType);
    return t?.name || '';
  };

  const copyTicketLink = () => {
    const url = `${window.location.origin}/tickets?id=${ticketId}`;
    navigator.clipboard.writeText(url);
    showSnackbar('Ticket link copied to clipboard');
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext))
      return { Icon: ImageRoundedIcon, color: 'success.main', bgColor: alpha(theme.palette.success.main, 0.1) };
    if (['pdf'].includes(ext))
      return { Icon: PictureAsPdfRoundedIcon, color: 'error.main', bgColor: alpha(theme.palette.error.main, 0.1) };
    if (['doc', 'docx'].includes(ext))
      return { Icon: DescriptionRoundedIcon, color: 'info.main', bgColor: alpha(theme.palette.info.main, 0.1) };
    if (['xls', 'xlsx', 'csv'].includes(ext))
      return { Icon: TableChartRoundedIcon, color: 'success.main', bgColor: alpha(theme.palette.success.main, 0.1) };
    if (['zip', 'rar', '7z'].includes(ext))
      return { Icon: FolderZipRoundedIcon, color: 'warning.main', bgColor: alpha(theme.palette.warning.main, 0.1) };
    return { Icon: InsertDriveFileRoundedIcon, color: 'primary.main', bgColor: alpha(theme.palette.primary.main, 0.1) };
  };

  const isImageFile = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
  };

  const DownloadFile = ({fileName, uri, attachmentId, onDelete}) => {
    const { Icon, color, bgColor } = getFileIcon(fileName);
    const isImage = isImageFile(fileName);

    return (
      <Card
        elevation={0}
        sx={{
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
          overflow: 'hidden',
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
                zIndex: 1,
                bgcolor: alpha(theme.palette.error.main, 0.9),
                color: 'white',
                '&:hover': {
                  bgcolor: theme.palette.error.main
                }
              }}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          )}
          <Stack spacing={0}>
            {isImage ? (
              <Box
                component="img"
                src={uri}
                alt={fileName}
                sx={{
                  width: '100%',
                  height: 140,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 140,
                  bgcolor: bgColor,
                }}
              >
                <Icon sx={{ fontSize: 48, color: color }} />
              </Box>
            )}
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" fontWeight={500} noWrap sx={{ mb: 1.5 }}>
                {fileName}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<DownloadRoundedIcon />}
                onClick={() => {
                  window.open(uri);
                }}
                sx={{ borderRadius: 1.5 }}
              >
                Download
              </Button>
            </Box>
          </Stack>
      </Card>
    )
  }



  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>

      {/* Priority accent strip */}
      <Box sx={{
        height: 4,
        background: `linear-gradient(90deg, ${getPriorityAccentColor(priorty)}, ${alpha(getPriorityAccentColor(priorty), 0.3)})`,
      }} />

      {/* Header */}
      <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        p: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Breadcrumb */}
            <Breadcrumbs separator={<NavigateNextRoundedIcon sx={{ fontSize: 16 }} />} sx={{ mb: 1 }}>
              <Link
                underline="hover"
                color="text.secondary"
                sx={{ cursor: 'pointer', fontSize: '0.875rem' }}
                onClick={() => {
                  if (GoBackToViewTickets != null) GoBackToViewTickets();
                }}
              >
                Tickets
              </Link>
              <Typography variant="body2" color="text.primary" fontWeight={500}>
                #{ticketId}
              </Typography>
            </Breadcrumbs>

            {/* Editable title */}
            {isEditingTitle ? (
              <TextField
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={async () => {
                  setIsEditingTitle(false);
                  if (ticket && editTitle !== ticket.name) {
                    setTicket({ ...ticket, name: editTitle });
                    await apiService().put("/ticket/UpdateDescription", {
                      id: ticket.id,
                      description: ticketDescription,
                      title: editTitle
                    });
                    showSnackbar('Title updated');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                  }
                  if (e.key === 'Escape') {
                    setEditTitle(ticket?.name || '');
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                fullWidth
                variant="standard"
                InputProps={{
                  sx: {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }
                }}
              />
            ) : (
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 1,
                  px: 0.5,
                  mx: -0.5,
                  transition: 'background-color 0.15s',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    '& .edit-icon': { opacity: 1 }
                  }
                }}
                onClick={() => {
                  setEditTitle(ticket?.name || '');
                  setIsEditingTitle(true);
                }}
              >
                {ticket != null && ticket.name}
                <EditRoundedIcon className="edit-icon" sx={{ fontSize: 16, opacity: 0, transition: 'opacity 0.15s', color: 'text.secondary' }} />
              </Typography>
            )}

            {/* Status / Priority / Type badges */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {getStatusName() && (
                <Chip
                  label={getStatusName()}
                  size="small"
                  color={getStatusColor(getStatusName())}
                  sx={{ fontWeight: 500, height: 26 }}
                />
              )}
              <Chip
                label={getPriorityLabel(priorty)}
                size="small"
                color={getPriorityColor(priorty)}
                variant="outlined"
                icon={<PriorityHighRoundedIcon sx={{ fontSize: 14 }} />}
                sx={{ fontWeight: 500, height: 26 }}
              />
              {getTypeName() && (
                <Chip
                  label={getTypeName()}
                  size="small"
                  variant="outlined"
                  icon={<CategoryRoundedIcon sx={{ fontSize: 14 }} />}
                  sx={{ fontWeight: 500, height: 26 }}
                />
              )}
              {ticketAttachments.length > 0 && (
                <Chip
                  label={`${ticketAttachments.length} file${ticketAttachments.length > 1 ? 's' : ''}`}
                  size="small"
                  variant="outlined"
                  icon={<AttachFileRoundedIcon sx={{ fontSize: 14 }} />}
                  sx={{ fontWeight: 500, height: 26 }}
                />
              )}
            </Stack>
          </Box>

          {/* Quick actions */}
          <Stack direction="row" spacing={1} sx={{ ml: 2, flexShrink: 0 }}>
            <Tooltip title="Copy ticket link">
              <IconButton
                onClick={copyTicketLink}
                sx={{
                  bgcolor: alpha(theme.palette.grey[500], 0.08),
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.grey[500], 0.15)
                  }
                }}
              >
                <ContentCopyRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                onClick={() => {
                  if (GoBackToViewTickets != null) GoBackToViewTickets();
                }}
                sx={{
                  bgcolor: alpha(theme.palette.grey[500], 0.08),
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.grey[500], 0.15)
                  }
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
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
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="ticket tabs"
                  sx={{
                    '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, minHeight: 48 },
                    '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' }
                  }}
                >
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label={
                    <Badge badgeContent={messageCount} color="primary" max={99}
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 18, height: 18 } }}>
                      <Box sx={{ pr: messageCount > 0 ? 1 : 0 }}>Chat</Box>
                    </Badge>
                  } {...a11yProps(1)} />
                  <Tab label={
                    <Badge badgeContent={noteCount} color="secondary" max={99}
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 18, height: 18 } }}>
                      <Box sx={{ pr: noteCount > 0 ? 1 : 0 }}>Notes</Box>
                    </Badge>
                  } {...a11yProps(2)} />
                  <Tab label={
                    <Badge badgeContent={ticketAttachments.length} color="default" max={99}
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 18, height: 18 } }}>
                      <Box sx={{ pr: ticketAttachments.length > 0 ? 1 : 0 }}>Attachments</Box>
                    </Badge>
                  } {...a11yProps(3)} />

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
                        showSnackbar('Description saved');
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
                  <Comments ticketId={ticket.id} isDisabled={false} isNote={false} currentUser={currentUser} onCountChange={setMessageCount} />
                }
              </TabPanel>

              <TabPanel value={value} index={2}>
                {ticket != null &&
                  <Comments ticketId={ticket.id} isDisabled={false} isNote={true} currentUser={currentUser} onCountChange={setNoteCount} />
                }
              </TabPanel>

              <TabPanel value={value} index={3}>
                {ticket != null &&
                  <>
                    {/* Drag and drop zone */}
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: `2px dashed ${isDragActive ? theme.palette.primary.main : alpha(theme.palette.divider, 0.3)}`,
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        bgcolor: isDragActive ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        mb: 3,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.02)
                        }
                      }}
                    >
                      <input {...getInputProps()} ref={fileInputRef} />
                      <CloudUploadRoundedIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to browse'}
                      </Typography>
                    </Box>

                    {/* Upload progress */}
                    {uploadingFile && (
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CircularProgress size={16} />
                          <Typography variant="caption" color="text.secondary">
                            Uploading {uploadFileName}...
                          </Typography>
                        </Box>
                        <LinearProgress sx={{ borderRadius: 2 }} />
                      </Box>
                    )}

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
                      !uploadingFile && (
                        <Box
                          sx={{
                            textAlign: 'center',
                            py: 4,
                            color: 'text.secondary'
                          }}
                        >
                          <InsertDriveFileRoundedIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                          <Typography variant="body2">
                            No attachments yet
                          </Typography>
                        </Box>
                      )
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
              {/* Details Section */}
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ height: 3, bgcolor: getPriorityAccentColor(priorty) }} />
                <CardContent sx={{ pt: 2 }}>
                  <Typography variant="overline" color="text.secondary" letterSpacing={1} sx={{ mb: 2, display: 'block' }}>
                    DETAILS
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60, flexShrink: 0 }}>
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
                            showSnackbar('Status updated');
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

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60, flexShrink: 0 }}>
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
                            showSnackbar('Priority updated');
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

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60, flexShrink: 0 }}>
                        Type
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
                            showSnackbar('Ticket type updated');
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
                  </Stack>
                </CardContent>
              </Card>

              {/* People & Organization */}
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2
                }}
              >
                <CardContent>
                  <Typography variant="overline" color="text.secondary" letterSpacing={1} sx={{ mb: 2, display: 'block' }}>
                    PEOPLE & ORGANIZATION
                  </Typography>

                  <Stack spacing={2.5}>
                    {/* Assigned to */}
                    {ticket != null &&
                    <Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`
                      }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: '1rem' }}>
                          {ticket.assignedFirstName?.charAt(0)}
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="body2" fontWeight={600} noWrap>
                            {ticket.assignedFirstName} {ticket.assignedLastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            Assignee
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    }

                    {/* Participants */}
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <GroupRoundedIcon sx={{ fontSize: 14 }} />
                        Participants ({participants.length})
                      </Typography>
                      {participants.length > 0 && (
                        <AvatarGroup max={5} sx={{ justifyContent: 'flex-start', mb: 1.5, '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                          {participants.map((p, i) => (
                            <Tooltip title={p.label || ''} key={p.id || i}>
                              <Avatar sx={{ bgcolor: i % 2 === 0 ? 'primary.main' : 'secondary.main' }}>
                                {(p.label || '?').charAt(0)}
                              </Avatar>
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                      )}
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
                          showSnackbar('Participants updated');
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

                    <Divider />

                    {/* Company */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <BusinessRoundedIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
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
                            setSelectedLocation(null);
                            setLocationList([]);

                            await apiService().put("/ticket/UpdateCompany", {
                              id: ticket.id,
                              companyId: newValue?.id || null,
                              companyName: newValue?.title || null
                            });
                            showSnackbar('Company updated');
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
                    </Box>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <LocationOnRoundedIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
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
                            showSnackbar('Location updated');
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
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2
                }}
              >
                <CardContent>
                  <Typography variant="overline" color="text.secondary" letterSpacing={1} sx={{ mb: 2, display: 'block' }}>
                    TIMELINE
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">Created</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={500}>
                        {ticket != null ? ticket.created : ""}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <UpdateRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">Updated</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={500}>
                        {ticket != null ? ticket.lastUpdated : ""}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Danger zone */}
              {onDeleteTicket && (
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="overline" color="error.main" letterSpacing={1} sx={{ mb: 1, display: 'block' }}>
                    DANGER ZONE
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<DeleteRoundedIcon />}
                    onClick={() => {
                      showConfirm(
                        'Delete Ticket',
                        'Are you sure you want to delete this ticket? This action cannot be undone and all messages, notes, and attachments will be lost.',
                        () => { onDeleteTicket(); }
                      );
                    }}
                    sx={{ borderRadius: 2 }}
                  >
                    Delete Ticket
                  </Button>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {confirmDialog.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (confirmDialog.onConfirm) confirmDialog.onConfirm();
              setConfirmDialog({ ...confirmDialog, open: false });
            }}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  )
}
