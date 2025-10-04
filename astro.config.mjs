// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Haneru",
      favicon: "/favicon.svg",
      customCss: [
        // Path to your Tailwind base styles:
        "./src/styles/global.css",
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/haneru-io/haneru_site",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          autogenerate: { directory: "introduction" },
        },
        {
          label: "Shopify Basics",
          autogenerate: { directory: "shopify-basics" },
        },

        {
          label: "Store Management",
          autogenerate: { directory: "store-management-operations" },
        },
        {
          label: "Theme Development",
          autogenerate: { directory: "theme-development-foundations" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Resources",
          autogenerate: { directory: "resources" },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});