import adapter from '@sveltejs/adapter-node';
const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/quizz'
    }
  }
};
