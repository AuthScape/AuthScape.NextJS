/**
 * GrapeJS Editor - Elementor-like Visual Page Builder
 * Uses GrapeJS with proper block panel integration
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Button, CircularProgress, Typography, IconButton, Tooltip, Tabs, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LayersIcon from '@mui/icons-material/Layers';
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { apiService } from 'authscape';
import * as signalR from '@microsoft/signalr';

// Import all blocks from blocks folder
import { allBlocks, blockCategories } from './blocks';

// Import custom components with dynamic functionality
import { registerCustomComponents, customBlocks } from './customComponents';

// Style manager sectors
const styleManagerSectors = [
  {
    name: 'Layout',
    open: true,
    properties: [
      {
        property: 'display',
        type: 'select',
        defaults: 'block',
        options: [
          { id: 'block', label: 'Block' },
          { id: 'flex', label: 'Flex' },
          { id: 'grid', label: 'Grid' },
          { id: 'inline', label: 'Inline' },
          { id: 'inline-block', label: 'Inline Block' },
          { id: 'none', label: 'None' },
        ],
      },
      {
        property: 'flex-direction',
        type: 'select',
        defaults: 'row',
        options: [
          { id: 'row', label: 'Row' },
          { id: 'row-reverse', label: 'Row Reverse' },
          { id: 'column', label: 'Column' },
          { id: 'column-reverse', label: 'Column Reverse' },
        ],
      },
      {
        property: 'justify-content',
        type: 'select',
        defaults: 'flex-start',
        options: [
          { id: 'flex-start', label: 'Start' },
          { id: 'flex-end', label: 'End' },
          { id: 'center', label: 'Center' },
          { id: 'space-between', label: 'Space Between' },
          { id: 'space-around', label: 'Space Around' },
        ],
      },
      {
        property: 'align-items',
        type: 'select',
        defaults: 'stretch',
        options: [
          { id: 'flex-start', label: 'Start' },
          { id: 'flex-end', label: 'End' },
          { id: 'center', label: 'Center' },
          { id: 'stretch', label: 'Stretch' },
        ],
      },
      { property: 'gap' },
    ],
  },
  {
    name: 'Dimension',
    open: false,
    properties: [
      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',
      'padding',
      'margin',
    ],
  },
  {
    name: 'Typography',
    open: false,
    properties: [
      {
        property: 'font-family',
        type: 'select',
        defaults: 'Arial, sans-serif',
        options: [
          { id: 'Arial, sans-serif', label: 'Arial' },
          { id: '"Helvetica Neue", sans-serif', label: 'Helvetica' },
          { id: 'Georgia, serif', label: 'Georgia' },
          { id: '"Times New Roman", serif', label: 'Times New Roman' },
          { id: '"Courier New", monospace', label: 'Courier' },
          { id: 'Inter, sans-serif', label: 'Inter' },
          { id: 'Roboto, sans-serif', label: 'Roboto' },
        ],
      },
      'font-size',
      {
        property: 'font-weight',
        type: 'select',
        defaults: '400',
        options: [
          { id: '300', label: 'Light' },
          { id: '400', label: 'Regular' },
          { id: '500', label: 'Medium' },
          { id: '600', label: 'Semi Bold' },
          { id: '700', label: 'Bold' },
        ],
      },
      'line-height',
      'letter-spacing',
      'color',
      {
        property: 'text-align',
        type: 'radio',
        defaults: 'left',
        options: [
          { id: 'left', label: 'L' },
          { id: 'center', label: 'C' },
          { id: 'right', label: 'R' },
          { id: 'justify', label: 'J' },
        ],
      },
      {
        property: 'text-decoration',
        type: 'select',
        defaults: 'none',
        options: [
          { id: 'none', label: 'None' },
          { id: 'underline', label: 'Underline' },
          { id: 'line-through', label: 'Line Through' },
        ],
      },
    ],
  },
  {
    name: 'Background',
    open: true,
    properties: [
      'background-color',
      {
        property: 'background-image',
        type: 'file',
      },
      {
        property: 'background-size',
        type: 'select',
        defaults: 'auto',
        options: [
          { id: 'auto', label: 'Auto' },
          { id: 'cover', label: 'Cover' },
          { id: 'contain', label: 'Contain' },
        ],
      },
      {
        property: 'background-position',
        type: 'select',
        defaults: 'center',
        options: [
          { id: 'center', label: 'Center' },
          { id: 'top', label: 'Top' },
          { id: 'bottom', label: 'Bottom' },
          { id: 'left', label: 'Left' },
          { id: 'right', label: 'Right' },
        ],
      },
      {
        property: 'background-repeat',
        type: 'select',
        defaults: 'no-repeat',
        options: [
          { id: 'no-repeat', label: 'No Repeat' },
          { id: 'repeat', label: 'Repeat' },
          { id: 'repeat-x', label: 'Repeat X' },
          { id: 'repeat-y', label: 'Repeat Y' },
        ],
      },
    ],
  },
  {
    name: 'Border',
    open: false,
    properties: [
      'border-width',
      {
        property: 'border-style',
        type: 'select',
        defaults: 'none',
        options: [
          { id: 'none', label: 'None' },
          { id: 'solid', label: 'Solid' },
          { id: 'dashed', label: 'Dashed' },
          { id: 'dotted', label: 'Dotted' },
        ],
      },
      'border-color',
      'border-radius',
    ],
  },
  {
    name: 'Effects',
    open: false,
    properties: [
      'box-shadow',
      {
        property: 'opacity',
        type: 'slider',
        defaults: 1,
        min: 0,
        max: 1,
        step: 0.1,
      },
      {
        property: 'overflow',
        type: 'select',
        defaults: 'visible',
        options: [
          { id: 'visible', label: 'Visible' },
          { id: 'hidden', label: 'Hidden' },
          { id: 'scroll', label: 'Scroll' },
          { id: 'auto', label: 'Auto' },
        ],
      },
    ],
  },
];

export default function GrapeEditor({
  pageId,
  pageTitle,
  initialContent,
  oemCompanyId,
  onSave,
  onClose,
  // User-defined custom blocks and components
  userBlocks = [],
  userComponents = null,
}) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const blocksContainerRef = useRef(null);
  const stylesContainerRef = useRef(null);
  const traitsContainerRef = useRef(null);
  const layersContainerRef = useRef(null);

  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState(0);
  const [device, setDevice] = useState('Desktop');
  const [isAIBuilding, setIsAIBuilding] = useState(false);
  const [aiBuildingMessage, setAiBuildingMessage] = useState('');
  const signalRConnectionRef = useRef(null);

  // SignalR connection for real-time updates from AI Designer
  useEffect(() => {
    if (!pageId) return;

    let isCancelled = false;
    let connection = null;

    const connectSignalR = async () => {
      // Use the API URI from environment for SignalR hub (backend server)
      const apiUri = process.env.apiUri || 'http://localhost:54218';
      const hubUrl = `${apiUri}/pagebuilder`;

      connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Warning)
        .build();

      // Handle content replaced (from AI Designer)
      connection.on('OnContentReplaced', (content) => {
        console.log('[AI Designer] Content replaced:', content);
        if (editorRef.current) {
          try {
            const parsed = typeof content === 'string' ? JSON.parse(content) : content;

            if (parsed.components && parsed.styles) {
              // GrapeJS project data format - load directly
              editorRef.current.loadProjectData(parsed);
            } else {
              const editor = editorRef.current;
              const html = parsed.html || '';
              const css = parsed.css || '';

              // Parse HTML to extract inline styles BEFORE giving to GrapeJS
              // Create a temporary DOM parser
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');

              // Collect all inline styles and convert to CSS rules
              const styleRules = [];
              let idCounter = 0;

              const processElement = (el) => {
                if (el.style && el.style.cssText) {
                  // Generate a unique ID if element doesn't have one
                  if (!el.id) {
                    el.id = `ai-el-${idCounter++}`;
                  }
                  // Create a CSS rule for this element
                  styleRules.push(`#${el.id} { ${el.style.cssText} }`);
                }
                // Process children
                Array.from(el.children).forEach(child => processElement(child));
              };

              // Process all elements in body
              Array.from(doc.body.children).forEach(child => processElement(child));

              // Get the modified HTML (with IDs added)
              const modifiedHtml = doc.body.innerHTML;

              // Combine extracted styles with any provided CSS
              const combinedCss = styleRules.join('\n') + '\n' + css;

              console.log('[AI Designer] Extracted', styleRules.length, 'inline style rules');

              // Set components with modified HTML
              editor.setComponents(modifiedHtml);

              // Inject the combined CSS into the canvas iframe
              setTimeout(() => {
                try {
                  const canvas = editor.Canvas;
                  const canvasDoc = canvas.getDocument();
                  if (canvasDoc) {
                    let styleEl = canvasDoc.getElementById('ai-designer-styles');
                    if (!styleEl) {
                      styleEl = canvasDoc.createElement('style');
                      styleEl.id = 'ai-designer-styles';
                      canvasDoc.head.appendChild(styleEl);
                    }
                    styleEl.textContent = combinedCss;
                    console.log('[AI Designer] CSS injected into canvas iframe');
                  }

                  // Also add to GrapeJS style manager for persistence
                  if (combinedCss) {
                    editor.setStyle(combinedCss);
                  }

                  editor.refresh();
                } catch (cssError) {
                  console.warn('[AI Designer] Could not inject CSS:', cssError);
                }
              }, 100);
            }
            console.log('[AI Designer] Content updated successfully');
          } catch (e) {
            console.error('[AI Designer] Error updating content:', e);
          }
        }
      });

      // Handle building started
      connection.on('OnBuildingStarted', (message) => {
        console.log('[AI Designer] Building started:', message);
        setIsAIBuilding(true);
        setAiBuildingMessage(message || 'AI is generating...');
      });

      // Handle building completed
      connection.on('OnBuildingCompleted', () => {
        console.log('[AI Designer] Building completed');
        setIsAIBuilding(false);
        setAiBuildingMessage('');
      });

      // Handle building progress
      connection.on('OnBuildingProgress', (message, currentStep, totalSteps) => {
        console.log('[AI Designer] Progress:', message, currentStep, '/', totalSteps);
        setAiBuildingMessage(message);
      });

      try {
        // Check if cancelled before starting
        if (isCancelled) return;

        await connection.start();

        // Check if cancelled after connection started
        if (isCancelled) {
          await connection.stop();
          return;
        }

        console.log('[AI Designer] Connected to SignalR hub');
        signalRConnectionRef.current = connection;

        await connection.invoke('JoinPage', pageId);
        console.log('[AI Designer] Joined page:', pageId);
      } catch (error) {
        // Ignore errors if we're cleaning up
        if (!isCancelled) {
          console.warn('[AI Designer] SignalR connection failed (server may be unavailable):', error.message);
        }
      }
    };

    // Delay connection slightly to avoid StrictMode double-mount issues
    const timeoutId = setTimeout(connectSignalR, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);

      if (connection) {
        const conn = connection;
        if (conn.state === signalR.HubConnectionState.Connected) {
          conn.invoke('LeavePage', pageId).catch(() => {});
        }
        conn.stop().catch(() => {});
      }
      signalRConnectionRef.current = null;
    };
  }, [pageId]);

  // Initialize GrapeJS
  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    // Small delay to ensure all refs are mounted
    const initTimeout = setTimeout(() => {
      if (!containerRef.current || !blocksContainerRef.current) {
        console.error('Required containers not mounted');
        return;
      }

      console.log('Initializing GrapeJS editor...');
      console.log('Container ref:', containerRef.current);
      console.log('Blocks container ref:', blocksContainerRef.current);

      const gjsEditor = grapesjs.init({
        container: containerRef.current,
        height: '100%',
        width: '100%',
        fromElement: false,
        storageManager: false,

        // Block manager - renders to our container with all 100+ blocks + custom dynamic blocks + user blocks
        blockManager: {
          appendTo: blocksContainerRef.current,
          blocks: [...allBlocks, ...customBlocks, ...userBlocks],
        },

        // Asset Manager - for image uploads and selection
        assetManager: {
          assets: [],
          uploadFile: async (e) => {
            const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            if (!files || files.length === 0) return;

            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('title', files[0].name);
            if (oemCompanyId) {
              formData.append('privateLabelCompanyId', oemCompanyId);
            }

            try {
              const response = await apiService().post('/ContentManagement/UploadAsset', formData);
              if (response.status === 200 && response.data) {
                gjsEditor.AssetManager.add({
                  src: response.data.url,
                  name: response.data.fileName || files[0].name,
                  type: 'image',
                });
              }
            } catch (error) {
              console.error('Error uploading asset:', error);
            }
          },
          autoAdd: true,
        },

        // Style manager
        styleManager: {
          appendTo: stylesContainerRef.current,
          sectors: styleManagerSectors,
        },

        // Layer manager
        layerManager: {
          appendTo: layersContainerRef.current,
        },

        // Trait manager (component settings)
        traitManager: {
          appendTo: traitsContainerRef.current,
        },

        // Selector manager (CSS classes)
        selectorManager: {
          componentFirst: true,
        },

        // Device manager
        deviceManager: {
          devices: [
            { name: 'Desktop', width: '' },
            { name: 'Tablet', width: '768px', widthMedia: '992px' },
            { name: 'Mobile', width: '320px', widthMedia: '480px' },
          ],
        },

        // Canvas styling
        canvas: {
          styles: [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
          ],
        },

        // Disable default panels (we use our own UI)
        panels: { defaults: [] },
      });

      // Load existing assets from the API
      const loadAssets = async () => {
        try {
          const response = await apiService().get(
            `/ContentManagement/GetPageImageAssets?oemCompanyId=${oemCompanyId || ''}`
          );
          if (response?.status === 200 && response.data) {
            const assets = response.data.map((asset) => ({
              src: asset.url,
              name: asset.fileName || asset.title,
              type: 'image',
            }));
            gjsEditor.AssetManager.add(assets);
          }
        } catch (error) {
          console.error('Error loading assets:', error);
        }
      };
      loadAssets();

      // Store editor reference
      editorRef.current = gjsEditor;
      setEditor(gjsEditor);

      // Register custom component types (Audio Player, Video Player, Countdown, Marketplace)
      registerCustomComponents(gjsEditor, { oemCompanyId, platformId: 1 });

      // Register user-defined custom component types
      if (userComponents && typeof userComponents === 'function') {
        userComponents(gjsEditor);
      }

      // Configure wrapper to be droppable
      const wrapper = gjsEditor.DomComponents.getWrapper();
      if (wrapper) {
        wrapper.set({
          droppable: true,
          stylable: true,
        });
      }

      // Load initial content after a brief delay to ensure canvas is ready
      setTimeout(() => {
        if (initialContent) {
          try {
            const content = typeof initialContent === 'string'
              ? JSON.parse(initialContent)
              : initialContent;

            if (content.components && content.styles) {
              // GrapeJS project data format
              gjsEditor.loadProjectData(content);
            } else if (content.html) {
              gjsEditor.setComponents(content.html);
              if (content.css) {
                gjsEditor.setStyle(content.css);
              }
            }
            console.log('Content loaded successfully');
          } catch (e) {
            console.error('Error loading content:', e);
          }
        }
      }, 50);

      // Track changes
      gjsEditor.on('change:changesCount', () => {
        setHasChanges(true);
      });

      // Debug: log when components are added
      gjsEditor.on('component:add', (component) => {
        console.log('Component added:', component.get('tagName'), component);
      });

      gjsEditor.on('component:selected', (component) => {
        console.log('Component selected:', component.get('tagName'));
      });

      console.log('GrapeJS editor initialized successfully');
    }, 100); // 100ms delay for DOM to be ready

    return () => {
      clearTimeout(initTimeout);
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Load initial content when it changes (after editor is ready)
  useEffect(() => {
    if (!editor || !initialContent) return;

    try {
      const content = typeof initialContent === 'string'
        ? JSON.parse(initialContent)
        : initialContent;

      if (content.components && content.styles) {
        editor.loadProjectData(content);
      } else if (content.html) {
        editor.setComponents(content.html);
        if (content.css) {
          editor.setStyle(content.css);
        }
      }
    } catch (e) {
      console.error('Error loading initial content:', e);
    }
  }, [initialContent, editor]);

  // Handle device change
  const handleDeviceChange = useCallback((deviceName) => {
    if (editor) {
      editor.setDevice(deviceName);
      setDevice(deviceName);
    }
  }, [editor]);

  // Save handler
  const handleSave = useCallback(async () => {
    if (!editor) return;

    setSaving(true);
    try {
      const projectData = editor.getProjectData();
      const content = {
        html: editor.getHtml(),
        css: editor.getCss(),
        ...projectData,
      };

      if (onSave) {
        await onSave(content);
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  }, [editor, onSave]);

  // Undo/Redo
  const handleUndo = useCallback(() => {
    if (editor) {
      editor.UndoManager.undo();
    }
  }, [editor]);

  const handleRedo = useCallback(() => {
    if (editor) {
      editor.UndoManager.redo();
    }
  }, [editor]);

  // Close handler
  const handleClose = useCallback(() => {
    if (hasChanges) {
      if (!window.confirm('You have unsaved changes. Leave anyway?')) {
        return;
      }
    }
    if (onClose) {
      onClose();
    }
  }, [hasChanges, onClose]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#1e1e1e' }}>
      {/* Header Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: '1px solid #333',
          bgcolor: '#252525',
        }}
      >
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleClose}
            sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Back
          </Button>
          <Typography sx={{ color: '#fff', fontWeight: 500 }}>
            {pageTitle || 'Untitled Page'}
          </Typography>
          {hasChanges && (
            <Typography sx={{ color: '#ffa500', fontSize: 12 }}>
              (unsaved changes)
            </Typography>
          )}
          {isAIBuilding && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, px: 2, py: 0.5, bgcolor: 'rgba(102, 126, 234, 0.2)', borderRadius: 2 }}>
              <CircularProgress size={14} sx={{ color: '#667eea' }} />
              <Typography sx={{ color: '#667eea', fontSize: 12, fontWeight: 500 }}>
                {aiBuildingMessage || 'AI is generating...'}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Center - Device buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Desktop">
            <IconButton
              onClick={() => handleDeviceChange('Desktop')}
              sx={{
                color: device === 'Desktop' ? '#1976d2' : '#888',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <DesktopWindowsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tablet">
            <IconButton
              onClick={() => handleDeviceChange('Tablet')}
              sx={{
                color: device === 'Tablet' ? '#1976d2' : '#888',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <TabletMacIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mobile">
            <IconButton
              onClick={() => handleDeviceChange('Mobile')}
              sx={{
                color: device === 'Mobile' ? '#1976d2' : '#888',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <PhoneIphoneIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Undo">
            <IconButton
              onClick={handleUndo}
              sx={{ color: '#888', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton
              onClick={handleRedo}
              sx={{ color: '#888', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <RedoIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{ ml: 1 }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>

      {/* Main Editor Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel - Blocks */}
        <Box
          sx={{
            width: 280,
            bgcolor: '#252525',
            borderRight: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              p: 2,
              color: '#fff',
              fontWeight: 600,
              borderBottom: '1px solid #333',
            }}
          >
            Components
          </Typography>
          <Box
            ref={blocksContainerRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1,
              // GrapeJS block styles
              '& .gjs-blocks-c': {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              },
              '& .gjs-block-category': {
                width: '100%',
              },
              '& .gjs-block-category .gjs-title': {
                bgcolor: '#2a2a2a',
                color: '#e0e0e0',
                p: 1,
                borderBottom: '1px solid #333',
                fontWeight: 500,
              },
              '& .gjs-block': {
                width: 'calc(50% - 10px)',
                minHeight: 80,
                m: '5px',
                p: 1,
                bgcolor: '#333',
                border: '1px solid #444',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#1976d2',
                  bgcolor: '#3a3a3a',
                },
              },
              '& .gjs-block svg': {
                color: '#888',
                mb: 0.5,
              },
              '& .gjs-block-label': {
                fontSize: 11,
                color: '#aaa',
                textAlign: 'center',
              },
            }}
          />
        </Box>

        {/* Canvas Area */}
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
            // GrapeJS editor container styles
            '& .gjs-editor': {
              height: '100%',
            },
            '& .gjs-cv-canvas': {
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: '#f0f0f0',
            },
            '& .gjs-frame-wrapper': {
              backgroundColor: '#fff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            },
            // Drag indicator styles
            '& .gjs-highlighter': {
              outline: '2px solid #1976d2 !important',
              outlineOffset: '-2px',
            },
            '& .gjs-placeholder': {
              border: '2px dashed #1976d2 !important',
              backgroundColor: 'rgba(25, 118, 210, 0.1) !important',
            },
            '& .gjs-selected': {
              outline: '2px solid #1976d2 !important',
              outlineOffset: '-2px',
            },
            '& .gjs-hovered': {
              outline: '1px dashed #888 !important',
            },
            // Component toolbar
            '& .gjs-toolbar': {
              backgroundColor: '#1976d2',
            },
            '& .gjs-toolbar-item': {
              color: '#fff',
            },
            // RTE toolbar
            '& .gjs-rte-toolbar': {
              backgroundColor: '#333',
              border: '1px solid #444',
              borderRadius: '4px',
            },
            '& .gjs-rte-action': {
              color: '#e0e0e0',
              '&:hover': {
                backgroundColor: '#444',
              },
            },
            // Badge
            '& .gjs-badge': {
              backgroundColor: '#1976d2',
              color: '#fff',
            },
          }}
        />

        {/* Right Panel - Styles/Settings/Layers */}
        <Box
          sx={{
            width: 300,
            bgcolor: '#252525',
            borderLeft: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Tab Header */}
          <Tabs
            value={rightPanelTab}
            onChange={(e, v) => setRightPanelTab(v)}
            variant="fullWidth"
            sx={{
              borderBottom: '1px solid #333',
              minHeight: 48,
              '& .MuiTab-root': {
                minHeight: 48,
                color: '#888',
                '&.Mui-selected': { color: '#1976d2' },
              },
              '& .MuiTabs-indicator': { bgcolor: '#1976d2' },
            }}
          >
            <Tab icon={<BrushIcon fontSize="small" />} label="Style" />
            <Tab icon={<SettingsIcon fontSize="small" />} label="Settings" />
            <Tab icon={<LayersIcon fontSize="small" />} label="Layers" />
          </Tabs>

          {/* Style Panel */}
          <Box
            ref={stylesContainerRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              display: rightPanelTab === 0 ? 'block' : 'none',
              // GrapeJS style manager styles
              '& .gjs-sm-sector': {
                borderBottom: '1px solid #333',
              },
              '& .gjs-sm-sector-title': {
                bgcolor: '#2a2a2a',
                color: '#e0e0e0',
                p: 1.5,
                cursor: 'pointer',
                '&:hover': { bgcolor: '#333' },
              },
              '& .gjs-sm-properties': {
                p: 1.5,
              },
              '& .gjs-sm-property': {
                mb: 1.5,
              },
              '& .gjs-sm-label': {
                color: '#aaa',
                fontSize: 12,
                mb: 0.5,
              },
              '& .gjs-field': {
                bgcolor: '#333',
                border: '1px solid #444',
                borderRadius: 1,
                color: '#e0e0e0',
              },
              '& .gjs-field input': {
                color: '#e0e0e0',
              },
              '& .gjs-field select': {
                color: '#e0e0e0',
                bgcolor: '#333',
              },
              '& .gjs-radio-item': {
                color: '#888',
              },
              '& .gjs-radio-item-label': {
                color: '#888',
              },
              '& .gjs-radio-item input:checked + .gjs-radio-item-label': {
                color: '#1976d2',
              },
            }}
          />

          {/* Traits Panel (Settings) */}
          <Box
            ref={traitsContainerRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              display: rightPanelTab === 1 ? 'block' : 'none',
              p: 2,
              '& .gjs-trt-trait': {
                mb: 2,
              },
              '& .gjs-label': {
                color: '#aaa',
                fontSize: 12,
                mb: 0.5,
              },
              '& .gjs-field': {
                bgcolor: '#333',
                border: '1px solid #444',
                borderRadius: 1,
              },
              '& .gjs-field input': {
                color: '#e0e0e0',
              },
            }}
          />

          {/* Layers Panel */}
          <Box
            ref={layersContainerRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              display: rightPanelTab === 2 ? 'block' : 'none',
              '& .gjs-layer': {
                bgcolor: '#2a2a2a',
                color: '#e0e0e0',
                borderBottom: '1px solid #333',
              },
              '& .gjs-layer:hover': {
                bgcolor: '#333',
              },
              '& .gjs-layer.gjs-selected': {
                bgcolor: '#1976d2',
              },
              '& .gjs-layer-title': {
                p: 1,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
