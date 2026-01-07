/**
 * Utility Blocks for GrapeJS Editor
 *
 * HTML embeds, iframes, code blocks, and anchors
 */

export const utilityBlocks = [
  // HTML Embed
  {
    id: 'html-embed',
    label: 'HTML Embed',
    category: 'Utility',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M10 20l4-16M18 8l4 4-4 4M6 8l-4 4 4 4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <div class="html-embed" style="padding: 20px; background: #1e1e1e; border-radius: 12px; margin: 20px 0;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span style="width: 12px; height: 12px; background: #ff5f57; border-radius: 50%;"></span>
          <span style="width: 12px; height: 12px; background: #febc2e; border-radius: 50%;"></span>
          <span style="width: 12px; height: 12px; background: #28c840; border-radius: 50%;"></span>
          <span style="margin-left: auto; color: #6b7280; font-size: 12px;">HTML</span>
        </div>
        <div style="color: #e0e0e0; font-family: 'Monaco', 'Menlo', monospace; font-size: 14px; line-height: 1.6;">
          <p style="margin: 0; color: #9ca3af;">&lt;!-- Custom HTML content goes here --&gt;</p>
          <p style="margin: 8px 0 0; color: #a5b4fc;">Paste your custom HTML, widgets, or embed codes here.</p>
        </div>
      </div>
    `,
  },

  // IFrame
  {
    id: 'iframe',
    label: 'IFrame',
    category: 'Utility',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="8" width="12" height="8" fill="currentColor" fill-opacity="0.3"/></svg>`,
    content: `
      <div class="iframe-wrapper" style="width: 100%; max-width: 800px; margin: 20px auto;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
            src="about:blank"
            title="Embedded content"
            loading="lazy">
          </iframe>
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
            <div style="font-size: 48px; margin-bottom: 16px;">🔗</div>
            <p style="margin: 0; font-size: 18px; font-weight: 500;">IFrame Embed</p>
            <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.8;">Replace src with your embed URL</p>
          </div>
        </div>
      </div>
    `,
  },

  // Code Block
  {
    id: 'code-block',
    label: 'Code Block',
    category: 'Utility',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 8l-2 8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <div class="code-block" style="max-width: 700px; margin: 20px auto; background: #1e1e1e; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
        <div style="display: flex; align-items: center; padding: 12px 16px; background: #2d2d2d; border-bottom: 1px solid #3d3d3d;">
          <span style="width: 12px; height: 12px; background: #ff5f57; border-radius: 50%; margin-right: 8px;"></span>
          <span style="width: 12px; height: 12px; background: #febc2e; border-radius: 50%; margin-right: 8px;"></span>
          <span style="width: 12px; height: 12px; background: #28c840; border-radius: 50%;"></span>
          <span style="margin-left: auto; color: #6b7280; font-size: 13px; font-family: monospace;">javascript</span>
        </div>
        <pre style="margin: 0; padding: 20px; overflow-x: auto;"><code style="font-family: 'Monaco', 'Menlo', 'Consolas', monospace; font-size: 14px; line-height: 1.6; color: #e0e0e0;"><span style="color: #c586c0;">const</span> <span style="color: #9cdcfe;">greeting</span> <span style="color: #d4d4d4;">=</span> <span style="color: #ce9178;">'Hello, World!'</span>;

<span style="color: #c586c0;">function</span> <span style="color: #dcdcaa;">sayHello</span>(<span style="color: #9cdcfe;">name</span>) {
  <span style="color: #c586c0;">return</span> <span style="color: #ce9178;">\`Hello, </span><span style="color: #569cd6;">\${</span><span style="color: #9cdcfe;">name</span><span style="color: #569cd6;">}</span><span style="color: #ce9178;">!\`</span>;
}

<span style="color: #9cdcfe;">console</span>.<span style="color: #dcdcaa;">log</span>(<span style="color: #dcdcaa;">sayHello</span>(<span style="color: #ce9178;">'Developer'</span>));</code></pre>
        <div style="padding: 12px 16px; background: #2d2d2d; border-top: 1px solid #3d3d3d; display: flex; justify-content: flex-end;">
          <button style="padding: 6px 12px; background: #3d3d3d; border: none; border-radius: 6px; color: #e0e0e0; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            📋 Copy
          </button>
        </div>
      </div>
    `,
  },

  // Anchor/Link Target
  {
    id: 'anchor',
    label: 'Anchor',
    category: 'Utility',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="5" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="21" stroke="currentColor" stroke-width="1.5"/><path d="M5 12h14" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div id="section-anchor" class="anchor" style="position: relative; padding: 8px 0;">
        <a name="anchor-point" style="position: absolute; top: -100px;"></a>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: #f1f5f9; border-radius: 8px; border-left: 4px solid #667eea;">
          <span style="font-size: 20px;">⚓</span>
          <div>
            <p style="font-weight: 500; color: #374151; margin: 0; font-size: 14px;">Anchor Point</p>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 12px;">ID: section-anchor — Link to this with #section-anchor</p>
          </div>
        </div>
      </div>
    `,
  },

  // Divider
  {
    id: 'divider',
    label: 'Divider',
    category: 'Utility',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `
      <hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, #667eea, #e2e8f0, transparent); margin: 40px 0;">
    `,
  },

  // Divider with Text
  {
    id: 'divider-text',
    label: 'Divider with Text',
    category: 'Utility',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `
      <div class="divider-text" style="display: flex; align-items: center; gap: 20px; margin: 40px 0;">
        <div style="flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0);"></div>
        <span style="color: #64748b; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Or continue with</span>
        <div style="flex: 1; height: 1px; background: linear-gradient(90deg, #e2e8f0, transparent);"></div>
      </div>
    `,
  },
];

export default utilityBlocks;
