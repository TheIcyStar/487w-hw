import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const swipeRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ userId: z.number() }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.swipeLog.create({
                data: {
                    userId: input.userId
                }
            })
        }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
        const swipes = await ctx.db.swipeLog.findMany()

        return swipes ?? null
    }),
})