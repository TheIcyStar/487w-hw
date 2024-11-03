import type { Prisma } from '@prisma/client'
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const usersRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                // userId: z.number(),
                name: z.string(),
                phone: z.bigint(),
                email: z.string(),
                checkIn: z.date(),
                checkOut: z.date(),
                apartment: z.number(),
                role: z.enum(["TENANT", "MAINTENANCE", "MANAGEMENT"])
            })
        )
        .query(async ({ ctx, input }) => {
            await ctx.db.user.create({
                data: {
                    name: input.name,
                    phone: input.phone,
                    email: input.email,
                    checkIn: input.checkIn,
                    checkOut: input.checkOut,
                    apartment: input.apartment,
                    role: input.role
                }
            })
            console.log("Created a user")
        }),

        updateApartment: publicProcedure
        .input(
            z.object({
                userId: z.number(),
                apartment: z.number(),
            })
        )
        .query(async ({ ctx, input }) => {
            await ctx.db.user.update({
                where: { id: input.userId },
                data: {
                    apartment: input.apartment
                }
            })
            console.log("Updated a user's apartment")
        }),

    delete: publicProcedure
    .input(
        z.object({
            userId: z.number()
        })
    )
    .query(async ({ ctx, input }) => {
        await ctx.db.user.delete({
            where: { id: input.userId }
        })
        console.log("deleted a user")
    }),
})