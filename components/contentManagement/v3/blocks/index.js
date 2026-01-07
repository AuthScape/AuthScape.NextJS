/**
 * GrapeJS Blocks Index
 *
 * Combines all block categories into a single export for use in GrapeEditor.
 * Total: 100+ blocks across 16 categories
 */

import layoutBlocks from './layout';
import typographyBlocks from './typography';
import cardBlocks from './cards';
import heroBlocks from './heroes';
import ctaBlocks from './cta';
import mediaBlocks from './media';
import navigationBlocks from './navigation';
import dataBlocks from './data';
import socialBlocks from './social';
import interactiveBlocks from './interactive';
import formBlocks from './forms';
import contentBlocks from './content';
import ecommerceBlocks from './ecommerce';
import mapsBlocks from './maps';
import utilityBlocks from './utility';

/**
 * All blocks combined into a single array
 * Ready to be passed to GrapeJS blockManager
 */
export const allBlocks = [
  ...layoutBlocks,
  ...typographyBlocks,
  ...cardBlocks,
  ...heroBlocks,
  ...ctaBlocks,
  ...mediaBlocks,
  ...navigationBlocks,
  ...dataBlocks,
  ...socialBlocks,
  ...interactiveBlocks,
  ...formBlocks,
  ...contentBlocks,
  ...ecommerceBlocks,
  ...mapsBlocks,
  ...utilityBlocks,
];

/**
 * Block categories for the block manager
 */
export const blockCategories = [
  { id: 'Layout', label: 'Layout', open: true },
  { id: 'Typography', label: 'Typography', open: false },
  { id: 'Cards', label: 'Cards', open: false },
  { id: 'Heroes', label: 'Heroes', open: false },
  { id: 'CTA', label: 'Call to Action', open: false },
  { id: 'Media', label: 'Media', open: false },
  { id: 'Navigation', label: 'Navigation', open: false },
  { id: 'Data Display', label: 'Data Display', open: false },
  { id: 'Social', label: 'Social', open: false },
  { id: 'Interactive', label: 'Interactive', open: false },
  { id: 'Forms', label: 'Forms', open: false },
  { id: 'Content', label: 'Content', open: false },
  { id: 'E-commerce', label: 'E-commerce', open: false },
  { id: 'Maps', label: 'Maps & Location', open: false },
  { id: 'Utility', label: 'Utility', open: false },
];

// Named exports for individual block categories
export {
  layoutBlocks,
  typographyBlocks,
  cardBlocks,
  heroBlocks,
  ctaBlocks,
  mediaBlocks,
  navigationBlocks,
  dataBlocks,
  socialBlocks,
  interactiveBlocks,
  formBlocks,
  contentBlocks,
  ecommerceBlocks,
  mapsBlocks,
  utilityBlocks,
};

export default allBlocks;
