import { prisma } from "../db";

export const getAll = async (userId: string) =>
  prisma.list.findMany({
    where: {
      userId,
    },
  });

export const createList = async ({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) => {
  const position =
    (await prisma.list.count({
      where: {
        userId,
      },
    })) + 1;

  const list = await prisma.list.create({
    data: {
      name,
      position,
      userId,
      sort_by: "position",
    },
  });

  return list;
};
