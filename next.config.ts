import { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const s3Endpoint = process.env.S3_ENDPOINT;

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    contentDispositionType: "inline",
    remotePatterns: s3Endpoint
      ? [
          {
            protocol: "https",
            hostname: new URL(s3Endpoint).hostname,
            port: "",
            pathname: "/**",
          },
        ]
      : [],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
