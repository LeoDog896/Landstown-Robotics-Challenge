import { Server } from "socket.io";
import { logger } from './logger.js'
import flyd from 'flyd'
import { ControllerData, controllerData, defaultControllerData, forward } from './control/position.js';
const port = 9000

const controllerDelay = 20

/** Starts the robot server with socket.io. */
export async function start(): Promise<void> {
	const robot = new Server(port);

	let lastChange = new Date();

	// Emit any change that occurs to the position variable
	flyd.on(change => {
		if (new Date().getTime() - lastChange.getTime() > controllerDelay) {
			if (forward()) {
				const data: ControllerData = {
					...defaultControllerData,
					position: {
						x: 50,
						y: 100
					}
				}

				robot.emit("controllerData", data)
			} else {
				robot.emit("controllerData", JSON.stringify(change))
			}
			lastChange = new Date();
		}
	}, controllerData)

	robot.on("connection", robotClient => {
		logger.info(`Robot connected! ID: ${robotClient.id}`)

		robotClient.on("close", () => logger.warn("Robot disconected."))
		robotClient.on("error", error => logger.warn("An exception with the robot has occured: " + error))
	})

	// Handle any conenction errors
	robot.engine.on("connection_error", (err: { message: string }) => logger.warn(err.message))

	logger.info(`Robot ready to connected at port ${port}.`)
}
