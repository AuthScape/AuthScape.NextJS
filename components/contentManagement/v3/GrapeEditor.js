/**
 * GrapeJS Editor - Elementor-like Visual Page Builder
 * Uses GrapeJS with proper block panel integration
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Button, CircularProgress, Typography, IconButton, Tooltip, Tabs, Tab, TextField, InputAdornment } from '@mui/material';
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
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import grapesjs from 'grapesjs';
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
  // AI prompt integration
  enableAIPrompt = false,
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
  const [blockSearchQuery, setBlockSearchQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const signalRConnectionRef = useRef(null);

  // Inject global CSS to hide URL input in GrapeJS asset manager + light theme overrides
  useEffect(() => {
    const styleId = 'grapejs-asset-manager-custom-styles';
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        /* Hide the URL input section in GrapeJS Asset Manager */
        .gjs-am-add-asset,
        .gjs-am-file-uploader form > div:last-child,
        .gjs-am-assets-header form input[type="text"],
        .gjs-am-assets-header form button {
          display: none !important;
        }
        /* Make the dropzone full width when URL input is hidden */
        .gjs-am-file-uploader {
          width: 100% !important;
        }
        .gjs-am-file-uploader #gjs-am-uploadFile {
          width: 100% !important;
          min-height: 200px !important;
        }

        /* ===== Light Theme - Asset Manager Modal ===== */
        .gjs-mdl-dialog {
          background-color: #ffffff !important;
          color: #333333 !important;
          border-radius: 8px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
        }
        .gjs-mdl-header {
          background-color: #fafafa !important;
          border-bottom: 1px solid #e0e0e0 !important;
          color: #333333 !important;
        }
        .gjs-mdl-title {
          color: #333333 !important;
          font-weight: 600 !important;
        }
        .gjs-mdl-btn-close {
          color: #6d7882 !important;
        }
        .gjs-mdl-content {
          background-color: #ffffff !important;
        }
        .gjs-am-file-uploader #gjs-am-uploadFile {
          background-color: #f8f9fa !important;
          border: 2px dashed #d5d8dc !important;
          border-radius: 8px !important;
          color: #6d7882 !important;
          transition: all 0.2s !important;
        }
        .gjs-am-file-uploader #gjs-am-uploadFile:hover {
          border-color: #1976d2 !important;
          background-color: #f0f7ff !important;
        }
        .gjs-am-assets-cont {
          background-color: #ffffff !important;
        }
        .gjs-am-asset-image .gjs-am-preview-cont {
          background-color: #ffffff !important;
          border: 1px solid #e0e0e0 !important;
          border-radius: 4px !important;
        }
        .gjs-am-meta {
          color: #333333 !important;
        }
        .gjs-am-close {
          color: #6d7882 !important;
        }

        /* ===== Light Theme - Scrollbar Styling ===== */
        .gjs-editor-cont ::-webkit-scrollbar,
        .gjs-blocks-c::-webkit-scrollbar,
        .gjs-sm-sectors::-webkit-scrollbar,
        .gjs-layers::-webkit-scrollbar {
          width: 6px !important;
        }
        .gjs-editor-cont ::-webkit-scrollbar-track,
        .gjs-blocks-c::-webkit-scrollbar-track,
        .gjs-sm-sectors::-webkit-scrollbar-track,
        .gjs-layers::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .gjs-editor-cont ::-webkit-scrollbar-thumb,
        .gjs-blocks-c::-webkit-scrollbar-thumb,
        .gjs-sm-sectors::-webkit-scrollbar-thumb,
        .gjs-layers::-webkit-scrollbar-thumb {
          background-color: #d5d8dc !important;
          border-radius: 3px !important;
        }
        .gjs-editor-cont ::-webkit-scrollbar-thumb:hover,
        .gjs-blocks-c::-webkit-scrollbar-thumb:hover,
        .gjs-sm-sectors::-webkit-scrollbar-thumb:hover,
        .gjs-layers::-webkit-scrollbar-thumb:hover {
          background-color: #bbb !important;
        }

        /* ===== Light Theme - RTE Toolbar ===== */
        .gjs-rte-toolbar {
          background-color: #ffffff !important;
          border: 1px solid #e0e0e0 !important;
          border-radius: 6px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
        }
        .gjs-rte-action {
          color: #333333 !important;
          border-right: 1px solid #e0e0e0 !important;
        }
        .gjs-rte-action:hover {
          background-color: rgba(0,0,0,0.04) !important;
        }
        .gjs-rte-active {
          background-color: #e3f2fd !important;
          color: #1976d2 !important;
        }

        /* ===== Light Theme - Selector Manager ===== */
        .gjs-clm-tags {
          background-color: #ffffff !important;
          color: #333333 !important;
        }
        .gjs-clm-tag {
          background-color: #e3f2fd !important;
          color: #1976d2 !important;
        }

        /* ===== Light Theme - Block Cards ===== */
        .gjs-block {
          background-color: #ffffff !important;
          border: 1px solid #e8e8e8 !important;
          border-radius: 8px !important;
          color: #6d7882 !important;
        }
        .gjs-block:hover {
          border-color: #1976d2 !important;
          background-color: #f8fbff !important;
          box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08) !important;
        }
        .gjs-block svg,
        .gjs-block svg path {
          color: #6d7882 !important;
          fill: currentColor !important;
        }
        .gjs-block-label {
          color: #6d7882 !important;
          font-weight: 500 !important;
        }

        /* ===== Light Theme - Block Categories ===== */
        .gjs-block-category {
          background-color: #ffffff !important;
        }
        .gjs-block-category .gjs-title {
          background-color: #ffffff !important;
          color: #6d7882 !important;
          border-bottom: 1px solid #e8e8e8 !important;
          font-weight: 600 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }
        .gjs-blocks-c {
          background-color: #ffffff !important;
        }

        /* ===== Light Theme - Style Manager ===== */
        .gjs-sm-sector {
          background-color: #ffffff !important;
          border-bottom: 1px solid #e0e0e0 !important;
        }
        .gjs-sm-sector-title {
          background-color: #f8f9fa !important;
          color: #333333 !important;
          font-weight: 600 !important;
        }
        .gjs-sm-sector-title:hover {
          background-color: #f0f0f0 !important;
        }
        .gjs-sm-label {
          color: #6d7882 !important;
          font-weight: 500 !important;
        }
        .gjs-sm-properties {
          background-color: #ffffff !important;
        }
        .gjs-field {
          background-color: #ffffff !important;
          border: 1px solid #d5d8dc !important;
          border-radius: 4px !important;
          color: #333333 !important;
        }
        .gjs-field:focus-within {
          border-color: #1976d2 !important;
        }
        .gjs-field input,
        .gjs-field textarea {
          color: #333333 !important;
          background-color: transparent !important;
        }
        .gjs-field select {
          color: #333333 !important;
          background-color: #ffffff !important;
        }
        .gjs-field-arrows {
          color: #93989c !important;
        }
        .gjs-radio-item {
          color: #93989c !important;
        }
        .gjs-radio-item-label {
          color: #93989c !important;
          border: 1px solid #d5d8dc !important;
          background-color: #ffffff !important;
        }
        .gjs-radio-item input:checked + .gjs-radio-item-label {
          color: #1976d2 !important;
          background-color: rgba(25, 118, 210, 0.08) !important;
          border-color: #1976d2 !important;
        }

        /* ===== Light Theme - Traits Panel ===== */
        .gjs-trt-traits {
          background-color: #ffffff !important;
        }
        .gjs-trt-trait {
          background-color: #ffffff !important;
        }
        .gjs-trt-trait .gjs-label {
          color: #6d7882 !important;
          font-weight: 500 !important;
        }

        /* ===== Light Theme - Layers Panel ===== */
        .gjs-layer {
          background-color: #ffffff !important;
          color: #333333 !important;
          border-bottom: 1px solid #e8e8e8 !important;
        }
        .gjs-layer:hover {
          background-color: #f0f3f5 !important;
        }
        .gjs-layer.gjs-selected {
          background-color: #e3f2fd !important;
          color: #1976d2 !important;
        }
        .gjs-layer-title {
          background-color: transparent !important;
        }
        .gjs-layer-name {
          color: inherit !important;
        }
        .gjs-layer-caret {
          color: #93989c !important;
        }
        .gjs-layer-vis {
          color: #93989c !important;
        }
        .gjs-layers {
          background-color: #ffffff !important;
        }

        /* ===== Light Theme - Editor Container ===== */
        .gjs-one-bg {
          background-color: #ffffff !important;
        }
        .gjs-two-color {
          color: #333333 !important;
        }
        .gjs-three-bg {
          background-color: #f8f9fa !important;
        }
        .gjs-four-color,
        .gjs-four-color-h:hover {
          color: #1976d2 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    return () => {
      // Don't remove on unmount as other editors might use it
    };
  }, []);

  // Block search filter
  useEffect(() => {
    if (!blocksContainerRef.current) return;

    const query = blockSearchQuery.toLowerCase().trim();
    const blocks = blocksContainerRef.current.querySelectorAll('.gjs-block');
    const categories = blocksContainerRef.current.querySelectorAll('.gjs-block-category');

    blocks.forEach((block) => {
      const label = block.querySelector('.gjs-block-label');
      const text = label ? label.textContent.toLowerCase() : '';
      block.style.display = !query || text.includes(query) ? '' : 'none';
    });

    categories.forEach((cat) => {
      const catBlocks = cat.querySelectorAll('.gjs-block');
      const allHidden = Array.from(catBlocks).every((b) => b.style.display === 'none');
      cat.style.display = allHidden ? 'none' : '';
    });
  }, [blockSearchQuery]);

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
          // Disable the URL input - only allow selecting from uploaded assets or uploading new ones
          embedAsBase64: false,
          // Custom upload handler
          upload: false, // Disable default upload, we handle it manually
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
          dropzone: true,
          dropzoneContent: 'Drop files here or click to upload new images',
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

  // AI prompt submit handler
  const handleAIPrompt = useCallback(async () => {
    if (!editor || !aiPrompt.trim() || aiGenerating) return;

    setAiGenerating(true);
    try {
      const currentHtml = editor.getHtml();
      const currentCss = editor.getCss();

      await apiService().post('/AIDesigner/GenerateFromPrompt', {
        pageId,
        prompt: aiPrompt.trim(),
        currentHtml,
        currentCss,
      });

      // Clear the prompt on success — SignalR handles the content update
      setAiPrompt('');
    } catch (error) {
      console.error('AI generation error:', error);
      setAiBuildingMessage('Generation failed. Please try again.');
      setTimeout(() => {
        setIsAIBuilding(false);
        setAiBuildingMessage('');
      }, 3000);
    } finally {
      setAiGenerating(false);
    }
  }, [editor, aiPrompt, aiGenerating, pageId]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f0f0f0' }}>
      {/* Header Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: '1px solid #e0e0e0',
          bgcolor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          zIndex: 10,
        }}
      >
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleClose}
            sx={{ color: '#333333', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Back
          </Button>
          <Typography sx={{ color: '#333333', fontWeight: 600 }}>
            {pageTitle || 'Untitled Page'}
          </Typography>
          {hasChanges && (
            <Typography sx={{ color: '#e67e22', fontSize: 12, fontWeight: 500 }}>
              (unsaved changes)
            </Typography>
          )}
          {isAIBuilding && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, px: 2, py: 0.5, bgcolor: 'rgba(102, 126, 234, 0.1)', borderRadius: 2 }}>
              <CircularProgress size={14} sx={{ color: '#667eea' }} />
              <Typography sx={{ color: '#667eea', fontSize: 12, fontWeight: 500 }}>
                {aiBuildingMessage || 'AI is generating...'}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Center - Device buttons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Desktop">
            <IconButton
              onClick={() => handleDeviceChange('Desktop')}
              sx={{
                color: device === 'Desktop' ? '#1976d2' : '#93989c',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <DesktopWindowsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tablet">
            <IconButton
              onClick={() => handleDeviceChange('Tablet')}
              sx={{
                color: device === 'Tablet' ? '#1976d2' : '#93989c',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <TabletMacIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mobile">
            <IconButton
              onClick={() => handleDeviceChange('Mobile')}
              sx={{
                color: device === 'Mobile' ? '#1976d2' : '#93989c',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <PhoneIphoneIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Undo">
            <IconButton
              onClick={handleUndo}
              sx={{ color: '#93989c', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton
              onClick={handleRedo}
              sx={{ color: '#93989c', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
            >
              <RedoIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{
              ml: 1,
              bgcolor: '#1976d2',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#1565c0', boxShadow: 'none' },
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>

      {/* Main Editor Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel - Elementor-Style Blocks */}
        <Box
          sx={{
            width: 280,
            bgcolor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Panel Header */}
          <Typography
            sx={{
              px: 2,
              py: 1.5,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: '#6d7882',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            Elements
          </Typography>

          {/* Search Input */}
          <Box sx={{ px: 1.5, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search widget..."
                value={blockSearchQuery}
                onChange={(e) => setBlockSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: '#93989c' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f5f5f5',
                    fontSize: 13,
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#d5d8dc' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                  },
                }}
              />
            </Box>

          {/* Block Grid */}
          <Box
            ref={blocksContainerRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1,
              // GrapeJS block styles — Elementor-style light theme
              '& .gjs-blocks-c': {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              },
              '& .gjs-block-category': {
                width: '100%',
              },
              '& .gjs-block-category .gjs-title': {
                bgcolor: '#ffffff',
                color: '#6d7882',
                p: 1,
                borderBottom: '1px solid #e8e8e8',
                fontWeight: 600,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              },
              '& .gjs-block': {
                width: 'calc(50% - 10px)',
                minHeight: 80,
                m: '5px',
                p: 1,
                bgcolor: '#ffffff',
                border: '1px solid #e8e8e8',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#1976d2',
                  bgcolor: '#f8fbff',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                },
              },
              '& .gjs-block svg': {
                color: '#6d7882',
                mb: 0.5,
              },
              '& .gjs-block-label': {
                fontSize: 11,
                color: '#6d7882',
                textAlign: 'center',
                fontWeight: 500,
              },
            }}
          />

        </Box>

        {/* Canvas Area */}
        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Box
            ref={containerRef}
            sx={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
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
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              },
              '& .gjs-rte-action': {
                color: '#333333',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              },
              // Badge
              '& .gjs-badge': {
                backgroundColor: '#1976d2',
                color: '#fff',
              },
            }}
          />

          {/* AI Prompt Bar */}
          {enableAIPrompt && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: 640,
                zIndex: 20,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: '#ffffff',
                  borderRadius: '28px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  px: 2,
                  py: 1,
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ color: '#1976d2', fontSize: 22 }} />
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Describe what you want to build..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={aiGenerating}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAIPrompt();
                    }
                  }}
                  multiline
                  maxRows={3}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                      color: '#333333',
                      '&::placeholder': { color: '#93989c' },
                    },
                  }}
                />
                <IconButton
                  onClick={handleAIPrompt}
                  disabled={!aiPrompt.trim() || aiGenerating}
                  sx={{
                    bgcolor: aiPrompt.trim() && !aiGenerating ? '#1976d2' : 'transparent',
                    color: aiPrompt.trim() && !aiGenerating ? '#ffffff' : '#93989c',
                    width: 36,
                    height: 36,
                    '&:hover': {
                      bgcolor: aiPrompt.trim() && !aiGenerating ? '#1565c0' : 'rgba(0,0,0,0.04)',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'transparent',
                      color: '#d5d8dc',
                    },
                  }}
                >
                  {aiGenerating ? (
                    <CircularProgress size={18} sx={{ color: '#1976d2' }} />
                  ) : (
                    <SendRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>

        {/* Right Panel - Styles/Settings/Layers */}
        <Box
          sx={{
            width: 300,
            bgcolor: '#ffffff',
            borderLeft: '1px solid #e0e0e0',
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
              bgcolor: '#fafafa',
              borderBottom: '1px solid #e0e0e0',
              minHeight: 48,
              '& .MuiTab-root': {
                minHeight: 48,
                color: '#93989c',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                '&.Mui-selected': { color: '#1976d2' },
              },
              '& .MuiTabs-indicator': { bgcolor: '#1976d2', height: 2 },
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
              // GrapeJS style manager — light theme
              '& .gjs-sm-sector': {
                borderBottom: '1px solid #e0e0e0',
              },
              '& .gjs-sm-sector-title': {
                bgcolor: '#f8f9fa',
                color: '#333333',
                p: 1.5,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 12,
                '&:hover': { bgcolor: '#f0f0f0' },
              },
              '& .gjs-sm-properties': {
                p: 1.5,
              },
              '& .gjs-sm-property': {
                mb: 1.5,
              },
              '& .gjs-sm-label': {
                color: '#6d7882',
                fontSize: 12,
                mb: 0.5,
                fontWeight: 500,
              },
              '& .gjs-field': {
                bgcolor: '#ffffff',
                border: '1px solid #d5d8dc',
                borderRadius: 1,
                color: '#333333',
                '&:focus-within': {
                  borderColor: '#1976d2',
                },
              },
              '& .gjs-field input': {
                color: '#333333',
              },
              '& .gjs-field select': {
                color: '#333333',
                bgcolor: '#ffffff',
              },
              '& .gjs-radio-item': {
                color: '#93989c',
              },
              '& .gjs-radio-item-label': {
                color: '#93989c',
              },
              '& .gjs-radio-item input:checked + .gjs-radio-item-label': {
                color: '#1976d2',
                bgcolor: 'rgba(25, 118, 210, 0.08)',
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
                color: '#6d7882',
                fontSize: 12,
                mb: 0.5,
                fontWeight: 500,
              },
              '& .gjs-field': {
                bgcolor: '#ffffff',
                border: '1px solid #d5d8dc',
                borderRadius: 1,
                '&:focus-within': {
                  borderColor: '#1976d2',
                },
              },
              '& .gjs-field input': {
                color: '#333333',
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
                bgcolor: '#ffffff',
                color: '#333333',
                borderBottom: '1px solid #e8e8e8',
              },
              '& .gjs-layer:hover': {
                bgcolor: '#f0f3f5',
              },
              '& .gjs-layer.gjs-selected': {
                bgcolor: '#e3f2fd',
                color: '#1976d2',
              },
              '& .gjs-layer-title': {
                p: 1,
              },
              '& .gjs-layer-name': {
                color: 'inherit',
              },
              '& .gjs-layer-count': {
                color: '#93989c',
              },
              '& .gjs-layer-vis': {
                color: '#93989c',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
