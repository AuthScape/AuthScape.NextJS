/**
 * CTA (Call-to-Action) Blocks for GrapeJS Editor
 *
 * Conversion-focused sections to encourage user action
 */

export const ctaBlocks = [
  // CTA Banner - Full width call to action
  {
    id: 'cta-banner',
    label: 'CTA Banner',
    category: 'CTA',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="10" width="4" height="4" rx="1" fill="currentColor"/></svg>`,
    content: `
      <section class="cta-banner" style="padding: 80px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h2 style="color: white; font-size: 40px; font-weight: 700; margin-bottom: 16px; line-height: 1.2;">Ready to Get Started?</h2>
          <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin-bottom: 32px; line-height: 1.6;">Join thousands of satisfied customers who have transformed their business with our platform.</p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="#" style="display: inline-block; padding: 16px 32px; background: white; color: #667eea; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Start Free Trial</a>
            <a href="#" style="display: inline-block; padding: 16px 32px; background: transparent; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; border: 2px solid white;">Talk to Sales</a>
          </div>
        </div>
      </section>
    `,
  },

  // Newsletter Signup
  {
    id: 'newsletter',
    label: 'Newsletter',
    category: 'CTA',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 8l10 6 10-6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <section class="newsletter" style="padding: 80px 20px; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px;">✉️</div>
          <h2 style="font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px;">Subscribe to Our Newsletter</h2>
          <p style="color: #64748b; font-size: 16px; margin-bottom: 32px; line-height: 1.6;">Get the latest updates, articles, and resources delivered straight to your inbox.</p>
          <form style="display: flex; gap: 12px; max-width: 480px; margin: 0 auto; flex-wrap: wrap; justify-content: center;">
            <input type="email" placeholder="Enter your email" style="flex: 1; min-width: 200px; padding: 14px 20px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none;">
            <button type="submit" style="padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer;">Subscribe</button>
          </form>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 16px;">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    `,
  },

  // Announcement Bar
  {
    id: 'announcement-bar',
    label: 'Announcement Bar',
    category: 'CTA',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="9" width="20" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="announcement-bar" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); padding: 12px 20px; text-align: center;">
        <p style="color: white; font-size: 14px; margin: 0; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-weight: 600;">NEW</span>
          <span>Introducing our latest feature release! Experience 50% faster performance.</span>
          <a href="#" style="color: white; font-weight: 600; text-decoration: underline;">Learn more →</a>
        </p>
      </div>
    `,
  },

  // Floating CTA
  {
    id: 'floating-cta',
    label: 'Floating CTA',
    category: 'CTA',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="6" y="14" width="12" height="6" rx="3" fill="currentColor"/><rect x="2" y="4" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="floating-cta" style="position: fixed; bottom: 24px; right: 24px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-end; gap: 12px;">
        <div style="background: white; padding: 20px 24px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); max-width: 300px;">
          <p style="font-size: 14px; color: #64748b; margin: 0 0 8px;">Need help getting started?</p>
          <p style="font-size: 16px; color: #1a1a1a; font-weight: 600; margin: 0 0 16px;">Chat with our team now</p>
          <a href="#" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Start Chat</a>
        </div>
      </div>
    `,
  },

  // CTA Card
  {
    id: 'cta-card',
    label: 'CTA Card',
    category: 'CTA',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="12" x2="14" y2="12" stroke="currentColor" stroke-width="1"/><rect x="8" y="15" width="8" height="2" rx="1" fill="currentColor"/></svg>`,
    content: `
      <div class="cta-card" style="max-width: 400px; margin: 40px auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); text-align: center;">
        <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px;">🚀</div>
        <h3 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px;">Upgrade to Pro</h3>
        <p style="color: #64748b; font-size: 16px; margin-bottom: 24px; line-height: 1.6;">Unlock all features and take your experience to the next level.</p>
        <ul style="text-align: left; margin-bottom: 24px; padding: 0; list-style: none;">
          <li style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: #374151;"><span style="color: #10b981;">✓</span> Unlimited projects</li>
          <li style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: #374151;"><span style="color: #10b981;">✓</span> Priority support</li>
          <li style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: #374151;"><span style="color: #10b981;">✓</span> Advanced analytics</li>
        </ul>
        <a href="#" style="display: block; padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Upgrade Now</a>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 12px;">30-day money-back guarantee</p>
      </div>
    `,
  },
];

export default ctaBlocks;
