/**
 * Hero Blocks for GrapeJS Editor
 *
 * Hero sections for landing pages and page headers
 */

export const heroBlocks = [
  // Hero Basic - Simple centered hero
  {
    id: 'hero-basic',
    label: 'Hero Basic',
    category: 'Heroes',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="2"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="1"/></svg>`,
    content: `
      <section class="hero-basic" style="padding: 100px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; min-height: 500px; display: flex; align-items: center; justify-content: center;">
        <div style="max-width: 800px; margin: 0 auto;">
          <p style="color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Welcome to our platform</p>
          <h1 style="color: white; font-size: 56px; font-weight: 700; margin-bottom: 24px; line-height: 1.1;">Build Something Amazing Today</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 20px; margin-bottom: 40px; line-height: 1.6;">A compelling subtitle that explains your value proposition and encourages visitors to take action.</p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="#" style="display: inline-block; padding: 16px 32px; background: white; color: #667eea; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Get Started</a>
            <a href="#" style="display: inline-block; padding: 16px 32px; background: transparent; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; border: 2px solid white;">Learn More</a>
          </div>
        </div>
      </section>
    `,
  },

  // Hero Split - Image on one side, content on other
  {
    id: 'hero-split',
    label: 'Hero Split',
    category: 'Heroes',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1"/><line x1="15" y1="13" x2="19" y2="13" stroke="currentColor" stroke-width="1"/></svg>`,
    content: `
      <section class="hero-split" style="display: flex; min-height: 600px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px; padding: 80px 60px; display: flex; flex-direction: column; justify-content: center; background-color: #f8fafc;">
          <span style="color: #667eea; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">Introducing</span>
          <h1 style="font-size: 48px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; line-height: 1.2;">Transform Your Business with Our Solution</h1>
          <p style="font-size: 18px; color: #64748b; margin-bottom: 32px; line-height: 1.7;">Discover how our platform can help you achieve your goals faster and more efficiently than ever before.</p>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="#" style="display: inline-block; padding: 14px 28px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Start Free Trial</a>
            <a href="#" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; color: #667eea; text-decoration: none; font-weight: 600;">Watch Demo →</a>
          </div>
        </div>
        <div style="flex: 1; min-width: 300px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 40px;">
          <div style="width: 100%; max-width: 500px; aspect-ratio: 4/3; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">
            Image Placeholder
          </div>
        </div>
      </section>
    `,
  },

  // Hero Video Background
  {
    id: 'hero-video',
    label: 'Hero Video',
    category: 'Heroes',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="10,8 16,12 10,16" fill="currentColor"/></svg>`,
    content: `
      <section class="hero-video" style="position: relative; min-height: 600px; display: flex; align-items: center; justify-content: center; background: #1a1a1a; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)); z-index: 1;"></div>
        <div style="position: relative; z-index: 2; text-align: center; padding: 40px 20px; max-width: 900px;">
          <h1 style="color: white; font-size: 60px; font-weight: 700; margin-bottom: 24px; line-height: 1.1;">Experience the Difference</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 22px; margin-bottom: 40px; line-height: 1.6;">Watch how our solution transforms the way businesses operate worldwide.</p>
          <a href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: white; border-radius: 50%; color: #667eea; text-decoration: none; font-size: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">▶</a>
          <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 16px;">Click to play video</p>
        </div>
      </section>
    `,
  },

  // Hero Slider Placeholder
  {
    id: 'hero-slider',
    label: 'Hero Slider',
    category: 'Heroes',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="18" r="1" fill="currentColor"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><circle cx="17" cy="18" r="1" fill="currentColor"/></svg>`,
    content: `
      <section class="hero-slider" style="position: relative; min-height: 550px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); overflow: hidden;">
        <div style="display: flex; align-items: center; min-height: 550px; padding: 60px;">
          <div style="max-width: 600px; padding: 0 40px;">
            <span style="display: inline-block; padding: 8px 16px; background: rgba(102, 126, 234, 0.2); color: #667eea; border-radius: 20px; font-size: 14px; font-weight: 500; margin-bottom: 24px;">Slide 1 of 3</span>
            <h1 style="color: white; font-size: 52px; font-weight: 700; margin-bottom: 20px; line-height: 1.1;">Powerful Features for Modern Teams</h1>
            <p style="color: rgba(255,255,255,0.8); font-size: 18px; margin-bottom: 32px; line-height: 1.7;">Streamline your workflow with our comprehensive suite of tools designed for collaboration.</p>
            <a href="#" style="display: inline-block; padding: 16px 32px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Explore Features</a>
          </div>
        </div>
        <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px;">
          <span style="width: 32px; height: 4px; background: white; border-radius: 2px;"></span>
          <span style="width: 32px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px;"></span>
          <span style="width: 32px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px;"></span>
        </div>
      </section>
    `,
  },

  // Hero with Image
  {
    id: 'hero-image',
    label: 'Hero Image',
    category: 'Heroes',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="10" r="2" fill="currentColor"/><path d="M4 16l4-4 3 3 5-5 4 4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <section class="hero-image" style="position: relative; min-height: 600px; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600') center/cover; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; padding: 40px 20px; max-width: 800px;">
          <h1 style="color: white; font-size: 56px; font-weight: 700; margin-bottom: 24px; line-height: 1.1; text-shadow: 0 2px 20px rgba(0,0,0,0.3);">Your Vision, Our Mission</h1>
          <p style="color: rgba(255,255,255,0.95); font-size: 20px; margin-bottom: 40px; line-height: 1.7; text-shadow: 0 1px 10px rgba(0,0,0,0.3);">We help businesses achieve extraordinary results through innovative solutions and dedicated partnership.</p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="#" style="display: inline-block; padding: 16px 32px; background: white; color: #1a1a1a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Get Started</a>
            <a href="#" style="display: inline-block; padding: 16px 32px; background: transparent; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; border: 2px solid white;">Contact Us</a>
          </div>
        </div>
      </section>
    `,
  },

  // Hero Animated (with CSS animation styles)
  {
    id: 'hero-animated',
    label: 'Hero Animated',
    category: 'Heroes',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 12h12M12 8v8" stroke="currentColor" stroke-width="2"/></svg>`,
    content: `
      <section class="hero-animated" style="position: relative; min-height: 600px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <div style="position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%); top: -100px; right: -100px; border-radius: 50%;"></div>
        <div style="position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%); bottom: -50px; left: -50px; border-radius: 50%;"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding: 40px 20px; max-width: 900px;">
          <div style="display: inline-block; padding: 10px 24px; background: rgba(102, 126, 234, 0.2); border: 1px solid rgba(102, 126, 234, 0.3); border-radius: 30px; margin-bottom: 32px;">
            <span style="color: #a5b4fc; font-size: 14px; font-weight: 500;">✨ Introducing our new platform</span>
          </div>
          <h1 style="color: white; font-size: 64px; font-weight: 800; margin-bottom: 24px; line-height: 1.05; background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">The Future of Digital Experience</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 20px; margin-bottom: 48px; line-height: 1.7; max-width: 700px; margin-left: auto; margin-right: auto;">Harness the power of next-generation technology to transform your business and delight your customers.</p>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <a href="#" style="display: inline-block; padding: 18px 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);">Start Building Free</a>
            <a href="#" style="display: inline-flex; align-items: center; gap: 8px; padding: 18px 36px; background: rgba(255,255,255,0.1); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; border: 1px solid rgba(255,255,255,0.2);">View Documentation →</a>
          </div>
        </div>
      </section>
    `,
  },
];

export default heroBlocks;
