/**
 * Typography Blocks for GrapeJS Editor
 * Heading, Paragraph, RichText, Quote, List, Badge, Highlight, Text
 */

export const typographyBlocks = [
  // Heading H1
  {
    id: 'heading-h1',
    label: 'Heading H1',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><text x="4" y="18" font-size="16" font-weight="bold" fill="currentColor">H1</text></svg>`,
    content: '<h1 style="font-size: 48px; font-weight: 700; line-height: 1.2; margin: 0 0 16px 0; color: #1a1a1a;">Heading 1</h1>',
  },
  // Heading H2
  {
    id: 'heading-h2',
    label: 'Heading H2',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><text x="4" y="18" font-size="14" font-weight="bold" fill="currentColor">H2</text></svg>`,
    content: '<h2 style="font-size: 36px; font-weight: 600; line-height: 1.3; margin: 0 0 14px 0; color: #1a1a1a;">Heading 2</h2>',
  },
  // Heading H3
  {
    id: 'heading-h3',
    label: 'Heading H3',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><text x="4" y="18" font-size="12" font-weight="bold" fill="currentColor">H3</text></svg>`,
    content: '<h3 style="font-size: 28px; font-weight: 600; line-height: 1.4; margin: 0 0 12px 0; color: #1a1a1a;">Heading 3</h3>',
  },
  // Heading H4
  {
    id: 'heading-h4',
    label: 'Heading H4',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><text x="4" y="18" font-size="11" font-weight="bold" fill="currentColor">H4</text></svg>`,
    content: '<h4 style="font-size: 22px; font-weight: 600; line-height: 1.4; margin: 0 0 10px 0; color: #1a1a1a;">Heading 4</h4>',
  },
  // Paragraph
  {
    id: 'paragraph',
    label: 'Paragraph',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2"/><line x1="3" y1="18" x2="15" y2="18" stroke="currentColor" stroke-width="2"/></svg>`,
    content: '<p style="font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 16px 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>',
  },
  // Text Block
  {
    id: 'text',
    label: 'Text',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4H5z"/></svg>`,
    content: '<div data-gjs-type="text" style="font-size: 16px; line-height: 1.6; color: #333;">Insert your text here. Click to edit.</div>',
  },
  // Rich Text
  {
    id: 'rich-text',
    label: 'Rich Text',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M3 4h18v2H3V4zm0 4h12v2H3V8zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z"/></svg>`,
    content: `<div style="padding: 20px;">
      <h3 style="font-size: 24px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">Rich Text Block</h3>
      <p style="font-size: 16px; line-height: 1.7; color: #555; margin: 0 0 12px 0;">This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. You can also add <a href="#" style="color: #1976d2;">links</a> and other formatting.</p>
      <ul style="margin: 0 0 12px 0; padding-left: 24px; color: #555;">
        <li>First item in the list</li>
        <li>Second item with details</li>
        <li>Third item here</li>
      </ul>
    </div>`,
  },
  // Quote
  {
    id: 'quote',
    label: 'Quote',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>`,
    content: `<blockquote style="border-left: 4px solid #1976d2; padding: 20px 24px; margin: 20px 0; background-color: #f8f9fa; border-radius: 0 8px 8px 0;">
      <p style="font-size: 20px; font-style: italic; color: #333; margin: 0 0 12px 0; line-height: 1.6;">"The only way to do great work is to love what you do."</p>
      <footer style="font-size: 14px; color: #666;">— Steve Jobs</footer>
    </blockquote>`,
  },
  // Unordered List
  {
    id: 'list-unordered',
    label: 'Bullet List',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><circle cx="4" cy="7" r="2" fill="currentColor"/><line x1="8" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="12" r="2" fill="currentColor"/><line x1="8" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="17" r="2" fill="currentColor"/><line x1="8" y1="17" x2="20" y2="17" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<ul style="padding-left: 24px; margin: 16px 0; color: #444; font-size: 16px; line-height: 1.8;">
      <li>First list item with description</li>
      <li>Second list item with more details</li>
      <li>Third list item here</li>
      <li>Fourth list item to show</li>
    </ul>`,
  },
  // Ordered List
  {
    id: 'list-ordered',
    label: 'Numbered List',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><text x="2" y="9" font-size="8" fill="currentColor">1.</text><line x1="8" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2"/><text x="2" y="15" font-size="8" fill="currentColor">2.</text><line x1="8" y1="13" x2="20" y2="13" stroke="currentColor" stroke-width="2"/><text x="2" y="21" font-size="8" fill="currentColor">3.</text><line x1="8" y1="19" x2="20" y2="19" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<ol style="padding-left: 24px; margin: 16px 0; color: #444; font-size: 16px; line-height: 1.8;">
      <li>First step in the process</li>
      <li>Second step to follow</li>
      <li>Third step for completion</li>
      <li>Final step to finish</li>
    </ol>`,
  },
  // Badge
  {
    id: 'badge',
    label: 'Badge',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="4" y="8" width="16" height="8" rx="4" fill="currentColor"/></svg>`,
    content: '<span style="display: inline-block; padding: 4px 12px; background-color: #1976d2; color: white; font-size: 12px; font-weight: 600; border-radius: 16px; text-transform: uppercase; letter-spacing: 0.5px;">New</span>',
  },
  // Badge Outline
  {
    id: 'badge-outline',
    label: 'Badge Outline',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: '<span style="display: inline-block; padding: 4px 12px; border: 2px solid #1976d2; color: #1976d2; font-size: 12px; font-weight: 600; border-radius: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Featured</span>',
  },
  // Highlight
  {
    id: 'highlight',
    label: 'Highlight',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="10" width="20" height="6" fill="currentColor" opacity="0.3"/><text x="4" y="15" font-size="10" fill="currentColor">Aa</text></svg>`,
    content: '<span style="background: linear-gradient(180deg, transparent 60%, #ffeb3b 60%); padding: 0 4px;">Highlighted text for emphasis</span>',
  },
  // Lead Paragraph
  {
    id: 'lead-paragraph',
    label: 'Lead Text',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" stroke-width="3"/><line x1="3" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="2"/><line x1="3" y1="19" x2="15" y2="19" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: '<p style="font-size: 20px; line-height: 1.6; color: #555; font-weight: 300; margin: 0 0 24px 0;">This is a lead paragraph that introduces the content with larger text and lighter weight for better readability and visual hierarchy.</p>',
  },
  // Caption
  {
    id: 'caption',
    label: 'Caption',
    category: 'Typography',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><line x1="5" y1="18" x2="19" y2="18" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="6" width="16" height="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: '<p style="font-size: 13px; color: #888; font-style: italic; margin: 8px 0 0 0;">Image caption or figure description goes here</p>',
  },
];

export default typographyBlocks;
