import { loadRootEnv } from '@iva360/shared/env'

loadRootEnv()

import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const cmsSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

// Значение задаётся в npm-скрипте без ведущего слэша (CMS_ADMIN_ASSET_PREFIX=admin),
// потому что Git Bash (MSYS2) под Windows переписывает аргументы вида
// CMS_ADMIN_ASSET_PREFIX=/admin в C:/Program Files/Git/admin. Из-за этого ломается
// assetPrefix админки и она навсегда остаётся на «Загрузка...». Слэш добавляем здесь.
function normalizeAssetPrefix(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) {
    return undefined
  }
  // Уже корневой путь (/admin) или абсолютный URL (https://cdn.example.com) — не трогаем.
  if (trimmed.startsWith('/') || /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `/${trimmed}`
}

const cmsAdminAssetPrefix = normalizeAssetPrefix(process.env.CMS_ADMIN_ASSET_PREFIX)

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.resolve(dirname, '../..'),
  agentRules: false, // не создавать AGENTS.md / CLAUDE.md
  ...(cmsAdminAssetPrefix ? { assetPrefix: cmsAdminAssetPrefix } : {}),
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3033', 'localhost:3333', '127.0.0.1:3033', '127.0.0.1:3333'],
    },
  },
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['@aws-sdk/client-s3'],
  async rewrites() {
    if (!cmsAdminAssetPrefix) {
      return []
    }

    return [
      {
        source: `${cmsAdminAssetPrefix}/_next/:path*`,
        destination: '/_next/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: cmsSecurityHeaders,
      },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  transpilePackages: ['@iva360/shared'],
  turbopack: {
    root: path.resolve(dirname, '../..'),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
