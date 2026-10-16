import { loadRootEnv } from '@iva360/shared/env'

loadRootEnv()

import { parseWebEnv } from '@iva360/shared/schemas'

parseWebEnv()

import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const cmsInternalUrl = process.env.CMS_INTERNAL_URL ?? 'http://localhost:3333'
const cmsImagePort = new URL(cmsInternalUrl).port || '3333'

/**
 * `next/image` разрешает картинки только с известных origin. Медиа CMS отдаётся
 * по `/api/media/file/**` и доступно как с origin сайта (rewrite), так и с
 * публичного origin CMS. Паттерны собираем из env, а не хардкодим порт.
 */
function mediaRemotePatterns(url: string | undefined) {
  if (!url) {
    return []
  }

  try {
    const parsed = new URL(url)

    return [
      {
        protocol: parsed.protocol.replace(':', '') as 'http' | 'https',
        hostname: parsed.hostname,
        ...(parsed.port ? { port: parsed.port } : {}),
        pathname: '/api/media/file/**',
      },
    ]
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.resolve(dirname, '../..'),
  agentRules: false, // не создавать AGENTS.md / CLAUDE.md
  env: {
    WEB_PORT: process.env.WEB_PORT ?? '3033',
  },
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3033', 'localhost:3333', '127.0.0.1:3033', '127.0.0.1:3333'],
    },
  },
  async rewrites() {
    return [
      // ВАЖНО: префикс /admin сохраняется намеренно. CMS запущена с
      // assetPrefix=/admin, поэтому её HMR-эндпоинт — /admin/_next/hmr, а не
      // /_next/hmr. Если убрать /admin в destination, HMR-сокет админки уходит
      // на несуществующий путь и навсегда висит в pending.
      {
        source: '/admin/_next/:path*',
        destination: `${cmsInternalUrl}/admin/_next/:path*`,
      },
      {
        source: '/admin/:path*',
        destination: `${cmsInternalUrl}/admin/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${cmsInternalUrl}/api/:path*`,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/api/media/file/**' }],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: cmsImagePort,
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: cmsImagePort,
        pathname: '/api/media/file/**',
      },
      ...mediaRemotePatterns(process.env.CMS_PUBLIC_URL),
      ...mediaRemotePatterns(process.env.WEB_PUBLIC_URL),
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: process.env.MINIO_API_PORT || '9002',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: process.env.MINIO_API_PORT || '9002',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['@iva360/shared'],
  turbopack: {
    root: path.resolve(dirname, '../..'),
  },
}

export default nextConfig
