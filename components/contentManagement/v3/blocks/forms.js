/**
 * Form Blocks for GrapeJS Editor
 *
 * Form inputs, textareas, selects, and complete form components
 */

export const formBlocks = [
  // Form Input
  {
    id: 'form-input',
    label: 'Text Input',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="8" width="18" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="12" x2="7" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    content: `
      <div class="form-group" style="max-width: 400px; margin: 16px 0;">
        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Label</label>
        <input type="text" placeholder="Enter text..." style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.2s; box-sizing: border-box;">
        <p style="color: #94a3b8; font-size: 13px; margin: 8px 0 0;">Helper text goes here</p>
      </div>
    `,
  },

  // Form Textarea
  {
    id: 'form-textarea',
    label: 'Textarea',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="1"/><line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="1"/><line x1="7" y1="15" x2="12" y2="15" stroke="currentColor" stroke-width="1"/></svg>`,
    content: `
      <div class="form-group" style="max-width: 500px; margin: 16px 0;">
        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Message</label>
        <textarea rows="4" placeholder="Enter your message..." style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; resize: vertical; font-family: inherit; box-sizing: border-box;"></textarea>
      </div>
    `,
  },

  // Form Select
  {
    id: 'form-select',
    label: 'Select Dropdown',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="8" width="18" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 11l2 2 2-2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <div class="form-group" style="max-width: 400px; margin: 16px 0;">
        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Select Option</label>
        <select style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; background: white; cursor: pointer; box-sizing: border-box;">
          <option value="">Choose an option...</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>
    `,
  },

  // Form Checkbox
  {
    id: 'form-checkbox',
    label: 'Checkbox',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    content: `
      <div class="form-group" style="margin: 16px 0;">
        <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
          <input type="checkbox" style="width: 20px; height: 20px; accent-color: #667eea; cursor: pointer;">
          <span style="font-size: 15px; color: #374151;">I agree to the terms and conditions</span>
        </label>
      </div>
    `,
  },

  // Form Radio Group
  {
    id: 'form-radio-group',
    label: 'Radio Group',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="8" r="2" fill="currentColor"/><circle cx="12" cy="18" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="form-group" style="margin: 16px 0;">
        <p style="font-weight: 500; color: #374151; margin: 0 0 12px; font-size: 14px;">Select your plan</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e2e8f0; border-radius: 12px; cursor: pointer; transition: border-color 0.2s;">
            <input type="radio" name="plan" value="basic" style="width: 20px; height: 20px; accent-color: #667eea; cursor: pointer;">
            <div>
              <span style="font-size: 15px; font-weight: 500; color: #1a1a1a;">Basic Plan</span>
              <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">$9/month - For individuals</p>
            </div>
          </label>
          <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #667eea; border-radius: 12px; cursor: pointer; background: #f8fafc;">
            <input type="radio" name="plan" value="pro" checked style="width: 20px; height: 20px; accent-color: #667eea; cursor: pointer;">
            <div>
              <span style="font-size: 15px; font-weight: 500; color: #1a1a1a;">Pro Plan</span>
              <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">$29/month - For teams</p>
            </div>
          </label>
          <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e2e8f0; border-radius: 12px; cursor: pointer; transition: border-color 0.2s;">
            <input type="radio" name="plan" value="enterprise" style="width: 20px; height: 20px; accent-color: #667eea; cursor: pointer;">
            <div>
              <span style="font-size: 15px; font-weight: 500; color: #1a1a1a;">Enterprise</span>
              <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">Custom pricing - For large organizations</p>
            </div>
          </label>
        </div>
      </div>
    `,
  },

  // Form Date Picker
  {
    id: 'form-date-picker',
    label: 'Date Picker',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="6" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="8" y2="8" stroke="currentColor" stroke-width="1.5"/><line x1="16" y1="4" x2="16" y2="8" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="form-group" style="max-width: 300px; margin: 16px 0;">
        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Select Date</label>
        <input type="date" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; box-sizing: border-box;">
      </div>
    `,
  },

  // Form File Upload
  {
    id: 'form-file-upload',
    label: 'File Upload',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 15V3M12 3l4 4M12 3L8 7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <div class="form-group" style="max-width: 500px; margin: 16px 0;">
        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Upload File</label>
        <div style="border: 2px dashed #d1d5db; border-radius: 12px; padding: 40px 20px; text-align: center; cursor: pointer; transition: border-color 0.2s; background: #f9fafb;">
          <div style="font-size: 48px; margin-bottom: 16px;">📁</div>
          <p style="font-size: 16px; color: #374151; margin: 0 0 8px;"><strong>Click to upload</strong> or drag and drop</p>
          <p style="font-size: 14px; color: #94a3b8; margin: 0;">SVG, PNG, JPG or GIF (max. 10MB)</p>
          <input type="file" style="display: none;">
        </div>
      </div>
    `,
  },

  // Contact Form
  {
    id: 'contact-form',
    label: 'Contact Form',
    category: 'Forms',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <form class="contact-form" style="max-width: 600px; margin: 40px auto; padding: 40px; background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
        <h2 style="font-size: 28px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px; text-align: center;">Get in Touch</h2>
        <p style="color: #64748b; text-align: center; margin: 0 0 32px;">We'd love to hear from you. Send us a message!</p>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
          <div>
            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">First Name</label>
            <input type="text" placeholder="John" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Last Name</label>
            <input type="text" placeholder="Doe" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; box-sizing: border-box;">
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Email Address</label>
          <input type="email" placeholder="john@example.com" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; box-sizing: border-box;">
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Subject</label>
          <select style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; background: white; box-sizing: border-box;">
            <option value="">Select a subject...</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="sales">Sales Question</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px;">Message</label>
          <textarea rows="5" placeholder="How can we help you?" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; resize: vertical; font-family: inherit; box-sizing: border-box;"></textarea>
        </div>

        <button type="submit" style="width: 100%; padding: 16px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 10px; color: white; font-size: 16px; font-weight: 600; cursor: pointer;">Send Message</button>
      </form>
    `,
  },
];

export default formBlocks;
