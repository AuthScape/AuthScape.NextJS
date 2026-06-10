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
  webpack: (config) => {
    // The local `authscape` package is linked via a `file:` symlink during development.
    // By default webpack resolves that symlink to its real path (AuthScape.NextJS_NPM/...),
    // which makes the package's bare imports (e.g. @mui/material, @microsoft/signalr) resolve
    // from the linked source's tree — where they don't exist — instead of this app's node_modules.
    // Disabling symlink resolution keeps the node_modules/authscape path so those peer deps
    // resolve against THIS app's node_modules, where they're installed.
    config.resolve.symlinks = false;
    // Force a SINGLE React/React-DOM instance. The linked `authscape` package ships its own
    // react copy in its node_modules; without this, its components load a second React and
    // every hook throws "Cannot read properties of null (reading 'useState')". Aliasing pins
    // all react resolutions to THIS app's copy. (react is really a peer dep of the package.)
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
    };
    // webpack caches node_modules by package VERSION and assumes they never change. The linked
    // `authscape` is always v1.0.782, so rebuilds of its index.js would be ignored (stale module
    // served from cache). Exclude authscape from "managed paths" so webpack snapshots it by content
    // and actually picks up `npm run build` output during development.
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/](?!authscape[\\/])(@.+?[\\/])?.+?)[\\/]/],
    };
    return config;
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