import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite(),
		Unfonts({
			google: {
				families: ["Inter:wght@100..900"],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('shiki') || id.includes('rehype-pretty-code')) {
						return 'syntax-highlight';
					}
					if (id.includes('lucide-react')) {
						return 'icons';
					}
					if (id.includes('class-variance-authority') || id.includes('clsx')) {
						return 'styling';
					}
					if (id.includes('mdx')) {
						return 'mdx-runtime';
					}
				}
			}
		}
	}
});
