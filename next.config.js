const path = require('path'); // Import the path module

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')], // Use path.join correctly
  },
  images: {
    domains: ["localhost:3000"],
  },
  devIndicators: false,
  env: {
    companyName: "AuthScape",
    logo: "",
    stripePublicKey: "",
    stage: "development",
    googleAnalytics4: "",
    microsoftClarityTrackingCode: "",
    client_id: "postman",
    client_secret: "postman-secret",
    apiUri: "http://localhost:54218",
    authorityUri: "https://localhost:44303",
    cookieDomain: "localhost",
    enableOEMClient: "false",
    enableDatabaseAnalytics: "true",
    fallbackImageSrc: "/NoPhotoAvailable.jpg",
    websiteBaseUri: "http://localhost:3000",
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
  output: "standalone",
});