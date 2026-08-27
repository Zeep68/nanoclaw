import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // De site staat in een submap van de nanoclaw-repo, die zelf ook een lockfile
  // heeft; zonder dit kiest Next.js de verkeerde workspace root.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
}

export default nextConfig
