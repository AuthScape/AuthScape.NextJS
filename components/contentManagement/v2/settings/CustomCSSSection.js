import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Editor from '@monaco-editor/react';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';

export default function CustomCSSSection() {
  const { oemCompanyId, showNotification } = useContentManagement();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cssContent, setCssContent] = useState('');
  const [oEMDomain, setOEMDomain] = useState(null);
  const editorRef = useRef(null);

  const getBaseUrl = () => {
    return window.location.protocol + '//' + window.location.host;
  };

  // Fetch CSS data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch OEM domain first
      const domainResponse = await apiService().get('/PrivateLabel/GetAllDomainsUser');
      let domain = getBaseUrl();
      if (domainResponse?.status === 200 && domainResponse.data.length > 0) {
        domain = domainResponse.data[0].name;
      }
      setOEMDomain(domain);

      // Fetch editor data
      const response = await apiService().get(
        `/PrivateLabel/GetEditorData?domain=${domain}${
          oemCompanyId ? `&companyId=${oemCompanyId}` : ''
        }`
      );
      if (response?.status === 200) {
        setCssContent(response.data.prettyCSS || '');
      }
    } catch (error) {
      console.error('Error fetching CSS:', error);
      showNotification('Failed to load CSS', 'error');
    } finally {
      setLoading(false);
    }
  }, [oemCompanyId, showNotification]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleSave = async () => {
    const value = editorRef.current?.getValue() || '';
    setSaving(true);

    try {
      const response = await apiService().post('/PrivateLabel/SetGlobalCSS', {
        companyId: oemCompanyId,
        domain: getBaseUrl(),
        value: value,
      });
      if (response?.status === 200) {
        showNotification('CSS saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving CSS:', error);
      showNotification('Failed to save CSS', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Custom CSS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add custom CSS styles to customize the appearance of your website.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>

      {/* Editor */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          minHeight: '60vh',
        }}
      >
        <Editor
          height="100%"
          defaultLanguage="css"
          theme="vs-dark"
          defaultValue={cssContent}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </Paper>

      {/* Help Text */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Tip: Your CSS will be applied globally to all pages on your website.
          Use specific selectors to target individual elements.
        </Typography>
      </Box>
    </Box>
  );
}
