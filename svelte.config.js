// svelte.config.js
import adapter from '@sveltejs/adapter-static';
const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter({
      // GitHub Pages needs 404.html for SPA fallback
      fallback: '404.html'
    }),
    paths: {
      base: dev ? '' : '/quizz'   // ⬅️ repo name here
    }
  }
};
