import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Paper, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import WarningIcon from '@mui/icons-material/Warning';
import Editor from '@monaco-editor/react';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';

export default function ScriptImportsSection() {
  const { oemCompanyId, showNotification } = useContentManagement();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [oEMDomain, setOEMDomain] = useState(null);
  const editorRef = useRef(null);

  const getBaseUrl = () => {
    return window.location.protocol + '//' + window.location.host;
  };

  // Fetch HTML data
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
        setHtmlContent(response.data.prettyHTML || '');
      }
    } catch (error) {
      console.error('Error fetching HTML:', error);
      showNotification('Failed to load script imports', 'error');
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
      const response = await apiService().post('/PrivateLabel/SetGlobalHTML', {
        companyId: oemCompanyId,
        domain: getBaseUrl(),
        value: value,
      });
      if (response?.status === 200) {
        showNotification('Script imports saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving HTML:', error);
      showNotification('Failed to save script imports', 'error');
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
            Script Imports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add external scripts like Google Analytics, Microsoft Clarity, or other tracking codes.
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

      {/* Warning */}
      <Alert
        severity="warning"
        icon={<WarningIcon />}
        sx={{ mb: 2 }}
      >
        <Typography variant="body2">
          Be careful when adding scripts. Only add code from trusted sources as malicious
          scripts can compromise your website security.
        </Typography>
      </Alert>

      {/* Editor */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          minHeight: '50vh',
        }}
      >
        <Editor
          height="100%"
          defaultLanguage="html"
          theme="vs-dark"
          defaultValue={htmlContent}
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
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Examples of scripts you can add:
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            backgroundColor: 'background.default',
            borderRadius: 1,
            fontSize: 12,
            overflow: 'auto',
          }}
        >
{`<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>

<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    // Clarity tracking code
  })(window, document, "clarity", "script", "PROJECT_ID");
</script>`}
        </Box>
      </Box>
    </Box>
  );
}
