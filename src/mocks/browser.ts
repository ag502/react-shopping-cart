import { setupWorker } from "msw";

import { cartHandler, orderHandler, productHandler } from "./handlers";

export const worker = setupWorker(...productHandler, ...cartHandler, ...orderHandler);
