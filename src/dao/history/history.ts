import { OperationType } from "@prisma/client";
import { isEqual } from "lodash-es";
import { z } from "zod";

interface HistoryAdapterOptions<T, TSnapshot> {
  getCurrent: (id: bigint) => Promise<T | null>;
  getLatestVersion: (id: bigint) => Promise<number>;
  getLatestSnapshot: (id: bigint) => Promise<Partial<T> | null>;
  createHistory: (id: bigint, data: TSnapshot & HistoryMeta) => Promise<any>;
  schema: z.ZodType<TSnapshot>;
}

export function createZodHistoryAdapter<T, TSnapshot>(
  opts: HistoryAdapterOptions<T, TSnapshot>,
) {
  return {
    getCurrent: opts.getCurrent,
    getLatestVersion: opts.getLatestVersion,
    getLatestSnapshot: opts.getLatestSnapshot,
    createHistory: opts.createHistory,
    pickFields: (data: T): TSnapshot => opts.schema.parse(data),
  };
}

export interface HistoryMeta {
  version: number;
  operation: OperationType;
  changedBy: string;
  changedAt: Date;
}

export interface EntityHistoryAdapter<T> {
  getCurrent: (id: bigint) => Promise<T | null>;
  getLatestVersion: (id: bigint) => Promise<number>;
  getLatestSnapshot: (id: bigint) => Promise<Partial<T> | null>;
  createHistory: (id: bigint, data: T & HistoryMeta) => Promise<any>;
  pickFields: (data: T) => Partial<T>; // Optional: nur relevante Felder extrahieren
}

export async function createEntityHistory<T>(
  adapter: EntityHistoryAdapter<T>,
  entityId: bigint,
  changedBy: string,
): Promise<void> {
  let operation: OperationType;
  const current = await adapter.getCurrent(entityId);
  console.log("current: ", current);
  if (!current) throw new Error("Entity not found");

  const latestVersion = await adapter.getLatestVersion(entityId);
  const version = latestVersion + 1;
  const changedAt = new Date();

  const currentSnapshot = adapter.pickFields(current);

  if (version > 1) {
    const previous = await adapter.getLatestSnapshot(entityId); // oder separater getLatestSnapshot()?
    console.log("previous: ", previous);
    const previousSnapshot = adapter.pickFields(previous as T);

    if (isEqual(currentSnapshot, previousSnapshot)) {
      return; // Keine Änderung → keine neue History
    }
    operation = OperationType.update;
  } else {
    operation = OperationType.create;
  }

  await adapter.createHistory(entityId, {
    ...currentSnapshot,
    version,
    operation,
    changedBy,
    changedAt,
  } as T & HistoryMeta);
}
