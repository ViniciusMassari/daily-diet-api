import { app } from './app';

app
  .listen({
    // apenas para deploy
    // host: 'localhost',
    port: 3333,
  })
  .then(() => console.log('HTTP server running 🚀'));
