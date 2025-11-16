import adapter from '@sveltejs/adapter-vercel';
// const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter(),
    // paths: {
    //   base: dev ? '' : '/quizz'   // ⬅️ repo name here
    // },
  
  },
  //     server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   watch: {
  //     usePolling: true
  //   }
  // }
};
