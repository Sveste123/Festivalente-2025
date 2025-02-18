import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['postprocessing', 'three', 'troika-three-text']
		
	},
	server: {
		fs: {
			allow: [
				'./static', // Allow access to the static folder
				'./src'     // Default access to the src folder
			]
		}
	}
});
