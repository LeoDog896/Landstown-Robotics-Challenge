import { Server } from "socket.io"
import { sendDataToSocket, rawDataToControllerData } from './control/controller.js';
import { logger } from "./logger.js"
import { controllerData, forward } from './control/position.js'
import { device } from './control/device.js'
import { env_data } from "./env.js" 
import equals from "fast-deep-equal"
import flyd from 'flyd'

/* The port. Default is 3000 */
const port = env_data.WEB_PORT | 3000

const io = new Server(port, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
})

/**
 * Starts the socket server
 */
export const start = async(): Promise<void> => {

	logger.debug("Attempting to start socket server.")
    
	io.on("connection", (socket) => {

		// The client has connected
		logger.info(`Client connected to web interface. (ID: ${socket.id})`)

		// Warn the server if the client has disconnected
		socket.on("disconnect", (reason) => {
			logger.info(`Client ${socket.id} disconnected from web interface: ${reason}`)
		})

		socket.on("forward", bool => {
			forward(bool)
		})
	});


  flyd.on(controller => {
    if (!controller) return

    controller.on("data", data => {
      const processedData = rawDataToControllerData(data)

      if (processedData === undefined) return

      if (equals(processedData, controllerData())) return

      sendDataToSocket(io, processedData)

      controllerData(processedData)
    });

    controller.on("error", () => {
      logger.warn("Device errored out.");

      device(undefined);
    })
	}, device);

	logger.info(`Socket listening to ${port}`);
}
