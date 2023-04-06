import { z } from 'zod'

export const NameSharedSchema = z.string().min(1).max(255)
export const defaultUUIDSharedSchema = z.string().uuid()


export const CreateOrganizationSharedSchema = z.object({ name: z.string().min(1).max(255) })
export type CreateOrganizationSharedDtoType = z.infer<typeof CreateOrganizationSharedSchema>