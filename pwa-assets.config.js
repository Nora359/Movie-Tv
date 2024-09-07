import { defineConfig } from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, "favicon.ico"]],
    },
    maskable: {
      sizes: [512],
      resizeOptions: {
        background: "#000000",
      },
    },
    apple: {
      sizes: [180],
      resizeOptions: {
        background: "#000000", 
      },
    },
  },
  images: ["public/logo.svg"], 
  manifest: {
    background_color: "#000000", 
  },
});
