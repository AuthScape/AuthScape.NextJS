/**
 * Media Blocks for GrapeJS Editor
 *
 * Image, video, gallery, and other media components
 */

export const mediaBlocks = [
  // Image Block
  {
    id: 'image',
    label: 'Image',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="10" r="2" fill="currentColor"/><path d="M5 17l4-4 3 3 4-4 4 4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: {
      type: 'image',
      style: {
        width: '100%',
        'max-width': '800px',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
      },
      attributes: {
        src: 'https://via.placeholder.com/800x450',
        alt: 'Image description',
      },
    },
  },

  // Video Embed - Uses dynamic component with YouTube/Vimeo/Asset support
  {
    id: 'video-embed',
    label: 'Video Player',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="10,9 16,12 10,15" fill="currentColor"/></svg>`,
    content: { type: 'video-player' },
  },

  // Image Gallery
  {
    id: 'gallery',
    label: 'Image Gallery',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="2" y="4" width="8" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="13" width="8" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="13" width="8" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; padding: 20px;">
        <div style="aspect-ratio: 4/3; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.3s;">
          <img src="https://via.placeholder.com/400x300/667eea/ffffff?text=Image+1" alt="Gallery image 1" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="aspect-ratio: 4/3; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.3s;">
          <img src="https://via.placeholder.com/400x300/f093fb/ffffff?text=Image+2" alt="Gallery image 2" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="aspect-ratio: 4/3; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.3s;">
          <img src="https://via.placeholder.com/400x300/4facfe/ffffff?text=Image+3" alt="Gallery image 3" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="aspect-ratio: 4/3; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.3s;">
          <img src="https://via.placeholder.com/400x300/43e97b/ffffff?text=Image+4" alt="Gallery image 4" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
    `,
  },

  // Carousel
  {
    id: 'carousel',
    label: 'Carousel',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="19" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/><circle cx="16" cy="19" r="1" fill="currentColor"/><path d="M2 12l2-2v4l-2-2M22 12l-2-2v4l2-2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <div class="carousel" style="position: relative; max-width: 900px; margin: 40px auto; overflow: hidden; border-radius: 16px;">
        <div style="display: flex; transition: transform 0.5s ease;">
          <div style="min-width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;">Slide 1</div>
          <div style="min-width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;">Slide 2</div>
          <div style="min-width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600;">Slide 3</div>
        </div>
        <button style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; font-size: 20px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">←</button>
        <button style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; font-size: 20px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">→</button>
        <div style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
          <span style="width: 32px; height: 4px; background: white; border-radius: 2px;"></span>
          <span style="width: 32px; height: 4px; background: rgba(255,255,255,0.5); border-radius: 2px;"></span>
          <span style="width: 32px; height: 4px; background: rgba(255,255,255,0.5); border-radius: 2px;"></span>
        </div>
      </div>
    `,
  },

  // Image Compare (Before/After)
  {
    id: 'image-compare',
    label: 'Image Compare',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
    content: `
      <div class="image-compare" style="position: relative; max-width: 800px; margin: 40px auto; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
        <div style="position: relative; aspect-ratio: 16/9;">
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">Before</div>
          <div style="position: absolute; top: 0; left: 0; right: 50%; bottom: 0; overflow: hidden;">
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; width: 200%;">After</div>
          </div>
          <div style="position: absolute; top: 0; bottom: 0; left: 50%; width: 4px; background: white; transform: translateX(-50%); cursor: ew-resize; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">⟷</div>
          </div>
        </div>
      </div>
    `,
  },

  // Icon
  {
    id: 'icon',
    label: 'Icon',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
    content: `
      <div class="icon-block" style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; font-size: 32px;">
        ⭐
      </div>
    `,
  },

  // Avatar
  {
    id: 'avatar',
    label: 'Avatar',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="avatar" style="display: inline-block; text-align: center;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 600; margin: 0 auto;">JD</div>
        <p style="margin: 12px 0 4px; font-weight: 600; color: #1a1a1a; font-size: 16px;">John Doe</p>
        <p style="margin: 0; color: #64748b; font-size: 14px;">CEO & Founder</p>
      </div>
    `,
  },

  // Audio Player - Uses dynamic component with asset integration
  {
    id: 'audio-player',
    label: 'Audio Player',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><rect x="3" y="8" width="18" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="12" r="2" fill="currentColor"/><line x1="12" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/></svg>`,
    content: { type: 'audio-player' },
  },
];

export default mediaBlocks;
