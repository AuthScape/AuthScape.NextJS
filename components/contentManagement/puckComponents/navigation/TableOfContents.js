import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListIcon from '@mui/icons-material/List';

export const TableOfContents = {
  label: 'Table of Contents',
  fields: {
    // Content
    title: {
      type: 'text',
      label: 'Title',
    },
    headingSelector: {
      type: 'text',
      label: 'Heading Selector (CSS)',
    },

    // Behavior
    smooth: {
      type: 'radio',
      label: 'Smooth Scroll',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    offset: {
      type: 'select',
      label: 'Scroll Offset (for fixed headers)',
      options: [
        { label: 'None', value: 0 },
        { label: '50px', value: 50 },
        { label: '64px', value: 64 },
        { label: '80px', value: 80 },
        { label: '100px', value: 100 },
      ],
    },
    highlightActive: {
      type: 'radio',
      label: 'Highlight Active Section',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Display
    numbered: {
      type: 'radio',
      label: 'Show Numbers',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    collapsible: {
      type: 'radio',
      label: 'Collapsible',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    defaultExpanded: {
      type: 'radio',
      label: 'Default Expanded',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showIcon: {
      type: 'radio',
      label: 'Show Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Position
    sticky: {
      type: 'radio',
      label: 'Sticky Position',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    stickyTop: {
      type: 'select',
      label: 'Sticky Top Offset',
      options: [
        { label: '0px', value: 0 },
        { label: '64px', value: 64 },
        { label: '80px', value: 80 },
        { label: '100px', value: 100 },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    activeColor: {
      type: 'text',
      label: 'Active Item Color',
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },
    maxHeight: {
      type: 'text',
      label: 'Max Height (e.g., 400px)',
    },
  },
  defaultProps: {
    title: 'Table of Contents',
    headingSelector: 'h2, h3',
    smooth: true,
    offset: 80,
    highlightActive: true,
    numbered: true,
    collapsible: true,
    defaultExpanded: true,
    showIcon: true,
    sticky: false,
    stickyTop: 80,
    backgroundColor: '#ffffff',
    activeColor: '',
    borderRadius: 2,
    elevation: 1,
    maxHeight: '',
  },
  render: ({
    title,
    headingSelector,
    smooth,
    offset,
    highlightActive,
    numbered,
    collapsible,
    defaultExpanded,
    showIcon,
    sticky,
    stickyTop,
    backgroundColor,
    activeColor,
    borderRadius,
    elevation,
    maxHeight,
  }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [expanded, setExpanded] = useState(defaultExpanded);

    // Find headings on mount
    useEffect(() => {
      const selector = headingSelector || 'h2, h3';
      const elements = document.querySelectorAll(selector);

      const items = Array.from(elements).map((el, index) => {
        // Ensure heading has an ID
        if (!el.id) {
          el.id = `heading-${index}`;
        }
        return {
          id: el.id,
          text: el.textContent,
          level: parseInt(el.tagName.charAt(1)),
        };
      });

      setHeadings(items);
    }, [headingSelector]);

    // Track active heading on scroll
    useEffect(() => {
      if (!highlightActive) return;

      const handleScroll = () => {
        const scrollPosition = window.scrollY + offset + 10;

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = document.getElementById(headings[i].id);
          if (heading && heading.offsetTop <= scrollPosition) {
            setActiveId(headings[i].id);
            break;
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }, [headings, offset, highlightActive]);

    const handleClick = (id) => {
      const element = document.getElementById(id);
      if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
          top,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    };

    const borderRadiusValue = borderRadius * 4;
    const minLevel = Math.min(...headings.map(h => h.level), 2);

    // Demo headings for editor preview
    const displayHeadings = headings.length > 0 ? headings : [
      { id: 'demo-1', text: 'Introduction', level: 2 },
      { id: 'demo-2', text: 'Getting Started', level: 2 },
      { id: 'demo-3', text: 'Installation', level: 3 },
      { id: 'demo-4', text: 'Configuration', level: 3 },
      { id: 'demo-5', text: 'Advanced Usage', level: 2 },
    ];

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          position: sticky ? 'sticky' : 'relative',
          top: sticky ? stickyTop : 'auto',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showIcon && <ListIcon color="action" />}
            <Typography variant="subtitle1" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          {collapsible && (
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <Collapse in={expanded}>
          <Box
            sx={{
              maxHeight: maxHeight || 'auto',
              overflowY: maxHeight ? 'auto' : 'visible',
            }}
          >
            <List dense disablePadding>
              {displayHeadings.map((heading, index) => {
                const indent = (heading.level - minLevel) * 16;
                const isActive = activeId === heading.id;

                return (
                  <ListItem key={heading.id} disablePadding>
                    <ListItemButton
                      onClick={() => handleClick(heading.id)}
                      sx={{
                        pl: 2 + indent / 8,
                        py: 0.75,
                        borderLeft: isActive ? '3px solid' : '3px solid transparent',
                        borderColor: isActive ? (activeColor || 'primary.main') : 'transparent',
                        backgroundColor: isActive ? 'action.selected' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? (activeColor || 'primary.main') : 'text.primary',
                            }}
                          >
                            {numbered && `${index + 1}. `}
                            {heading.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Collapse>
      </Paper>
    );
  },
};

export default TableOfContents;
