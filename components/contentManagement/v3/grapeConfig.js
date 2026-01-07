/**
 * GrapeJS Configuration for AuthScape CMS
 * Elementor-like page builder configuration
 */

import { styleManagerConfig } from './styleManagerConfig';

/**
 * Panel configuration - Elementor-like layout with left panel for blocks
 * and right panel for styles/settings
 */
export const panelsConfig = {
  defaults: [
    {
      id: 'layers',
      el: '.panel__right',
      resizable: {
        maxDim: 350,
        minDim: 200,
        tc: 0,
        cl: 1,
        cr: 0,
        bc: 0,
        keyWidth: 'flex-basis',
      },
    },
    {
      id: 'panel-switcher',
      el: '.panel__switcher',
      buttons: [
        {
          id: 'show-layers',
          active: true,
          label: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
          command: 'show-layers',
          togglable: false,
        },
        {
          id: 'show-style',
          active: false,
          label: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/></svg>',
          command: 'show-styles',
          togglable: false,
        },
        {
          id: 'show-traits',
          active: false,
          label: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
          command: 'show-traits',
          togglable: false,
        },
      ],
    },
    {
      id: 'panel-devices',
      el: '.panel__devices',
      buttons: [
        {
          id: 'device-desktop',
          label: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>',
          command: 'set-device-desktop',
          active: true,
          togglable: false,
        },
        {
          id: 'device-tablet',
          label: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"/></svg>',
          command: 'set-device-tablet',
          togglable: false,
        },
        {
          id: 'device-mobile',
          label: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>',
          command: 'set-device-mobile',
          togglable: false,
        },
      ],
    },
  ],
};

/**
 * Device manager configuration for responsive editing
 */
export const deviceManagerConfig = {
  devices: [
    {
      name: 'Desktop',
      width: '',
    },
    {
      name: 'Tablet',
      width: '768px',
      widthMedia: '992px',
    },
    {
      name: 'Mobile',
      width: '320px',
      widthMedia: '480px',
    },
  ],
};

/**
 * Block categories configuration
 */
export const blockCategories = [
  { id: 'layout', label: 'Layout' },
  { id: 'basic', label: 'Basic' },
  { id: 'typography', label: 'Typography' },
  { id: 'media', label: 'Media' },
  { id: 'forms', label: 'Forms' },
  { id: 'interactive', label: 'Interactive' },
];

/**
 * Basic blocks configuration - using simple HTML strings
 * This is the most reliable format for GrapeJS blocks
 */
