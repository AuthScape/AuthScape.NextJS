import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  FolderOpen as FolderIcon
} from '@mui/icons-material';

const ProjectSelector = ({ projects, selectedProject, onProjectChange, onCreateProject }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleCreateProject = () => {
    if (projectName.trim()) {
      onCreateProject?.({
        name: projectName.trim(),
        description: projectDescription.trim()
      });
      setProjectName('');
      setProjectDescription('');
      setDialogOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && projectName.trim()) {
      handleCreateProject();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      {/* Project Selector */}
      <FormControl
        size="small"
        sx={{
          minWidth: 250,
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.paper
          }
        }}
      >
        <InputLabel>Project</InputLabel>
        <Select
          value={selectedProject?.id || ''}
          label="Project"
          onChange={(e) => {
            const project = projects.find(p => p.id === e.target.value);
            onProjectChange?.(project);
          }}
          startAdornment={<FolderIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />}
        >
          {projects.length === 0 && (
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                No projects yet
              </Typography>
            </MenuItem>
          )}
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Create Project Button */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        sx={{ textTransform: 'none' }}
      >
        New Project
      </Button>

      {/* Create Project Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="Project Name"
              placeholder="e.g., Website Redesign"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />
            <TextField
              fullWidth
              label="Description"
              placeholder="Brief description of the project"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateProject}
            disabled={!projectName.trim()}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectSelector;
