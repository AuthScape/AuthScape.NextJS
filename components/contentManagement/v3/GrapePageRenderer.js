/**
 * GrapeJS Page Renderer for AuthScape CMS
 *
 * This component renders GrapeJS content with full SSR support for SEO.
 * It takes the saved HTML and CSS from GrapeJS and renders them as static content.
 *
 * Key features:
 * - Full SSR support (server-side rendering for SEO)
 * - Scoped CSS to prevent style leakage
 * - Clean HTML output for search engines
 * - Support for both GrapeJS format and legacy Puck format
 */

import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';

/**
 * Sanitize and scope CSS to prevent style leakage
 * @param {string} css - Raw CSS from GrapeJS
 * @param {string} scopeId - Unique scope ID
 * @returns {string} Scoped CSS
 */
function scopeCSS(css, scopeId) {
  if (!css) return '';

  // Add scope to all selectors
  return css.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g, (match, selector, delimiter) => {
    // Skip @rules like @media, @keyframes, etc.
    if (selector.trim().startsWith('@')) {
      return match;
    }

    // Skip :root selector
    if (selector.trim() === ':root') {
      return match;
    }

    // Add scope to selector
    const scopedSelector = selector
      .split(',')
      .map((s) => {
        const trimmed = s.trim();
        if (trimmed.startsWith('body') || trimmed.startsWith('html')) {
          return `#${scopeId} ${trimmed.replace(/^(body|html)/, '')}`.trim();
        }
        return `#${scopeId} ${trimmed}`;
      })
      .join(', ');

    return scopedSelector + delimiter;
  });
}

/**
 * Parse GrapeJS content format
 * Handles both new GrapeJS format and potential legacy formats
 */
function parseContent(content) {
  if (!content) {
    return { html: '', css: '' };
  }

  // If content is a string, try to parse it as JSON
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (e) {
      // If it's not valid JSON, treat it as raw HTML
      return { html: content, css: '' };
    }
  }

  // GrapeJS format: { html, css, components, styles, ... }
  if (content.html !== undefined) {
    return {
      html: content.html || '',
      css: content.css || '',
    };
  }

  // Legacy Puck format: { data: { root, content, zones } }
  if (content.data) {
    // Return empty for Puck format - it should be rendered by RenderCustomPage
    return { html: '', css: '', isPuckFormat: true };
  }

  return { html: '', css: '' };
}

/**
 * GrapeJS Page Renderer Component
 *
 * @param {Object} props
 * @param {Object|string} props.content - GrapeJS content (html/css) or JSON string
 * @param {string} props.pageId - Unique page ID for CSS scoping
 * @param {string} props.className - Additional CSS class
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.includeDefaultStyles - Include default font styles
 */
export function GrapePageRenderer({
  content,
  pageId,
  className = '',
  style = {},
  includeDefaultStyles = true,
}) {
  const scopeId = `grape-page-${pageId || 'default'}`;

  const { html, css, isPuckFormat } = useMemo(() => parseContent(content), [content]);

  const scopedCSS = useMemo(() => scopeCSS(css, scopeId), [css, scopeId]);

  // If this is Puck format, return null and let RenderCustomPage handle it
  if (isPuckFormat) {
    return null;
  }

  // If no HTML content, return empty
  if (!html) {
    return null;
  }

  const defaultStyles = includeDefaultStyles
    ? `
      #${scopeId} {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      #${scopeId} img {
        max-width: 100%;
        height: auto;
      }
      #${scopeId} a {
        color: #1976d2;
        text-decoration: none;
      }
      #${scopeId} a:hover {
        text-decoration: underline;
      }
    `
    : '';

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `${defaultStyles}\n${scopedCSS}`,
        }}
      />
      <Box
        id={scopeId}
        className={`grape-page-content ${className}`}
        style={style}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

/**
 * Helper function to extract text content for SEO meta description
 * @param {Object|string} content - GrapeJS content
 * @param {number} maxLength - Maximum length of extracted text
 * @returns {string} Plain text content
 */
export function extractTextContent(content, maxLength = 160) {
  const { html } = parseContent(content);
  if (!html) return '';

  // Strip HTML tags and get plain text
  const textContent = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (textContent.length <= maxLength) {
    return textContent;
  }

  return textContent.substring(0, maxLength - 3) + '...';
}

/**
 * Check if content is in GrapeJS format
 * @param {Object|string} content - Content to check
 * @returns {boolean} True if GrapeJS format
 */
export function isGrapeJSContent(content) {
  if (!content) return false;

  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (e) {
      return false;
    }
  }

  // GrapeJS format has html property
  return content.html !== undefined;
}

/**
 * Convert GrapeJS content to clean HTML for static export
 * @param {Object|string} content - GrapeJS content
 * @returns {string} Clean HTML document
 */
export function toStaticHTML(content) {
  const { html, css } = parseContent(content);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    a {
      color: #1976d2;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
}

export default GrapePageRenderer;