export const blocksConfig = [
  // Simple test blocks using plain HTML strings
  {
    id: 'section',
    label: 'Section',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<section style="padding: 40px 20px; min-height: 100px; background: #f5f5f5; border: 2px dashed #999;">Drop content here</section>',
  },
  {
    id: 'container',
    label: 'Container',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<div style="max-width: 1200px; margin: 0 auto; padding: 20px; min-height: 80px; background: #e8e8e8; border: 2px dashed #888;">Container</div>',
  },
  {
    id: 'row',
    label: 'Row',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="8" width="20" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<div style="display: flex; gap: 20px; padding: 10px; min-height: 60px; background: #f0f0f0; border: 2px dashed #aaa;"><div style="flex: 1; min-height: 50px; padding: 10px; background: #dbeafe; border: 2px dashed #3b82f6;">Column 1</div><div style="flex: 1; min-height: 50px; padding: 10px; background: #dbeafe; border: 2px dashed #3b82f6;">Column 2</div></div>',
  },
  {
    id: 'column',
    label: 'Column',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="8" y="2" width="8" height="20" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<div style="flex: 1; min-height: 80px; padding: 15px; background: #dbeafe; border: 2px dashed #3b82f6;">Column content</div>',
  },
  {
    id: 'grid-2',
    label: '2 Columns',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<div style="display: flex; gap: 20px; padding: 10px; min-height: 100px;"><div style="flex: 1; padding: 20px; background: #dbeafe; border: 2px dashed #3b82f6;"><h3>Column 1</h3><p>Content here</p></div><div style="flex: 1; padding: 20px; background: #dbeafe; border: 2px dashed #3b82f6;"><h3>Column 2</h3><p>Content here</p></div></div>',
  },
  {
    id: 'grid-3',
    label: '3 Columns',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="4" width="5" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="9" y="4" width="6" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="17" y="4" width="5" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<div style="display: flex; gap: 20px; padding: 10px; min-height: 100px;"><div style="flex: 1; padding: 20px; background: #dbeafe; border: 2px dashed #3b82f6;"><h3>Col 1</h3></div><div style="flex: 1; padding: 20px; background: #dbeafe; border: 2px dashed #3b82f6;"><h3>Col 2</h3></div><div style="flex: 1; padding: 20px; background: #dbeafe; border: 2px dashed #3b82f6;"><h3>Col 3</h3></div></div>',
  },
  {
    id: 'grid-4',
    label: '4 Columns',
    category: 'Layout',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="1" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="7" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="19" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    content: '<div style="display: flex; gap: 15px; padding: 10px;"><div style="flex: 1; padding: 15px; background: #dbeafe; border: 2px dashed #3b82f6;">1</div><div style="flex: 1; padding: 15px; background: #dbeafe; border: 2px dashed #3b82f6;">2</div><div style="flex: 1; padding: 15px; background: #dbeafe; border: 2px dashed #3b82f6;">3</div><div style="flex: 1; padding: 15px; background: #dbeafe; border: 2px dashed #3b82f6;">4</div></div>',
  },

  // Basic Blocks - all using plain HTML strings
  {
    id: 'text',
    label: 'Text',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4H5z"/></svg>',
    content: '<div data-gjs-type="text">Insert your text here</div>',
  },
  {
    id: 'heading',
    label: 'Heading',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M5 4v3h5v12h4V7h5V4H5z"/></svg>',
    content: '<h2>Heading</h2>',
  },
  {
    id: 'paragraph',
    label: 'Paragraph',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M13 4v16h-2V4H5v2h4v14h6V6h4V4z"/></svg>',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
  },
  {
    id: 'link',
    label: 'Link',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
    content: '<a href="#">Link text</a>',
  },
  {
    id: 'button',
    label: 'Button',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="7" width="20" height="10" rx="5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<a href="#" style="display: inline-block; padding: 12px 24px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px;">Button</a>',
  },
  {
    id: 'divider',
    label: 'Divider',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">',
  },
  {
    id: 'spacer',
    label: 'Spacer',
    category: 'Basic',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="4" y="8" width="16" height="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4"/></svg>',
    content: '<div style="height: 50px; background: rgba(0,0,0,0.05);"></div>',
  },

  // Media Blocks - simple HTML
  {
    id: 'image',
    label: 'Image',
    category: 'Media',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path fill="currentColor" d="m21 15-5-5-3 3-4-4-6 6"/></svg>',
    content: '<img src="https://via.placeholder.com/350x200" alt="Image" style="width: 100%; height: auto; display: block;">',
  },
  {
    id: 'video',
    label: 'Video',
    category: 'Media',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10,8 16,12 10,16" fill="currentColor"/></svg>',
    content: '<video controls style="width: 100%; height: 300px; background: #000;"></video>',
  },
  {
    id: 'map',
    label: 'Map',
    category: 'Media',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>',
    content: '<iframe style="width: 100%; height: 300px; border: none; background: #e8e8e8;"></iframe>',
  },

  // Typography Blocks
  {
    id: 'quote',
    label: 'Quote',
    category: 'Typography',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>',
    content: '<blockquote style="border-left: 4px solid #1976d2; padding-left: 20px; margin: 20px 0; font-style: italic;">"Your quote here"</blockquote>',
  },
  {
    id: 'list',
    label: 'List',
    category: 'Typography',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
    content: '<ul style="padding-left: 24px;"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
  },

  // Form Blocks
  {
    id: 'form',
    label: 'Form',
    category: 'Forms',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<form style="padding: 20px; background: #f9f9f9; border-radius: 8px;"><label style="display: block; margin-bottom: 5px;">Name</label><input type="text" placeholder="Enter name" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px;"><label style="display: block; margin-bottom: 5px;">Email</label><input type="email" placeholder="Enter email" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px;"><button type="submit" style="padding: 12px 24px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button></form>',
  },
  {
    id: 'input',
    label: 'Input',
    category: 'Forms',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="3" y="8" width="18" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<input type="text" placeholder="Enter text..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">',
  },
  {
    id: 'textarea',
    label: 'Textarea',
    category: 'Forms',
    media: '<svg viewBox="0 0 24 24" width="48" height="48"><rect x="3" y="4" width="18" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    content: '<textarea placeholder="Enter text..." style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></textarea>',
  },
];

/**
 * Component types configuration for GrapeJS
 * These are additional component types beyond the built-in ones
 * Layout blocks use HTML strings directly for better visibility
 */
export const componentTypesConfig = [
  // Layout component types are now defined via HTML in blocksConfig
  // This array can be used for custom component types if needed
];

/**
 * Media component types configuration (image, video, map)
 * These are registered separately to allow proper traits
 */
