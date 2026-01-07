/**
 * Social Blocks for GrapeJS Editor
 *
 * Social links, share buttons, trust badges, and social proof components
 */

export const socialBlocks = [
  // Social Links
  {
    id: 'social-links',
    label: 'Social Links',
    category: 'Social',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8.5" y1="10.5" x2="15.5" y2="7.5" stroke="currentColor" stroke-width="1.5"/><line x1="8.5" y1="13.5" x2="15.5" y2="16.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="social-links" style="display: flex; gap: 16px; justify-content: center; padding: 20px;">
        <a href="#" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #1877f2; border-radius: 12px; color: white; text-decoration: none; font-size: 20px; transition: transform 0.2s;">f</a>
        <a href="#" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #1da1f2; border-radius: 12px; color: white; text-decoration: none; font-size: 20px;">𝕏</a>
        <a href="#" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af); border-radius: 12px; color: white; text-decoration: none; font-size: 20px;">📷</a>
        <a href="#" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #0077b5; border-radius: 12px; color: white; text-decoration: none; font-size: 20px;">in</a>
        <a href="#" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #ff0000; border-radius: 12px; color: white; text-decoration: none; font-size: 20px;">▶</a>
      </div>
    `,
  },

  // Share Buttons
  {
    id: 'share-buttons',
    label: 'Share Buttons',
    category: 'Social',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" stroke-width="1.5"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="share-buttons" style="display: flex; align-items: center; gap: 12px; padding: 16px; background: #f8fafc; border-radius: 12px; max-width: fit-content;">
        <span style="font-weight: 500; color: #64748b; font-size: 14px;">Share:</span>
        <button style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #1877f2; border: none; border-radius: 8px; color: white; font-size: 14px; cursor: pointer;">Facebook</button>
        <button style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #1da1f2; border: none; border-radius: 8px; color: white; font-size: 14px; cursor: pointer;">Twitter</button>
        <button style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #0077b5; border: none; border-radius: 8px; color: white; font-size: 14px; cursor: pointer;">LinkedIn</button>
        <button style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; color: #374151; font-size: 14px; cursor: pointer;">Copy Link</button>
      </div>
    `,
  },

  // Trust Badges
  {
    id: 'trust-badges',
    label: 'Trust Badges',
    category: 'Social',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="trust-badges" style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; padding: 40px 20px; background: #f8fafc;">
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <div style="width: 48px; height: 48px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">🔒</div>
          <div>
            <p style="font-weight: 600; color: #1a1a1a; margin: 0; font-size: 14px;">Secure Payment</p>
            <p style="color: #64748b; margin: 0; font-size: 12px;">256-bit SSL encryption</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <div style="width: 48px; height: 48px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">🚚</div>
          <div>
            <p style="font-weight: 600; color: #1a1a1a; margin: 0; font-size: 14px;">Free Shipping</p>
            <p style="color: #64748b; margin: 0; font-size: 12px;">On orders over $50</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <div style="width: 48px; height: 48px; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">⭐</div>
          <div>
            <p style="font-weight: 600; color: #1a1a1a; margin: 0; font-size: 14px;">Top Rated</p>
            <p style="color: #64748b; margin: 0; font-size: 12px;">4.9 out of 5 stars</p>
          </div>
        </div>
      </div>
    `,
  },

  // Review Stars
  {
    id: 'review-stars',
    label: 'Review Stars',
    category: 'Social',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 14l-4.8 2.6.9-5.3-3.8-3.7 5.3-.8L12 2z" fill="currentColor"/></svg>`,
    content: `
      <div class="review-stars" style="display: inline-flex; flex-direction: column; align-items: center; padding: 24px;">
        <div style="display: flex; gap: 4px; margin-bottom: 12px;">
          <span style="font-size: 28px; color: #fbbf24;">★</span>
          <span style="font-size: 28px; color: #fbbf24;">★</span>
          <span style="font-size: 28px; color: #fbbf24;">★</span>
          <span style="font-size: 28px; color: #fbbf24;">★</span>
          <span style="font-size: 28px; color: #fbbf24;">★</span>
        </div>
        <p style="font-size: 16px; color: #1a1a1a; margin: 0;"><strong>4.9</strong> out of 5</p>
        <p style="font-size: 14px; color: #64748b; margin: 8px 0 0;">Based on 2,847 reviews</p>
      </div>
    `,
  },

  // Client Logos
  {
    id: 'client-logos',
    label: 'Client Logos',
    category: 'Social',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="8" width="6" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="8" width="6" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="8" width="6" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <section class="client-logos" style="padding: 60px 20px; background: #f8fafc;">
        <p style="text-align: center; color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 32px;">Trusted by leading companies</p>
        <div style="display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; max-width: 1000px; margin: 0 auto;">
          <div style="padding: 16px 32px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <span style="font-size: 24px; font-weight: 700; color: #94a3b8;">LOGO 1</span>
          </div>
          <div style="padding: 16px 32px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <span style="font-size: 24px; font-weight: 700; color: #94a3b8;">LOGO 2</span>
          </div>
          <div style="padding: 16px 32px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <span style="font-size: 24px; font-weight: 700; color: #94a3b8;">LOGO 3</span>
          </div>
          <div style="padding: 16px 32px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <span style="font-size: 24px; font-weight: 700; color: #94a3b8;">LOGO 4</span>
          </div>
          <div style="padding: 16px 32px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <span style="font-size: 24px; font-weight: 700; color: #94a3b8;">LOGO 5</span>
          </div>
        </div>
      </section>
    `,
  },

  // Testimonial Slider
  {
    id: 'testimonial-slider',
    label: 'Testimonial Slider',
    category: 'Social',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 10h3v4H7zM14 10h3v4h-3z" fill="currentColor"/><circle cx="8" cy="20" r="1" fill="currentColor"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/><circle cx="16" cy="20" r="1" fill="currentColor"/></svg>`,
    content: `
      <section class="testimonial-slider" style="padding: 80px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative;">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <div style="font-size: 64px; color: rgba(255,255,255,0.3); margin-bottom: 24px;">"</div>
          <p style="font-size: 24px; color: white; line-height: 1.6; margin: 0 0 32px; font-style: italic;">This platform has completely transformed how we manage our business. The intuitive interface and powerful features have saved us countless hours every week.</p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
            <div style="width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;">SJ</div>
            <div style="text-align: left;">
              <p style="color: white; font-weight: 600; margin: 0; font-size: 16px;">Sarah Johnson</p>
              <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">CEO at TechCorp</p>
            </div>
          </div>
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 40px;">
            <span style="width: 32px; height: 4px; background: white; border-radius: 2px;"></span>
            <span style="width: 32px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px;"></span>
            <span style="width: 32px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px;"></span>
          </div>
        </div>
      </section>
    `,
  },
];

export default socialBlocks;
