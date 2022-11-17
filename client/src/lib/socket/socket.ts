import io, { Socket } from 'socket.io-client';
import type { ClientToServerMap, ServerToClientsMap } from 'typings';

export const client: Socket<ServerToClientsMap, ClientToServerMap> = io(
	window.location.origin.replace('4000', '3000'),
	{ transports: ['websocket'] }, // fixes any cross-domain issues
);
