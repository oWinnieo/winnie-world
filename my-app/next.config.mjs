// /** @type {import('next').NextConfig} */

import path from 'path';
// import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // outputDir: './dist'
    // output: 'export'
    sassOptions: {
    // 配置 Sass 文件的搜索路径
    includePaths: [path.join(process.cwd(), 'styles')],
    },
    webpack: (config) => {
        // 添加路径别名
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname), // ✅ 指向根目录
            // 如果你将 src/ 作为主要目录，也可以改成 path.resolve(__dirname, 'src')。
            '@styles': path.join(process.cwd(), 'styles'),
        };
        return config;
    },
    eslint: {
        // 禁用 ESLint 检查
        ignoreDuringBuilds: true
    },
    rewrites: async () => {
        return [
        ]
    }

};

export default nextConfig;