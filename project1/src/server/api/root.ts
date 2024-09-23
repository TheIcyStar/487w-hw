import { swipeRouter } from "./routers/users";
import { createCallerFactory, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  swipes: swipeRouter,
  testy: publicProcedure.query(async () => {
    return [10,20,30]; //left off: https://www.youtube.com/watch?v=qCLV0Iaq9zU, trpc usequery()?
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
