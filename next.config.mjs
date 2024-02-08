/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
      mongodb$: false,
    };

    return config;
  },

  experimental: {
    serverComponentsExternalPackages: [
      //   "llamaindex",
      "onnxruntime-node",
      "sharp",
      "mongodb",
    ],
    outputFileTracingIncludes: {
      "/*": ["./cache/**/*"],
    },
  },
};

export default nextConfig;
