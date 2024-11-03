import type { Prisma } from '@prisma/client'
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const requestsRouter = createTRPCRouter({
    create: publicProcedure
    .input(
        z.object({
            apartment: z.number(),
            area: z.string(),
            description: z.string(),
            imageURI: z.string()
        })
    )
    .query(async ({ ctx, input }) => {
        await ctx.db.request.create({
            data: {
                apartment: input.apartment,
                area: input.area,
                description: input.description,
                imageURI: input.imageURI
            }
        })
        console.log("Created a maintenance request")
    }),

    setStatus: publicProcedure
    .input(
        z.object({
            id: z.number(),
            status: z.enum(["PENDING", "COMPLETED"])
        })
    )
    .query(async ({ ctx, input }) => {
        await ctx.db.request.update({
            where: { id: input.id },
            data: { status: input.status }
        })
        console.log("Set request status")
    }),
})