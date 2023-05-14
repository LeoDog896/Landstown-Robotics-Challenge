import type { ClientToServerMap, ServerToClientsMap } from 'landstown-robotics-types';
import io, { type Socket } from 'socket.io-client';
import { writable } from 'svelte/store';
export const client: Socket<ServerToClientsMap, ClientToServerMap> = io(
	"raspberrypi.local:9000",
	{ transports: ['websocket'] }, // fixes any cross-domain issues
);

export const connected = writable(false);

client.on('connect', () => connected.set(true));

client.on('disconnect', () => connected.set(false));
