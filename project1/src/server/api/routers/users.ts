import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const userRouter = createTRPCRouter({
    upsert: publicProcedure
        .input(z.object({ 
            userId: z.number(),
            role: z.string(),
            active: z.boolean(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.upsert({
                where: { id: input.userId },
                create: { 
                    id: input.userId,
                    role: input.role,
                    active: input.active
                },
                update: {
                    role: input.role,
                    active: input.active
                }
            })
        }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.db.user.findMany()

        return users ?? null
    }),
})