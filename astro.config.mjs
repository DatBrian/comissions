// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["tailwind-animations"],
		},
	},
	env: {
		schema: {
			ORDER_LIST: envField.string({
				context: "client",
				access: "public",
			}),
		},
	},
});
