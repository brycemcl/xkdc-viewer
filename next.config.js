const withPWA = require('next-pwa')
//https://github.com/shadowwalker/next-pwa/blob/master/cache.js
const caches = [
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
    },
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-font-assets',
    },
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-image-assets',
    },
  },
  {
    urlPattern: /\/_next\/image\?url=.+$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'next-image',
    },
  },
  {
    urlPattern: /\.(?:mp3|mp4)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-media-assets',
    },
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-js-assets',
    },
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-style-assets',
    },
  },
  {
    urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'next-data',
    },
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-data-assets',
    },
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin
      if (!isSameOrigin) return false
      const pathname = url.pathname
      // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without impact other environment
      // Above route is default for next-auth, you may need to change it if your OAuth workflow has a different callback route
      // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
      if (pathname.startsWith('/api/auth/')) return false
      if (pathname.startsWith('/api/')) return true
      return false
    },
    handler: 'CacheFirst',
    method: 'GET',
    options: {
      cacheName: 'apis',
    },
  },
  {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin
      if (!isSameOrigin) return false
      const pathname = url.pathname
      if (pathname.startsWith('/api/')) return false
      return true
    },
    handler: 'CacheFirst',
    options: {
      cacheName: 'others',
    },
  },
]

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  experimental: {
    optimizeFonts: true,
  },
  pwa: {
    dest: 'public',
    runtimeCaching: caches,
  },
})
