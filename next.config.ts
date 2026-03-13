import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

// 保证 next.config 所在目录（即本项目 Night）作为解析根目录
const projectRoot = path.dirname(
  typeof __dirname !== "undefined" ? __dirname : fileURLToPath(import.meta.url)
);

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // 强制以本项目为根目录，避免在父目录 D:\workspace\mycode 解析
    root: projectRoot,
    resolveAlias: {
      tailwindcss: path.join(projectRoot, "node_modules", "tailwindcss"),
    },
  },
  webpack: (config) => {
    const projectNodeModules = path.join(projectRoot, "node_modules");
    config.resolve.modules = [
      projectNodeModules,
      ...(config.resolve.modules || []),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(projectRoot, "node_modules", "tailwindcss"),
    };
    return config;
  },
};

export default nextConfig;
