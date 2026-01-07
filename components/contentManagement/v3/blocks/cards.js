/**
 * Card Blocks for GrapeJS Editor
 * Card, FeatureCard, PricingCard, TestimonialCard, TeamCard,
 * BlogCard, ProductCard, ServiceCard, PortfolioCard, ComparisonCard
 */

export const cardBlocks = [
  // Basic Card
  {
    id: 'card',
    label: 'Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="background: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; max-width: 400px;">
      <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
      <div style="padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">Card Title</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 16px 0;">This is a simple card component with an image area and content below.</p>
        <a href="#" style="display: inline-block; padding: 10px 20px; background: #1976d2; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">Learn More</a>
      </div>
    </div>`,
  },
  // Feature Card
  {
    id: 'feature-card',
    label: 'Feature Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="currentColor"/><line x1="6" y1="16" x2="18" y2="16" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="background: #ffffff; border-radius: 12px; padding: 32px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s;">
      <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
        <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">Feature Title</h3>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0;">Describe your amazing feature here. Keep it concise and highlight the key benefits.</p>
    </div>`,
  },
  // Pricing Card
  {
    id: 'pricing-card',
    label: 'Pricing Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="2" width="18" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="12" text-anchor="middle" font-size="8" fill="currentColor">$</text></svg>`,
    content: `<div style="background: #ffffff; border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 320px; border: 2px solid #e0e0e0;">
      <span style="display: inline-block; padding: 4px 12px; background: #e3f2fd; color: #1976d2; font-size: 12px; font-weight: 600; border-radius: 16px; margin-bottom: 16px;">POPULAR</span>
      <h3 style="font-size: 24px; font-weight: 600; margin: 0 0 8px 0; color: #1a1a1a;">Professional</h3>
      <div style="margin: 20px 0;">
        <span style="font-size: 48px; font-weight: 700; color: #1a1a1a;">$49</span>
        <span style="font-size: 16px; color: #888;">/month</span>
      </div>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; text-align: left;">
        <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555; font-size: 14px;">✓ Unlimited projects</li>
        <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555; font-size: 14px;">✓ Priority support</li>
        <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555; font-size: 14px;">✓ Advanced analytics</li>
        <li style="padding: 10px 0; color: #555; font-size: 14px;">✓ Custom integrations</li>
      </ul>
      <a href="#" style="display: block; padding: 14px 24px; background: #1976d2; color: white; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">Get Started</a>
    </div>`,
  },
  // Testimonial Card
  {
    id: 'testimonial-card',
    label: 'Testimonial Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>`,
    content: `<div style="background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
      <div style="display: flex; gap: 4px; margin-bottom: 16px;">
        <span style="color: #ffc107; font-size: 20px;">★</span>
        <span style="color: #ffc107; font-size: 20px;">★</span>
        <span style="color: #ffc107; font-size: 20px;">★</span>
        <span style="color: #ffc107; font-size: 20px;">★</span>
        <span style="color: #ffc107; font-size: 20px;">★</span>
      </div>
      <p style="font-size: 16px; color: #444; line-height: 1.7; margin: 0 0 24px 0; font-style: italic;">"This product has completely transformed how we work. The team is more productive and our clients are happier than ever."</p>
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%;"></div>
        <div>
          <h4 style="font-size: 16px; font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a;">Sarah Johnson</h4>
          <p style="font-size: 14px; color: #888; margin: 0;">CEO, TechCorp</p>
        </div>
      </div>
    </div>`,
  },
  // Team Card
  {
    id: 'team-card',
    label: 'Team Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); text-align: center; max-width: 300px;">
      <div style="height: 160px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
      <div style="position: relative; padding: 60px 24px 24px;">
        <div style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: #e0e0e0; border-radius: 50%; border: 4px solid #ffffff;"></div>
        <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 4px 0; color: #1a1a1a;">John Smith</h3>
        <p style="font-size: 14px; color: #1976d2; margin: 0 0 16px 0;">Lead Developer</p>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 20px 0;">Passionate about creating elegant solutions to complex problems.</p>
        <div style="display: flex; justify-content: center; gap: 12px;">
          <a href="#" style="width: 36px; height: 36px; background: #f5f5f5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #666; text-decoration: none;">in</a>
          <a href="#" style="width: 36px; height: 36px; background: #f5f5f5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #666; text-decoration: none;">tw</a>
          <a href="#" style="width: 36px; height: 36px; background: #f5f5f5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #666; text-decoration: none;">gh</a>
        </div>
      </div>
    </div>`,
  },
  // Blog Card
  {
    id: 'blog-card',
    label: 'Blog Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" stroke-width="2"/><line x1="7" y1="18" x2="13" y2="18" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<article style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); max-width: 380px;">
      <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative;">
        <span style="position: absolute; top: 16px; left: 16px; padding: 4px 12px; background: rgba(255,255,255,0.9); color: #1976d2; font-size: 12px; font-weight: 600; border-radius: 16px;">Technology</span>
      </div>
      <div style="padding: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #888; font-size: 13px;">
          <span>Jan 15, 2024</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
        <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a; line-height: 1.4;">The Future of Web Development in 2024</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 16px 0;">Explore the latest trends and technologies shaping the future of web development...</p>
        <a href="#" style="color: #1976d2; text-decoration: none; font-weight: 500; font-size: 14px;">Read More →</a>
      </div>
    </article>`,
  },
  // Product Card
  {
    id: 'product-card',
    label: 'Product Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="20" text-anchor="middle" font-size="6" fill="currentColor">$99</text></svg>`,
    content: `<div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); max-width: 300px;">
      <div style="position: relative; height: 250px; background: #f8f9fa; display: flex; align-items: center; justify-content: center;">
        <div style="width: 180px; height: 180px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;"></div>
        <span style="position: absolute; top: 12px; right: 12px; padding: 4px 10px; background: #ff5722; color: white; font-size: 12px; font-weight: 600; border-radius: 4px;">-20%</span>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 12px; color: #888; margin: 0 0 8px 0; text-transform: uppercase;">Electronics</p>
        <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">Premium Wireless Headphones</h3>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <span style="font-size: 22px; font-weight: 700; color: #1a1a1a;">$79.99</span>
          <span style="font-size: 16px; color: #888; text-decoration: line-through;">$99.99</span>
        </div>
        <button style="width: 100%; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">Add to Cart</button>
      </div>
    </div>`,
  },
  // Service Card
  {
    id: 'service-card',
    label: 'Service Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    content: `<div style="background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); border-left: 4px solid #1976d2;">
      <div style="width: 56px; height: 56px; background: #e3f2fd; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
        <svg width="28" height="28" fill="#1976d2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <h3 style="font-size: 22px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">Web Development</h3>
      <p style="font-size: 15px; color: #666; line-height: 1.6; margin: 0 0 20px 0;">Custom web solutions tailored to your business needs. From simple websites to complex applications.</p>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px 0;">
        <li style="padding: 8px 0; color: #555; font-size: 14px; display: flex; align-items: center; gap: 8px;"><span style="color: #4caf50;">✓</span> Responsive Design</li>
        <li style="padding: 8px 0; color: #555; font-size: 14px; display: flex; align-items: center; gap: 8px;"><span style="color: #4caf50;">✓</span> SEO Optimization</li>
        <li style="padding: 8px 0; color: #555; font-size: 14px; display: flex; align-items: center; gap: 8px;"><span style="color: #4caf50;">✓</span> Fast Performance</li>
      </ul>
      <a href="#" style="color: #1976d2; text-decoration: none; font-weight: 600; font-size: 15px;">Learn More →</a>
    </div>`,
  },
  // Portfolio Card
  {
    id: 'portfolio-card',
    label: 'Portfolio Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,
    content: `<div style="position: relative; border-radius: 12px; overflow: hidden; max-width: 400px; cursor: pointer;">
      <div style="height: 280px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;">
        <span style="display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.2); color: white; font-size: 12px; border-radius: 4px; margin-bottom: 12px; width: fit-content;">Web Design</span>
        <h3 style="font-size: 22px; font-weight: 600; margin: 0 0 8px 0; color: white;">E-commerce Platform</h3>
        <p style="font-size: 14px; color: rgba(255,255,255,0.8); margin: 0;">A modern shopping experience built with React and Node.js</p>
      </div>
    </div>`,
  },
  // Comparison Card
  {
    id: 'comparison-card',
    label: 'Comparison Card',
    category: 'Cards',
    media: `<svg viewBox="0 0 24 24" width="40" height="40"><rect x="2" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `<div style="display: flex; gap: 2px; max-width: 700px;">
      <div style="flex: 1; background: #ffffff; border-radius: 12px 0 0 12px; padding: 24px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h4 style="font-size: 18px; font-weight: 600; margin: 0 0 16px 0; color: #1a1a1a;">Basic Plan</h4>
        <p style="font-size: 32px; font-weight: 700; color: #1a1a1a; margin: 0 0 20px 0;">$19<span style="font-size: 14px; font-weight: 400; color: #888;">/mo</span></p>
        <ul style="list-style: none; padding: 0; margin: 0; text-align: left;">
          <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #555;">✓ 10 Projects</li>
          <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #555;">✓ Basic Support</li>
          <li style="padding: 10px 0; font-size: 14px; color: #ccc;">✗ Advanced Features</li>
        </ul>
      </div>
      <div style="flex: 1; background: #1976d2; border-radius: 0 12px 12px 0; padding: 24px; text-align: center; color: white;">
        <span style="display: inline-block; padding: 4px 12px; background: rgba(255,255,255,0.2); font-size: 11px; border-radius: 12px; margin-bottom: 12px;">RECOMMENDED</span>
        <h4 style="font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Pro Plan</h4>
        <p style="font-size: 32px; font-weight: 700; margin: 0 0 20px 0;">$49<span style="font-size: 14px; font-weight: 400; opacity: 0.8;">/mo</span></p>
        <ul style="list-style: none; padding: 0; margin: 0; text-align: left;">
          <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 14px;">✓ Unlimited Projects</li>
          <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 14px;">✓ Priority Support</li>
          <li style="padding: 10px 0; font-size: 14px;">✓ Advanced Features</li>
        </ul>
      </div>
    </div>`,
  },
];

export default cardBlocks;
