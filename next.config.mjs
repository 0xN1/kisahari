/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
      mongodb$: false,
      fs: false,
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
  output: "export",
};

export default nextConfig;
