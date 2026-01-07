/**
 * Layout Blocks for GrapeJS Editor
 * Section, Row, Spacer, Grid, Stack, FlexBox, Columns
 */

export const layoutBlocks = [
  // Section
  {
    id: 'section',
    label: 'Section',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: '<section style="padding: 60px 20px; min-height: 200px; background-color: #ffffff;">Drop content here</section>',
  },
  // Container
  {
    id: 'container',
    label: 'Container',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: '<div style="max-width: 1200px; margin: 0 auto; padding: 20px; min-height: 80px;">Container content</div>',
  },
  // Row (Flexbox)
  {
    id: 'row',
    label: 'Row',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="8" width="20" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: '<div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 10px; min-height: 60px;"></div>',
  },
  // 2 Columns
  {
    id: 'two-columns',
    label: '2 Columns',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: flex; gap: 20px; padding: 10px;">
      <div style="flex: 1; min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Column 1</div>
      <div style="flex: 1; min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Column 2</div>
    </div>`,
  },
  // 3 Columns
  {
    id: 'three-columns',
    label: '3 Columns',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="4" width="5" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="9" y="4" width="6" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="17" y="4" width="5" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: flex; gap: 20px; padding: 10px;">
      <div style="flex: 1; min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Column 1</div>
      <div style="flex: 1; min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Column 2</div>
      <div style="flex: 1; min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Column 3</div>
    </div>`,
  },
  // 4 Columns
  {
    id: 'four-columns',
    label: '4 Columns',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="1" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="7" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="19" y="4" width="4" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `<div style="display: flex; gap: 15px; padding: 10px;">
      <div style="flex: 1; min-height: 80px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">1</div>
      <div style="flex: 1; min-height: 80px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">2</div>
      <div style="flex: 1; min-height: 80px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">3</div>
      <div style="flex: 1; min-height: 80px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">4</div>
    </div>`,
  },
  // Spacer
  {
    id: 'spacer',
    label: 'Spacer',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="4" y="8" width="16" height="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4"/></svg>`,
    content: '<div style="height: 50px;"></div>',
  },
  // Grid
  {
    id: 'grid',
    label: 'Grid',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px;">
      <div style="min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Item 1</div>
      <div style="min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Item 2</div>
      <div style="min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Item 3</div>
      <div style="min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Item 4</div>
      <div style="min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Item 5</div>
      <div style="min-height: 100px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Item 6</div>
    </div>`,
  },
  // Stack (Vertical)
  {
    id: 'stack',
    label: 'Stack',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="4" y="2" width="16" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="9" width="16" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="16" width="16" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: flex; flex-direction: column; gap: 16px; padding: 20px;">
      <div style="padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Stack Item 1</div>
      <div style="padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Stack Item 2</div>
      <div style="padding: 20px; background-color: #f5f5f5; border-radius: 8px;">Stack Item 3</div>
    </div>`,
  },
  // FlexBox
  {
    id: 'flexbox',
    label: 'FlexBox',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="6" width="6" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="9" y="4" width="6" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="8" width="6" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 40px; min-height: 200px; background-color: #fafafa;">
      <div style="padding: 20px; background-color: #e3f2fd; border-radius: 8px;">Flex Item</div>
    </div>`,
  },
  // Sidebar Layout
  {
    id: 'sidebar-layout',
    label: 'Sidebar Layout',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="4" width="6" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="10" y="4" width="12" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: flex; gap: 20px; padding: 20px;">
      <aside style="width: 280px; flex-shrink: 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px; min-height: 400px;">Sidebar</aside>
      <main style="flex: 1; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; min-height: 400px;">Main Content</main>
    </div>`,
  },
];

export default layoutBlocks;
