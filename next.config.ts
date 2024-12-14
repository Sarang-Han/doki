/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: 프로덕션 환경에서는 권장하지 않습니다
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;
