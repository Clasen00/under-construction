#!/usr/bin/env node
/**
 * Загружает логотип в коллекцию media. Нужны запущенные CMS и MinIO.
 * После этого: pnpm db:backup
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cmsUrl = process.env.CMS_INTERNAL_URL ?? 'http://localhost:3333'
const email = process.env.CMS_SEED_EMAIL ?? 'demo@example.ru'
const password = process.env.CMS_SEED_PASSWORD ?? 'demo'
const logoPath = path.join(root, 'scripts/seed-assets/iva360-logo.svg')

async function login() {
  const response = await fetch(`${cmsUrl}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = await response.json()
  if (!response.ok || !json.token) {
    throw new Error(`Login failed: ${response.status} ${JSON.stringify(json)}`)
  }
  return json.token
}

async function uploadLogo(token) {
  const svg = fs.readFileSync(logoPath)
  const form = new FormData()
  form.append('file', new Blob([svg], { type: 'image/svg+xml' }), 'iva360-logo.svg')
  form.append('_payload', JSON.stringify({ alt: 'Logo' }))

  const response = await fetch(`${cmsUrl}/api/media?locale=ru`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: form,
  })
  const json = await response.json()
  if (!response.ok || !json.doc?.id) {
    throw new Error(`Media upload failed: ${response.status} ${JSON.stringify(json)}`)
  }
  return json.doc.id
}

const token = await login()
const logoId = await uploadLogo(token)
console.log(`✓ Seeded logo (${logoId})`)
