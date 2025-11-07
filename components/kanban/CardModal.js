import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  useTheme,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  Label as LabelIcon,
  Person as PersonIcon,
  AttachFile as AttachFileIcon,
  Comment as CommentIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const priorityOptions = [
  { value: 'low', label: 'Low', color: '#2e7d32' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#d93f0b' },
  { value: 'urgent', label: 'Urgent', color: '#c00' }
];

const CardModal = ({ open, card, onClose, onSave, onDelete }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: null,
    tags: [],
    assignees: []
  });

  useEffect(() => {
    if (card) {
      setFormData({
        title: card.title || '',
        description: card.description || '',
        priority: card.priority || 'medium',
        dueDate: card.dueDate ? new Date(card.dueDate) : null,
        tags: card.tags || [],
        assignees: card.assignees || []
      });
    }
  }, [card]);

  const handleSave = () => {
    onSave?.({
      ...card,
      ...formData
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this card?')) {
      onDelete?.(card.id);
      onClose();
    }
  };

  if (!card) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          minHeight: '70vh'
        }
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              variant="standard"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Card title"
              sx={{
                '& .MuiInput-input': {
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }
              }}
            />
          </Box>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Description */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CommentIcon fontSize="small" />
              Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a more detailed description..."
              variant="outlined"
            />
          </Box>

          <Divider />

          {/* Priority */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LabelIcon fontSize="small" />
              Priority
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {priorityOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: option.color
                        }}
                      />
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Due Date */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon fontSize="small" />
              Due Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={formData.dueDate}
                onChange={(newDate) => setFormData({ ...formData, dueDate: newDate })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>

          {/* Tags */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LabelIcon fontSize="small" />
              Tags
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.name}
                  size="small"
                  onDelete={() => {
                    setFormData({
                      ...formData,
                      tags: formData.tags.filter((_, i) => i !== index)
                    });
                  }}
                  sx={{
                    backgroundColor: tag.color,
                    color: '#fff'
                  }}
                />
              ))}
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  const tagName = prompt('Enter tag name:');
                  if (tagName) {
                    setFormData({
                      ...formData,
                      tags: [...formData.tags, { name: tagName, color: '#3b82f6' }]
                    });
                  }
                }}
              >
                + Add Tag
              </Button>
            </Stack>
          </Box>

          {/* Assignees */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon fontSize="small" />
              Assignees
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {formData.assignees.map((assignee, index) => (
                <Chip
                  key={index}
                  avatar={<Avatar>{assignee.name?.charAt(0).toUpperCase()}</Avatar>}
                  label={assignee.name}
                  onDelete={() => {
                    setFormData({
                      ...formData,
                      assignees: formData.assignees.filter((_, i) => i !== index)
                    });
                  }}
                  size="small"
                />
              ))}
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  const name = prompt('Enter assignee name:');
                  if (name) {
                    setFormData({
                      ...formData,
                      assignees: [...formData.assignees, { name, avatar: '' }]
                    });
                  }
                }}
              >
                + Add Assignee
              </Button>
            </Stack>
          </Box>

          <Divider />

          {/* Activity / Metadata */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Activity
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.text.secondary }}>
                <AttachFileIcon fontSize="small" />
                <Typography variant="body2">
                  {card.attachmentCount || 0} attachment{card.attachmentCount !== 1 ? 's' : ''}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.text.secondary }}>
                <CommentIcon fontSize="small" />
                <Typography variant="body2">
                  {card.commentCount || 0} comment{card.commentCount !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          color="error"
        >
          Delete Card
        </Button>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.title.trim()}
          >
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CardModal;