export const mediaComponentTypesConfig = [
  {
    id: 'image',
    extend: 'image',
    model: {
      defaults: {
        tagName: 'img',
        draggable: true,
        droppable: false,
        stylable: true,
        resizable: {
          ratioDefault: true,
        },
        attributes: {
          src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect fill="%23e0e0e0" width="300" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EClick to select image%3C/text%3E%3C/svg%3E',
          alt: '',
        },
        style: {
          width: '100%',
          'min-height': '200px',
          display: 'block',
        },
        traits: [
          {
            type: 'text',
            name: 'src',
            label: 'Image URL',
            placeholder: 'https://example.com/image.jpg',
          },
          {
            type: 'text',
            name: 'alt',
            label: 'Alt Text',
            placeholder: 'Describe the image',
          },
          {
            type: 'text',
            name: 'title',
            label: 'Title',
            placeholder: 'Image title (tooltip)',
          },
          {
            type: 'select',
            name: 'loading',
            label: 'Loading',
            options: [
              { id: 'lazy', name: 'Lazy' },
              { id: 'eager', name: 'Eager' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'video',
    extend: 'video',
    model: {
      defaults: {
        tagName: 'video',
        draggable: true,
        droppable: false,
        stylable: true,
        attributes: {
          controls: true,
          preload: 'metadata',
        },
        style: {
          width: '100%',
          height: '400px',
          'background-color': '#000',
          display: 'block',
        },
        traits: [
          {
            type: 'text',
            name: 'src',
            label: 'Video URL',
            placeholder: 'https://example.com/video.mp4',
          },
          {
            type: 'text',
            name: 'poster',
            label: 'Poster Image',
            placeholder: 'https://example.com/poster.jpg',
          },
          {
            type: 'checkbox',
            name: 'controls',
            label: 'Show Controls',
            valueTrue: 'true',
            valueFalse: '',
          },
          {
            type: 'checkbox',
            name: 'autoplay',
            label: 'Autoplay',
            valueTrue: 'true',
            valueFalse: '',
          },
          {
            type: 'checkbox',
            name: 'loop',
            label: 'Loop',
            valueTrue: 'true',
            valueFalse: '',
          },
          {
            type: 'checkbox',
            name: 'muted',
            label: 'Muted',
            valueTrue: 'true',
            valueFalse: '',
          },
          {
            type: 'select',
            name: 'preload',
            label: 'Preload',
            options: [
              { id: 'none', name: 'None' },
              { id: 'metadata', name: 'Metadata' },
              { id: 'auto', name: 'Auto' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'iframe',
    model: {
      defaults: {
        tagName: 'iframe',
        draggable: true,
        droppable: false,
        stylable: true,
        attributes: {
          frameborder: '0',
          allowfullscreen: true,
        },
        style: {
          width: '100%',
          height: '400px',
          border: 'none',
        },
        traits: [
          {
            type: 'text',
            name: 'src',
            label: 'URL',
            placeholder: 'https://www.youtube.com/embed/...',
          },
          {
            type: 'text',
            name: 'title',
            label: 'Title',
            placeholder: 'Embedded content',
          },
        ],
      },
    },
  },
];

/**
 * Create the full GrapeJS configuration
 */
export function createGrapeConfig(options = {}) {
  const { apiEndpoint, pageId, onSave, onLoad } = options;

  return {
    // Container settings
    container: '#gjs',
    fromElement: false,
    height: '100%',
    width: 'auto',

    // Storage configuration
    storageManager: {
      type: 'remote',
      autosave: false,
      autoload: false,
      stepsBeforeSave: 1,
      options: {
        remote: {
          urlLoad: apiEndpoint ? `${apiEndpoint}/load` : '',
          urlStore: apiEndpoint ? `${apiEndpoint}/store` : '',
          onLoad: (result) => result.data || {},
          onStore: (data) => ({ pageId, data }),
          fetchOptions: {
            credentials: 'include',
          },
        },
      },
    },

    // Style manager
    styleManager: styleManagerConfig,

    // Layer manager
    layerManager: {
      appendTo: '.layers-container',
    },

    // Trait manager
    traitManager: {
      appendTo: '.traits-container',
    },

    // Selector manager
    selectorManager: {
      appendTo: '.styles-container',
    },

    // Block manager
    blockManager: {
      appendTo: '.blocks-container',
      blocks: blocksConfig,
    },

    // Device manager
    deviceManager: deviceManagerConfig,

    // Panel manager
    panels: panelsConfig,

    // Canvas settings
    canvas: {
      styles: [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      ],
    },

    // Plugins
    plugins: [],
    pluginsOpts: {},
  };
}

export default createGrapeConfig;
