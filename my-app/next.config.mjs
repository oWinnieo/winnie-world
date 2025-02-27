// /** @type {import('next').NextConfig} */

import path from 'path';

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
        '@styles': path.join(process.cwd(), 'styles'),
    };
    return config;
    },
};

export default nextConfig;