import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createList, getAll } from "~/server/db/list";

export const listRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => getAll(ctx.session?.user.id)),
  createList: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input: { name } }) =>
      createList({
        userId: ctx.session?.user.id,
        name,
      })
    ),
});
