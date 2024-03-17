import { initTRPC } from '@trpc/server';
import { ControllerDataSchema } from './controller.js';
import debounce from 'debounce';
import { observable } from '@trpc/server/observable';
import { TypedEmitter } from 'tiny-typed-emitter';
import { Motor } from './motor.js';
import { accelerationDataScheme, type AccelerationData } from './simulationMonitor.js';
import type { ControllerData } from './controller.js';
import type { MotorEvent } from './motor.js';

type Events = {
	controllerData: (data: ControllerData) => void;
	motorData: (data: MotorEvent) => void;
	simulationAccelData: (data: AccelerationData) => void;
};

const emitter = new TypedEmitter<Events>();

const t = initTRPC.create();

const isMock = process.env.MOCK === 'true';

function updateSimulationAccelerationData(data: AccelerationData) {
	emitter.emit('simulationAccelData', data);
	console.log(data)
}

function updateControllerData(data: ControllerData) {
	emitter.emit('controllerData', data);
}

// TODO: on sigint, stop all motors

emitter.on('controllerData', (data) => {
	emitter.emit('motorData', {
		motor: Motor.BottomLeft,
		speed: data.stickAxes.leftStick.x
	});

	emitter.emit('motorData', {
		motor: Motor.BottomRight,
		speed: data.stickAxes.leftStick.x
	});

	emitter.emit('motorData', {
		motor: Motor.TopLeft,
		speed: data.stickAxes.leftStick.y
	});

	emitter.emit('motorData', {
		motor: Motor.TopRight,
		speed: data.stickAxes.leftStick.y
	});

	// TODO: up and down - need to figure out view
	let verticalSpeed = 0;
	if (data.stickButtons.leftStick) {
		verticalSpeed = 1;
	} else if (data.stickButtons.rightStick) {
		verticalSpeed = -1;
	}
	emitter.emit('motorData', {
		motor: Motor.VerticalLeft,
		speed: verticalSpeed
	});

	// TODO: yaw (rotation)
	// TODO: camera position (throttle)
});

export const router = t.router({
	simulationAccelerationData: t.procedure.input(accelerationDataScheme).mutation(({ input }) => {
		updateSimulationAccelerationData(input);
		return input;
	}),
	controllerData: t.procedure.input(ControllerDataSchema).mutation(({ input }) => {
		debounce(updateControllerData, 50)(input);
		return input;
	}),
	motorEvent: t.procedure.subscription(() => {
		return observable<MotorEvent>((emit) => {
			const onAdd = (data: MotorEvent) => emit.next(data);

			emitter.on('motorData', onAdd);

			return () => {
				emitter.off('motorData', onAdd);
			};
		});
	})
});

export type RobotRouter = typeof router;
