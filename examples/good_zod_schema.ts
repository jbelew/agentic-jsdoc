// @ts-nocheck
// GOOD EXAMPLE - Zod Schema and TypeScript Interface Linkage

import { z } from "zod";

/**
 * Runtime validation schema for user payload creation.
 * 
 * Fails safely if the email is malformed or if the user is underage.
 * @see CreateUserPayload
 */
export const CreateUserSchema = z.object({
  /** The validated user email format. */
  email: z.string().email(),
  /** The age of the user, must be 18 or higher. */
  age: z.number().min(18),
});

/**
 * Compile-time representation of the `CreateUserSchema`.
 * 
 * Any structural changes to this interface MUST also be reflected in the Zod schema.
 * @see CreateUserSchema
 */
export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
