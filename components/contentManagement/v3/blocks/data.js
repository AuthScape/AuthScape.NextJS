/**
 * Data Display Blocks for GrapeJS Editor
 *
 * Stats, timelines, progress bars, counters, and data visualization
 */

export const dataBlocks = [
  // Stats Section
  {
    id: 'stats',
    label: 'Stats',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="12" width="4" height="8" fill="currentColor"/><rect x="10" y="8" width="4" height="12" fill="currentColor"/><rect x="16" y="4" width="4" height="16" fill="currentColor"/></svg>`,
    content: `
      <section class="stats" style="padding: 60px 20px; background-color: #f8fafc;">
        <div style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; text-align: center;">
          <div>
            <p style="font-size: 48px; font-weight: 700; color: #667eea; margin: 0 0 8px; line-height: 1;">10K+</p>
            <p style="font-size: 16px; color: #64748b; margin: 0;">Active Users</p>
          </div>
          <div>
            <p style="font-size: 48px; font-weight: 700; color: #667eea; margin: 0 0 8px; line-height: 1;">98%</p>
            <p style="font-size: 16px; color: #64748b; margin: 0;">Satisfaction Rate</p>
          </div>
          <div>
            <p style="font-size: 48px; font-weight: 700; color: #667eea; margin: 0 0 8px; line-height: 1;">50M+</p>
            <p style="font-size: 16px; color: #64748b; margin: 0;">Tasks Completed</p>
          </div>
          <div>
            <p style="font-size: 48px; font-weight: 700; color: #667eea; margin: 0 0 8px; line-height: 1;">24/7</p>
            <p style="font-size: 16px; color: #64748b; margin: 0;">Support Available</p>
          </div>
        </div>
      </section>
    `,
  },

  // Timeline
  {
    id: 'timeline',
    label: 'Timeline',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="6" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="18" r="2" fill="currentColor"/></svg>`,
    content: `
      <div class="timeline" style="max-width: 700px; margin: 40px auto; padding: 0 20px;">
        <div style="position: relative; padding-left: 40px; padding-bottom: 40px; border-left: 2px solid #e2e8f0;">
          <div style="position: absolute; left: -10px; top: 0; width: 20px; height: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
          <span style="display: inline-block; padding: 4px 12px; background: #f1f5f9; color: #64748b; border-radius: 20px; font-size: 13px; margin-bottom: 12px;">January 2024</span>
          <h4 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Company Founded</h4>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Started with a small team of passionate developers with a vision to transform the industry.</p>
        </div>
        <div style="position: relative; padding-left: 40px; padding-bottom: 40px; border-left: 2px solid #e2e8f0;">
          <div style="position: absolute; left: -10px; top: 0; width: 20px; height: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
          <span style="display: inline-block; padding: 4px 12px; background: #f1f5f9; color: #64748b; border-radius: 20px; font-size: 13px; margin-bottom: 12px;">June 2024</span>
          <h4 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Product Launch</h4>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Successfully launched our flagship product to thousands of early adopters.</p>
        </div>
        <div style="position: relative; padding-left: 40px;">
          <div style="position: absolute; left: -10px; top: 0; width: 20px; height: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
          <span style="display: inline-block; padding: 4px 12px; background: #f1f5f9; color: #64748b; border-radius: 20px; font-size: 13px; margin-bottom: 12px;">December 2024</span>
          <h4 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Series A Funding</h4>
          <p style="color: #64748b; line-height: 1.6; margin: 0;">Raised $10M in Series A funding to accelerate growth and expand the team.</p>
        </div>
      </div>
    `,
  },

  // Progress Bar
  {
    id: 'progress-bar',
    label: 'Progress Bar',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="10" width="18" height="4" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="10" width="12" height="4" rx="2" fill="currentColor"/></svg>`,
    content: `
      <div class="progress-bar" style="max-width: 500px; margin: 20px auto;">
        <div style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 500; color: #1a1a1a; font-size: 14px;">Project Progress</span>
            <span style="font-weight: 600; color: #667eea; font-size: 14px;">75%</span>
          </div>
          <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
            <div style="width: 75%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 5px;"></div>
          </div>
        </div>
        <div style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 500; color: #1a1a1a; font-size: 14px;">Tasks Completed</span>
            <span style="font-weight: 600; color: #10b981; font-size: 14px;">90%</span>
          </div>
          <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
            <div style="width: 90%; height: 100%; background: linear-gradient(90deg, #10b981 0%, #059669 100%); border-radius: 5px;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 500; color: #1a1a1a; font-size: 14px;">Budget Used</span>
            <span style="font-weight: 600; color: #f59e0b; font-size: 14px;">45%</span>
          </div>
          <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
            <div style="width: 45%; height: 100%; background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); border-radius: 5px;"></div>
          </div>
        </div>
      </div>
    `,
  },

  // Circular Progress
  {
    id: 'circular-progress',
    label: 'Circular Progress',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="#e2e8f0" stroke-width="3"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="42 56" transform="rotate(-90 12 12)"/></svg>`,
    content: `
      <div class="circular-progress" style="display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; padding: 40px;">
        <div style="text-align: center;">
          <div style="position: relative; width: 120px; height: 120px;">
            <svg viewBox="0 0 120 120" style="transform: rotate(-90deg);">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" stroke-width="8"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke="#667eea" stroke-width="8" stroke-dasharray="254" stroke-dashoffset="63.5" stroke-linecap="round"/>
            </svg>
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #1a1a1a;">75%</div>
          </div>
          <p style="margin: 16px 0 0; font-weight: 500; color: #64748b;">Performance</p>
        </div>
        <div style="text-align: center;">
          <div style="position: relative; width: 120px; height: 120px;">
            <svg viewBox="0 0 120 120" style="transform: rotate(-90deg);">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" stroke-width="8"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke="#10b981" stroke-width="8" stroke-dasharray="254" stroke-dashoffset="25.4" stroke-linecap="round"/>
            </svg>
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #1a1a1a;">90%</div>
          </div>
          <p style="margin: 16px 0 0; font-weight: 500; color: #64748b;">Completion</p>
        </div>
      </div>
    `,
  },

  // Countdown Timer - Uses dynamic component with configurable target date
  {
    id: 'countdown',
    label: 'Countdown',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: { type: 'countdown-timer' },
  },

  // Counter
  {
    id: 'counter',
    label: 'Counter',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="14" text-anchor="middle" font-size="8" fill="currentColor">123</text></svg>`,
    content: `
      <div class="counter" style="display: inline-flex; align-items: center; gap: 16px; padding: 20px; background: #f8fafc; border-radius: 12px;">
        <button style="width: 40px; height: 40px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">−</button>
        <span style="font-size: 32px; font-weight: 700; color: #1a1a1a; min-width: 80px; text-align: center;">42</span>
        <button style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
      </div>
    `,
  },

  // Metric Card
  {
    id: 'metric',
    label: 'Metric Card',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="14" x2="12" y2="14" stroke="currentColor" stroke-width="1"/></svg>`,
    content: `
      <div class="metric" style="max-width: 300px; padding: 24px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
          <p style="font-size: 14px; color: #64748b; margin: 0;">Total Revenue</p>
          <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #dcfce7; color: #16a34a; border-radius: 20px; font-size: 12px; font-weight: 600;">↑ 12.5%</span>
        </div>
        <p style="font-size: 36px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px;">$48,290</p>
        <p style="font-size: 14px; color: #94a3b8; margin: 0;">vs $42,890 last month</p>
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
          <div style="height: 40px; background: linear-gradient(90deg, #667eea20 0%, #764ba220 100%); border-radius: 4px; display: flex; align-items: end; gap: 4px; padding: 4px;">
            <div style="flex: 1; height: 50%; background: #667eea; border-radius: 2px;"></div>
            <div style="flex: 1; height: 70%; background: #667eea; border-radius: 2px;"></div>
            <div style="flex: 1; height: 40%; background: #667eea; border-radius: 2px;"></div>
            <div style="flex: 1; height: 90%; background: #667eea; border-radius: 2px;"></div>
            <div style="flex: 1; height: 60%; background: #667eea; border-radius: 2px;"></div>
            <div style="flex: 1; height: 80%; background: #667eea; border-radius: 2px;"></div>
            <div style="flex: 1; height: 100%; background: #764ba2; border-radius: 2px;"></div>
          </div>
        </div>
      </div>
    `,
  },

  // Skill Bars
  {
    id: 'skill-bars',
    label: 'Skill Bars',
    category: 'Data Display',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="3" rx="1.5" fill="none" stroke="currentColor" stroke-width="1"/><rect x="3" y="5" width="14" height="3" rx="1.5" fill="currentColor"/><rect x="3" y="11" width="18" height="3" rx="1.5" fill="none" stroke="currentColor" stroke-width="1"/><rect x="3" y="11" width="10" height="3" rx="1.5" fill="currentColor"/><rect x="3" y="17" width="18" height="3" rx="1.5" fill="none" stroke="currentColor" stroke-width="1"/><rect x="3" y="17" width="16" height="3" rx="1.5" fill="currentColor"/></svg>`,
    content: `
      <div class="skill-bars" style="max-width: 500px; margin: 20px auto;">
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 15px;">JavaScript</span>
            <span style="color: #64748b; font-size: 14px;">95%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 95%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 4px;"></div>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 15px;">React</span>
            <span style="color: #64748b; font-size: 14px;">90%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 90%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 4px;"></div>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 15px;">Node.js</span>
            <span style="color: #64748b; font-size: 14px;">85%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 85%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 4px;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 15px;">TypeScript</span>
            <span style="color: #64748b; font-size: 14px;">80%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 80%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 4px;"></div>
          </div>
        </div>
      </div>
    `,
  },
];

export default dataBlocks;
