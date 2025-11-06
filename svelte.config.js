import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev'); // true on `npm run dev`

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // create a SPA fallback so refresh/deep links like /quiz/ethernet work
      fallback: '200.html'
    }),
    // if you’re deploying to https://USERNAME.github.io/REPO, set a base path:
    paths: {
      base: dev ? '' : '/quizz' // <<< change to your repo name
    }
  }
};

export default config;
