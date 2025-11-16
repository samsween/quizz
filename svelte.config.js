import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  kit: {
    adapter: adapter({
      runtime: "nodejs22.x"
    }),
       alias: {
      $lib: './src/lib'
    }
  },
    plugins: [sveltekit()]
};
