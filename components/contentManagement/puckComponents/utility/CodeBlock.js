import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, Tooltip, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

export const CodeBlock = {
  label: 'Code Block',
  fields: {
    // Content
    code: {
      type: 'textarea',
      label: 'Code',
    },
    language: {
      type: 'select',
      label: 'Language',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'JSON', value: 'json' },
        { label: 'Bash / Shell', value: 'bash' },
        { label: 'SQL', value: 'sql' },
        { label: 'C#', value: 'csharp' },
        { label: 'Java', value: 'java' },
        { label: 'PHP', value: 'php' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'YAML', value: 'yaml' },
        { label: 'XML', value: 'xml' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Plain Text', value: 'plaintext' },
      ],
    },
    filename: {
      type: 'text',
      label: 'Filename (optional)',
    },

    // Display
    showLineNumbers: {
      type: 'radio',
      label: 'Show Line Numbers',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showCopyButton: {
      type: 'radio',
      label: 'Show Copy Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showLanguageBadge: {
      type: 'radio',
      label: 'Show Language Badge',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    wrapLines: {
      type: 'radio',
      label: 'Wrap Long Lines',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    maxHeight: {
      type: 'select',
      label: 'Max Height',
      options: [
        { label: 'None', value: 'none' },
        { label: '200px', value: '200px' },
        { label: '300px', value: '300px' },
        { label: '400px', value: '400px' },
        { label: '500px', value: '500px' },
      ],
    },

    // Styling
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
    fontSize: {
      type: 'select',
      label: 'Font Size',
      options: [
        { label: 'Small', value: '12px' },
        { label: 'Medium', value: '14px' },
        { label: 'Large', value: '16px' },
      ],
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
  },
  defaultProps: {
    code: 'function hello() {\n  console.log("Hello, World!");\n}\n\nhello();',
    language: 'javascript',
    filename: '',
    showLineNumbers: true,
    showCopyButton: true,
    showLanguageBadge: true,
    wrapLines: false,
    maxHeight: 'none',
    theme: 'dark',
    fontSize: '14px',
    borderRadius: 2,
  },
  render: ({
    code,
    language,
    filename,
    showLineNumbers,
    showCopyButton,
    showLanguageBadge,
    wrapLines,
    maxHeight,
    theme,
    fontSize,
    borderRadius,
  }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const isDark = theme === 'dark';
    const borderRadiusValue = borderRadius * 4;

    const lines = code.split('\n');

    const getLanguageLabel = () => {
      const labels = {
        javascript: 'JS',
        typescript: 'TS',
        python: 'Python',
        html: 'HTML',
        css: 'CSS',
        json: 'JSON',
        bash: 'Bash',
        sql: 'SQL',
        csharp: 'C#',
        java: 'Java',
        php: 'PHP',
        ruby: 'Ruby',
        go: 'Go',
        rust: 'Rust',
        yaml: 'YAML',
        xml: 'XML',
        markdown: 'MD',
        plaintext: 'Text',
      };
      return labels[language] || language;
    };

    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider',
        }}
      >
        {/* Header */}
        {(filename || showLanguageBadge || showCopyButton) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
              backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
              borderBottom: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filename && (
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                    fontFamily: 'monospace',
                  }}
                >
                  {filename}
                </Typography>
              )}
              {showLanguageBadge && (
                <Box
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255,255,255,0.6)' : 'text.secondary',
                      textTransform: 'uppercase',
                    }}
                  >
                    {getLanguageLabel()}
                  </Typography>
                </Box>
              )}
            </Box>

            {showCopyButton && (
              <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.5)' : 'text.secondary',
                    '&:hover': {
                      color: isDark ? 'rgba(255,255,255,0.8)' : 'text.primary',
                    },
                  }}
                >
                  {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}

        {/* Code Content */}
        <Box
          sx={{
            backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
            p: 2,
            maxHeight: maxHeight,
            overflow: maxHeight !== 'none' ? 'auto' : 'visible',
          }}
        >
          <Box
            component="pre"
            sx={{
              margin: 0,
              fontFamily: '"Fira Code", "Consolas", "Monaco", "Menlo", monospace',
              fontSize: fontSize,
              lineHeight: 1.6,
              color: isDark ? '#d4d4d4' : '#333',
              whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
              wordBreak: wrapLines ? 'break-all' : 'normal',
              overflowX: wrapLines ? 'visible' : 'auto',
            }}
          >
            {showLineNumbers ? (
              <Box component="table" sx={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {lines.map((line, index) => (
                    <Box component="tr" key={index}>
                      <Box
                        component="td"
                        sx={{
                          userSelect: 'none',
                          textAlign: 'right',
                          pr: 2,
                          color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                          verticalAlign: 'top',
                          width: '1%',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          pl: 2,
                          borderLeft: '1px solid',
                          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        }}
                      >
                        {line || ' '}
                      </Box>
                    </Box>
                  ))}
                </tbody>
              </Box>
            ) : (
              <code>{code}</code>
            )}
          </Box>
        </Box>
      </Paper>
    );
  },
};

export default CodeBlock;
