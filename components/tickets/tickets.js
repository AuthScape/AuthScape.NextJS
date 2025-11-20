import React, {useEffect, useState, useRef} from 'react';
import { Grid, Chip, alpha, Stack, Divider } from '@mui/material';
import { Box } from '@mui/system';
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { YesNoDialog, apiService, EditableDatagrid } from 'authscape';
import { TicketDetail } from './ticketDetail';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function Tickets({setIsLoading, currentUser, customTabName = null, customTabElement = null }) {

  const theme = useTheme();
  const [archiveTicketId, setArchiveTicketId] = useState(null);
  const [ticketStatuses, setTicketStatuses] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);
  const [statusId, setStatusId] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewTicketDialog, setShowNewTicketDialog] = useState(false);

  const newTicketTitle = useRef();
  const newTicketDescription = useRef();
  const [newTicketType, setNewTicketType] = useState(null);
  const [newTicketPriority, setNewTicketPriority] = useState(2);

  const router = useRouter();

  useEffect(() => {

    if (router.query.id != null)
    {
      setSelectedTicketId(router.query.id);
    }

  }, [router.isReady])

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 4: return 'error'; // Urgent
      case 3: return 'warning'; // High
      case 2: return 'info'; // Medium
      case 1: return 'success'; // Low
      default: return 'default'; // None
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

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('open') || statusLower.includes('new')) return 'info';
    if (statusLower.includes('progress') || statusLower.includes('assigned')) return 'warning';
    if (statusLower.includes('resolved') || statusLower.includes('closed')) return 'success';
    if (statusLower.includes('pending')) return 'default';
    return 'default';
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Ticket #',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} color="primary">
          #{params.value}
        </Typography>
      )
    },
    {
      field: 'title',
      flex: 1,
      headerName: 'Subject',
      minWidth: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500} noWrap>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {params.row.ticketType}
          </Typography>
        </Box>
      )
    },
    {
      field: 'ticketStatus',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getStatusColor(params.value)}
          sx={{ fontWeight: 500 }}
        />
      )
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={getPriorityLabel(params.row.priorityLevel || 0)}
          size="small"
          color={getPriorityColor(params.row.priorityLevel || 0)}
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      )
    },
    {
      field: 'ticketParticipants',
      headerName: 'Participants',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || 0}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'messages',
      headerName: 'Messages',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value || 0}
          size="small"
          color="default"
          variant="outlined"
        />
      )
    },
    {
      field: 'created',
      headerName: 'Created',
      width: 150,
      renderCell: (params) => (
        <Typography variant="caption" color="text.secondary">
          {params.value}
        </Typography>
      )
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem key={id}
            icon={<VisibilityRoundedIcon />}
            label="View"
            onClick={() => {
              setSelectedTicketId(row.id);
            }}
            showInMenu={false}
          />,
          <GridActionsCellItem key={id}
            icon={<DeleteRoundedIcon />}
            label="Delete"
            className="textPrimary"
            onClick={() => {
              setArchiveTicketId(row.id);
            }}
            showInMenu={false}
          />,
        ];
      },
    }
  ];

  useEffect(() => {

      let fetchStatusesAndTypes = async () => {
        let responseStatus = await apiService().get("/Ticket/GetStatuses");
        if (responseStatus != null && responseStatus.status == 200)
        {
          setTicketStatuses(responseStatus.data);
        }

        let responseType = await apiService().get("/Ticket/GetTicketTypes");
        if (responseType != null && responseType.status == 200)
        {
          setTicketTypes(responseType.data);
        }
      }

      fetchStatusesAndTypes();

  }, []);


  useEffect(() => {

      let newKey = dataGridRefreshKey + 1;
      setDataGridRefreshKey(newKey);

  }, [ticketTypeId, statusId]);

  return (
  <Box>
    <Card
      elevation={0}
      sx={{
        mb: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main'
              }}
            >
              <ConfirmationNumberRoundedIcon sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                Tickets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage and track all requests
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListRoundedIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{ borderRadius: 2 }}
            >
              Filters
            </Button>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setShowNewTicketDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              New Ticket
            </Button>
          </Box>
        </Box>

        {showFilters && (
          <Box sx={{
            p: 3,
            bgcolor: alpha(theme.palette.background.default, 0.5),
            borderRadius: 2,
            mb: 3
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Ticket Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={statusId}
                    label="Ticket Status"
                    onChange={(event) => {
                      setStatusId(event.target.value);
                    }}
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <MenuItem value={null}>All Statuses</MenuItem>
                    {ticketStatuses != null && ticketStatuses.map((tStatus) => {
                      return (
                        <MenuItem key={tStatus.id} value={tStatus.id}>{tStatus.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Ticket Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={ticketTypeId}
                    label="Ticket Type"
                    onChange={(event) => {
                      setTicketTypeId(event.target.value);
                    }}
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <MenuItem value={null}>All Types</MenuItem>
                    {ticketTypes != null && ticketTypes.map((tTicketType) => {
                      return (
                        <MenuItem key={tTicketType.id} value={tTicketType.id}>{tTicketType.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>

    <Card
      elevation={0}
      sx={{
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ height: 600, width: '100%' }}>
        <EditableDatagrid
          height={"600px"}
          key={dataGridRefreshKey}
          url={"/ticket/GetTickets"}
          params={{
            ticketStatusId: statusId,
            ticketTypeId: ticketTypeId
          }}
          columns={columns}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              cursor: 'pointer'
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: alpha(theme.palette.background.default, 0.5),
              borderBottom: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 600,
            }
          }}
        />
      </Box>
    </Card>


    <Dialog
      open={selectedTicketId != null ? true : false}
      onClose={() => {

        let newKey = dataGridRefreshKey + 1;
        setDataGridRefreshKey(newKey);

        setSelectedTicketId(null);
      }}
      fullWidth={true}
      maxWidth={"xl"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ width:"100%" }}>
            <TicketDetail ticketId={selectedTicketId} setIsLoading={setIsLoading} currentUser={currentUser} customTabName={customTabName} customTabElement={customTabElement} GoBackToViewTickets={() =>
            {
              let newKey = dataGridRefreshKey + 1;
              setDataGridRefreshKey(newKey);
              setSelectedTicketId(null);
            }} />
        </Box>
      </DialogContent>
    </Dialog>


    <YesNoDialog open={archiveTicketId != null ? true : false} title={"Remove Ticket"} message={"Are you sure you want to close this ticket?"}
      YesAction={async () => {
        await apiService().delete("/Ticket/ArchiveTicket?id=" + archiveTicketId);

        let newKey = dataGridRefreshKey + 1;
        setDataGridRefreshKey(newKey);
        setArchiveTicketId(null);
        setSelectedTicketId(null);

      }}
      NoAction={() => {

        let newKey = dataGridRefreshKey + 1;
        setDataGridRefreshKey(newKey);
        setArchiveTicketId(null);
        setSelectedTicketId(null);

      }} />

    <Dialog
      open={showNewTicketDialog}
      onClose={() => setShowNewTicketDialog(false)}
      fullWidth={true}
      maxWidth={"sm"}
      PaperProps={{
        sx: {
          borderRadius: 3
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main'
            }}
          >
            <AddRoundedIcon />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            Create New Ticket
          </Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          <TextField
            inputRef={newTicketTitle}
            label="Ticket Title"
            placeholder="Brief description of the issue"
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />

          <TextField
            inputRef={newTicketDescription}
            label="Description"
            placeholder="Provide detailed information about the ticket"
            fullWidth
            multiline
            rows={4}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="new-ticket-type-label">Ticket Type</InputLabel>
            <Select
              labelId="new-ticket-type-label"
              value={newTicketType}
              label="Ticket Type"
              onChange={(e) => setNewTicketType(e.target.value)}
              sx={{ borderRadius: 2 }}
            >
              {ticketTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="new-ticket-priority-label">Priority</InputLabel>
            <Select
              labelId="new-ticket-priority-label"
              value={newTicketPriority}
              label="Priority"
              onChange={(e) => setNewTicketPriority(e.target.value)}
              renderValue={(value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={
                      value === 4 ? 'Urgent' :
                      value === 3 ? 'High' :
                      value === 2 ? 'Medium' :
                      value === 1 ? 'Low' : 'None'
                    }
                    size="small"
                    color={
                      value === 4 ? 'error' :
                      value === 3 ? 'warning' :
                      value === 2 ? 'info' :
                      value === 1 ? 'success' : 'default'
                    }
                    sx={{ height: 24 }}
                  />
                </Box>
              )}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
              <MenuItem value={4}>Urgent</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5, gap: 1 }}>
        <Button
          onClick={() => setShowNewTicketDialog(false)}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            const message = newTicketTitle.current?.value;
            const description = newTicketDescription.current?.value;

            if (!message || !description) {
              alert('Please fill in both title and description');
              return;
            }

            if (!newTicketType) {
              alert('Please select a ticket type');
              return;
            }

            try {
              const response = await apiService().post("/Ticket/CreateTicket", {
                message: message,
                description: description,
                ticketTypeId: newTicketType,
                ticketStatusId: ticketStatuses.length > 0 ? ticketStatuses[0].id : 1,
                priorityLevel: newTicketPriority
              });

              if (response != null && response.status == 200) {
                setShowNewTicketDialog(false);
                setDataGridRefreshKey(dataGridRefreshKey + 1);

                // Reset form
                if (newTicketTitle.current) newTicketTitle.current.value = '';
                if (newTicketDescription.current) newTicketDescription.current.value = '';
                setNewTicketType(null);
                setNewTicketPriority(2);

                // Open the newly created ticket
                if (response.data) {
                  setSelectedTicketId(response.data);
                }
              }
            } catch (error) {
              console.error('Error creating ticket:', error);
              alert('Error creating ticket: ' + (error.response?.data?.message || error.message || 'Unknown error'));
            }
          }}
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{ borderRadius: 2 }}
        >
          Create Ticket
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  )
}
