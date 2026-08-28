/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Statische export: `next build` schrijft de hele site naar out/, zodat
  // Netlify geen serverless functies nodig heeft.
  output: 'export',
}

export default nextConfig
