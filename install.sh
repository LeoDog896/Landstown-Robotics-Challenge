#!/bin/sh

npm i -g pnpm
pnpm i -g request node-pre-gyp # necessary for mocking
(cd client && sudo rm -rf node_modules && pnpm install)
(cd server && sudo rm -rf node_modules && pnpm install)
