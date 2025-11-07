import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  Card as MuiCard,
  CardContent,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Stack,
  useTheme
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  AttachFile as AttachFileIcon,
  Comment as CommentIcon,
  DragIndicator as DragIndicatorIcon
} from '@mui/icons-material';

const priorityColors = {
  urgent: { bg: '#fee', color: '#c00' },
  high: { bg: '#ffebe9', color: '#d93f0b' },
  medium: { bg: '#fff4e6', color: '#f59e0b' },
  low: { bg: '#e8f5e9', color: '#2e7d32' }
};

const Card = ({ card, onCardClick, onCardMenu }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const isOverdue = date < today && date.toDateString() !== today.toDateString();

    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOverdue
    };
  };

  const dueDate = formatDate(card.dueDate);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MuiCard
        sx={{
          mb: 2,
          cursor: 'pointer',
          position: 'relative',
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.background.paper
            : '#fff',
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(255,255,255,0.1)'
              : '0 4px 20px rgba(0,0,0,0.1)',
          },
          transition: 'box-shadow 0.2s ease'
        }}
        onClick={() => onCardClick?.(card)}
      >
        <CardContent sx={{ padding: 2, '&:last-child': { pb: 2 } }}>
          {/* Header with drag handle and menu */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box
              {...attributes}
              {...listeners}
              sx={{
                cursor: 'grab',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s',
                mr: 1,
                mt: -0.5,
                color: theme.palette.text.secondary,
                '&:active': { cursor: 'grabbing' }
              }}
            >
              <DragIndicatorIcon fontSize="small" />
            </Box>

            <Box sx={{ flex: 1 }}>
              {/* Priority Badge */}
              {card.priority && (
                <Chip
                  label={card.priority.toUpperCase()}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    mb: 1,
                    backgroundColor: priorityColors[card.priority]?.bg || '#eee',
                    color: priorityColors[card.priority]?.color || '#666',
                    border: 'none'
                  }}
                />
              )}

              {/* Card Title */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  mb: 0.5,
                  color: theme.palette.text.primary,
                  lineHeight: 1.4
                }}
              >
                {card.title}
              </Typography>

              {/* Card Description */}
              {card.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontSize: '0.875rem'
                  }}
                >
                  {card.description}
                </Typography>
              )}

              {/* Tags */}
              {card.tags && card.tags.length > 0 && (
                <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                  {card.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag.name}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        backgroundColor: tag.color || theme.palette.primary.light,
                        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.dark,
                        opacity: 0.9
                      }}
                    />
                  ))}
                </Stack>
              )}

              {/* Footer with metadata */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {/* Due Date */}
                  {dueDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarIcon
                        sx={{
                          fontSize: 14,
                          color: dueDate.isOverdue ? '#c00' : theme.palette.text.secondary
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: dueDate.isOverdue ? '#c00' : theme.palette.text.secondary,
                          fontWeight: dueDate.isOverdue ? 600 : 400,
                          fontSize: '0.75rem'
                        }}
                      >
                        {dueDate.text}
                      </Typography>
                    </Box>
                  )}

                  {/* Attachments */}
                  {card.attachmentCount > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachFileIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                        {card.attachmentCount}
                      </Typography>
                    </Box>
                  )}

                  {/* Comments */}
                  {card.commentCount > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CommentIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                        {card.commentCount}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {/* Assignees */}
                {card.assignees && card.assignees.length > 0 && (
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                    {card.assignees.map((assignee, index) => (
                      <Avatar
                        key={index}
                        alt={assignee.name}
                        src={assignee.avatar}
                        sx={{ width: 24, height: 24 }}
                      >
                        {assignee.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                )}
              </Box>
            </Box>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onCardMenu?.(e, card);
              }}
              sx={{
                ml: 1,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s',
                mt: -1
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </MuiCard>
    </motion.div>
  );
};

export default Card;
