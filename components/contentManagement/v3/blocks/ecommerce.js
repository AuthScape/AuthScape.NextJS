/**
 * E-commerce Blocks for GrapeJS Editor
 *
 * Marketplace embeds, shopping carts, and e-commerce components
 */

export const ecommerceBlocks = [
  // Marketplace - Uses dynamic component with Lucene search integration
  {
    id: 'marketplace-embed',
    label: 'Marketplace',
    category: 'E-commerce',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 22V12h6v10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: { type: 'marketplace-embed' },
  },

  // Shopping Cart
  {
    id: 'shopping-cart',
    label: 'Shopping Cart',
    category: 'E-commerce',
    media: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><circle cx="9" cy="21" r="1" fill="currentColor"/><circle cx="20" cy="21" r="1" fill="currentColor"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    content: `
      <div class="shopping-cart" style="max-width: 500px; margin: 20px auto; background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
          <h3 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">🛒</span> Shopping Cart
            <span style="margin-left: auto; padding: 4px 12px; background: #667eea; color: white; border-radius: 20px; font-size: 13px;">3 items</span>
          </h3>
        </div>

        <div style="padding: 20px;">
          <div style="display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; flex-shrink: 0;"></div>
            <div style="flex: 1;">
              <h4 style="font-size: 15px; font-weight: 600; color: #1a1a1a; margin: 0 0 4px;">Product Name</h4>
              <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Size: M, Color: Blue</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="font-weight: 600; color: #667eea; margin: 0;">$49.99</p>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <button style="width: 28px; height: 28px; background: #f1f5f9; border: none; border-radius: 6px; cursor: pointer;">−</button>
                  <span style="font-weight: 500; min-width: 20px; text-align: center;">2</span>
                  <button style="width: 28px; height: 28px; background: #f1f5f9; border: none; border-radius: 6px; cursor: pointer;">+</button>
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; flex-shrink: 0;"></div>
            <div style="flex: 1;">
              <h4 style="font-size: 15px; font-weight: 600; color: #1a1a1a; margin: 0 0 4px;">Another Item</h4>
              <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Size: L, Color: Pink</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="font-weight: 600; color: #667eea; margin: 0;">$29.99</p>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <button style="width: 28px; height: 28px; background: #f1f5f9; border: none; border-radius: 6px; cursor: pointer;">−</button>
                  <span style="font-weight: 500; min-width: 20px; text-align: center;">1</span>
                  <button style="width: 28px; height: 28px; background: #f1f5f9; border: none; border-radius: 6px; cursor: pointer;">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 20px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748b;">Subtotal</span>
            <span style="font-weight: 500; color: #1a1a1a;">$129.97</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748b;">Shipping</span>
            <span style="font-weight: 500; color: #10b981;">Free</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 16px; border-top: 1px solid #e2e8f0; margin-top: 8px;">
            <span style="font-weight: 600; color: #1a1a1a;">Total</span>
            <span style="font-size: 20px; font-weight: 700; color: #1a1a1a;">$129.97</span>
          </div>
          <button style="width: 100%; margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 12px; color: white; font-size: 16px; font-weight: 600; cursor: pointer;">Proceed to Checkout</button>
        </div>
      </div>
    `,
  },
];

export default ecommerceBlocks;
