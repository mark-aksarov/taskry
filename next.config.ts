import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

if (!process.env.S3_ENDPOINT) {
  throw new Error("S3_ENDPOINT is not defined");
}

const endpointUrl = new URL(process.env.S3_ENDPOINT);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: endpointUrl.hostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
