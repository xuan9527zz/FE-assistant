import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${basePath}/`,
    name: "FE Assistant · 招募规划册",
    short_name: "FE Assistant",
    description: "万缕千丝角色资料、礼物喜好与四路线招募规划",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#17394a",
    lang: "zh-CN",
    icons: [
      { src: `${basePath}/app-icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${basePath}/app-icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${basePath}/app-icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
