import { createZodHistoryAdapter } from "./history.js";
import { prisma } from "../../index.js";
import { z } from "zod";

export const userHistorySchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  job: z.string(),
});

export const userHistoryAdapter = createZodHistoryAdapter({
  schema: userHistorySchema,

  getCurrent: (id) => prisma.user.findUnique({ where: { id } }),

  getLatestVersion: async (id) => {
    const latest = await prisma.user_History.findFirst({
      where: { entity_id: id },
      orderBy: { version: "desc" },
    });
    return latest?.version ?? 0;
  },

  getLatestSnapshot: async (id) => {
    const latest = await prisma.user_History.findFirst({
      where: { entity_id: id },
      orderBy: { version: "desc" },
    });

    return latest
      ? {
          firstname: latest.firstname,
          lastname: latest.lastname,
          job: latest.job,
        }
      : null;
  },

  createHistory: (id, data) =>
    prisma.user_History.create({
      data: {
        entity_id: id,
        ...data,
      },
    }),
});
