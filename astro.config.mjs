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
        {
          label: "Integrations",
          items: [
            {
              label: "Google Sheets → Shopify Pricing",
              collapsed: false,
              items: [
                // Add the 'label' property to override the raw slug name
                {
                  label: "Overview",
                  slug: "integrations/google-sheets-pricing",
                },
                {
                  label: "Part 1",
                  slug: "integrations/google-sheets-pricing/part-1",
                },
                {
                  label: "Part 2",
                  slug: "integrations/google-sheets-pricing/part-2",
                },
                {
                  label: "Part 3",
                  slug: "integrations/google-sheets-pricing/part-3",
                },
                {
                  label: "Part 4",
                  slug: "integrations/google-sheets-pricing/part-4",
                },
              ],
            },
          ],
        },
        {
          label: "About",
          items: [{ label: "About Haneru", slug: "about" }],
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
