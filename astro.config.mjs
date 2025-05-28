// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Haneru",
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
          items: [
            { label: "Getting Started", slug: "introduction/getting-started" },
          ],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Your First Store", slug: "guides/first-store" },
            {
              label: "Shopify Store Setup",
              slug: "guides/shopify-store-setup",
            },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
