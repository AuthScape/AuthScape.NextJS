/**
 * Navigation Blocks for GrapeJS Editor
 *
 * Accordion, tabs, breadcrumbs, and navigation components
 */

export const navigationBlocks = [
  // Accordion
  {
    id: 'accordion',
    label: 'Accordion',
    category: 'Navigation',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="4" width="18" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="10" width="18" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="16" width="18" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="accordion" style="max-width: 700px; margin: 20px auto;">
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 12px;">
          <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">What is your refund policy?</span>
            <span style="color: #64748b; font-size: 20px; transition: transform 0.3s;">▼</span>
          </div>
          <div style="padding: 20px 24px; background: white; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; line-height: 1.7; margin: 0;">We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service, simply contact our support team within 30 days of your purchase for a full refund.</p>
          </div>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 12px;">
          <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">How do I cancel my subscription?</span>
            <span style="color: #64748b; font-size: 20px;">▶</span>
          </div>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">Do you offer customer support?</span>
            <span style="color: #64748b; font-size: 20px;">▶</span>
          </div>
        </div>
      </div>
    `,
  },

  // Tabs
  {
    id: 'tabs',
    label: 'Tabs',
    category: 'Navigation',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="6" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="6" width="6" height="4" fill="currentColor"/><line x1="9" y1="6" x2="9" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="6" x2="15" y2="10" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="tabs" style="max-width: 700px; margin: 20px auto;">
        <div style="display: flex; border-bottom: 2px solid #e2e8f0;">
          <button style="padding: 16px 24px; background: none; border: none; border-bottom: 2px solid #667eea; margin-bottom: -2px; font-weight: 600; color: #667eea; cursor: pointer; font-size: 15px;">Overview</button>
          <button style="padding: 16px 24px; background: none; border: none; font-weight: 500; color: #64748b; cursor: pointer; font-size: 15px;">Features</button>
          <button style="padding: 16px 24px; background: none; border: none; font-weight: 500; color: #64748b; cursor: pointer; font-size: 15px;">Pricing</button>
          <button style="padding: 16px 24px; background: none; border: none; font-weight: 500; color: #64748b; cursor: pointer; font-size: 15px;">Reviews</button>
        </div>
        <div style="padding: 32px 0;">
          <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px;">Product Overview</h3>
          <p style="color: #64748b; line-height: 1.7; margin: 0;">This is the content for the Overview tab. Click on different tabs to switch between content sections. Each tab can contain different types of content including text, images, and other components.</p>
        </div>
      </div>
    `,
  },

  // Breadcrumb
  {
    id: 'breadcrumb',
    label: 'Breadcrumb',
    category: 'Navigation',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/><line x1="7" y1="12" x2="10" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <nav class="breadcrumb" style="padding: 16px 0;">
        <ol style="list-style: none; padding: 0; margin: 0; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 14px;">
          <li><a href="#" style="color: #64748b; text-decoration: none;">Home</a></li>
          <li style="color: #cbd5e1;">/</li>
          <li><a href="#" style="color: #64748b; text-decoration: none;">Products</a></li>
          <li style="color: #cbd5e1;">/</li>
          <li><a href="#" style="color: #64748b; text-decoration: none;">Category</a></li>
          <li style="color: #cbd5e1;">/</li>
          <li style="color: #1a1a1a; font-weight: 500;">Current Page</li>
        </ol>
      </nav>
    `,
  },

  // Step Indicator
  {
    id: 'step-indicator',
    label: 'Step Indicator',
    category: 'Navigation',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="5" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="step-indicator" style="max-width: 700px; margin: 40px auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative;">
          <div style="position: absolute; top: 20px; left: 40px; right: 40px; height: 4px; background: #e2e8f0; z-index: 0;">
            <div style="width: 50%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);"></div>
          </div>
          <div style="position: relative; z-index: 1; text-align: center;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">✓</div>
            <span style="font-size: 14px; font-weight: 600; color: #667eea;">Account</span>
          </div>
          <div style="position: relative; z-index: 1; text-align: center;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">2</div>
            <span style="font-size: 14px; font-weight: 600; color: #667eea;">Details</span>
          </div>
          <div style="position: relative; z-index: 1; text-align: center;">
            <div style="width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600; margin: 0 auto 12px;">3</div>
            <span style="font-size: 14px; color: #94a3b8;">Payment</span>
          </div>
          <div style="position: relative; z-index: 1; text-align: center;">
            <div style="width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600; margin: 0 auto 12px;">4</div>
            <span style="font-size: 14px; color: #94a3b8;">Complete</span>
          </div>
        </div>
      </div>
    `,
  },

  // Scroll to Top
  {
    id: 'scroll-to-top',
    label: 'Scroll to Top',
    category: 'Navigation',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 16V8M8 11l4-4 4 4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <button class="scroll-to-top" style="position: fixed; bottom: 24px; right: 24px; width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 50%; color: white; font-size: 20px; cursor: pointer; box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4); z-index: 1000; display: flex; align-items: center; justify-content: center;">
        ↑
      </button>
    `,
  },

  // Table of Contents
  {
    id: 'table-of-contents',
    label: 'Table of Contents',
    category: 'Navigation',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <nav class="table-of-contents" style="max-width: 300px; padding: 24px; background: #f8fafc; border-radius: 12px; border-left: 4px solid #667eea;">
        <h4 style="font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px;">Table of Contents</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 12px;">
            <a href="#intro" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 15px;">Introduction</a>
          </li>
          <li style="margin-bottom: 12px;">
            <a href="#features" style="color: #374151; text-decoration: none; font-size: 15px;">Key Features</a>
            <ul style="list-style: none; padding: 0; margin: 8px 0 0 16px;">
              <li style="margin-bottom: 8px;"><a href="#feature1" style="color: #64748b; text-decoration: none; font-size: 14px;">Feature One</a></li>
              <li style="margin-bottom: 8px;"><a href="#feature2" style="color: #64748b; text-decoration: none; font-size: 14px;">Feature Two</a></li>
            </ul>
          </li>
          <li style="margin-bottom: 12px;">
            <a href="#pricing" style="color: #374151; text-decoration: none; font-size: 15px;">Pricing Plans</a>
          </li>
          <li>
            <a href="#faq" style="color: #374151; text-decoration: none; font-size: 15px;">FAQ</a>
          </li>
        </ul>
      </nav>
    `,
  },
];

export default navigationBlocks;
