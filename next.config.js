//    - Next.js 配置文件，用于配置 Next.js 框架的行为，例如设置自定义构建选项、插件、环境变量等。
//文件配置用于定制 Next.js 应用的行为。它集成了多个插件，并设置了安全性头部，Webpack 配置以及其他 Next.js 相关配置
const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
//以上是插件配置,withContentlayer 和 withBundleAnalyzer 插件分别用于集成 Contentlayer 和捆绑分析功能。withBundleAnalyzer 插件会根据环境变量 ANALYZE 的值来决定是否启用。

//以下是内容安全策略,定义Content Security Policy)CSP 规则用于指定哪些资源可以加载和执行，提供额外的安全性。
// You might need to insert additional domains in script-src if you are using external services.如果您使用外部服务，则可能需要在 script-src 中插入其他域
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`

//定义了一组安全 HTTP 头部,用于提高网站的安全性：
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
//nodejs配置导出:
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  //插件使用:使用 withContentlayer 和 withBundleAnalyzer 插件，集成了 Contentlayer 和捆绑分析功能。
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,//启用 React 严格模式，有助于发现潜在问题。
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],//指定 Next.js 应该处理的页面文件扩展名。
    eslint: {
      //指定 ESLint 应该检查的目录。
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    images: {
      //配置允许加载的远程图像域。
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
    },
    async headers() {
      //配置 HTTP 头，应用于所有路由。
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    webpack: (config, options) => {
      //添加了对 SVG 文件的处理，使用 @svgr/webpack 来加载 SVG 文件。
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  })
}

