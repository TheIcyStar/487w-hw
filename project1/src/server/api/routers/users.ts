import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const swipeRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            }
        }),

    create: publicProcedure
        .input(z.object({ userId: z.number() }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.swipeLog.create({
                data: {
                    userId: input.userId
                }
            })

        // return ctx.db.post.create({
        //     data: {
        //         name: input.name,
        //     },
        //     })
        // }),
        }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
        const swipes = await ctx.db.swipeLog.findMany()

        return swipes ?? null
    }),
})