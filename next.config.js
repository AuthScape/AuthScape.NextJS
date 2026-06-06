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
    // Identity provider for the browser login flow. Endpoints are resolved from the issuer's
    // OIDC discovery document, so switching providers is just these values.
    //   OpenIddict (AuthScape IDP): authorityUri "https://localhost:44303", client_id "postman",
    //                               client_secret "postman-secret", oauthScope "openid profile email offline_access api1"
    //   Keycloak: authorityUri "http://localhost:8080/realms/authscape", a PUBLIC client_id, no secret.
    client_id: "authscape-spa",
    client_secret: "", // public PKCE client — no secret. (Confidential OpenIddict client would set this.)
    oauthScope: "openid profile email offline_access",
    apiUri: "http://localhost:54218",
    authorityUri: "http://localhost:8080/realms/authscape",
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