import type { Prisma } from '@prisma/client'
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

    getLatest: publicProcedure
    .input(
        z.object({
            userId: z.number().optional(),
            startDateTime: z.string().optional(),
            endDateTime: z.string().optional(),
        })
    )
    .query(async ({ ctx, input }) => {
        const findManyArgs: Prisma.SwipeLogFindManyArgs = {where: {}}

        //Filter by date range
        if(input.startDateTime && input.endDateTime){
            findManyArgs.where!.createdAt = {
                gte: new Date(input.startDateTime),
                lte: new Date(input.endDateTime)
            }
        
        //Filter with start date only
        } else if(input.startDateTime){
            findManyArgs.where!.createdAt = {
                gte: new Date(input.startDateTime)
            }
        
        //Filter with end date only
        } else if(input.endDateTime){
            findManyArgs.where!.createdAt = {
                lte: new Date(input.endDateTime)
            }
        }

        //Add a userid filter
        if(input.userId){
            findManyArgs.where!.userId = {
                equals: input.userId
            }
        }

        const swipes = await ctx.db.swipeLog.findMany(findManyArgs)
        return swipes ?? null
    }),
})