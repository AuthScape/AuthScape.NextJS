import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Typography,
  useTheme,
  Paper,
  Stack
} from '@mui/material';
import { Add as AddIcon, ViewColumn as ViewColumnIcon } from '@mui/icons-material';
import Column from './Column';
import Card from './Card';
import ProjectSelector from './ProjectSelector';
import CardModal from './CardModal';
import { apiService, toast } from 'authscape';

const KanbanBoard = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  // Card modal state
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  // Column dialog state
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [columnName, setColumnName] = useState('');
  const [columnColor, setColumnColor] = useState('#3b82f6');
  const [columnWipLimit, setColumnWipLimit] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Load board when project changes
  useEffect(() => {
    if (selectedProject) {
      loadBoard(selectedProject.id);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await apiService().get('/Kanban/GetProjects');
      if (response?.status === 200) {
        setProjects(response.data || []);
        if (response.data?.length > 0) {
          setSelectedProject(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
      // Initialize with mock data for development
      initializeMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadBoard = async (projectId) => {
    try {
      setLoading(true);
      const response = await apiService().get(`/Kanban/GetBoard?projectId=${projectId}`);
      if (response?.status === 200) {
        setColumns(response.data.columns || []);
        setCards(response.data.cards || []);
      }
    } catch (error) {
      console.error('Error loading board:', error);
      // Initialize with mock columns for development
      initializeMockColumns();
    } finally {
      setLoading(false);
    }
  };

  // Mock data initialization for development
  const initializeMockData = () => {
    const mockProjects = [
      { id: 1, name: 'Website Redesign', description: 'Complete website overhaul' },
      { id: 2, name: 'Mobile App', description: 'New mobile application' }
    ];
    setProjects(mockProjects);
    setSelectedProject(mockProjects[0]);
  };

  const initializeMockColumns = () => {
    const mockColumns = [
      { id: 'col-1', name: 'To Do', color: '#6b7280', order: 0, wipLimit: null },
      { id: 'col-2', name: 'In Progress', color: '#3b82f6', order: 1, wipLimit: 3 },
      { id: 'col-3', name: 'Review', color: '#f59e0b', order: 2, wipLimit: null },
      { id: 'col-4', name: 'Done', color: '#10b981', order: 3, isDone: true }
    ];

    const mockCards = [
      {
        id: 'card-1',
        columnId: 'col-1',
        title: 'Design new homepage',
        description: 'Create mockups and wireframes for the new homepage design',
        priority: 'high',
        tags: [{ name: 'Design', color: '#ec4899' }, { name: 'Frontend', color: '#8b5cf6' }],
        assignees: [{ name: 'John Doe', avatar: '' }],
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        attachmentCount: 2,
        commentCount: 5,
        order: 0
      },
      {
        id: 'card-2',
        columnId: 'col-1',
        title: 'Update API documentation',
        description: 'Document all new API endpoints',
        priority: 'medium',
        tags: [{ name: 'Documentation', color: '#06b6d4' }],
        assignees: [],
        dueDate: null,
        attachmentCount: 0,
        commentCount: 1,
        order: 1
      },
      {
        id: 'card-3',
        columnId: 'col-2',
        title: 'Implement user authentication',
        description: 'Add JWT-based authentication system',
        priority: 'urgent',
        tags: [{ name: 'Backend', color: '#14b8a6' }, { name: 'Security', color: '#ef4444' }],
        assignees: [{ name: 'Jane Smith', avatar: '' }, { name: 'Bob Wilson', avatar: '' }],
        dueDate: new Date(Date.now() - 86400000).toISOString(),
        attachmentCount: 1,
        commentCount: 8,
        order: 0
      },
      {
        id: 'card-4',
        columnId: 'col-3',
        title: 'Code review for payment module',
        description: '',
        priority: 'high',
        tags: [{ name: 'Review', color: '#f97316' }],
        assignees: [{ name: 'Alice Johnson', avatar: '' }],
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        attachmentCount: 0,
        commentCount: 3,
        order: 0
      },
      {
        id: 'card-5',
        columnId: 'col-4',
        title: 'Setup CI/CD pipeline',
        description: 'Configure GitHub Actions for automated deployment',
        priority: 'low',
        tags: [{ name: 'DevOps', color: '#84cc16' }],
        assignees: [{ name: 'John Doe', avatar: '' }],
        dueDate: null,
        attachmentCount: 0,
        commentCount: 2,
        order: 0
      }
    ];

    setColumns(mockColumns);
    setCards(mockCards);
  };

  const handleCreateProject = async (projectData) => {
    try {
      const response = await apiService().post('/Kanban/CreateProject', projectData);
      if (response?.status === 200) {
        const newProject = response.data;
        setProjects([...projects, newProject]);
        setSelectedProject(newProject);
        toast.success('Project created successfully');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      // Mock implementation for development
      const newProject = {
        id: Date.now(),
        ...projectData
      };
      setProjects([...projects, newProject]);
      setSelectedProject(newProject);
      toast.success('Project created (mock)');
    }
  };

  const handleOpenColumnDialog = (column = null) => {
    if (column) {
      setEditingColumn(column);
      setColumnName(column.name);
      setColumnColor(column.color || '#3b82f6');
      setColumnWipLimit(column.wipLimit || '');
    } else {
      setEditingColumn(null);
      setColumnName('');
      setColumnColor('#3b82f6');
      setColumnWipLimit('');
    }
    setColumnDialogOpen(true);
  };

  const handleSaveColumn = async () => {
    if (!columnName.trim()) return;

    const columnData = {
      name: columnName.trim(),
      color: columnColor,
      wipLimit: columnWipLimit ? parseInt(columnWipLimit) : null,
      projectId: selectedProject.id,
      order: editingColumn ? editingColumn.order : columns.length
    };

    try {
      if (editingColumn) {
        const response = await apiService().put('/Kanban/UpdateColumn', {
          ...columnData,
          id: editingColumn.id
        });
        if (response?.status === 200) {
          setColumns(columns.map(col =>
            col.id === editingColumn.id ? { ...col, ...columnData } : col
          ));
          toast.success('Column updated');
        }
      } else {
        const response = await apiService().post('/Kanban/CreateColumn', columnData);
        if (response?.status === 200) {
          setColumns([...columns, response.data]);
          toast.success('Column created');
        }
      }
    } catch (error) {
      console.error('Error saving column:', error);
      // Mock implementation
      if (editingColumn) {
        setColumns(columns.map(col =>
          col.id === editingColumn.id ? { ...col, ...columnData } : col
        ));
      } else {
        const newColumn = {
          id: `col-${Date.now()}`,
          ...columnData
        };
        setColumns([...columns, newColumn]);
      }
      toast.success(editingColumn ? 'Column updated (mock)' : 'Column created (mock)');
    }

    setColumnDialogOpen(false);
  };

  const handleDeleteColumn = async (columnId) => {
    if (!confirm('Are you sure you want to delete this column?')) return;

    try {
      const response = await apiService().delete(`/Kanban/DeleteColumn?columnId=${columnId}`);
      if (response?.status === 200) {
        setColumns(columns.filter(col => col.id !== columnId));
        setCards(cards.filter(card => card.columnId !== columnId));
        toast.success('Column deleted');
      }
    } catch (error) {
      console.error('Error deleting column:', error);
      // Mock implementation
      setColumns(columns.filter(col => col.id !== columnId));
      setCards(cards.filter(card => card.columnId !== columnId));
      toast.success('Column deleted (mock)');
    }
  };

  const handleAddCard = async (columnId, cardData) => {
    const newCard = {
      ...cardData,
      columnId,
      projectId: selectedProject.id,
      priority: 'medium',
      tags: [],
      assignees: [],
      dueDate: null,
      attachmentCount: 0,
      commentCount: 0,
      order: cards.filter(c => c.columnId === columnId).length
    };

    try {
      const response = await apiService().post('/Kanban/CreateCard', newCard);
      if (response?.status === 200) {
        setCards([...cards, response.data]);
        toast.success('Card created');
      }
    } catch (error) {
      console.error('Error creating card:', error);
      // Mock implementation
      const card = {
        id: `card-${Date.now()}`,
        ...newCard
      };
      setCards([...cards, card]);
      toast.success('Card created (mock)');
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const card = cards.find(c => c.id === active.id);
    setActiveCard(card);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeCard = cards.find(c => c.id === active.id);
    const overColumn = columns.find(col => col.id === over.id);
    const overCard = cards.find(c => c.id === over.id);

    if (!activeCard) return;

    let newColumnId = activeCard.columnId;
    let newCards = [...cards];

    // Dropped on a column
    if (overColumn) {
      newColumnId = overColumn.id;

      if (activeCard.columnId !== newColumnId) {
        // Move to different column
        const targetCards = newCards.filter(c => c.columnId === newColumnId);
        newCards = newCards.map(card =>
          card.id === activeCard.id ? { ...card, columnId: newColumnId, order: targetCards.length } : card
        );
      }
    }
    // Dropped on another card
    else if (overCard) {
      newColumnId = overCard.columnId;

      const columnCards = newCards.filter(c => c.columnId === newColumnId && c.id !== activeCard.id);
      const overIndex = columnCards.findIndex(c => c.id === overCard.id);

      columnCards.splice(overIndex, 0, { ...activeCard, columnId: newColumnId });

      // Update orders
      columnCards.forEach((card, index) => {
        card.order = index;
      });

      newCards = [
        ...newCards.filter(c => c.columnId !== newColumnId && c.id !== activeCard.id),
        ...columnCards
      ];
    }

    setCards(newCards);

    // Sync with backend
    try {
      await apiService().put('/Kanban/MoveCard', {
        cardId: activeCard.id,
        columnId: newColumnId,
        order: newCards.find(c => c.id === activeCard.id)?.order
      });
    } catch (error) {
      console.error('Error moving card:', error);
      toast.error('Failed to move card');
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setCardModalOpen(true);
  };

  const handleSaveCard = async (updatedCard) => {
    try {
      const response = await apiService().put('/Kanban/UpdateCard', updatedCard);
      if (response?.status === 200) {
        setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
        toast.success('Card updated');
      }
    } catch (error) {
      console.error('Error updating card:', error);
      // Mock implementation
      setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
      toast.success('Card updated (mock)');
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await apiService().delete(`/Kanban/DeleteCard?cardId=${cardId}`);
      if (response?.status === 200) {
        setCards(cards.filter(c => c.id !== cardId));
        toast.success('Card deleted');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      // Mock implementation
      setCards(cards.filter(c => c.id !== cardId));
      toast.success('Card deleted (mock)');
    }
  };

  const getColumnCards = (columnId) => {
    return cards
      .filter(card => card.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  };

  if (loading && projects.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
          Kanban Board
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ProjectSelector
            projects={projects}
            selectedProject={selectedProject}
            onProjectChange={setSelectedProject}
            onCreateProject={handleCreateProject}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenColumnDialog()}
            sx={{ textTransform: 'none' }}
          >
            Add Column
          </Button>
        </Box>
      </Box>

      {/* Board */}
      {!selectedProject ? (
        <Paper
          sx={{
            p: 8,
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <ViewColumnIcon sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Project Selected
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create or select a project to get started
          </Typography>
        </Paper>
      ) : columns.length === 0 ? (
        <Paper
          sx={{
            p: 8,
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <ViewColumnIcon sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Columns Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add your first column to start organizing tasks
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenColumnDialog()}
          >
            Add Column
          </Button>
        </Paper>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              pb: 2,
              '&::-webkit-scrollbar': {
                height: 8
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.2)'
                  : 'rgba(0,0,0,0.2)',
                borderRadius: 4
              }
            }}
          >
            <AnimatePresence>
              {columns
                .sort((a, b) => a.order - b.order)
                .map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    cards={getColumnCards(column.id)}
                    onAddCard={handleAddCard}
                    onCardClick={handleCardClick}
                    onCardMenu={(e, card) => console.log('Card menu:', card)}
                    onEditColumn={handleOpenColumnDialog}
                    onDeleteColumn={handleDeleteColumn}
                  />
                ))}
            </AnimatePresence>
          </Box>

          <DragOverlay>
            {activeCard && <Card card={activeCard} />}
          </DragOverlay>
        </DndContext>
      )}

      {/* Card Modal */}
      <CardModal
        open={cardModalOpen}
        card={selectedCard}
        onClose={() => {
          setCardModalOpen(false);
          setSelectedCard(null);
        }}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
      />

      {/* Column Dialog */}
      <Dialog
        open={columnDialogOpen}
        onClose={() => setColumnDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingColumn ? 'Edit Column' : 'Create Column'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="Column Name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Color"
              type="color"
              value={columnColor}
              onChange={(e) => setColumnColor(e.target.value)}
            />
            <TextField
              fullWidth
              label="WIP Limit (optional)"
              type="number"
              value={columnWipLimit}
              onChange={(e) => setColumnWipLimit(e.target.value)}
              placeholder="Leave empty for no limit"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setColumnDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveColumn} disabled={!columnName.trim()}>
            {editingColumn ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KanbanBoard;
