import http from 'http'
import app from './app';

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 3000, () => console.info(`API on port ${process.env.PORT || 3000}`))