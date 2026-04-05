iimport type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 强制 Vercel 在构建时忽略代码洁癖警告
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 强制 Vercel 忽略类型检查错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;