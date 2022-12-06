import { db } from "~/utils/db.server"

export const findUser = async (email) => {
  const user = await db.users.findUniqueOrThrow({
    where: {
      email,
    }
  });
  return user;
}

export const findOrCreateUser = async ({email, profile_picture, full_name}) => {
  const user = await db.users.findUnique({
    where: {
      email,
    }
  });

  if (!user) {
    const createdUser = await db.users.create({
      data: {
        email: email,
        profile_picture: profile_picture,
        full_name: full_name,
      }
    });

    return createdUser;
  }

  return user;
}