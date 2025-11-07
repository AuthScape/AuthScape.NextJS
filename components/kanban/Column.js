import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
  Badge,
  useTheme,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ColorLens as ColorLensIcon
} from '@mui/icons-material';
import Card from './Card';

const Column = ({
  column,
  cards,
  onAddCard,
  onCardClick,
  onCardMenu,
  onEditColumn,
  onDeleteColumn
}) => {
  const theme = useTheme();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard?.(column.id, { title: newCardTitle.trim() });
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCard();
    } else if (e.key === 'Escape') {
      setIsAddingCard(false);
      setNewCardTitle('');
    }
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditColumn = () => {
    handleMenuClose();
    onEditColumn?.(column);
  };

  const handleDeleteColumn = () => {
    handleMenuClose();
    onDeleteColumn?.(column.id);
  };

  const cardCount = cards?.length || 0;
  const isWipLimitExceeded = column.wipLimit && cardCount > column.wipLimit;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ minWidth: 320, maxWidth: 320 }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : '#f5f7fa',
          borderRadius: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden'
        }}
      >
        {/* Column Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: `3px solid ${column.color || theme.palette.primary.main}`,
            backgroundColor: theme.palette.mode === 'dark'
              ? theme.palette.background.paper
              : '#fff'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              {/* Column Color Indicator */}
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: column.color || theme.palette.primary.main,
                  flexShrink: 0
                }}
              />

              {/* Column Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  flex: 1
                }}
              >
                {column.name}
              </Typography>

              {/* Card Count Badge */}
              <Badge
                badgeContent={cardCount}
                color={isWipLimitExceeded ? 'error' : 'default'}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: isWipLimitExceeded
                      ? theme.palette.error.main
                      : theme.palette.mode === 'dark'
                      ? theme.palette.grey[700]
                      : theme.palette.grey[300],
                    color: isWipLimitExceeded
                      ? '#fff'
                      : theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }
                }}
              >
                <Box sx={{ width: 20 }} />
              </Badge>

              {/* WIP Limit Warning */}
              {column.wipLimit && (
                <Typography
                  variant="caption"
                  sx={{
                    color: isWipLimitExceeded ? theme.palette.error.main : theme.palette.text.secondary,
                    fontSize: '0.7rem'
                  }}
                >
                  /{column.wipLimit}
                </Typography>
              )}
            </Box>

            {/* Column Menu */}
            <IconButton
              size="small"
              onClick={handleMenuClick}
              sx={{ ml: 1 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Cards Container */}
        <Box
          ref={setNodeRef}
          sx={{
            p: 2,
            flex: 1,
            overflowY: 'auto',
            minHeight: 200,
            '&::-webkit-scrollbar': {
              width: 8
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(0,0,0,0.2)',
              borderRadius: 4,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(0,0,0,0.3)'
              }
            }
          }}
        >
          <SortableContext
            items={cards?.map(card => card.id) || []}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {cards?.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardMenu={onCardMenu}
                />
              ))}
            </AnimatePresence>
          </SortableContext>

          {/* Add Card Form */}
          {isAddingCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <TextField
                  autoFocus
                  fullWidth
                  size="small"
                  placeholder="Enter card title..."
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  sx={{ mb: 1 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleAddCard}
                    disabled={!newCardTitle.trim()}
                  >
                    Add Card
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => {
                      setIsAddingCard(false);
                      setNewCardTitle('');
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}

          {/* Add Card Button */}
          {!isAddingCard && (
            <Button
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => setIsAddingCard(true)}
              sx={{
                justifyContent: 'flex-start',
                color: theme.palette.text.secondary,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              Add Card
            </Button>
          )}

          {/* Empty State */}
          {!isAddingCard && cards?.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: theme.palette.text.secondary
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                No cards yet
              </Typography>
              <Typography variant="caption">
                Add your first card to get started
              </Typography>
            </Box>
          )}
        </Box>

        {/* Column Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditColumn}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit Column
          </MenuItem>
          <MenuItem onClick={handleDeleteColumn}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete Column
          </MenuItem>
        </Menu>
      </Paper>
    </motion.div>
  );
};

export default Column;
