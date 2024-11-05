import type { Prisma } from '@prisma/client'
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const requestsRouter = createTRPCRouter({
    list: publicProcedure
        .input(
            z.object({
                apartment: z.number().optional(),
                area: z.string().optional(),
                startDateTime: z.string().optional(),
                endDateTime: z.string().optional(),
                status: z.enum(["PENDING", "COMPLETED"]).optional()
            })
        )
        .query(async ({ ctx, input }) => {
            const findManyArgs: Prisma.RequestFindManyArgs = {where: {}}

            if(input.apartment){
                findManyArgs.where!.apartment = input.apartment
            }

            if(input.area){
                findManyArgs.where!.area = input.area
            }

            if(input.status){
                findManyArgs.where!.status = input.status
            }

            //Filter by date range
            if(input.startDateTime || input.endDateTime){
                findManyArgs.where!.createdAt = {}

                if(input.startDateTime){
                    findManyArgs.where!.createdAt.gte = new Date(input.startDateTime)
                }
                if(input.endDateTime){
                    findManyArgs.where!.createdAt.lte = new Date(input.endDateTime)
                }
            }

            const requests = ctx.db.request.findMany(findManyArgs)
            return requests ?? null
        }),

    create: publicProcedure
        .input(
            z.object({
                tenantId: z.number(),
                area: z.string(),
                description: z.string(),
                imageURI: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const tenantInfo = await ctx.db.user.findFirst({
                where: {id: input.tenantId}
            })

            if(!tenantInfo){
                throw new Error(`Unable to find tenant id ${input.tenantId}`)
            }

            await ctx.db.request.create({
                data: {
                    apartment: tenantInfo.apartment,
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
        .mutation(async ({ ctx, input }) => {
            await ctx.db.request.update({
                where: { id: input.id },
                data: { status: input.status }
            })
            console.log("Set request status")
        }),
})