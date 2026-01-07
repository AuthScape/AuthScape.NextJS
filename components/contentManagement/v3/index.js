/**
 * GrapeJS Visual Editor Components for AuthScape CMS
 *
 * v3 - Elementor-like visual page builder using GrapeJS
 *
 * Features:
 * - Inline text editing
 * - Rich styling panel (typography, colors, spacing, borders, shadows)
 * - Drag-and-drop with visual feedback
 * - Responsive editing (desktop/tablet/mobile)
 * - SSR support for SEO
 */

// Main editor component (client-side only)
export { default as GrapeEditor } from './GrapeEditor';

// Visual builder wrapper with API integration
export { default as GrapeVisualBuilder } from './GrapeVisualBuilder';

// SSR-compatible page renderer
export {
  GrapePageRenderer,
  isGrapeJSContent,
  extractTextContent,
  toStaticHTML,
} from './GrapePageRenderer';

// Configuration
export { styleManagerConfig } from './styleManagerConfig';
export {
  createGrapeConfig,
  blocksConfig,
  deviceManagerConfig,
  panelsConfig,
  componentTypesConfig,
  mediaComponentTypesConfig,
  blockCategories,
} from './grapeConfig';

// Block helper functions for creating custom blocks
export {
  createBlock,
  createReactBlock,
  createDynamicBlock,
  blockIcons,
} from './blockHelpers';
