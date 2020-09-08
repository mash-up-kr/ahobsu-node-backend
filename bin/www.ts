import debug from 'debug';
import http from 'http';
import https from 'https';
import app from '../app';

debug('ahubsu-node:server');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

if (process.env.NODE_ENV === 'production') {
  const lex = require('greenlock-express').create({
    version: 'draft-11', // 버전2
    configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    approveDomains: (opts: { domains: string[]; email: string; agreeTos: boolean }, certs: any, cb: any) => {
      if (certs) {
        opts.domains = ['moti.company', 'www.moti.company'];
      } else {
        opts.email = 'lyh6425@gamil.com';
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000,
  });
  https
    .createServer(lex.httpsOptions, lex.middleware(app))
    .listen(process.env.SSL_PORT || 443, () =>
      console.log(`http://localhost:${process.env.SSL_PORT}, ${process.env.NODE_ENV}`),
    );
  http.createServer(lex.middleware(require('redirect-https')())).listen(process.env.PORT || 80);
} else {
  /**
   * Event listener for HTTP server "listening" event.
   */
  // const onListening = () => {
  //   const addr = server.address();
  //   const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  //   debug('Listening on ' + bind);
  // };

  const server = http.createServer(app);
  server.listen(process.env.PORT || port, () => console.log(`http://localhost:${port}, ${process.env.NODE_ENV}`));
  server.on('error', onError);
  // server.on('listening', onListening);
}

/**
 * Listen on provided port, on all network interfaces.
 */
