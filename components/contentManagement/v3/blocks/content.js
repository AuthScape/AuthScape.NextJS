/**
 * Content Blocks for GrapeJS Editor
 *
 * FAQ, Features, Steps, Pricing tables, and content sections
 */

export const contentBlocks = [
  // FAQ Section
  {
    id: 'faq',
    label: 'FAQ',
    category: 'Content',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 16v-1M12 13c0-2 2-2 2-4a2 2 0 1 0-4 0" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <section class="faq" style="padding: 80px 20px; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 48px;">
          <h2 style="font-size: 36px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px;">Frequently Asked Questions</h2>
          <p style="font-size: 18px; color: #64748b; margin: 0;">Find answers to common questions about our service.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">How do I get started?</span>
              <span style="color: #667eea; font-size: 20px;">−</span>
            </div>
            <div style="padding: 20px 24px; background: white; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; line-height: 1.7; margin: 0;">Getting started is easy! Simply sign up for a free account, complete the onboarding process, and you'll be up and running in minutes. Our intuitive interface guides you through each step.</p>
            </div>
          </div>

          <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">What payment methods do you accept?</span>
              <span style="color: #64748b; font-size: 20px;">+</span>
            </div>
          </div>

          <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">Can I cancel my subscription anytime?</span>
              <span style="color: #64748b; font-size: 20px;">+</span>
            </div>
          </div>

          <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="padding: 20px 24px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #1a1a1a; font-size: 16px;">Do you offer customer support?</span>
              <span style="color: #64748b; font-size: 20px;">+</span>
            </div>
          </div>
        </div>
      </section>
    `,
  },

  // Features Grid
  {
    id: 'features',
    label: 'Features',
    category: 'Content',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <section class="features" style="padding: 80px 20px;">
        <div style="text-align: center; margin-bottom: 56px;">
          <h2 style="font-size: 36px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px;">Powerful Features</h2>
          <p style="font-size: 18px; color: #64748b; margin: 0; max-width: 600px; margin-left: auto; margin-right: auto;">Everything you need to build amazing products and grow your business.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; max-width: 1200px; margin: 0 auto;">
          <div style="padding: 32px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 28px;">⚡</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Lightning Fast</h3>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Built for speed with optimized performance that keeps your users engaged.</p>
          </div>

          <div style="padding: 32px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 28px;">🔒</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Secure by Design</h3>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Enterprise-grade security with encryption at rest and in transit.</p>
          </div>

          <div style="padding: 32px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 28px;">📊</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Advanced Analytics</h3>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Deep insights into your data with powerful visualization tools.</p>
          </div>
        </div>
      </section>
    `,
  },

  // Steps/How It Works
  {
    id: 'steps',
    label: 'Steps',
    category: 'Content',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="6" cy="6" r="3" fill="currentColor"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="8" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="14" x2="16" y2="16" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <section class="steps" style="padding: 80px 20px; background: #f8fafc;">
        <div style="text-align: center; margin-bottom: 56px;">
          <h2 style="font-size: 36px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px;">How It Works</h2>
          <p style="font-size: 18px; color: #64748b; margin: 0;">Get started in just three simple steps.</p>
        </div>

        <div style="display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; max-width: 1000px; margin: 0 auto;">
          <div style="text-align: center; max-width: 280px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; font-weight: 700; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">1</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Sign Up</h3>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Create your free account in under a minute. No credit card required.</p>
          </div>

          <div style="text-align: center; max-width: 280px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; font-weight: 700; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">2</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Configure</h3>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Customize your settings and connect your favorite tools and services.</p>
          </div>

          <div style="text-align: center; max-width: 280px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; font-weight: 700; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">3</div>
            <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px;">Launch</h3>
            <p style="color: #64748b; line-height: 1.6; margin: 0;">Go live and start seeing results from day one.</p>
          </div>
        </div>
      </section>
    `,
  },

  // Content Block (Text + Image)
  {
    id: 'content-block',
    label: 'Content Block',
    category: 'Content',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="9" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="8" x2="9" y2="8" stroke="currentColor" stroke-width="1"/><line x1="4" y1="11" x2="9" y2="11" stroke="currentColor" stroke-width="1"/><line x1="4" y1="14" x2="7" y2="14" stroke="currentColor" stroke-width="1"/><rect x="13" y="6" width="9" height="12" rx="1" fill="currentColor" fill-opacity="0.3"/></svg>`,
    content: `
      <section class="content-block" style="padding: 80px 20px;">
        <div style="display: flex; gap: 60px; align-items: center; max-width: 1100px; margin: 0 auto; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <span style="display: inline-block; padding: 8px 16px; background: rgba(102, 126, 234, 0.1); color: #667eea; border-radius: 20px; font-size: 14px; font-weight: 500; margin-bottom: 20px;">Why Choose Us</span>
            <h2 style="font-size: 40px; font-weight: 700; color: #1a1a1a; margin: 0 0 20px; line-height: 1.2;">Build Better Products with Less Effort</h2>
            <p style="font-size: 18px; color: #64748b; line-height: 1.7; margin: 0 0 24px;">Our platform provides all the tools you need to create exceptional products that your customers will love. From design to deployment, we've got you covered.</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: #374151; font-size: 16px;"><span style="color: #10b981;">✓</span> Intuitive drag-and-drop interface</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: #374151; font-size: 16px;"><span style="color: #10b981;">✓</span> Real-time collaboration</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 8px 0; color: #374151; font-size: 16px;"><span style="color: #10b981;">✓</span> Automated workflows</li>
            </ul>
          </div>
          <div style="flex: 1; min-width: 300px;">
            <div style="aspect-ratio: 4/3; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);">
              Image Placeholder
            </div>
          </div>
        </div>
      </section>
    `,
  },

  // Testimonials Section
  {
    id: 'testimonials',
    label: 'Testimonials',
    category: 'Content',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M3 11h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8l2-2zm12 0h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v8l2-2z" fill="currentColor"/></svg>`,
    content: `
      <section class="testimonials" style="padding: 80px 20px; background: #f8fafc;">
        <div style="text-align: center; margin-bottom: 56px;">
          <h2 style="font-size: 36px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px;">What Our Customers Say</h2>
          <p style="font-size: 18px; color: #64748b; margin: 0;">Join thousands of satisfied users worldwide.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; max-width: 1100px; margin: 0 auto;">
          <div style="padding: 32px; background: white; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="display: flex; gap: 4px; margin-bottom: 16px;">
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
            </div>
            <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 24px; font-style: italic;">"This platform has revolutionized how we work. The time savings alone have made it worth every penny."</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">JD</div>
              <div>
                <p style="font-weight: 600; color: #1a1a1a; margin: 0; font-size: 15px;">Jane Doe</p>
                <p style="color: #64748b; margin: 0; font-size: 14px;">CEO, TechCorp</p>
              </div>
            </div>
          </div>

          <div style="padding: 32px; background: white; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="display: flex; gap: 4px; margin-bottom: 16px;">
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
              <span style="color: #fbbf24; font-size: 20px;">★</span>
            </div>
            <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 24px; font-style: italic;">"The customer support is exceptional. They went above and beyond to help us get set up properly."</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">MS</div>
              <div>
                <p style="font-weight: 600; color: #1a1a1a; margin: 0; font-size: 15px;">Mike Smith</p>
                <p style="color: #64748b; margin: 0; font-size: 14px;">Founder, StartupXYZ</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  },

  // Pricing Table
  {
    id: 'pricing-table',
    label: 'Pricing Table',
    category: 'Content',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="4" width="6" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2" width="6" height="18" rx="1" fill="currentColor"/><rect x="15" y="4" width="6" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <section class="pricing-table" style="padding: 80px 20px;">
        <div style="text-align: center; margin-bottom: 56px;">
          <h2 style="font-size: 36px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px;">Simple, Transparent Pricing</h2>
          <p style="font-size: 18px; color: #64748b; margin: 0;">Choose the plan that works best for you.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; max-width: 1000px; margin: 0 auto; align-items: start;">
          <div style="padding: 40px; background: white; border-radius: 20px; border: 2px solid #e2e8f0;">
            <h3 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Starter</h3>
            <p style="color: #64748b; margin: 0 0 24px;">Perfect for individuals</p>
            <p style="margin: 0 0 24px;"><span style="font-size: 48px; font-weight: 700; color: #1a1a1a;">$9</span><span style="color: #64748b;">/month</span></p>
            <ul style="list-style: none; padding: 0; margin: 0 0 32px;">
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> 5 projects</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> 10GB storage</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> Email support</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #94a3b8;"><span style="color: #94a3b8;">✗</span> Priority support</li>
            </ul>
            <button style="width: 100%; padding: 14px; background: white; border: 2px solid #667eea; border-radius: 10px; color: #667eea; font-weight: 600; font-size: 16px; cursor: pointer;">Get Started</button>
          </div>

          <div style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; position: relative; transform: scale(1.05);">
            <span style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); padding: 6px 16px; background: #fbbf24; color: #1a1a1a; border-radius: 20px; font-size: 13px; font-weight: 600;">POPULAR</span>
            <h3 style="font-size: 24px; font-weight: 600; color: white; margin: 0 0 8px;">Pro</h3>
            <p style="color: rgba(255,255,255,0.8); margin: 0 0 24px;">For growing teams</p>
            <p style="margin: 0 0 24px;"><span style="font-size: 48px; font-weight: 700; color: white;">$29</span><span style="color: rgba(255,255,255,0.8);">/month</span></p>
            <ul style="list-style: none; padding: 0; margin: 0 0 32px;">
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: white;"><span>✓</span> Unlimited projects</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: white;"><span>✓</span> 100GB storage</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: white;"><span>✓</span> Priority support</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: white;"><span>✓</span> Advanced analytics</li>
            </ul>
            <button style="width: 100%; padding: 14px; background: white; border: none; border-radius: 10px; color: #667eea; font-weight: 600; font-size: 16px; cursor: pointer;">Get Started</button>
          </div>

          <div style="padding: 40px; background: white; border-radius: 20px; border: 2px solid #e2e8f0;">
            <h3 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Enterprise</h3>
            <p style="color: #64748b; margin: 0 0 24px;">For large organizations</p>
            <p style="margin: 0 0 24px;"><span style="font-size: 48px; font-weight: 700; color: #1a1a1a;">$99</span><span style="color: #64748b;">/month</span></p>
            <ul style="list-style: none; padding: 0; margin: 0 0 32px;">
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> Everything in Pro</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> Unlimited storage</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> Dedicated support</li>
              <li style="display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #374151;"><span style="color: #10b981;">✓</span> Custom integrations</li>
            </ul>
            <button style="width: 100%; padding: 14px; background: white; border: 2px solid #667eea; border-radius: 10px; color: #667eea; font-weight: 600; font-size: 16px; cursor: pointer;">Contact Sales</button>
          </div>
        </div>
      </section>
    `,
  },
];

export default contentBlocks;
