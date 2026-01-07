import React, { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';

export const FAQ = {
  label: 'FAQ',
  fields: {
    // Items
    items: {
      type: 'array',
      label: 'FAQ Items',
      arrayFields: {
        question: { type: 'text', label: 'Question' },
        answer: { type: 'textarea', label: 'Answer' },
      },
      defaultItemProps: {
        question: 'What is your question?',
        answer: 'This is the answer to your question.',
      },
    },

    // Title
    showTitle: {
      type: 'radio',
      label: 'Show Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle',
    },

    // Search
    searchable: {
      type: 'radio',
      label: 'Searchable',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    searchPlaceholder: {
      type: 'text',
      label: 'Search Placeholder',
    },

    // Behavior
    expandBehavior: {
      type: 'select',
      label: 'Expand Behavior',
      options: [
        { label: 'Single (one at a time)', value: 'single' },
        { label: 'Multiple', value: 'multiple' },
      ],
    },
    defaultExpanded: {
      type: 'select',
      label: 'Default Expanded',
      options: [
        { label: 'None', value: 'none' },
        { label: 'First', value: 'first' },
        { label: 'All', value: 'all' },
      ],
    },

    // Styling
    iconStyle: {
      type: 'select',
      label: 'Icon Style',
      options: [
        { label: 'Chevron', value: 'chevron' },
        { label: 'Plus/Minus', value: 'plusminus' },
      ],
    },
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Separated', value: 'separated' },
      ],
    },
    questionSize: {
      type: 'select',
      label: 'Question Size',
      options: [
        { label: 'Small', value: 'body1' },
        { label: 'Medium', value: 'subtitle1' },
        { label: 'Large', value: 'h6' },
      ],
    },
    accentColor: {
      type: 'text',
      label: 'Accent Color',
    },
  },
  defaultProps: {
    items: [
      { question: 'What is your return policy?', answer: 'We offer a 30-day return policy on all items. Items must be in original condition with tags attached.' },
      { question: 'How long does shipping take?', answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.' },
      { question: 'Do you offer international shipping?', answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.' },
      { question: 'How can I track my order?', answer: 'Once your order ships, you will receive an email with a tracking number. You can use this to track your package on our website or the carrier\'s site.' },
    ],
    showTitle: true,
    title: 'Frequently Asked Questions',
    subtitle: "Can't find what you're looking for? Contact our support team.",
    searchable: true,
    searchPlaceholder: 'Search questions...',
    expandBehavior: 'single',
    defaultExpanded: 'none',
    iconStyle: 'chevron',
    variant: 'default',
    questionSize: 'subtitle1',
    accentColor: '',
  },
  render: ({
    items,
    showTitle,
    title,
    subtitle,
    searchable,
    searchPlaceholder,
    expandBehavior,
    defaultExpanded,
    iconStyle,
    variant,
    questionSize,
    accentColor,
  }) => {
    const [expanded, setExpanded] = useState(() => {
      if (defaultExpanded === 'first') return [0];
      if (defaultExpanded === 'all') return items.map((_, i) => i);
      return [];
    });
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (index) => {
      if (expandBehavior === 'single') {
        setExpanded(expanded.includes(index) ? [] : [index]);
      } else {
        setExpanded(
          expanded.includes(index)
            ? expanded.filter((i) => i !== index)
            : [...expanded, index]
        );
      }
    };

    const filteredItems = searchQuery
      ? items.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;

    const getExpandIcon = (isExpanded) => {
      if (iconStyle === 'plusminus') {
        return isExpanded ? <RemoveIcon /> : <AddIcon />;
      }
      return <ExpandMoreIcon />;
    };

    return (
      <Box>
        {/* Header */}
        {showTitle && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        {/* Search */}
        {searchable && (
          <TextField
            fullWidth
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* FAQ Items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: variant === 'separated' ? 2 : 0 }}>
          {filteredItems.map((item, index) => {
            const isExpanded = expanded.includes(index);
            const originalIndex = items.indexOf(item);

            return (
              <Accordion
                key={originalIndex}
                expanded={isExpanded}
                onChange={() => handleChange(originalIndex)}
                elevation={variant === 'separated' ? 1 : 0}
                sx={{
                  '&:before': { display: 'none' },
                  ...(variant === 'outlined' && {
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:not(:last-child)': {
                      borderBottom: 0,
                    },
                  }),
                  ...(variant === 'separated' && {
                    borderRadius: 2,
                    '&:first-of-type': {
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    },
                    '&:last-of-type': {
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    },
                  }),
                }}
              >
                <AccordionSummary
                  expandIcon={getExpandIcon(isExpanded)}
                  sx={{
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      color: accentColor || 'primary.main',
                      transition: 'transform 0.3s',
                      ...(iconStyle === 'chevron' && {
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }),
                    },
                  }}
                >
                  <Typography
                    variant={questionSize}
                    fontWeight={600}
                    sx={{ color: isExpanded ? (accentColor || 'primary.main') : 'text.primary' }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* No Results */}
        {searchable && searchQuery && filteredItems.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No questions found matching "{searchQuery}"
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
};

export default FAQ;
