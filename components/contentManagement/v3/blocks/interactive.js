/**
 * Interactive Blocks for GrapeJS Editor
 *
 * Modals, tooltips, alerts, toasts, and interactive UI components
 */

export const interactiveBlocks = [
  // Modal
  {
    id: 'modal',
    label: 'Modal',
    category: 'Interactive',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="17" y1="8" x2="17" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    content: `
      <div class="modal-preview" style="position: relative; padding: 60px 20px; background: rgba(0,0,0,0.5); border-radius: 12px;">
        <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
          <div style="padding: 20px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0;">Modal Title</h3>
            <button style="background: none; border: none; font-size: 24px; color: #94a3b8; cursor: pointer; line-height: 1;">×</button>
          </div>
          <div style="padding: 24px;">
            <p style="color: #64748b; line-height: 1.6; margin: 0 0 20px;">This is the modal content area. You can add any content here including forms, images, or other components.</p>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Click the X button or outside the modal to close it.</p>
          </div>
          <div style="padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px;">
            <button style="padding: 10px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; color: #64748b; font-weight: 500; cursor: pointer;">Cancel</button>
            <button style="padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; color: white; font-weight: 500; cursor: pointer;">Confirm</button>
          </div>
        </div>
      </div>
    `,
  },

  // Tooltip
  {
    id: 'tooltip',
    label: 'Tooltip',
    category: 'Interactive',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="4" width="16" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 14l-3 4h6l-3-4z" fill="currentColor"/></svg>`,
    content: `
      <div class="tooltip-demo" style="display: flex; flex-direction: column; align-items: center; gap: 40px; padding: 60px 20px;">
        <div style="position: relative; display: inline-block;">
          <div style="position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%); background: #1a1a1a; color: white; padding: 10px 16px; border-radius: 8px; font-size: 14px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            This is a tooltip
            <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #1a1a1a;"></div>
          </div>
          <button style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer;">Hover me</button>
        </div>
        <p style="color: #64748b; font-size: 14px; margin: 0;">Tooltips provide helpful hints on hover</p>
      </div>
    `,
  },

  // Popover
  {
    id: 'popover',
    label: 'Popover',
    category: 'Interactive',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="3" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 15l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="7" x2="17" y2="7" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1"/></svg>`,
    content: `
      <div class="popover-demo" style="display: flex; justify-content: center; padding: 80px 20px;">
        <div style="position: relative; display: inline-block;">
          <div style="position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%); width: 280px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden;">
            <div style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
              <p style="font-weight: 600; color: #1a1a1a; margin: 0 0 4px; font-size: 15px;">Quick Actions</p>
              <p style="color: #94a3b8; margin: 0; font-size: 13px;">Choose an option below</p>
            </div>
            <div style="padding: 8px;">
              <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; color: #374151; text-decoration: none; border-radius: 8px; font-size: 14px;">
                <span style="font-size: 18px;">📝</span> Edit Profile
              </a>
              <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; color: #374151; text-decoration: none; border-radius: 8px; font-size: 14px;">
                <span style="font-size: 18px;">⚙️</span> Settings
              </a>
              <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; color: #ef4444; text-decoration: none; border-radius: 8px; font-size: 14px;">
                <span style="font-size: 18px;">🚪</span> Sign Out
              </a>
            </div>
            <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 8px solid transparent; border-top-color: white;"></div>
          </div>
          <button style="padding: 12px 24px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; color: #374151; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            Menu <span style="font-size: 12px;">▼</span>
          </button>
        </div>
      </div>
    `,
  },

  // Alert
  {
    id: 'alert',
    label: 'Alert',
    category: 'Interactive',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2L2 20h20L12 2z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>`,
    content: `
      <div class="alerts" style="max-width: 600px; margin: 20px auto; display: flex; flex-direction: column; gap: 16px;">
        <div style="padding: 16px 20px; background: #dcfce7; border: 1px solid #86efac; border-radius: 12px; display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 20px;">✅</span>
          <div>
            <p style="font-weight: 600; color: #166534; margin: 0 0 4px; font-size: 15px;">Success!</p>
            <p style="color: #15803d; margin: 0; font-size: 14px; line-height: 1.5;">Your changes have been saved successfully.</p>
          </div>
        </div>
        <div style="padding: 16px 20px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 20px;">⚠️</span>
          <div>
            <p style="font-weight: 600; color: #92400e; margin: 0 0 4px; font-size: 15px;">Warning</p>
            <p style="color: #a16207; margin: 0; font-size: 14px; line-height: 1.5;">Please review your information before proceeding.</p>
          </div>
        </div>
        <div style="padding: 16px 20px; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 12px; display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 20px;">❌</span>
          <div>
            <p style="font-weight: 600; color: #991b1b; margin: 0 0 4px; font-size: 15px;">Error</p>
            <p style="color: #b91c1c; margin: 0; font-size: 14px; line-height: 1.5;">Something went wrong. Please try again later.</p>
          </div>
        </div>
        <div style="padding: 16px 20px; background: #dbeafe; border: 1px solid #93c5fd; border-radius: 12px; display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 20px;">ℹ️</span>
          <div>
            <p style="font-weight: 600; color: #1e40af; margin: 0 0 4px; font-size: 15px;">Information</p>
            <p style="color: #1d4ed8; margin: 0; font-size: 14px; line-height: 1.5;">Here's some helpful information for you.</p>
          </div>
        </div>
      </div>
    `,
  },

  // Toast Notification
  {
    id: 'toast',
    label: 'Toast',
    category: 'Interactive',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="14" width="16" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="17" x2="16" y2="17" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="toast-demo" style="position: relative; padding: 80px 20px; min-height: 200px;">
        <div style="position: absolute; bottom: 24px; right: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div style="min-width: 320px; padding: 16px 20px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; border-left: 4px solid #10b981;">
            <span style="font-size: 20px;">✅</span>
            <div style="flex: 1;">
              <p style="font-weight: 500; color: #1a1a1a; margin: 0; font-size: 14px;">File uploaded successfully</p>
            </div>
            <button style="background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer;">×</button>
          </div>
          <div style="min-width: 320px; padding: 16px 20px; background: #1a1a1a; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">🔔</span>
            <div style="flex: 1;">
              <p style="font-weight: 500; color: white; margin: 0; font-size: 14px;">You have 3 new notifications</p>
            </div>
            <button style="background: none; border: none; color: #6b7280; font-size: 18px; cursor: pointer;">×</button>
          </div>
        </div>
      </div>
    `,
  },

  // Drawer
  {
    id: 'drawer',
    label: 'Drawer',
    category: 'Interactive',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="16" fill="currentColor" fill-opacity="0.3"/><line x1="14" y1="4" x2="14" y2="20" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="drawer-preview" style="position: relative; height: 400px; background: #f1f5f9; border-radius: 12px; overflow: hidden;">
        <div style="padding: 20px;">
          <h3 style="font-size: 18px; color: #1a1a1a; margin: 0 0 12px;">Main Content Area</h3>
          <p style="color: #64748b; margin: 0;">The drawer slides in from the side when triggered.</p>
        </div>
        <div style="position: absolute; top: 0; right: 0; bottom: 0; width: 320px; background: white; box-shadow: -10px 0 40px rgba(0,0,0,0.1);">
          <div style="padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0;">Drawer Title</h3>
            <button style="background: none; border: none; font-size: 24px; color: #94a3b8; cursor: pointer;">×</button>
          </div>
          <div style="padding: 20px;">
            <p style="color: #64748b; line-height: 1.6; margin: 0 0 20px;">This is a drawer component that slides in from the right side of the screen.</p>
            <nav>
              <a href="#" style="display: block; padding: 12px 16px; color: #667eea; background: #f1f5f9; border-radius: 8px; text-decoration: none; font-weight: 500; margin-bottom: 8px;">Dashboard</a>
              <a href="#" style="display: block; padding: 12px 16px; color: #374151; text-decoration: none; font-weight: 500; margin-bottom: 8px;">Profile</a>
              <a href="#" style="display: block; padding: 12px 16px; color: #374151; text-decoration: none; font-weight: 500; margin-bottom: 8px;">Settings</a>
              <a href="#" style="display: block; padding: 12px 16px; color: #374151; text-decoration: none; font-weight: 500;">Help</a>
            </nav>
          </div>
        </div>
      </div>
    `,
  },
];

export default interactiveBlocks;
