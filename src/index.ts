import { app } from './app';
import config from './config/index';
import { sequelize } from './loaders/postgresdb';
import { terminate } from './utils/terminateServer';
import { redis } from './loaders/redis';

const PORT = config.apiPort || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
}).on('close', async () => {
    await sequelize.close();
    console.log('SQL connection closed');
    await redis.quit();
    console.log('Redis connection closed');
});

const exitHandler = terminate(server);

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
