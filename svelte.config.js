import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter(),
       alias: {
      $lib: './src/lib'
    }
    // paths: {
    //   base: dev ? '' : '/quizz'   // ⬅️ repo name here
    // },
  
  },
    plugins: [sveltekit()]
  //     server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   watch: {
  //     usePolling: true
  //   }
  // }
};
