import { Hono } from "hono";
import { logger } from "hono/logger";
import { sValidator } from "@hono/standard-validator";

import { getEffectivenessResponse } from "./effectiveness";
import {
  EffectivenessRequest,
  EffectivenessRequestSchema,
  EffectivenessResponse,
  EffectivenessResponseSchema,
} from "./schema";

const app = new Hono();

app.use(logger());

app.post(
  "/pokemon/effectiveness",
  sValidator("json", EffectivenessRequestSchema),
  async (c) => {
    const { pokemon }: EffectivenessRequest = await c.req.json();

    const response = getEffectivenessResponse(pokemon);
    const result = EffectivenessResponseSchema.safeParse(response);

    return result.success
      ? c.json<EffectivenessResponse>(result.data)
      : c.text("Internal Server Error", 500);
  },
);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT ?? 4001,
};
