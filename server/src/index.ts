import { start as startWebsite } from './socket.js';
import { start as startRobot } from './robot.js';
import consola from 'consola';

consola.success('Server starting!');

startWebsite();
startRobot();
