import { db } from "~/utils/db.server"

export const findUser = async (email) => {
  const user = await db.users.findUniqueOrThrow({
    where: {
      email,
    }
  });
  return user;
}