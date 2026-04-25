import { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

if (!process.env.S3_ENDPOINT) {
  throw new Error("S3_ENDPOINT is not defined");
}

const endpointUrl = new URL(process.env.S3_ENDPOINT);

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
