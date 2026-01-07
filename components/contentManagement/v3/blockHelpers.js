/**
 * Block Helper Functions for GrapeJS
 * Utilities to simplify creating custom blocks for the page builder
 */

import ReactDOMServer from 'react-dom/server';

// Default SVG icon for blocks without a custom icon
const defaultBlockIcon = `<svg viewBox="0 0 24 24" fill="currentColor">
  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
  <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2"/>
</svg>`;

/**
 * Create a simple HTML block for the GrapeJS page builder
 *
 * @param {Object} config - Block configuration
 * @param {string} config.id - Unique identifier for the block
 * @param {string} config.label - Display name in the sidebar
 * @param {string} config.category - Category to group the block under (e.g., "Custom", "Layout")
 * @param {string} [config.icon] - SVG string for the block icon
 * @param {string} config.content - HTML content of the block
 * @returns {Object} GrapeJS block definition
 *
 * @example
 * const myBlock = createBlock({
 *   id: 'announcement-bar',
 *   label: 'Announcement',
 *   category: 'Custom',
 *   content: `<div style="background: #fff3cd; padding: 16px;">
 *     <strong>Announcement:</strong> Your message here
 *   </div>`,
 * });
 */
export function createBlock({ id, label, category = 'Custom', icon, content }) {
  if (!id || !label || !content) {
    throw new Error('createBlock requires id, label, and content');
  }

  return {
    id,
    label,
    category,
    media: icon || defaultBlockIcon,
    content,
  };
}

/**
 * Create a block from a React component
 * The component is rendered to static HTML for use in GrapeJS
 *
 * @param {Object} config - Block configuration
 * @param {string} config.id - Unique identifier for the block
 * @param {string} config.label - Display name in the sidebar
 * @param {string} config.category - Category to group the block under
 * @param {string} [config.icon] - SVG string for the block icon
 * @param {React.ComponentType} config.component - React component to render
 * @param {Object} [config.props] - Props to pass to the component
 * @returns {Object} GrapeJS block definition
 *
 * @example
 * const MyWidget = ({ title }) => (
 *   <div style={{ background: '#e3f2fd', padding: '20px' }}>
 *     <h3>{title}</h3>
 *     <p>This is my custom widget</p>
 *   </div>
 * );
 *
 * const myBlock = createReactBlock({
 *   id: 'my-widget',
 *   label: 'My Widget',
 *   category: 'Custom',
 *   component: MyWidget,
 *   props: { title: 'Hello World' },
 * });
 */
export function createReactBlock({ id, label, category = 'Custom', icon, component: Component, props = {} }) {
  if (!id || !label || !Component) {
    throw new Error('createReactBlock requires id, label, and component');
  }

  // Render the React component to static HTML
  const html = ReactDOMServer.renderToStaticMarkup(<Component {...props} />);

  return {
    id,
    label,
    category,
    media: icon || defaultBlockIcon,
    content: html,
  };
}

/**
 * Create a dynamic/interactive block that uses GrapeJS component types
 * Use this for blocks that need custom traits (settings) or scripts
 *
 * @param {Object} config - Block configuration
 * @param {string} config.id - Unique identifier (also used as component type)
 * @param {string} config.label - Display name in the sidebar
 * @param {string} config.category - Category to group the block under
 * @param {string} [config.icon] - SVG string for the block icon
 * @returns {Object} GrapeJS block definition
 *
 * @example
 * // Step 1: Create the block
 * const countdownBlock = createDynamicBlock({
 *   id: 'countdown-timer',
 *   label: 'Countdown',
 *   category: 'Interactive',
 * });
 *
 * // Step 2: Register the component type via userComponents
 * const registerMyComponents = (editor) => {
 *   editor.Components.addType('countdown-timer', {
 *     model: {
 *       defaults: {
 *         tagName: 'div',
 *         traits: [
 *           { type: 'datetime-local', name: 'target-date', label: 'Target Date' },
 *         ],
 *         script: function() {
 *           // Countdown logic
 *         },
 *       },
 *     },
 *   });
 * };
 *
 * // Step 3: Use in GrapeEditor
 * <GrapeEditor
 *   userBlocks={[countdownBlock]}
 *   userComponents={registerMyComponents}
 * />
 */
export function createDynamicBlock({ id, label, category = 'Custom', icon }) {
  if (!id || !label) {
    throw new Error('createDynamicBlock requires id and label');
  }

  return {
    id,
    label,
    category,
    media: icon || defaultBlockIcon,
    content: `<div data-gjs-type="${id}"></div>`,
  };
}

/**
 * Common SVG icons for blocks
 */
export const blockIcons = {
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  </svg>`,

  text: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
  </svg>`,

  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="M21 15l-5-5L5 21"/>
  </svg>`,

  button: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="8" width="18" height="8" rx="2"/>
  </svg>`,

  columns: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="7" height="18"/>
    <rect x="14" y="3" width="7" height="18"/>
  </svg>`,

  card: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
  </svg>`,

  form: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="7" y1="8" x2="17" y2="8"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
    <line x1="7" y1="16" x2="12" y2="16"/>
  </svg>`,

  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
  </svg>`,

  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <circle cx="4" cy="6" r="1" fill="currentColor"/>
    <circle cx="4" cy="12" r="1" fill="currentColor"/>
    <circle cx="4" cy="18" r="1" fill="currentColor"/>
  </svg>`,

  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>`,

  custom: defaultBlockIcon,
};
