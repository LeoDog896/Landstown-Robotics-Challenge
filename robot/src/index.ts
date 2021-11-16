import net from 'net'
import { logger } from './logger';

const server = net.createServer(() => {
    logger.info("Client connected")
})

server.on("data", data => {
    logger.info(data)
})

server.listen(9000, () => logger.info("Listening to incoming connections."))