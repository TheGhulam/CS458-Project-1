import { z } from "zod"
import { ObjectId } from "bson"

export const UserRegistrationSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(1).max(100),
})

export type UserRegistrationSchemaType = z.infer<typeof UserRegistrationSchema>