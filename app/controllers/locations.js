import { db } from "~/utils/db.server"

export const listLocations = async () => {
  const locations = await db.Locations.findMany({
    orderBy: {
      name: 'asc',
    }
  });

  return locations;
};
