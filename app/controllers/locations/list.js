import { db } from 'app/utils/db.server';

const listLocations = async () => {
  const locations = await db.locations.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return locations;
};

export default listLocations;
