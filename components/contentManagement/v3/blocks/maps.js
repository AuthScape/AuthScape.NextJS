/**
 * Maps & Location Blocks for GrapeJS Editor
 *
 * Map embeds, contact info, and location cards
 */

export const mapsBlocks = [
  // Map Embed
  {
    id: 'map-embed',
    label: 'Map Embed',
    category: 'Maps',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="3" fill="currentColor"/></svg>`,
    content: `
      <div class="map-embed" style="width: 100%; height: 400px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    `,
  },

  // Contact Info
  {
    id: 'contact-info',
    label: 'Contact Info',
    category: 'Maps',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <section class="contact-info" style="padding: 60px 20px; background: #f8fafc;">
        <div style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
          <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; font-size: 28px;">📍</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Our Location</h3>
            <p style="color: #64748b; line-height: 1.7; margin: 0;">
              123 Business Avenue<br>
              Suite 456<br>
              New York, NY 10001<br>
              United States
            </p>
          </div>

          <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; font-size: 28px;">📞</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Contact Us</h3>
            <p style="color: #64748b; line-height: 1.7; margin: 0;">
              <strong>Phone:</strong> +1 (555) 123-4567<br>
              <strong>Email:</strong> hello@company.com<br>
              <strong>Support:</strong> support@company.com
            </p>
          </div>

          <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; font-size: 28px;">🕐</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Business Hours</h3>
            <p style="color: #64748b; line-height: 1.7; margin: 0;">
              <strong>Mon-Fri:</strong> 9:00 AM - 6:00 PM<br>
              <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br>
              <strong>Sunday:</strong> Closed
            </p>
          </div>
        </div>
      </section>
    `,
  },

  // Location Card
  {
    id: 'location-card',
    label: 'Location Card',
    category: 'Maps',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"/><path d="M12 11v4" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="location-card" style="max-width: 400px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
        <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; position: relative;">
          <div style="text-align: center; color: white;">
            <div style="font-size: 48px; margin-bottom: 8px;">📍</div>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">Map Preview</p>
          </div>
          <a href="#" style="position: absolute; bottom: 16px; right: 16px; padding: 8px 16px; background: rgba(255,255,255,0.9); color: #667eea; text-decoration: none; border-radius: 20px; font-size: 13px; font-weight: 500;">View on Map →</a>
        </div>
        <div style="padding: 24px;">
          <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px;">Headquarters</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: start; gap: 12px;">
              <span style="font-size: 18px;">📍</span>
              <p style="color: #64748b; margin: 0; line-height: 1.5;">123 Business Avenue, Suite 456<br>New York, NY 10001</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 18px;">📞</span>
              <a href="tel:+15551234567" style="color: #667eea; text-decoration: none;">+1 (555) 123-4567</a>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 18px;">✉️</span>
              <a href="mailto:hello@company.com" style="color: #667eea; text-decoration: none;">hello@company.com</a>
            </div>
          </div>
          <button style="width: 100%; margin-top: 20px; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 12px; color: white; font-weight: 600; cursor: pointer;">Get Directions</button>
        </div>
      </div>
    `,
  },
];

export default mapsBlocks;
